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
import { useRouter } from 'next/navigation';
import LoadingComponent from '@/components/loading';

export default function CreateAgentProperty() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const leaseTypes = ['Sell', 'Rent'];
  const propertyTypes = ['Apartment', 'House', 'Condo', 'Villa', 'Commercial'];
  const statusArr = ['Available', 'Pending', 'Sold', 'Rented'];
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const tokenRes = decodeToken("agent", router);
    tokenRes && setLoading(false);
}, [])

  useEffect(() => {
    formik.setFieldValue('images', images);
  }, [images])

  useEffect(() => {
    formik.setFieldValue('videos', videos);
  }, [videos])

  const YupValidation = Yup.object().shape({
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

  const formik = useFormik({
    initialValues: {
      leaseType: " ",
      yearBuilt: dayjs(),
      landArea: "",
      price: "",
      isPriceNegotiable: false,
      propertyType: " ",
      status: " ",
      availableFrom: dayjs(),
      bedrooms: "",
      bathrooms: "",
      area: "",
      desc: "",
      images: [],
      videos: []
    },
    validationSchema: YupValidation,
    onSubmit: (values) => {

    }
  })

  const handleImageChanges = (event) => {
    const files = event.target.files;
    console.log(files)
    setImages((prev) => [files, ...prev]);
  };

  const handleDeleteImage = (idx) => {
    setImages(prev => prev.filter((_, index) => index !== idx));
  }

  const handleDeletevideo = (idx) => {
    setVideos(prev => prev.filter((_, index) => index !== idx));
  }

  const handleVideoChanges = (event) => {
    const files = Array.from(event.target.files || []);
    formik.setFieldValue('videos', files);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {
        isLoading ? <LoadingComponent /> : <Grid container spacing={4} sx={{
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
              <IconButton sx={{ paddingLeft: 0 }}>
                <KeyboardBackspaceIcon />
              </IconButton>
              <Typography variant="h5">Create Property Listing</Typography>
            </Stack>

            <form encType='multipart/form-data'>
              <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={.3}>
                    <FormLabel>Lease Type</FormLabel>
                    <Select
                      name='leaseType'
                      value={formik.values?.leaseType || " "}
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

                  <Stack flex={1} spacing={.3}>
                    <FormLabel>Year Built</FormLabel>
                    <DatePicker
                      name='yearBuilt'
                      views={['year']}
                      minDate={dayjs().subtract(50, 'year')}
                      maxDate={dayjs().add(5, 'year')}
                      value={formik.values?.yearBuilt}
                      onChange={(date) => formik.setFieldValue('yearBuilt', date)}
                      slotProps={{
                        textField: {
                          error: formik.touched.yearBuilt && formik.errors.yearBuilt,
                          onBlur: formik.handleBlur,
                          helperText: <ErrorText helperText={formik.errors.yearBuilt} />
                        }
                      }}
                      component={props => <TextField {...props} />}
                    />
                  </Stack>
                </Stack>

                <Stack sx={{ width: "calc(50% - 15px)" }} spacing={.3}>
                  <FormLabel>Land Area (Sq. Ft)</FormLabel>
                  <TextField
                    placeholder="e.g., 1200"
                    type="number"
                    name='landArea'
                    value={formik.values?.landArea}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.landArea && formik.errors.landArea && <ErrorText helperText={formik.errors.landArea} />}
                    error={formik.touched.landArea && formik.errors.landArea}
                  />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <PaymentsIcon fontSize="small" /> Price (KES)
                    </FormLabel>
                    <TextField
                      placeholder="e.g., 15000000"
                      name='price'
                      value={formik.values?.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.price && formik.errors.price && <ErrorText helperText={formik.errors.price} />}
                      error={formik.touched.price && formik.errors.price}
                    />
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
                      value={formik.values?.isPriceNegotiable}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={3} >
                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <MeetingRoomIcon fontSize="small" /> Property Type
                    </FormLabel>
                    <Select
                      value={formik.values?.propertyType || " "}
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
                      value={formik.values?.status || " "}
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
                      name='availableFrom'
                      value={formik.values?.availableFrom}
                      minDate={dayjs()}
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
                      value={formik.values?.bedrooms}
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
                      value={formik.values?.bathrooms}
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
                      name='area'
                      value={formik.values?.area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.area && formik.errors.area && <ErrorText helperText={formik.errors.area} />}
                      error={formik.touched.area && formik.errors.area}
                    />
                  </Stack>
                </Stack>

                <Stack spacing={.3}>
                  <FormLabel>Property Description</FormLabel>
                  <TextareaAutosize
                    placeholder="Describe the property features, neighborhood, amenities, etc."
                    name='desc'
                    value={formik.values?.desc}
                    style={{
                      resize: 'vertical',
                      width: '100%',
                      padding: '10px',
                      fontSize: '16px',
                      borderRadius: '4px',
                      borderColor: 'gray',
                      border: "1px solid",
                      minHeight: "8rem",
                      height: "8rem"
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.desc && formik.errors.desc && <ErrorText helperText={formik.errors.desc} />}
                </Stack>
                <Stack sx={{
                  alignItems: 'end'
                }}>
                  <Button sx={{
                    bgcolor: '#faa61f',
                    maxWidth: "20%",
                    paddingBlock: '10px',
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: '5px 5px 10px gray',
                    '&:hover': { boxShadow: "2px 2px 5px gray" }
                  }}>Create property</Button>
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
                        {formik.values.images.length === 0 && <Typography variant='body1' component={"span"} sx={{
                        }}>No File chosen</Typography>}
                      </Stack>
                    </Stack>
                  </Stack>
                  {
                    formik.values?.images.length > 0 && formik.values.images.map((image, index) => (
                      <Stack direction={'row'}>
                        <Typography key={image[0].lastModified} variant='body1' component={"span"} sx={{
                          maxWidth: "80%", overflow: 'clip'
                        }}>{image[0].name}
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
                        {formik.values.videos.length === 0 && <Typography variant='body1' component={"span"} sx={{
                        }}>No File chosen</Typography>}
                      </Stack>
                    </Stack>
                  </Stack>
                  {
                    formik.values?.videos.length > 0 && formik.values.videos.map((video, index) => (
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
