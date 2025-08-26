import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextareaAutosize,
  TextField,
  Typography,
  Chip,
  OutlinedInput,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import * as Yup from "yup";

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SellIcon from '@mui/icons-material/Sell';
import PaymentsIcon from '@mui/icons-material/Payments';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import {
  AutoMode,
  BathtubSharp,
  CalendarMonth,
  CloseOutlined,
  Hotel,
  Image as ImageIcon,
  Videocam as VideocamIcon,
} from '@mui/icons-material';


import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ErrorText from '../components/ErrorText';
import Link from 'next/link';
import dayjs from "dayjs"
import { Date } from 'mongoose';
import { ChangeEvent, ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import { Formik, useFormik } from 'formik';
import toast from 'react-hot-toast';
import { api } from '../utils/api';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type PropertyFormProps = {
  formik: {
    handleSubmit: () => void
    handleChange: ChangeEventHandler<SelectChangeEvent<String> | HTMLTextAreaElement | HTMLInputElement> | any,
    handleBlur: () => void
    setFieldValue: (a: string, b: any) => void
    values: any
    touched: any
    errors: any
    username: string
    role: string
    number: number
    email: string
    property: string
  }
  handleDeleteImage: (index: any) => void
  handleDeletevideo: (index: any) => void
  handleImageChanges: () => void
  handleVideoChanges: () => void
  useFor: string
  uploading: boolean
}
const propertyTypes: String[] = ['Apartment', 'House', 'Condo', 'Villa', 'Commercial'];



interface useFor {
  useFor: string
}

const PropertyFormFields = ({ useFor }: useFor) => {

  const router: AppRouterInstance = useRouter();
  const [temp, settemp] = useState('')
  const YupValidation = Yup.object().shape({
    leaseType: Yup.string().oneOf(['sell', 'rent'], 'leaseType must be one of "sell" or "rent"').required('leaseType is required'),
    yearOfBuild: Yup.number().min(dayjs().subtract(50, 'year').year(), `yearOfBuild cannot be older than ${dayjs().subtract(50, 'year').year()}`).max(dayjs().add(5, 'year').year(), `yearOfBuild cannot be more than ${dayjs().add(5, 'year').year()}`).required('yearOfBuild is required'),
    landArea: Yup.number().min(1).required('landArea is required'),
    price: Yup.number().min(1).required('price is required'),
    propertyType: Yup.string().oneOf(['apartment', 'house', 'condo', 'villa', 'commercial'], `propertyType must be in ${propertyTypes}`).required('propertyType is required'),
    status: Yup.string().oneOf(['available', 'pending', 'sold', 'rented']).required('status is required'),
    availableFrom: Yup.date().min(dayjs(), `availableFrom must be atleast ${dayjs().format('DD/MM/YYYY')}`).max(dayjs().add(5, 'year'), `availbleFrom date cannot be > than ${dayjs().format('DD/MM/YYYY')}`).required('availbleFrom is required'),
    bedrooms: Yup.number().min(1, 'bedrooms must be atleast 1').required('bedrooms is required'),
    bathrooms: Yup.number().min(1, 'bathrooms must be atleast 1').required('bathrooms is required'),
    areaSqFt: Yup.number().min(1).required('area is required'),
    propertyDescription: Yup.string().trim().required('description is required'),
    images: Yup.array().min(1).required('images is required'),
    address: Yup.string().trim().required('address is required'),
    cityCode: Yup.number().required('cityCode is required'),
    cityName: Yup.string().trim().required('cityName is required'),
    state: Yup.string().trim().required('state is required'),
    countryCode: Yup.number().required('countryCode is required'),
    countryName: Yup.string().trim().required('countryName is required'),
    postalCode: Yup.number().required('postalCode is required'),
    title: Yup.string().trim().required('title is required'),
    currency: Yup.string().required('currency is required'),
    features: Yup.array().min(1, 'At least one feature must be selected').required('features is required')
  })

  const initialValues = useMemo(() => ({
  leaseType: "",
  yearOfBuild: "",
  landArea: "",
  price: "",
  isPriceNegotiable: false,
  propertyType: "",
  status: "",
  availableFrom: "",
  bedrooms: "",
  bathrooms: "",
  areaSqFt: "",
  propertyDescription: "",
  images: [],
  videos: [],
  address: "",
  cityCode: "",
  cityName: "",
  state: "",
  countryCode: "",
  countryName: "",
  postalCode: "",
  title: "",
  currency: "",
  features: []
}), []);

  const formik: any = useFormik({
    initialValues:initialValues,
    validationSchema: YupValidation,
    enableReinitialize: true,
    validateOnChange:true,
    onSubmit: async (values) => {
      console.log('Submitting form with values:', values)
      try {
        setUploading(true);
        const formData = new FormData();

        formData.append("coordinates[]", "12.9715987");
        formData.append("coordinates[]", "77.594566");

        Object.entries(values).forEach(([key, value]) => {
          if (!["images", "videos", "features"].includes(key)) {
            formData.append(key, String(value));
          }
        });

        formik.values.features.forEach((feature: any) => {
          formData.append("features[]", feature);
        })

        images.forEach((image) => {
          formData.append("images[]", image);
        });

        videos.forEach((video) => {
          formData.append("videos[]", video);
        });



        console.log('Sending to API:', formData);
        const res = await api.post("/property", formData);
        if (res?.status === 200) {
          console.log(res.data.message);
          toast.success("New Property Listed");
          router.push("/agent/property");
        }
      } catch (error) {
        setUploading(false);
        console.error('Form submission error:', error);
        toast.error("Listing Property Error");
      }
    }
  })

  const handleImageChanges: any = (event: any) => {
    const files: any = Array.from(event.target.files || []);
    console.log(files)
    formik.setFieldValue("images", files);
    setImages(files);
  };

  const handleDeleteImage = (idx: number) => {
    setImages(prev => prev.filter((_, index) => index !== idx));
    const newImages = formik.values.images.filter((_: any, index: number) => index !== idx);
    formik.setFieldValue("images", newImages);
  }

  const handleDeletevideo = (idx: number) => {
    setVideos(prev => prev.filter((_, index) => index !== idx));
    const newVideos = formik.values.videos.filter((_: any, index: number) => index !== idx);
    formik.setFieldValue("images", newVideos);
  }

  const handleVideoChanges: any = (event: any) => {
    const files: any = Array.from(event.target.files || []);
    formik.setFieldValue("videos", files);
    setVideos(files)
  };

  const leaseTypes = ['Sell', 'Rent'];
  const statusArr = ['Available', 'Pending', 'Sold', 'Rented'];

  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [uploading, setUploading] = useState<Boolean>(false);

  // Property features options
  const propertyFeatures = [
    'CCTV Surveillance',
    'Nearby Public Transport',
    'Rainwater Harvesting',
    'Gated Community',
    'Earthquake Resistant Structure',
    'Swimming Pool',
    'Rooftop Deck',
    'Video Door Phone',
    'Visitor Parking',
    'Fire Safety Systems',
    'Smart Home Features',
    'Covered Parking',
    'Waste Disposal System',
    'EV Charging Point',
    'Gym / Fitness Center',
    'Open Parking',
    'Chimney / Exhaust',
    'Flooring Type',
    'Children\'s Play Area',
    'Sports Facilities',
    'Modular Kitchen',
    'Clubhouse',
    'Geysers',
    'Solar Panels',
    'Air Conditioning',
    'Landscaped Garden',
    'Jogging Track',
    'Intercom',
    'Internet/Wi-Fi Ready',
    'Power Backup',
    'False Ceiling & Lighting',
    '24/7 Security',
    'Water Supply (24/7)',
    'Maintenance Staff'
  ];

  // Currency options
  const currencyOptions = ['USD', "EURO", 'POUND', 'INR', 'YEM', 'ND', 'KSh'];

  // const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback((event) => {
  //   console.log('>> event changed')
  //   formik.handleChange(event)
  // }, [])
  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <TextField
          placeholder="e.g., Beautiful 3-Bedroom Apartment in City Center"
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.title && formik.errors.title && <ErrorText helperText={formik.errors.title} />}
          error={formik.touched.title && formik.errors.title}
        />

        <TextareaAutosize
          placeholder="Enter the complete property address"
          name='address'
          value={formik.values?.address || ""}
          style={{
            resize: 'vertical',
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            borderColor: 'gray',
            border: "1px solid",
            minHeight: "3rem",
            maxHeight: "5rem",
            height: "4rem",
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <TextField
          type="number"
          placeholder="e.g., 382382"
          name='cityCode'
          value={formik.values?.cityCode || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.cityCode && formik.errors.cityCode && <ErrorText helperText={formik.errors.cityCode} />}
          error={formik.touched.cityCode && formik.errors.cityCode}
        />

        <TextField
          placeholder="e.g., Ahmedabad"
          name='cityName'
          value={formik.values?.cityName || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.cityName && formik.errors.cityName && <ErrorText helperText={formik.errors.cityName} />}
          error={formik.touched.cityName && formik.errors.cityName}
        />
      </Grid>
    </Grid>
  );
}

export default PropertyFormFields
