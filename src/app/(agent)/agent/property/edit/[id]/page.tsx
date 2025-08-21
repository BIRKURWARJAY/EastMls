'use client'


import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/src/utils/api';
import toast from 'react-hot-toast';
import PropertyFormFields from '@/src/components/PropertyFormFields';
import LoadingComponent from '@/src/components/Loading';

export default function EditAgentProperty() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const propertyTypes = ['Apartment', 'House', 'Condo', 'Villa', 'Commercial'];
  const [data, setData] = useState<any>();
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const apiRef = useRef(false)



  useEffect(() => {
    async function getData() {
      try {
        apiRef.current = true;
        const res = await api.get(`/property/${params.id}`)
        if (res.status === 200) {
          console.log(res.data, "??????????")
          setImages(res.data.propertydetails.images);
          setVideos(res.data.propertydetails.videos);
          setData(res.data.propertydetails)
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        apiRef.current = false;
        return router.replace("/agent/property");
      }
    }
    !apiRef.current && getData();
  }, [])




  const YupValidation = Yup.object().shape({
    leaseType: Yup.string().oneOf(['sell', 'rent'], 'leaseType must be one of "sell" or "rent"').required('leaseType is required'),
    yearOfBuild: Yup.number().min(dayjs().subtract(50, 'year').year(), `yearOfBuild cannot be older than ${dayjs().subtract(50, 'year').year()}`).max(dayjs().add(5, 'year').year(), `yearOfBuild cannot be more than ${dayjs().add(5, 'year').year()}`).required('yearOfBuild is required'),
    landArea: Yup.number().min(1).required('landArea is required'),
    price: Yup.number().min(1).required('price is required'),
    propertyType: Yup.string().oneOf(['apartment', 'house', 'condo', 'villa', 'commercial'], `propertyType must be in ${propertyTypes}`).required('propertyType is required'),
    status: Yup.string().oneOf(['available', 'pending', 'sold', 'rented']).required('status is required'),
    availableFrom: Yup.date().min(dayjs(data?.availableFrom), `availableFrom must be atleast ${data?.availableFrom}`).max(dayjs(data?.availableFrom).add(5, 'year'), `availbleFrom date cannot be > than ${dayjs().format('DD/MM/YYYY')}`).required('availbleFrom is required'),
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
    postalCode: Yup.string().trim().required('postalCode is required'),
    title: Yup.string().trim().required('title is required'),
    currency: Yup.string().required('currency is required'),
    features: Yup.array().min(1, 'At least one feature must be selected').required('features is required')
  })

  const formik:any = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...data,
      ...data.country,
      ...data.location,
      ...data.city
    },
    validationSchema: YupValidation,
    onSubmit: async (values) => {
      console.log('Submitting form with values:', values)
      try {
        setUploading(true);
        const formData = new FormData();

        formData.append("coordinates[]", "12.9715987");
        formData.append("coordinates[]", "77.594566");

        Object?.entries(values)?.forEach(([key, value]) => {
          if (!["images", "videos", "features"].includes(key)) {
            formData.append(key, String(value));
          }
        });

        formik.values.features.forEach((feature:any) => {
          formData.append("features[]", feature)
        })

        images?.forEach((image) => {
          formData.append("images[]", image);
        });

        videos?.forEach((video) => {
          formData.append("videos[]", video);
        });

        const res = await api.put(`/property/${params.id}`, formData);
        if (res?.status === 201) {
          console.log(res.data.message);
          toast.success("Property Edited");
          router.push("/agent/property");
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setUploading(false);
        
        toast.error("Editing Property Error ")
      }
    }
  })

  const handleImageChanges:any = (event:any) => {
    const files:any = Array.from(event.target.files || []);
    formik.setFieldValue("images", files);
    setImages(files);
  };

  const handleDeleteImage = (idx:number) => {
    console.log(idx);
    setImages(prev => prev.filter((_, index:number) => index !== idx));
    const newImages = formik.values?.images?.filter((_:any, index:number) => index !== idx);
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
      {isLoading ?
        <LoadingComponent /> :
        <PropertyFormFields
          formik={formik!}
          handleImageChanges={handleImageChanges!}
          handleDeleteImage={handleDeleteImage}
          handleDeletevideo={handleDeletevideo}
          handleVideoChanges={handleVideoChanges!}
          uploading={uploading}
          useFor={"Edit"}
        />}
    </>
  )
}
