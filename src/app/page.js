import SearchProperty from "../components/SearchProperty";
import { Stack, Typography } from "@mui/material";


export default function Home() {
  return (
    <Stack
      direction={"row"}
      sx={{
        color: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "88vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'url("/eastmls/homebanner.webp")',
      }}
    >
      <Stack sx={{ alignItems: "center", gap: 2, textAlign: "center", paddingInline: 2 }}>
        <Typography variant="h1" fontSize={{ xs: '25px', md: '50px' }} sx={{ fontWeight: 800, maxWidth: "80%" }} >WE'LL HELP YOU FIND A PLACE YOU'LL LOVE</Typography>
        <Typography fontSize={{ xs: '15px', md: '20px' }}  className="text-2xl max-w-3xl">Find a variety of properties that suit you very easily. Forget all difficulties in finding a residence for you.</Typography>
        <SearchProperty />
      </Stack>
    </Stack>

  );
}
