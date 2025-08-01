import { Typography } from "@mui/material";


export default function ErrorText({variant = "body1", comp = "span", helperText}) {
  

  return (
    <Typography variant={variant} component={comp} sx={{marginLeft: .5, wordBreak: "break-all", color: "red", fontSize: 14}}>{helperText}</Typography>
  )
}