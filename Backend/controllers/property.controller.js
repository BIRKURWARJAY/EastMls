import propertyModel from "../models/property.model";
import Location from "../models/location.model.js";
import City from "../models/city.model.js";
import Country from "../models/country.model.js";
import { propertyValidator } from "../validators/property.validator";

const addProperty = async (req, res) => {
    try {
        const data = req.body
        await propertyValidator.validate(data)

        const location = await Location.create({
            type: data.type,
            coordinates: data.coordinates,
        })
        const city = await City.create({
            cityCode: data.cityCode,
            country: data.country,
            name: data.name,
            state: data.state,
        })
        const country = await Country.create({
            cityCode: data.cityCode,
            country: data.country,
            name: data.name,
            countryStatus: data.countryStatus,
        })

        const newProperty = await propertyModel.create({
            agentId: data.agentId,
            location,
            city,
            country,

            title: data.title,
            address: data.address,
            description: data.description,
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
        return res.status(500).json({
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


export { addProperty } 