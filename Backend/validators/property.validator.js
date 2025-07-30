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

  type: Yup.string()
    .oneOf(['Point', 'Circle', 'Area'], 'Invalid property type')
    .required('propertyType is required'),

  status: Yup.string()
    .oneOf(['available', 'pending', 'sold', 'rented'], 'Invalid status')
    .required('status is required'),

  availableFrom: Yup.date()
    .min(today.toDate(), `availableFrom must be at least ${today.format('DD/MM/YYYY')}`)
    .max(maxAvailableFrom, `availableFrom cannot be after ${dayjs(maxAvailableFrom).format('DD/MM/YYYY')}`)
    .required('availableFrom is required'),

  bedrooms: Yup.number()
    .typeError('bedrooms must be a number')
    .min(1, 'bedrooms must be at least 1')
    .required('bedrooms is required'),

  bathrooms: Yup.number()
    .typeError('bathrooms must be a number')
    .min(1, 'bathrooms must be at least 1')
    .required('bathrooms is required'),

  garage: Yup.number()
    .typeError('garage must be a number')
    .min(1, 'garage must be at least 1')
    .required('garage is required'),

  garageSize: Yup.number()
    .typeError('area must be a number')
    .min(1, 'area must be at least 1')
    .required('area is required'),

  areaSqFt: Yup.number()
    .typeError('area must be a number')
    .min(1, 'area must be at least 1')
    .required('area is required'),

  viewCount: Yup.number()
    .typeError('viewCount must be a number')
    .required('viewCount is required'),


  isPriceNegotiable: Yup.boolean()
    .required('isPriceNegotiable is required'),

  countryStatus: Yup.boolean()
    .required('isPriceNegotiable is required'),

  featured: Yup.boolean()
    .required('featured is required'),

  verification: Yup.boolean()
    .required('verification is required'),

  propertyDescription: Yup.string()
    .trim()
    .required('description is required'),

  currency: Yup.string()
    .trim()
    .required('currency is required'),

  title: Yup.string()
    .trim()
    .required('title is required'),

  countryName: Yup.string()
    .trim()
    .required('countryName id is required'),

  country: Yup.string()
    .trim()
    .required('country id is required'),

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
    .of(Yup.string().required('features must be a string'))
    .required('features is required'),

  coordinates: Yup.array()
    .required('coordinates is required'),
});
