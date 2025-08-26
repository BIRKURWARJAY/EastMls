import Location from "../models/location.model";
import City from "../models/city.model";
import Country from "../models/country.model";
import { propertyValidator } from "../validators/property.validator";
import Property from "../models/property.model";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary";
import { Transactions } from "../utils/transactions";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { ClientSession } from "mongoose";
import { RequestWithFiles, RequestWithUser } from "../types/express";


const addProperty: any = Transactions(async (req: RequestWithFiles | RequestWithUser, res: Response, next: NextFunction, session: ClientSession) => {

  const data = req.body;

  const allImages = req?.files["images[]"]?.map((img: any) => img.path) || [];
  console.log(allImages, "?????????????")

  const allVideos = req?.files["videos[]"]?.map((video: any) => video.path) || [];

  const uploadedImages = await Promise.all(allImages.map((img: any) => uploadOnCloudinary(img)));
  console.log(uploadedImages, "??????????")

  const uploadedVideos = await Promise.all(allVideos.map((video: any) => uploadOnCloudinary(video)));

  await propertyValidator.validate({
    ...data,
    images: uploadedImages,
    videos: uploadedVideos
  });


  const location = await Location.create([{
    coordinates: data.coordinates,
  }], { session })

  const country = await Country.create([{
    countryCode: data.countryCode,
    currency: data.currency,
    countryName: data.countryName,
  }], { session })

  const city = await City.create([{
    cityCode: data.cityCode,
    country: country[0]._id,
    cityName: data.cityName,
    state: data.state,
  }], { session })


  const newProperty = await Property.create([{
    agentId: req?.user?.id,
    title: data.title,
    address: data.address,
    propertyDescription: data.propertyDescription,
    status: data.status,
    propertyType: data.propertyType,
    images: uploadedImages,
    price: data.price,
    areaSqFt: data.areaSqFt,
    landArea: data.landArea,
    yearOfBuild: data.yearOfBuild,
    postalCode: data.postalCode,
    bathrooms: data.bathrooms,
    bedrooms: data.bedrooms,
    garage: data?.garage,
    garageSize: data?.garageSize,
    currency: data.currency,
    leaseType: data.leaseType,
    isPriceNegotiable: data.isPriceNegotiable,
    availableFrom: data.availableFrom,
    features: data.features,
    featured: data.features.length > 0,
    videos: uploadedVideos,
    city: city[0]._id,
    country: country[0]._id,
    location: location[0]._id
  }], { session })


  req.files?.images?.forEach((image: any) => (
    fs.unlinkSync(image.path)
  ))

  req.files?.videos?.forEach((video: any) => (
    fs.unlinkSync(video.path)
  ))

  return {
    status: 200,
    message: "Property Listed Successfuly",
    data: newProperty
  }
})

const getproperty: any = async (req: RequestWithUser, res: Response) => {
  try {
    const { id } = req.params
    console.log(id);

    const propertydetails = await Property.findById(id)
      .populate([
        { path: "country", model: Country },
        { path: "city", model: City },
        { path: "location", model: Location }
      ]);
    if (!propertydetails) {
      res.status(500).json({
        message: "Error in fetch property",

      });
    }

    res.status(200).json({
      message: "request property fetched",
      propertydetails
    });



  } catch (error: any) {
    console.error("Add Property Error:", error);
    res.status(500).json({
      message: "Error request property",
      error: error.message,
    });
  }
}

