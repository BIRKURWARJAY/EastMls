"use client";

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
} from "@mui/material";

import * as Yup from "yup";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SellIcon from "@mui/icons-material/Sell";
import PaymentsIcon from "@mui/icons-material/Payments";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import {
  AutoMode,
  BathtubSharp,
  CalendarMonth,
  CloseOutlined,
  Hotel,
  Image as ImageIcon,
  Videocam as VideocamIcon,
} from "@mui/icons-material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ErrorText from "../components/ErrorText";
import Link from "next/link";
import dayjs from "dayjs";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../utils/api";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import LoadingComponent from "./Loading";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import PropertyInterface from "../interfaces/property.interface";
import countryInterface from "../interfaces/country.interface";
import locationInterface from "../interfaces/location.interface";
import cityInterface from "../interfaces/city.interface";


export default function PropertyFormFields({
  useFor,
}: {
  useFor: string;
}): ReactNode {
  const leaseTypes: string[] = ["Sell", "Rent"];
  const statusArr: string[] = ["Available", "Pending", "Sold", "Rented"];
  const propertyTypes: string[] = [
    "Apartment",
    "House",
    "Condo",
    "Villa",
    "Commercial",
  ];

  const [images, setImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<globalThis.File[]>([]);
  const [newVideos, setNewVideos] = useState<globalThis.File[]>([]);
  const [videos, setVideos] = useState<string[] | undefined>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const router: AppRouterInstance = useRouter();

  const [data, setData] = useState<PropertyInterface<string[]>>();
  const params = useParams();

   const apiEndpoint = (data: any) => {
    return useFor === "Edit" ? api.put(`/property/${params.id}`, data) : api.post("/property", data);
  }

  const apiRef: React.RefObject<boolean>= useRef(false);

  const propertyFeatures: string[] = [
    "CCTV Surveillance",
    "Nearby Public Transport",
    "Rainwater Harvesting",
    "Gated Community",
    "Earthquake Resistant Structure",
    "Swimming Pool",
    "Rooftop Deck",
    "Video Door Phone",
    "Visitor Parking",
    "Fire Safety Systems",
    "Smart Home Features",
    "Covered Parking",
    "Waste Disposal System",
    "EV Charging Point",
    "Gym / Fitness Center",
    "Open Parking",
    "Chimney / Exhaust",
    "Flooring Type",
    "Children's Play Area",
    "Sports Facilities",
    "Modular Kitchen",
    "Clubhouse",
    "Geysers",
    "Solar Panels",
    "Air Conditioning",
    "Landscaped Garden",
    "Jogging Track",
    "Intercom",
    "Internet/Wi-Fi Ready",
    "Power Backup",
    "False Ceiling & Lighting",
    "24/7 Security",
    "Water Supply (24/7)",
    "Maintenance Staff",
  ];

  const currencyOptions: string[] = [
    "USD",
    "EURO",
    "POUND",
    "INR",
    "YEM",
    "ND",
    "KSh",
  ];

  const handleImageChanges = (event: ChangeEvent<HTMLInputElement>): void => {
    const files: globalThis.File[] = Array.from(event.target.files || []);
    const notValidFiles: globalThis.File[] = files?.filter((file) => file.size >= 5000000); //5MB
    if (notValidFiles.length > 0) {
      console.log("Some files were too large and were not added.");
      toast.error("Image size should be less than 5MB");
      return;
    }
    formik.setFieldValue("images", files);
    setNewImages(files);
  };

  const handleDeleteImage = (idx: number): void => {
    setImages((prev) => prev.filter((_, index) => index !== idx));
    const newImages: globalThis.File[] = formik.values.images.filter(
      (_: any, index: number) => index !== idx
    );
    formik.setFieldValue("images", newImages);
  };

  const handleDeletevideo = (idx: number): void => {
    setVideos((prev) => prev?.filter((_, index) => index !== idx));
    const newVideos: globalThis.File[] = formik.values.videos.filter(
      (_: any, index: number) => index !== idx
    );
    formik.setFieldValue("images", newVideos);
  };

  const handleVideoChanges = (event: ChangeEvent<HTMLInputElement>): void => {
    const files: globalThis.File[] = Array.from(event.target.files || []);

    const notAllowedVidoes: globalThis.File[] = files?.filter(file => file.size >= 50000000) //50Mb

    if (notAllowedVidoes.length > 0) {
      console.log("Videos Size must be less than 50MB");
      toast.error("Video Size must be less than 50MB")
      return;
    }
    formik.setFieldValue("videos", files);
    setNewVideos(files);
  };

  useEffect(() => {
    async function getData() {
      try {
        apiRef.current = true;
        const res = await api.get<{propertydetails: PropertyInterface<string[]>}>(
          `/property/${params.id}`
        );
        if (res.status === 200) {
          setData(res.data.propertydetails);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        apiRef.current = false;
        return router.replace("/agent/property");
      }
    }
    !apiRef.current && useFor == "Edit" && getData();
  }, []);

  const initialValues = data
    ? {
        ...data,
        ...data.country as countryInterface,
        ...data.location as locationInterface,
        ...data.city as cityInterface,
      }
    : {
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
        features: [],
      };

  const YupValidation = Yup.object().shape({
    leaseType: Yup.string()
      .oneOf(["sell", "rent"], 'leaseType must be one of "sell" or "rent"')
      .required("leaseType is required"),
    yearOfBuild: Yup.number()
      .min(
        dayjs().subtract(50, "year").year(),
        `yearOfBuild cannot be older than ${dayjs()
          .subtract(50, "year")
          .year()}`
      )
      .max(
        dayjs().add(5, "year").year(),
        `yearOfBuild cannot be more than ${dayjs().add(5, "year").year()}`
      )
      .required("yearOfBuild is required"),
    landArea: Yup.number().min(1).required("landArea is required"),
    price: Yup.number().min(1).required("price is required"),
    propertyType: Yup.string()
      .oneOf(
        ["apartment", "house", "condo", "villa", "commercial"],
        `propertyType must be in ${propertyTypes}`
      )
      .required("propertyType is required"),
    status: Yup.string()
      .oneOf(["available", "pending", "sold", "rented"])
      .required("status is required"),
    availableFrom: Yup.date()
      .min(
        dayjs(data?.availableFrom || dayjs()),
        `availableFrom must be atleast ${data?.availableFrom}`
      )
      .max(
        dayjs(data?.availableFrom).add(5, "year"),
        `availbleFrom date cannot be > than ${dayjs().format("DD/MM/YYYY")}`
      )
      .required("availbleFrom is required"),
    bedrooms: Yup.number()
      .min(1, "bedrooms must be atleast 1")
      .required("bedrooms is required"),
    bathrooms: Yup.number()
      .min(1, "bathrooms must be atleast 1")
      .required("bathrooms is required"),
    areaSqFt: Yup.number().min(1).required("area is required"),
    propertyDescription: Yup.string()
      .trim()
      .required("description is required"),
    images: Yup.array().min(1).required("images is required"),
    address: Yup.string().trim().required("address is required"),
    cityCode: Yup.number().required("cityCode is required"),
    cityName: Yup.string().trim().required("cityName is required"),
    state: Yup.string().trim().required("state is required"),
    countryCode: Yup.number().required("countryCode is required"),
    countryName: Yup.string().trim().required("countryName is required"),
    postalCode: Yup.string().trim().required("postalCode is required"),
    title: Yup.string().trim().required("title is required"),
    currency: Yup.string().required("currency is required"),
    features: Yup.array()
      .min(1, "At least one feature must be selected")
      .required("features is required"),
  });

  const formik: any = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: YupValidation,
    onSubmit: async (values) => {
      console.log("Submitting form with values:", values);
      try {
        setUploading(true);
        const formData = new FormData();

        formData.append("coordinates[]", "12.9715987");
        formData.append("coordinates[]", "77.594566");

        Object.entries(values)?.forEach(([key, value]: [string, any]) => {
          if (!["images", "videos", "features"].includes(key)) {
            formData.append(key, value);
          }
        });

        formik.values.features.forEach((feature: string) => {
          formData.append("features[]", feature);
        });

        newImages?.forEach((image: any) => {
          formData.append("images[]", image);
        });

        newVideos?.forEach((video: any) => {
          formData.append("videos[]", video);
        });

        const res: Axios.AxiosXHR<any> = await apiEndpoint(formData);
        if (res?.status === 201) {
          console.log(res.data.message);
          toast.success("Property Edited");
          router.push("/agent/property");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setUploading(false);
        toast.error("Editing Property Error ");
      }
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Grid
          container
          spacing={4}
          sx={{
            bgcolor: "#abb0b445",
            padding: 2,
            justifyContent: "space-between",
          }}
        >
          <Grid
            size={{ xs: 12, md: 7, lg: 9 }}
            sx={{
              bgcolor: "#fff",
              padding: 4,
              borderRadius: "10px",
              gap: 3,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Link href={"/agent/property"}>
                <IconButton sx={{ paddingLeft: 0 }}>
                  <KeyboardBackspaceIcon />
                </IconButton>
              </Link>
              <Typography variant="h5">{useFor} Property Listing</Typography>
            </Stack>

            <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                {/* Property Title */}
                <Stack spacing={0.3}>
                  <FormLabel>Property Title</FormLabel>
                  <TextField
                    placeholder="e.g., Beautiful 3-Bedroom Apartment in City Center"
                    name="title"
                    value={formik.values?.title || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.title &&
                      formik.errors.title && (
                        <ErrorText helperText={formik.errors.title} />
                      )
                    }
                    error={formik.touched.title && formik.errors.title}
                  />
                </Stack>

                {/* Location Details */}
                <Stack spacing={2}>
                  <Typography variant="h6">Location Details</Typography>

                  <Stack spacing={0.3}>
                    <FormLabel>Address</FormLabel>
                    <TextareaAutosize
                      placeholder="Enter the complete property address"
                      name="address"
                      value={formik.values?.address || ""}
                      style={{
                        resize: "vertical",
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        borderRadius: "4px",
                        borderColor: "gray",
                        border: "1px solid",
                        minHeight: "3rem",
                        maxHeight: "5rem",
                        height: "4rem",
                      }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <ErrorText helperText={formik.errors.address} />
                    )}
                  </Stack>

                  <Stack direction="row" spacing={3}>
                    <Stack flex={1} spacing={0.3}>
                      <FormLabel>City Code</FormLabel>
                      <TextField
                        type="number"
                        placeholder="e.g., 382382"
                        name="cityCode"
                        value={formik.values?.cityCode || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.touched.cityCode &&
                          formik.errors.cityCode && (
                            <ErrorText helperText={formik.errors.cityCode} />
                          )
                        }
                        error={
                          formik.touched.cityCode && formik.errors.cityCode
                        }
                      />
                    </Stack>

                    <Stack flex={1} spacing={0.3}>
                      <FormLabel>City Name</FormLabel>
                      <TextField
                        placeholder="e.g., Ahmedabad"
                        name="cityName"
                        value={formik.values?.cityName || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.touched.cityName &&
                          formik.errors.cityName && (
                            <ErrorText helperText={formik.errors.cityName} />
                          )
                        }
                        error={
                          formik.touched.cityName && formik.errors.cityName
                        }
                      />
                    </Stack>

                    <Stack flex={1} spacing={0.3}>
                      <FormLabel>State</FormLabel>
                      <TextField
                        placeholder="e.g., Gujarat"
                        name="state"
                        value={formik.values?.state || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.touched.state &&
                          formik.errors.state && (
                            <ErrorText helperText={formik.errors.state} />
                          )
                        }
                        error={formik.touched.state && formik.errors.state}
                      />
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={3}>
                    <Stack flex={1} spacing={0.3}>
                      <FormLabel>Country Code</FormLabel>
                      <TextField
                        type="number"
                        placeholder="e.g., 98"
                        name="countryCode"
                        value={formik.values?.countryCode || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.touched.countryCode &&
                          formik.errors.countryCode && (
                            <ErrorText helperText={formik.errors.countryCode} />
                          )
                        }
                        error={
                          formik.touched.countryCode &&
                          formik.errors.countryCode
                        }
                      />
                    </Stack>

                    <Stack flex={1} spacing={0.3}>
                      <FormLabel>Country Name</FormLabel>
                      <TextField
                        placeholder="e.g., India"
                        name="countryName"
                        value={formik.values?.countryName || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.touched.countryName &&
                          formik.errors.countryName && (
                            <ErrorText helperText={formik.errors.countryName} />
                          )
                        }
                        error={
                          formik.touched.countryName &&
                          formik.errors.countryName
                        }
                      />
                    </Stack>

                    <Stack flex={1} spacing={0.3}>
                      <FormLabel>Postal Code</FormLabel>
                      <TextField
                        placeholder="e.g., 380001"
                        name="postalCode"
                        value={formik.values?.postalCode || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                          formik.touched.postalCode &&
                          formik.errors.postalCode && (
                            <ErrorText helperText={formik.errors.postalCode} />
                          )
                        }
                        error={
                          formik.touched.postalCode && formik.errors.postalCode
                        }
                      />
                    </Stack>
                  </Stack>
                </Stack>

                {/* Property Features */}
                <Stack spacing={0.3}>
                  <FormLabel>Property Features</FormLabel>
                  <FormControl
                    error={formik.touched.features && formik.errors.features}
                  >
                    <Select
                      multiple
                      name="features"
                      value={formik.values?.features || []}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return (
                            <span style={{ color: "gray" }}>
                              Select Features
                            </span>
                          );
                        }
                        return (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value: string) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        );
                      }}
                      displayEmpty
                    >
                      {propertyFeatures.map((feature) => (
                        <MenuItem key={feature} value={feature}>
                          {feature}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.features && formik.errors.features && (
                      <ErrorText helperText={formik.errors.features} />
                    )}
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>Lease Type</FormLabel>
                    <Select
                      name="leaseType"
                      value={formik.values.leaseType || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.leaseType && formik.errors.leaseType
                      }
                    >
                      <MenuItem disabled value=" ">
                        <em style={{ color: "gray" }}>Select Lease Type</em>
                      </MenuItem>
                      {leaseTypes.map((type) => (
                        <MenuItem key={type} value={type.toLowerCase()}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.leaseType && formik.errors.leaseType && (
                      <ErrorText helperText={formik.errors.leaseType} />
                    )}
                  </Stack>

                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>Year Built</FormLabel>
                    <TextField
                      type="number"
                      name="yearOfBuild"
                      placeholder="e.g., 2020"
                      value={formik.values?.yearOfBuild || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.yearOfBuild &&
                        formik.errors.yearOfBuild && (
                          <ErrorText helperText={formik.errors.yearOfBuild} />
                        )
                      }
                      error={
                        formik.touched.yearOfBuild && formik.errors.yearOfBuild
                      }
                      inputProps={{
                        min: dayjs().subtract(50, "year").year(),
                        max: dayjs().add(5, "year").year(),
                      }}
                    />
                  </Stack>
                </Stack>

                <Stack sx={{ width: "calc(50% - 15px)" }} spacing={0.3}>
                  <FormLabel>Land Area (Sq. Ft)</FormLabel>
                  <TextField
                    placeholder="e.g., 1200"
                    type="number"
                    name="landArea"
                    value={formik.values?.landArea || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.landArea &&
                      formik.errors.landArea && (
                        <ErrorText helperText={formik.errors.landArea} />
                      )
                    }
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
                      name="price"
                      type="number"
                      value={formik.values?.price || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.price &&
                        formik.errors.price && (
                          <ErrorText helperText={formik.errors.price} />
                        )
                      }
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
                      <MenuItem value={" "}>
                        <em style={{ color: "gray" }}>Select Currency</em>
                      </MenuItem>

                      {currencyOptions?.length > 0 ? (
                        currencyOptions.map((currency) => (
                          <MenuItem key={currency} value={currency}>
                            {currency}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>
                          Loading currencies...
                        </MenuItem>
                      )}
                    </Select>
                    {formik.touched.currency && formik.errors.currency && (
                      <ErrorText helperText={formik.errors.currency} />
                    )}
                  </Stack>

                  <Stack
                    spacing={0.3}
                    flex={1}
                    sx={{
                      justifyContent: "end",
                    }}
                  >
                    <FormLabel>
                      <SellIcon fontSize="small" /> Is Price Negotiable?
                    </FormLabel>
                    <Switch
                      color="info"
                      name="isPriceNegotiable"
                      value={formik.values?.isPriceNegotiable || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>
                      <MeetingRoomIcon fontSize="small" /> Property Type
                    </FormLabel>
                    <Select
                      value={formik.values?.propertyType || ""}
                      name="propertyType"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.propertyType &&
                        formik.errors.propertyType
                      }
                    >
                      <MenuItem value=" " disabled>
                        <em style={{ color: "gray" }}>Select Property Type</em>
                      </MenuItem>
                      {propertyTypes.map((type) => (
                        <MenuItem key={type} value={type.toLowerCase()}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.propertyType &&
                      formik.errors.propertyType && (
                        <ErrorText helperText={formik.errors.propertyType} />
                      )}
                  </Stack>

                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>
                      <AutoMode fontSize="small" /> Status
                    </FormLabel>
                    <Select
                      value={formik.values?.status || ""}
                      name="status"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.status && formik.errors.status}
                    >
                      <MenuItem value=" " disabled>
                        <em style={{ color: "gray" }}>Select Status</em>
                      </MenuItem>
                      {statusArr.map((type) => (
                        <MenuItem key={type} value={type.toLowerCase()}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.status && formik.errors.status && (
                      <ErrorText helperText={formik.errors.status} />
                    )}
                  </Stack>

                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>
                      <CalendarMonth fontSize="small" /> Available From
                    </FormLabel>
                    <DatePicker
                      name="availableFrom"
                      minDate={dayjs()}
                      value={dayjs(formik.values?.availableFrom || "")}
                      maxDate={dayjs().add(5, "year")}
                      onChange={(date) =>
                        formik.setFieldValue("availableFrom", date)
                      }
                      slotProps={{
                        textField: {
                          error:
                            formik.touched.availableFrom &&
                            formik.errors.availableFrom,
                          onBlur: formik.handleBlur,
                          helperText: (
                            <ErrorText
                              helperText={formik.errors.availableFrom}
                            />
                          ),
                        },
                      }}
                      // component={(props) => <TextField {...props} />}
                    />
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>
                      <Hotel fontSize="small" /> Bedrooms
                    </FormLabel>
                    <TextField
                      type="number"
                      placeholder="e.g., 3"
                      value={formik.values?.bedrooms || ""}
                      name="bedrooms"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.bedrooms &&
                        formik.errors.bedrooms && (
                          <ErrorText helperText={formik.errors.bedrooms} />
                        )
                      }
                      error={formik.touched.bedrooms && formik.errors.bedrooms}
                    />
                  </Stack>

                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>
                      <BathtubSharp fontSize="small" /> Bathrooms
                    </FormLabel>
                    <TextField
                      type="number"
                      placeholder="e.g., 2"
                      name="bathrooms"
                      value={formik.values?.bathrooms || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.bathrooms &&
                        formik.errors.bathrooms && (
                          <ErrorText helperText={formik.errors.bathrooms} />
                        )
                      }
                      error={
                        formik.touched.bathrooms && formik.errors.bathrooms
                      }
                    />
                  </Stack>

                  <Stack flex={1} spacing={0.3}>
                    <FormLabel>
                      <MeetingRoomIcon fontSize="small" /> Area (Sq. Ft)
                    </FormLabel>
                    <TextField
                      type="number"
                      placeholder="e.g., 1800"
                      name="areaSqFt"
                      value={formik.values?.areaSqFt || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.areaSqFt &&
                        formik.errors.areaSqFt && (
                          <ErrorText helperText={formik.errors.areaSqFt} />
                        )
                      }
                      error={formik.touched.areaSqFt && formik.errors.areaSqFt}
                    />
                  </Stack>
                </Stack>

                <Stack spacing={0.3}>
                  <FormLabel>Property Description</FormLabel>
                  <TextareaAutosize
                    placeholder="Describe the property features, neighborhood, amenities, etc."
                    name="propertyDescription"
                    value={formik.values?.propertyDescription || ""}
                    style={{
                      resize: "vertical",
                      width: "100%",
                      padding: "10px",
                      fontSize: "16px",
                      borderRadius: "4px",
                      borderColor: "gray",
                      border: "1px solid",
                      maxHeight: "12rem",
                      minHeight: "3rem",
                      height: "8rem",
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.propertyDescription &&
                    formik.errors.propertyDescription && (
                      <ErrorText
                        helperText={formik.errors.propertyDescription}
                      />
                    )}
                </Stack>
                <Stack
                  sx={{
                    alignItems: "end",
                  }}
                >
                  <Button
                    type="submit"
                    sx={{
                      bgcolor: "#faa61f",
                      maxWidth: "20%",
                      paddingBlock: "10px",
                      color: "white",
                      fontWeight: 600,
                      boxShadow: "5px 5px 10px gray",
                      "&:hover": { boxShadow: "2px 2px 5px gray" },
                    }}
                    disabled={uploading}
                  >
                    {useFor} property
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Grid>

          <Grid
            size={{ xs: 12, md: 5, lg: 3 }}
            sx={{
              bgcolor: "white",
              padding: 2,
              borderRadius: "10px",
            }}
          >
            <FormControl>
              <Stack spacing={3}>
                <Stack
                  id="images"
                  sx={{
                    borderRadius: "10px",
                    color: "#faa61f",
                  }}
                >
                  <Stack>
                    <FormLabel>
                      <ImageIcon fontSize="small" /> Property Images
                    </FormLabel>
                    <Stack sx={{ position: "relative" }}>
                      <TextField
                        type="file"
                        sx={{
                          opacity: 0,
                          zIndex: 1,
                        }}
                        slotProps={{
                          select: { multiple: true },
                          htmlInput: { accept: "image/*" },
                        }}
                        name="images"
                        value={undefined}
                        onChange={handleImageChanges}
                        onBlur={formik.handleBlur}
                      />
                      <Stack
                        sx={{
                          position: "absolute",
                          top: 0,
                          marginTop: 1,
                          gap: 1,
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                        direction={"row"}
                      >
                        <Button
                          sx={{
                            bgcolor: "rgb(247 216 177 / 72%)",
                            borderRadius: "10px",
                            padding: "5px 10px",
                            color: "rgb(255 138 0)",
                            fontWeight: 700,
                          }}
                        >
                          Choose Files
                        </Button>
                        {formik.values.images?.length === 0 && (
                          <Typography
                            variant="body1"
                            component={"span"}
                            sx={{}}
                          >
                            No File chosen
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                  {formik.values?.images?.length > 0 &&
                    formik.values?.images?.map((image: any, index: number) => (
                      <Stack
                        key={index}
                        direction={"row"}
                        sx={{
                          wordWrap: "break-word",
                          wordBreak: "break-all",
                          maxWidth: "100%",
                        }}
                      >
                        <Typography
                          variant="body1"
                          component={"span"}
                          sx={{
                            maxWidth: "80%",
                            overflow: "clip",
                          }}
                        >
                          {image?.name?.slice(0, 40) || image.slice(0, 30)}
                        </Typography>
                        <IconButton
                          disableFocusRipple
                          disableRipple
                          sx={{ color: "#faa61f", paddingTop: 0 }}
                          onClick={() => handleDeleteImage(index)}
                        >
                          <CloseOutlined />
                        </IconButton>
                      </Stack>
                    ))}
                  {formik.touched.images && formik.errors.images && (
                    <ErrorText helperText={formik.errors.images} />
                  )}
                </Stack>

                <Stack
                  id="videos"
                  sx={{
                    borderRadius: "10px",
                    color: "#faa61f",
                  }}
                >
                  <Stack>
                    <FormLabel>
                      <VideocamIcon fontSize="small" /> Property Videos
                      (optional)
                    </FormLabel>
                    <Stack sx={{ position: "relative" }}>
                      <TextField
                        type="file"
                        sx={{
                          opacity: 0,
                          zIndex: 1,
                        }}
                        slotProps={{
                          select: { multiple: true },
                          htmlInput: { accept: "video/*" },
                        }}
                        name="videos"
                        value={undefined}
                        onChange={handleVideoChanges}
                        onBlur={formik.handleBlur}
                      />
                      <Stack
                        sx={{
                          position: "absolute",
                          top: 0,
                          marginTop: 1,
                          gap: 1,
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                        direction={"row"}
                      >
                        <Button
                          sx={{
                            bgcolor: "rgb(247 216 177 / 72%)",
                            borderRadius: "10px",
                            padding: "5px 10px",
                            color: "rgb(255 138 0)",
                            fontWeight: 700,
                          }}
                        >
                          Choose Files
                        </Button>
                        {formik.values.videos?.length === 0 && (
                          <Typography
                            variant="body1"
                            component={"span"}
                            sx={{}}
                          >
                            No File chosen
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                  {formik.values?.videos?.length > 0 &&
                    formik.values.videos?.map((video: any, index: number) => (
                      <Stack direction={"row"} key={index}>
                        <Typography
                          variant="body1"
                          component={"span"}
                          sx={{
                            maxWidth: "80%",
                            overflow: "clip",
                          }}
                        >
                          {video[0].name}
                        </Typography>
                        <IconButton
                          disableFocusRipple
                          disableRipple
                          sx={{ color: "#faa61f", paddingTop: 0 }}
                          onClick={() => handleDeletevideo(index)}
                        >
                          <CloseOutlined />
                        </IconButton>
                      </Stack>
                    ))}
                  {formik.touched.videos && formik.errors.videos && (
                    <ErrorText helperText={formik.errors.videos} />
                  )}
                </Stack>
              </Stack>
            </FormControl>
          </Grid>
        </Grid>
      )}
    </LocalizationProvider>
  );
}
