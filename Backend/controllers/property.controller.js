import Location from "../models/location.model.js";
import City from "../models/city.model.js";
import Country from "../models/country.model.js";
import { propertyValidator } from "../validators/property.validator.js";
import Property from "../models/property.model.js";
import userModel from "../models/user.model.js";

const addProperty = async (req, res) => {
    try {
        const data = req.body
        await propertyValidator.validate(data)
        console.log(data);


        const location = await Location.create({
            type: data.type,
            coordinates: data.coordinates,
        })
        const city = await City.create({
            cityCode: data.cityCode,
            country: data.country,
            cityName: data.cityName,
            state: data.state,
        })
        const country = await Country.create({
            countryCode: data.countryCode,
            currency: data.currency,
            countryName: data.countryName,
            countryStatus: data.countryStatus,
        })

        const newProperty = await Property.create({
            agentId: data.agentId,
            location: location._id,
            city: city._id,
            country: country._id,


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
            garage: data.garage,
            garageSize: data.garageSize,
            currency: data.currency,
            leaseType: data.leaseType,
            verification: data.verification,
            viewCount: data.viewCount,
            isPriceNegotiable: data.isPriceNegotiable,
            availableFrom: data.availableFrom,
            featured: data.featured,
            features: data.features,
        })
        return res.status(200).json({
            message: "Property added successfully",
            newProperty
        });


    } catch (error) {
        console.error("Add Property Error:", error);
        res.status(500).json({
            message: "Error adding property",
            error: error.message,
        });
    }
}

const getproperty = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);

        const propertydetails = await Property.findById(id).populate("agentId", "-password", userModel)
        if (!propertydetails) {
            res.status(500).json({
                message: "Error in fetch property",

            });
        }

        res.status(200).json({
            message: "Error request property",
            propertydetails
        });



    } catch (error) {
        console.error("Add Property Error:", error);
        res.status(500).json({
            message: "Error request property",
            error: error.message,
        });
    }
}

const updateproperty = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id);

        const propertydetails = await Property.findById(id)
        const data = req.body
        await propertyValidator.validate(data)
        console.log(data);


        const location = await Location.findByIdAndUpdate(data.location_id, {
            type: data.type,
            coordinates: data.coordinates,
        })
        const city = await City.findByIdAndUpdate(data.city_id, {
            cityCode: data.cityCode,
            country: data.country,
            cityName: data.cityName,
            state: data.state,
        })
        const country = await Country.findByIdAndUpdate(data.country_id, {
            countryCode: data.countryCode,
            currency: data.currency,
            countryName: data.countryName,
            countryStatus: data.countryStatus,
        })

        const newProperty = await Property.findByIdAndUpdate(id, {
            agentId: data.agentId,
            location: location._id,
            city: city._id,
            country: country._id,


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
            garage: data.garage,
            garageSize: data.garageSize,
            currency: data.currency,
            leaseType: data.leaseType,
            verification: data.verification,
            viewCount: data.viewCount,
            isPriceNegotiable: data.isPriceNegotiable,
            availableFrom: data.availableFrom,
            featured: data.featured,
            features: data.features,
        }, { new: true })
        return res.status(200).json({
            message: "Property updated successfully",
            newProperty
        });



    } catch (error) {
        console.error("Add Property Error:", error);
        res.status(500).json({
            message: "Error request property",
            error: error.message,
        });
    }
}

const deleteproperty = async (req, res) => {
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


    } catch (error) {
        console.error("Add Property Error:", error);
        res.status(500).json({
            message: "Error request property",
            error: error.message,
        });
    }
}

const allproperties = async (req, res) => {
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

const searchproperty = async (req, res) => {
    try {

        console.log("propertyType", req.query)
        let { propertyType, leaseType, title } = req.query;


        const matchStage = {};

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

        res.status(200).json({
            message: "Properties fetched successfully",
            propertydetails
        });

    } catch (error) {
        console.error("Search Property Error:", error);
        res.status(500).json({
            message: "Error fetching properties",
            error: error.message,
        });
    }
};





export { addProperty, getproperty, updateproperty, deleteproperty, allproperties, searchproperty } 