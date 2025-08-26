import * as Yup from "yup";

export const propertyValidator = Yup.object().shape({
  leaseType: Yup.string()
    .oneOf(['sell', 'rent'], 'leaseType must be one of "sell" or "rent"')
    .required('leaseType is required'),

  postalCode: Yup.string()
    .required('postalCode is required'),


  landArea: Yup.number()
    .typeError('landArea must be a number')
    .min(1, 'landArea must be at least 1')
    .required('landArea is required'),

  yearOfBuild: Yup.number()
    .typeError('yearOfBuild must be a number')
    .min(1, 'yearOfBuild must be at least 1')
    .required('yearOfBuild is required'),

  price: Yup.number()
    .typeError('price must be a number')
    .min(1, 'price must be at least 1')
    .required('price is required'),

  propertyType: Yup.string()
    .oneOf(['apartment', 'house', 'condo', 'villa', 'commercial'], 'Invalid property type')
    .required('propertyType is required'),


  status: Yup.string()
    .oneOf(['available', 'pending', 'sold', 'rented'], 'Invalid status')
    .required('status is required'),

  availableFrom: Yup.string()
    .required('availableFrom is required'),

  bedrooms: Yup.number()
    .typeError('bedrooms must be a number')
    .min(1, 'bedrooms must be at least 1')
    .required('bedrooms is required'),

  bathrooms: Yup.number()
    .typeError('bathrooms must be a number')
    .min(1, 'bathrooms must be at least 1')
    .required('bathrooms is required'),


  areaSqFt: Yup.number()
    .typeError('areaSqFt must be a number')
    .min(1, 'areaSqFt must be at least 1')
    .required('areaSqFt is required'),


  isPriceNegotiable: Yup.boolean()
    .required('isPriceNegotiable is required'),

  verification: Yup.boolean(),

  propertyDescription: Yup.string()
    .trim()
    .required('propertyDescription is required'),

  currency: Yup.string()
    .trim()
    .required('currency is required'),

  title: Yup.string()
    .trim()
    .required('title is required'),

  countryName: Yup.string()
    .trim()
    .required('countryName id is required'),

  countryCode: Yup.string()
    .trim()
    .required('countryCode is required'),

  state: Yup.string()
    .trim()
    .required('state is required'),

  cityName: Yup.string()
    .trim()
    .required('cityName id is required'),

  cityCode: Yup.string()
    .trim()
    .required('cityCode is required'),

  images: Yup.array()
    .min(1, 'At least one image is required')
    .of(Yup.string().required('Image URL must be a string'))
    .required('images is required'),

  features: Yup.array()
    .min(1, 'At least one feature is required')
    .of(Yup.string().required('features must be a string')),
  
  coordinates: Yup.array()
    .optional(),
});
