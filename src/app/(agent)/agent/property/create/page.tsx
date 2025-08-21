'use client'

import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/src/utils/api';
import toast from 'react-hot-toast';
import PropertyFormFields from '@/src/components/PropertyFormFields';

export default function CreateAgentProperty() {
  const router = useRouter();
  const propertyTypes = ['Apartment', 'House', 'Condo', 'Villa', 'Commercial'];
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);


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

  const formik:any = useFormik({
    initialValues: {
      leaseType: " ",
      yearOfBuild: "",
      landArea: "",
      price: "",
      isPriceNegotiable: false,
      propertyType: " ",
      status: " ",
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
      currency: " ",
      features: []
    },
    validationSchema: YupValidation,
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

        formik.values.features.forEach((feature:any) => {
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

  const handleImageChanges:any = (event:any) => {
    const files:any = Array.from(event.target.files || []);
    console.log(files)
    formik.setFieldValue("images", files);
    setImages(files);
  };

  const handleDeleteImage = (idx:number) => {
    setImages(prev => prev.filter((_, index) => index !== idx));
    const newImages = formik.values.images.filter((_:any, index:number) => index !== idx);
    formik.setFieldValue("images", newImages);
  }

  const handleDeletevideo = (idx:number) => {
    setVideos(prev => prev.filter((_, index) => index !== idx));
    const newVideos = formik.values.videos.filter((_:any, index:number) => index !== idx);
    formik.setFieldValue("images", newVideos);
  }

  const handleVideoChanges:any = (event:any) => {
    const files:any = Array.from(event.target.files || []);
    formik.setFieldValue("videos", files);
    setVideos(files)
  };


  return (
    <>
      <PropertyFormFields
        formik={formik}
        handleImageChanges={handleImageChanges}
        handleDeleteImage={handleDeleteImage}
        handleDeletevideo={handleDeletevideo}
        handleVideoChanges={handleVideoChanges}
        useFor={"Create"}
        uploading={uploading}
      />
    </>
  )
}
