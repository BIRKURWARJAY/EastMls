"use client";

import React, { ChangeEvent, MouseEvent, ReactNode } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { api } from "../utils/api";

type UpdateAgentProps = {
  agent: {
    username: string;
    email: string;
    contact?: number | string;
    licenseNumber: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  setAgent: (prop: any) => void;
};

function UpdateAgent({ agent, setAgent }: UpdateAgentProps): ReactNode {
  const handlesubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response: Axios.AxiosXHR<any> = await api.put("/agent", agent);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAgent((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form>
      <Grid container spacing={2} maxWidth={"60rem"} p={4}>
        <Grid size={{ xs: 12, sm: 12 }}>
          <Typography variant="h3">Your information</Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            variant="outlined"
            name="username"
            size="small"
            placeholder="Name"
            onChange={handleChange}
            value={agent?.username || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            fullWidth
            variant="outlined"
            name="email"
            size="small"
            placeholder="Email"
            onChange={handleChange}
            value={agent?.email || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            name="contact"
            size="small"
            placeholder="contact number"
            onChange={handleChange}
            value={agent?.contact || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            name="licenseNumber"
            size="small"
            placeholder="Licence number"
            onChange={handleChange}
            value={agent?.licenseNumber || ""}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12 }}>
          <Typography>Social media</Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            name="instagram"
            size="small"
            placeholder="Instagram"
            onChange={handleChange}
            value={agent?.instagram || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            name="facebook"
            size="small"
            placeholder="Facebook"
            onChange={handleChange}
            value={agent?.facebook || ""}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} alignSelf={"start"}>
          <TextField
            fullWidth
            variant="outlined"
            name="linkedin"
            size="small"
            placeholder="Linkedin"
            onChange={handleChange}
            value={agent?.linkedin || ""}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12 }} alignSelf={"start"}>
          <Button
            type="submit"
            fullWidth
            onClick={(e) => handlesubmit(e)}
            variant="contained"
            sx={{ fontSize: "15px" }}
            color="warning"
          >
            Change
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default UpdateAgent;
