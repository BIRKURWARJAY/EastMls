'use client'
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
} from '@mui/material';

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
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from "yup";
import ErrorText from '@/components/ErrorText';
import { useEffect, useState } from 'react';
import decodeToken from '@/utils/decodeToken';
import { useParams, useRouter } from 'next/navigation';
import LoadingComponent from '@/components/loading';
import { api } from '@/utils/api';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { features } from 'process';

export default function EditAgentProperty() {
  const router = useRouter();
  const [images, setImages] = useState();
  const [videos, setVideos] = useState([]);
  const leaseTypes = ['Sell', 'Rent'];
  const propertyTypes = ['Apartment', 'House', 'Condo', 'Villa', 'Commercial'];
  const statusArr = ['Available', 'Pending', 'Sold', 'Rented'];
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const params = useParams();

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
  const currencyOptions = ['USD', "EURO", 'POUND', 'RUPEES', 'YEMEN', 'ND', 'KSh'];


  useEffect(() => {
    async function validate() {
      const tokenRes = await decodeToken("agent", router);
    async function getData() {
      try {
        const res = await api.get(`/property/${params.id}`)
        console.log(res);
        if (res.status === 200) {
          console.log(res.data.propertydetails);
          setImages(res.data.images);
          setVideos(res.data.videos);
          setData(res.data.propertydetails)
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        router.replace("/agent/property");
      }
    }
    tokenRes?.status ? getData() : router.push("/login");
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
          formData.append(key, value);
        });

      formik.values.features.forEach((feature) => {
        formData.append("features", feature)
      })

        images?.forEach((image) => { 
          formData.append("images", image);
        });

        values?.videos?.forEach((video) => {
          formData.append("videos", video);
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
    setImages(prev => prev.filter((_, index) => index !== idx));
    const newImages = formik.values.images.filter((_, index) => index !== idx);
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {
        (isLoading && !data) ? <LoadingComponent /> : <Grid container spacing={4} sx={{
          bgcolor: "#abb0b445",
          padding: 2,
          justifyContent: 'space-between'
        }}>
          <Grid size={{ xs: 12, md: 7, lg: 9 }} sx={{
            bgcolor: "#fff",
            padding: 4,
            borderRadius: "10px",
            gap: 3
          }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Link href={"/agent/property"}>
                <IconButton sx={{ paddingLeft: 0 }}>
                  <KeyboardBackspaceIcon />
                </IconButton>
              </Link>
              <Typography variant="h5">Edit Property Listing</Typography>
            </Stack>

            <form encType='multipart/form-data' onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                {/* Property Title */}
                <Stack spacing={.3}>
                  <FormLabel>Property Title</FormLabel>
                  <TextField
                    placeholder="e.g., Beautiful 3-Bedroom Apartment in City Center"
                    name='title'
                    value={formik.values?.title || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.title && formik.errors.title && <ErrorText helperText={formik.errors.title} />}
                    error={formik.touched.title && formik.errors.title}
                  />
                </Stack>

                {/* Location Details */}
                <Stack spacing={2}>
                  <Typography variant="h6">Location Details</Typography>

                  <Stack spacing={.3}>
                    <FormLabel>Address</FormLabel>
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
                        height: "4rem"
                      }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.address && formik.errors.address && <ErrorText helperText={formik.errors.address} />}
                  </Stack>

                  <Stack direction="row" spacing={3}>
                    <Stack flex={1} spacing={.3}>
                      <FormLabel>City Code</FormLabel>
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
                    </Stack>

                    <Stack flex={1} spacing={.3}>
                      <FormLabel>City Name</FormLabel>
                      <TextField
                        placeholder="e.g., Ahmedabad"
                        name='cityName'
                        value={formik.values?.cityName || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.cityName && formik.errors.cityName && <ErrorText helperText={formik.errors.cityName} />}
                        error={formik.touched.cityName && formik.errors.cityName}
                      />
                    </Stack>

                    <Stack flex={1} spacing={.3}>
                      <FormLabel>State</FormLabel>
                      <TextField
                        placeholder="e.g., Gujarat"
                        name='state'
                        value={formik.values?.state || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.state && formik.errors.state && <ErrorText helperText={formik.errors.state} />}
                        error={formik.touched.state && formik.errors.state}
                      />
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={3}>
                    <Stack flex={1} spacing={.3}>
                      <FormLabel>Country Code</FormLabel>
                      <TextField
                        type="number"
                        placeholder="e.g., 98"
                        name='countryCode'
                        value={formik.values?.countryCode || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.countryCode && formik.errors.countryCode && <ErrorText helperText={formik.errors.countryCode} />}
                        error={formik.touched.countryCode && formik.errors.countryCode}
                      />
                    </Stack>

                    <Stack flex={1} spacing={.3}>
                      <FormLabel>Country Name</FormLabel>
                      <TextField
                        placeholder="e.g., India"
                        name='countryName'
                        value={formik.values?.countryName || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.countryName && formik.errors.countryName && <ErrorText helperText={formik.errors.countryName} />}
                        error={formik.touched.countryName && formik.errors.countryName}
                      />
                    </Stack>

                    <Stack flex={1} spacing={.3}>
                      <FormLabel>Postal Code</FormLabel>
                      <TextField
                        placeholder="e.g., 380001"
                        name='postalCode'
                        value={formik.values?.postalCode || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.postalCode && formik.errors.postalCode && <ErrorText helperText={formik.errors.postalCode} />}
                        error={formik.touched.postalCode && formik.errors.postalCode}
                      />
                    </Stack>
                  </Stack>
                </Stack>

                {/* Property Features */}
                <Stack spacing={.3}>
                  <FormLabel>Property Features</FormLabel>
                  <FormControl error={formik.touched.features && formik.errors.features}>
                    <Select
                      multiple
                      name='features'
                      value={formik.values?.features || []}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      input={<OutlinedInput />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      <MenuItem value={" "} disabled>Features</MenuItem>
                      {propertyFeatures.map((feature) => (
                        <MenuItem key={feature} value={feature}>
                          {feature}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.features && formik.errors.features && <ErrorText helperText={formik.errors.features} />}
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>Lease Type</FormLabel>
                    <Select
                      name='leaseType'
                      value={formik.values.leaseType || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.leaseType && formik.errors.leaseType}
                    >
                      <MenuItem disabled value=" ">
                        <em>Select Lease Type</em>
                      </MenuItem>
                      {leaseTypes.map((type) => (
                        <MenuItem key={type} value={type.toLowerCase()}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.leaseType && formik.errors.leaseType && <ErrorText helperText={formik.errors.leaseType} />}
                  </Stack>

                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>Year Built</FormLabel>
                    <TextField
                      type="number"
                      name='yearOfBuild'
                      placeholder="e.g., 2020"
                      min={dayjs().subtract(50, 'year').year()}
                      max={dayjs().add(5, 'year').year()}
                      value={formik.values?.yearOfBuild || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.yearOfBuild && formik.errors.yearOfBuild && <ErrorText helperText={formik.errors.yearOfBuild} />}
                      error={formik.touched.yearOfBuild && formik.errors.yearOfBuild}
                    />
                  </Stack>
                </Stack>

                <Stack sx={{ width: "calc(50% - 15px)" }} spacing={.3}>
                  <FormLabel>Land Area (Sq. Ft)</FormLabel>
                  <TextField
                    placeholder="e.g., 1200"
                    type="number"
                    name='landArea'
                    value={formik.values?.landArea || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.landArea && formik.errors.landArea && <ErrorText helperText={formik.errors.landArea} />}
                    error={formik.touched.landArea && formik.errors.landArea}
                  />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>
                      <PaymentsIcon fontSize="small" /> Price
                    </FormLabel>
                    <TextField
                      placeholder="e.g., 15000000"
                      name='price'
                      type='number'
                      value={formik.values?.price || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.price && formik.errors.price && <ErrorText helperText={formik.errors.price} />}
                      error={formik.touched.price && formik.errors.price}
                    />
                  </Stack>

                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      name="currency"
                      value={formik.values?.currency || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.currency && formik.errors.currency}
                    >
                      {currencyOptions?.length > 0 ? (
                        currencyOptions.map((currency) => (
                          <MenuItem key={currency} value={currency}>
                            {currency}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>Loading currencies...</MenuItem>
                      )}
                    </Select>
                    {formik.touched.currency && formik.errors.currency && <ErrorText helperText={formik.errors.currency} />}
                  </Stack>

                  <Stack spacing={.3} flex={1} sx={{
                    justifyContent: "end"
                  }}>
                    <FormLabel>
                      <SellIcon fontSize="small" /> Is Price Negotiable?
                    </FormLabel>
                    <Switch
                      color='green'
                      name='isPriceNegotiable'
                      value={formik.values?.isPriceNegotiable || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={3} >
                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>
                      <MeetingRoomIcon fontSize="small" /> Property Type
                    </FormLabel>
                    <Select
                      value={formik.values?.propertyType || ""}
                      name='propertyType'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.propertyType && formik.errors.propertyType}
                    >
                      <MenuItem value=" " disabled>
                        Select Property Type
                      </MenuItem>
                      {propertyTypes.map((type) => (
                        <MenuItem key={type} value={type.toLowerCase()}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.propertyType && formik.errors.propertyType && <ErrorText helperText={formik.errors.propertyType} />}
                  </Stack>

                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <AutoMode fontSize="small" /> Status
                    </FormLabel>
                    <Select
                      value={formik.values?.status || ""}
                      name='status'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.status && formik.errors.status}
                    >
                      <MenuItem value=" " disabled>
                        Select Status
                      </MenuItem>
                      {statusArr.map((type) => (
                        <MenuItem key={type} value={type.toLowerCase()}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.status && formik.errors.status && <ErrorText helperText={formik.errors.status} />}
                  </Stack>

                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <CalendarMonth fontSize="small" /> Available From
                    </FormLabel>
                    <DatePicker
                      name="availableFrom"
                      minDate={dayjs()}
                      value={dayjs(formik.values?.availableFrom || "")}
                      maxDate={dayjs().add(5, 'year')}
                      onChange={(date) => formik.setFieldValue('availableFrom', date)}
                      slotProps={{
                        textField: {
                          error: formik.touched.availableFrom && formik.errors.availableFrom,
                          onBlur: formik.handleBlur,
                          helperText: <ErrorText helperText={formik.errors.availableFrom} />
                        }
                      }}
                      component={(props) => <TextField {...props} />}
                    />


                  </Stack>
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <Hotel fontSize="small" /> Bedrooms
                    </FormLabel>
                    <TextField
                      type="number"
                      placeholder="e.g., 3"
                      value={formik.values?.bedrooms || ""}
                      name='bedrooms'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.bedrooms && formik.errors.bedrooms && <ErrorText helperText={formik.errors.bedrooms} />}
                      error={formik.touched.bedrooms && formik.errors.bedrooms}
                    />
                  </Stack>

                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <BathtubSharp fontSize="small" /> Bathrooms
                    </FormLabel>
                    <TextField
                      type="number"
                      placeholder="e.g., 2"
                      name='bathrooms'
                      value={formik.values?.bathrooms || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.bathrooms && formik.errors.bathrooms && <ErrorText helperText={formik.errors.bathrooms} />}
                      error={formik.touched.bathrooms && formik.errors.bathrooms}
                    />
                  </Stack>

                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <MeetingRoomIcon fontSize="small" /> Area (Sq. Ft)
                    </FormLabel>
                    <TextField
                      type="number"
                      placeholder="e.g., 1800"
                      name='areaSqFt'
                      value={formik.values?.areaSqFt || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.areaSqFt && formik.errors.areaSqFt && <ErrorText helperText={formik.errors.areaSqFt} />}
                      error={formik.touched.areaSqFt && formik.errors.areaSqFt}
                    />
                  </Stack>
                </Stack>

                <Stack spacing={.3}>
                  <FormLabel>Property Description</FormLabel>
                  <TextareaAutosize
                    placeholder="Describe the property features, neighborhood, amenities, etc."
                    name='propertyDescription'
                    value={formik.values?.propertyDescription || ""}
                    style={{
                      resize: 'vertical',
                      width: '100%',
                      padding: '10px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      borderColor: 'gray',
                      border: "1px solid",
                      maxHeight: "12rem",
                      minHeight: "3rem",
                      height: "8rem"
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.propertyDescription && formik.errors.propertyDescription && <ErrorText helperText={formik.errors.propertyDescription} />}
                </Stack>
                <Stack sx={{
                  alignItems: 'end'
                }}>
                  <Button type='submit' sx={{
                    bgcolor: '#faa61f',
                    maxWidth: "20%",
                    paddingBlock: '10px',
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: '5px 5px 10px gray',
                    '&:hover': { boxShadow: "2px 2px 5px gray" }
                  }}>Edit property</Button>
                </Stack>
              </Stack>
            </form>
          </Grid>

          <Grid size={{ xs: 12, md: 5, lg: 3 }} sx={{
            bgcolor: "white",
            padding: 2,
            borderRadius: "10px"
          }}>
            <FormControl >
              <Stack spacing={3}>
                <Stack id="images" sx={{
                  borderRadius: '10px',
                  color: '#faa61f',
                }}>
                  <Stack>
                    <FormLabel>
                      <ImageIcon fontSize="small" /> Property Images
                    </FormLabel>
                    <Stack sx={{ position: 'relative' }}>
                      <TextField
                        type="file"
                        sx={{
                          opacity: 0,
                          zIndex: 1,
                        }}
                        slotProps={{
                          select: { multiple: true },
                          htmlInput: { accept: 'image/*' }
                        }}
                        name='images'
                        value={undefined}
                        onChange={handleImageChanges}
                        onBlur={formik.handleBlur}
                      />
                      <Stack sx={{
                        position: 'absolute',
                        top: 0,
                        marginTop: 1,
                        gap: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: "100%"
                      }}
                        direction={'row'}
                      >
                        <Button sx={{
                          bgcolor: "rgb(247 216 177 / 72%)",
                          borderRadius: "10px",
                          padding: "5px 10px",
                          color: "rgb(255 138 0)",
                          fontWeight: 700,
                        }}>Choose Files</Button>
                        {formik.values.images?.length === 0 && <Typography variant='body1' component={"span"} sx={{
                        }}>No File chosen</Typography>}
                      </Stack>
                    </Stack>
                  </Stack>
                  {
                    formik.values?.images?.length > 0 && formik.values?.images?.map((image, index) => (
                      <Stack direction={'row'} sx={{ wordWrap: "break-word", wordBreak: "break-all", maxWidth: "100%" }}>
                        <Typography key={image} variant='body1' component={"span"} sx={{
                          maxWidth: "80%", overflow: 'clip'
                        }}>{image.slice(0, 20)}
                        </Typography>
                        <IconButton
                          disableFocusRipple
                          disableRipple
                          sx={{ color: '#faa61f', paddingTop: 0 }}
                          onClick={() => handleDeleteImage(index)}
                        >
                          <CloseOutlined />
                        </IconButton>
                      </Stack>
                    ))
                  }
                  {formik.touched.images && formik.errors.images && <ErrorText helperText={formik.errors.images} />}
                </Stack>

                <Stack id="videos" sx={{
                  borderRadius: '10px',
                  color: '#faa61f',
                }}>
                  <Stack>
                    <FormLabel>
                      <VideocamIcon fontSize="small" /> Property Videos (optional)
                    </FormLabel>
                    <Stack sx={{ position: 'relative' }}>
                      <TextField
                        type="file"
                        sx={{
                          opacity: 0,
                          zIndex: 1,
                        }}
                        slotProps={{
                          select: { multiple: true },
                          htmlInput: { accept: 'video/*' }
                        }}
                        name='videos'
                        value={undefined}
                        onChange={handleVideoChanges}
                        onBlur={formik.handleBlur}
                      />
                      <Stack sx={{
                        position: 'absolute',
                        top: 0,
                        marginTop: 1,
                        gap: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: "100%"
                      }}
                        direction={'row'}
                      >
                        <Button sx={{
                          bgcolor: "rgb(247 216 177 / 72%)",
                          borderRadius: "10px",
                          padding: "5px 10px",
                          color: "rgb(255 138 0)",
                          fontWeight: 700,
                        }}>Choose Files</Button>
                        {formik.values.videos?.length === 0 && <Typography variant='body1' component={"span"} sx={{
                        }}>No File chosen</Typography>}
                      </Stack>
                    </Stack>
                  </Stack>
                  {
                    formik.values?.videos?.length > 0 && formik.values.videos?.map((video, index) => (
                      <Stack direction={'row'}>
                        <Typography key={video[0].lastModified} variant='body1' component={"span"} sx={{
                          maxWidth: "80%", overflow: 'clip'
                        }}>{video[0].name}
                        </Typography>
                        <IconButton
                          disableFocusRipple
                          disableRipple
                          sx={{ color: '#faa61f', paddingTop: 0 }}
                          onClick={() => handleDeletevideo(index)}
                        >
                          <CloseOutlined />
                        </IconButton>
                      </Stack>
                    ))
                  }
                  {formik.touched.videos && formik.errors.videos && <ErrorText helperText={formik.errors.videos} />}
                </Stack>
              </Stack>
            </FormControl>
          </Grid>
        </Grid>
      }
    </LocalizationProvider>
  );
}
