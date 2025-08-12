'use client'


import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import toast from 'react-hot-toast';
import PropertyFormFields from '@/components/PropertyFormFields';
import LoadingComponent from '@/components/loading';
import { verifyRole } from '@/utils/verifyRole';

export default function EditAgentProperty() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const propertyTypes = ['Apartment', 'House', 'Condo', 'Villa', 'Commercial'];
  const [data, setData] = useState({});
  const params = useParams();
  const [isLoading, setLoading] = useState(true);



  useEffect(() => {
    async function validate() {
      const verified = await verifyRole("agent");
      if (!verified) {
        toast.error('Your are not allowed')
        router.push('/')
        return
      }
      if (verified === 'login required') {
        toast.error('login required')
        router.push('/login')
        return
      }
      async function getData() {
        try {
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
          router.replace("/agent/property");
        }
      }
      getData()
    }

    validate();
  }, [])




  const YupValidation = Yup.object().shape({
    leaseType: Yup.string('numbers is not allowed').oneOf(['sell', 'rent'], 'leaseType must be one of "sell" or "rent"').required('leaseType is required'),
    yearOfBuild: Yup.number('yearOfBuild must be a number').min(dayjs().subtract(50, 'year').year(), `yearOfBuild cannot be older than ${dayjs().subtract(50, 'year').year()}`).max(dayjs().add(5, 'year').year(), `yearOfBuild cannot be more than ${dayjs().add(5, 'year').year()}`).required('yearOfBuild is required'),
    landArea: Yup.number('landArea must be in number').min(1).required('landArea is required'),
    price: Yup.number('price must be in number').min(1).required('price is required'),
    propertyType: Yup.string('propertyType must be string').oneOf(['apartment', 'house', 'condo', 'villa', 'commercial'], `propertyType must be in ${propertyTypes}`).required('propertyType is required'),
    status: Yup.string('status must be string').oneOf(['available', 'pending', 'sold', 'rented']).required('status is required'),
    availableFrom: Yup.date().min(dayjs(), `availableFrom must be atleast ${dayjs().format('DD/MM/YYYY')}`).max(dayjs().add(5, 'year'), `availbleFrom date cannot be > than ${dayjs().format('DD/MM/YYYY')}`).required('availbleFrom is required'),
    bedrooms: Yup.number('bedrooms must be in number').min(1, 'bedrooms must be atleast 1').required('bedrooms is required'),
    bathrooms: Yup.number('bathrooms must be in number').min(1, 'bathrooms must be atleast 1').required('bathrooms is required'),
    areaSqFt: Yup.number('area must be in number').min(1).required('area is required'),
    propertyDescription: Yup.string('description must be in string').trim().required('description is required'),
    images: Yup.array().min(1).required('images is required'),
    address: Yup.string('address must be a string').trim().required('address is required'),
    cityCode: Yup.number('cityCode must be a number').required('cityCode is required'),
    cityName: Yup.string('cityName must be a string').trim().required('cityName is required'),
    state: Yup.string('state must be a string').trim().required('state is required'),
    countryCode: Yup.number('countryCode must be a number').required('countryCode is required'),
    countryName: Yup.string('countryName must be a string').trim().required('countryName is required'),
    postalCode: Yup.string('postalCode must be a string').trim().required('postalCode is required'),
    title: Yup.string('title must be a string').trim().required('title is required'),
    currency: Yup.string('currency must be a string').required('currency is required'),
    features: Yup.array().min(1, 'At least one feature must be selected').required('features is required')
  })

  const formik = useFormik({
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
        const formData = new FormData();

        formData.append("coordinates[]", "12.9715987");
        formData.append("coordinates[]", "77.594566");

        Object?.entries(values)?.forEach(([key, value]) => {
          if (!["images", "videos", "features"].includes(key)) {
            formData.append(key, value);
          }
        });

        formik.values.features.forEach((feature) => {
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
        toast.error("Error Editing Property", {
          duration: 2
        })
      }
    }
  })

  const handleImageChanges = (event) => {
    const files = Array.from(event.target.files || []);
    formik.setFieldValue("images", files);
    setImages(files);
  };

  const handleDeleteImage = (idx) => {
    console.log(idx);
    setImages(prev => prev.filter((_, index) => index !== idx));
    const newImages = formik.values?.images?.filter((_, index) => index !== idx);
    formik.setFieldValue("images", newImages);
  }

  const handleDeletevideo = (idx) => {
    setVideos(prev => prev.filter((_, index) => index !== idx));
    const newVideos = formik.values.videos.filter((_, index) => index !== idx);
    formik.setFieldValue("images", newVideos);
  }

  const handleVideoChanges = (event) => {
    const files = Array.from(event.target.files || []);
    formik.setFieldValue("videos", files);
    setVideos(files)
  };



  return (
    <>
      {isLoading ?
        <LoadingComponent /> :
        <PropertyFormFields
          formik={formik}
          handleImageChanges={handleImageChanges}
          handleDeleteImage={handleDeleteImage}
          handleDeletevideo={handleDeletevideo}
          handleVideoChanges={handleVideoChanges}
        />}
    </>
  )
}