const updateproperty: any = async (req: RequestWithUser, res: Response) => {
  try {
    const { id } = req.params
    console.log(id)

    const propertydetails = await Property.findById(id)

    console.log(propertydetails)
    if (!propertydetails) {
      return res.status(404).json({
        message: "Property not found"
      })
    }
    const data = req.body
    console.log(data, 'mmmmmmmmmm');

    data.images = [
      ...(propertydetails?.images || []),
      ...(Array.isArray(data?.images) ? data.images : [])
    ];


    await propertyValidator.validate(data)


    const location = await Location.findByIdAndUpdate(propertydetails.location, {
      type: data?.type,
      coordinates: data.coordinates,
    })
    const city = await City.findByIdAndUpdate(propertydetails.city, {
      cityCode: data.cityCode,
      country: data.country,
      cityName: data.cityName,
      state: data.state,
    })
    const country = await Country.findByIdAndUpdate(propertydetails.country, {
      countryCode: data.countryCode,
      currency: data.currency,
      countryName: data.countryName,
      countryStatus: data.countryStatus,
    })

    const newProperty = await Property.findByIdAndUpdate(id, {
      agentId: req?.user?.id,
      title: data.title,
      address: data.address,
      propertyDescription: data.propertyDescription,
      status: data.status,
      propertyType: data.propertyType,
      images: data.images,
      price: data.price,
      areaSqFt: data.areaSqFt,
      landArea: data.landArea,
      yearOfBuild: data.yearOfBuild,
      postalCode: data.postalCode,
      bathrooms: data.bathrooms,
      bedrooms: data.bedrooms,
      garage: data?.garage,
      garageSize: data?.garageSize,
      currency: data.currency,
      leaseType: data.leaseType,
      verification: data.verification,
      viewCount: data.viewCount,
      isPriceNegotiable: data.isPriceNegotiable,
      availableFrom: data.availableFrom,
      featured: data.features.length > 0,
      features: data.features,
    }, { new: true })
    return res.status(201)
      .json({
        message: "Property updated successfully",
        newProperty
      });



  } catch (error: any) {
    console.error("Add Property Error:", error);
    res.status(500).json({
      message: "Error request property",
      error: error.message,
    });
  }
}

const deleteproperty: any = async (req: RequestWithUser, res: Response) => {
  try {
    const { id } = req.params
    console.log(id);

    const property = await Property.findById(id)
    if (!property) {
      return res.status(500).json({
        message: "not found property",
      });
    }

    const deletelocation = await Location.findByIdAndDelete(property.location)
    if (!deletelocation) {
      return res.status(500).json({
        message: "error in delete location",
      });
    }
    const deletecountry = await Country.findByIdAndDelete(property.country)
    if (!deletecountry) {
      return res.status(500).json({
        message: "error in delete country",
      });
    }
    const deletecity = await City.findByIdAndDelete(property.city)
    if (!deletecity) {
      return res.status(500).json({
        message: "error in delete city",
      });
    }

    const deleteproperty = await Property.findByIdAndDelete(id)
    if (!deleteproperty) {
      return res.status(500).json({
        message: "property deleted",
      });
    }

    res.status(200).json({
      message: "Deleted property",
    });


  } catch (error: any) {
    console.error("Add Property Error:", error);
    res.status(500).json({
      message: "Error request property",
      error: error.message,
    });
  }
}

const allproperties: any = async (req: RequestWithUser, res: Response) => {
  try {

    const allprop = await Property.find()
    if (!allprop) {
      return res.status(500).json({
        message: "error in fetch all prop",
      })
    }

    return res.status(200).json({
      message: "All properties is fetched",
      allprop
    })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in fetch all prop",
      error
    })
  }
}

const searchproperty: any = async (req: RequestWithUser, res: Response) => {
  try {

    let { propertyType, leaseType, title }: any = req.query;


    const matchStage: any = {

    };

    if (leaseType) {
      leaseType = Array.isArray(leaseType)
        ? leaseType
        : leaseType.split(',');

      if (leaseType.length > 0) {
        matchStage.leaseType = { $in: leaseType };
      }
    }

    if (propertyType && propertyType !== '') {
      matchStage.propertyType = propertyType;
    }

    if (title && title.trim() !== '') {
      matchStage.title = {
        $regex: title.trim(),
        $options: "i"
      };
    }

    const pipeline = [{ $match: matchStage }];

    const propertydetails = await Property.aggregate(pipeline);

    if (!propertydetails.length) {
      return res.status(200).json({
        message: "No properties found",
        propertydetails: []
      });
    }

    return res.status(200).json({
      message: "Properties searched successfully",
      propertydetails
    });

  } catch (error: any) {
    console.error("Search Property Error:", error);
    res.status(500).json({
      message: "Error fetching properties",
      error: error.message,
    });
  }
};

const agentProperty: any = async (req: RequestWithUser, res: Response) => {
  try {
    const agentId = req?.user?.id;

    if (!agentId) {
      return res.status(400).json({
        message: "Agent ID is missing in cookies",
      });
    }

    const allprop = await Property.find({ agentId });

    return res.status(200).json({
      message: "All properties fetched successfully",
      allprop
    });

  } catch (error: any) {
    console.error("Error in agentProperty:", error);
    return res.status(500).json({
      message: "Server error while fetching properties",
      error: error.message
    });
  }
};





export { addProperty, getproperty, updateproperty, deleteproperty, allproperties, searchproperty, agentProperty } 