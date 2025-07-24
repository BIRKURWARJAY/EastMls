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
    height: "calc(100vh - 6rem)",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: 'url("/eastmls/homebanner.webp")',
  }}
>
  <Stack sx={{alignItems: "center", gap: 2, textAlign: "center", paddingInline: 2}}>
    <Typography variant="h1" sx={{fontSize: 60, fontWeight: 800, maxWidth: "80%"}}>WE'LL HELP YOU FIND A PLACE YOU'LL LOVE</Typography>
    <p className="text-2xl max-w-3xl">Find a variety of properties that suit you very easily. Forget all difficulties in finding a residence for you.</p>
    <SearchProperty />
  </Stack>
</Stack>

  );
}
