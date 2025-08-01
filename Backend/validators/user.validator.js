import * as Yup from "yup";


export const userValidator = Yup.object().shape({
    username: Yup.string('only number is not allowed as name').trim('fullName is required').min(1).required('fullName is required'),
    email: Yup.string().email('invalid Email').required('Email is required'),
    licenseNumber: Yup.string(),
    password: Yup.string().trim('password is required').min(6, 'password length must be > 6').required('password is required')
})
  
export const userLoginValidationSchema = Yup.object().shape({
    email: Yup.string().email('invalid Email').required('Email is required'),
  password: Yup.string().trim('password is required').min(6, 'password length must be > 6').required('password is required'),
})