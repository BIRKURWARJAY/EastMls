import { Typography , TypographyProps } from "@mui/material";

type ErrorTextProps = {
    variant?: TypographyProps["variant"];
    comp?: TypographyProps["component"];
    helperText:any
}

export default function ErrorText({variant = "body1", comp = "span", helperText}:ErrorTextProps) {
  

  return (
    <Typography variant={variant} component={comp} sx={{marginLeft: .5, wordBreak: "break-all", color: "red", fontSize: 14}}>{helperText}</Typography>
  )
}