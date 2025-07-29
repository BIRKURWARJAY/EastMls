import * as Yup from "yup";
import dayjs from "dayjs";

export const propertyValidator = Yup.object().shape({
    leaseType: Yup.string('numbers is not allowed').oneOf(['sell', 'rent'], 'leaseType must be one of "sell" or "rent"').required('leaseType is required'),
    yearBuilt: Yup.date('yearBuilt must be a number').min(dayjs().subtract(50, 'year'), `yearBuilt cannot be older than ${dayjs().subtract(50, 'year').format('DD/MM/YYYY')}`).max(dayjs().add(5, 'year'), `yearBuilt cannot be more than ${dayjs().add(5, 'year').format('DD/MM/YYYY')}`).required('yearBuilt is required'),
    landArea: Yup.number('landArea must be in number').min(1).required('landArea is required'),
    price: Yup.number('price must be in number').min(1).required('price is required'),
    propertyType: Yup.string('propertyType must be string').oneOf(['apartment', 'house', 'condo', 'villa', 'commercial'], `propertyType must be in ${propertyTypes}`).required('propertyType is required'),
    status: Yup.string('status must be string').oneOf(['available', 'pending', 'sold', 'rented']).required('status is required'),
    availableFrom: Yup.date().min(dayjs(), `availableFrom must be atleast ${dayjs().format('DD/MM/YYYY')}`).max(dayjs().add(5, 'year'), `availbleFrom date cannot be > than ${dayjs().format('DD/MM/YYYY')}`).required('availbleFrom is required'),
    bedrooms: Yup.number('bedrooms must be in number').min(1, 'bedrooms must be atleast 1').required('bedrooms is required'),
    bathrooms: Yup.number('bathrooms must be in number').min(1, 'bathrooms must be atleast 1').required('bathrooms is required'),
    area: Yup.number('area must be in number').min(1).required('area is required'),
    desc: Yup.string('description must be in string').trim().required('description is required'),
    images: Yup.array().min(1).required('images is required')
  })