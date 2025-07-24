import { Box, Button, FormControl, IconButton, InputAdornment, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import PreviewIcon from '@mui/icons-material/Preview';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';



export default function AgentProperties() {
  
  const tableHeaderCells = ["PROPERTY", "PRICE", "DETAILS", "INQUIRIES", "VERIFICATION", "ACTION"];

  return (
    <Box sx={{width: "100%", paddingInline: 2, bgcolor: "rgb(249 250 251)"}}>
      <Stack direction={"row"}>
        <FormControl>
          <TextField
            InputProps={{
              startAdornment: <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            }}
            placeholder="Search properties..."
          />

          <IconButton type="button" onClick={handleFilter}>
            <FilterAltIcon />
          </IconButton>
        </FormControl>

        <Button
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#faa61f",
            fontSize: 20,
            color: "white",
            fontWeight: 700,
            padding: "15px 25px",
          }}
        >
          Add Property
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {
                tableHeaderCells.map(cell => (
                  <TableCell>{ cell }</TableCell>
                ))
              }
            </TableRow>
          </TableHead>

          <TableBody>
            {properties.map(property => (
              <TableRow>
                <TableCell>{ property.name }</TableCell>
                <TableCell>{ property.price }</TableCell>
                <TableCell>{ property.details }</TableCell>
                <TableCell>View</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ bgcolor: property.verification === "verified" ? "green" : "red", padding: "4px 8px", borderRadius: "8px" }}>{ property.verification }</Typography>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <PreviewIcon />
                  </IconButton>

                  <IconButton>
                    <EditNoteIcon />
                  </IconButton>

                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}