'use client';

import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
  Hotel,
  Image as ImageIcon,
  Videocam as VideocamIcon,
} from '@mui/icons-material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function CreateAgentProperty() {
  const leaseTypes = ['Sell', 'Rent'];
  const propertyTypes = ['Apartment', 'House', 'Condo', 'Villa', 'Commercial'];
  const statusArr = ['Available', 'Pending', 'Sold', 'Rented'];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={4} sx={{
        padding: 4,
        bgcolor: "#abb0b445",
        justifyContent: 'space-between'
      }}>
        <Grid size={{ xs: 12, md: 8 }} sx={{
          bgcolor: "#fff",
          padding: 4,
          borderRadius: "10px"
        }}>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton sx={{ paddingLeft: 0 }}>
                <KeyboardBackspaceIcon />
              </IconButton>
              <Typography variant="h5">Create Property Listing</Typography>
            </Stack>

            <form >
              <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={.3}>
                    <FormLabel>Lease Type</FormLabel>
                    <Select defaultValue={" "}>
                      <MenuItem disabled value=" ">
                        <em>Select Lease Type</em>
                      </MenuItem>
                      {leaseTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>

                  <Stack flex={1} spacing={.3}>
                    <FormLabel>Year Built</FormLabel>
                    <DatePicker
                      views={['year']}
                      minDate={dayjs().subtract(50, 'year')}
                      maxDate={dayjs().add(5, 'year')}
                      defaultValue={dayjs()}
                    />
                  </Stack>
                </Stack>

                <Stack sx={{ width: "calc(50% - 15px)" }} spacing={.3}>
                  <FormLabel>Land Area (Sq. Ft)</FormLabel>
                  <TextField placeholder="e.g., 1200" type="number" />
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <PaymentsIcon fontSize="small" /> Price (KES)
                    </FormLabel>
                    <TextField placeholder="e.g., 15000000" />
                  </Stack>

                  <Stack spacing={.3} flex={1} sx={{
                    justifyContent: "end"
                  }}>
                    <FormLabel>
                      <SellIcon fontSize="small" /> Is Price Negotiable?
                    </FormLabel>
                    <Switch color='green' />
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <MeetingRoomIcon fontSize="small" /> Property Type
                    </FormLabel>
                    <Select defaultValue={" "}>
                      <MenuItem value=" " disabled>
                        Select Property Type
                      </MenuItem>
                      {propertyTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>

                  <Stack flex={1} spacing={.3}>
                   <FormLabel>
                      <AutoMode fontSize="small" /> Status
                    </FormLabel>
                    <Select defaultValue={" "}>
                      <MenuItem value=" " disabled>
                        Select Status
                      </MenuItem>
                      {statusArr.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>

                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <CalendarMonth fontSize="small" /> Available From
                    </FormLabel>
                    <DatePicker
                      defaultValue={dayjs()}
                      minDate={dayjs()}
                      maxDate={dayjs().add(10, 'year')}
                    />
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={3}>
                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <Hotel fontSize="small" /> Bedrooms
                    </FormLabel>
                    <TextField type="number" placeholder="e.g., 3" />
                  </Stack>

                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <BathtubSharp fontSize="small" /> Bathrooms
                    </FormLabel>
                    <TextField type="number" placeholder="e.g., 2" />
                  </Stack>

                  <Stack flex={1} spacing={.3}>
                    <FormLabel>
                      <MeetingRoomIcon fontSize="small" /> Area (Sq. Ft)
                    </FormLabel>
                    <TextField type="number" placeholder="e.g., 1800" />
                  </Stack>
                </Stack>

                <Stack spacing={.3}>
                  <FormLabel>Property Description</FormLabel>
                  <TextareaAutosize
                    placeholder="Describe the property features, neighborhood, amenities, etc."
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
                  />
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }} sx={{
          bgcolor: "white",
          padding: 4,
          borderRadius: "10px"
        }}>
          <FormControl >
            <Stack spacing={3}>
              <Stack spacing={.3} sx={{
                borderRadius: '10px',
                color: '#faa61f',
                position: "relative"
              }}>
                <FormLabel>
                  <ImageIcon fontSize="small" /> Property Images
                </FormLabel>
                <Stack sx={{
                  opacity: 0,
                  zIndex: 5,
                }}>
                  <TextField
                    type="file"
                    inputProps={{ multiple: true, accept: 'image/*' }}
                  />
                </Stack>

                <Stack>
                  <Button sx={{
                    bgcolor: "rgb(255 247 237)",
                    borderRadius: "10px",
                    padding: "5px 10px",
                    color: "rgb(255 138 0)",
                    fontWeight: 700,
                    maxWidth: "50%",
                    position: "absolute",
                    top: "40%"
                  }}>Choose Files</Button>
                  <Button sx={{
                    position: "absolute",
                    top: "40%",
                    right: "10%",
                    color: "rgb(255 138 0)",
                  }}>No File Chosen</Button>
                </Stack>
              </Stack>

              <Stack spacing={.3} sx={{
                borderRadius: '10px',
                color: '#faa61f',
                position: "relative"
              }}>
                <FormLabel>
                  <ImageIcon fontSize="small" /> Property Videos (Optional)
                </FormLabel>
                <Stack sx={{
                  opacity: 0,
                  zIndex: 5,
                }}>
                  <TextField
                    type="file"
                    inputProps={{ multiple: true, accept: 'image/*' }}
                  />
                </Stack>

                <Stack>
                  <Button sx={{
                    bgcolor: "rgb(255 247 237)",
                    borderRadius: "10px",
                    padding: "5px 10px",
                    color: "rgb(255 138 0)",
                    maxWidth: "50%",
                    position: "absolute",
                    top: "40%",
                    fontWeight: 700
                  }}>Choose Files</Button>
                  <Button sx={{
                    position: "absolute",
                    top: "40%",
                    right: "10%",
                    color: "rgb(255 138 0)",
                  }}>No File Chosen</Button>
                </Stack>
              </Stack>
            </Stack>
          </FormControl>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
