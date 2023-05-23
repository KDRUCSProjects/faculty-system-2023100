import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import image from "../images/p.jpg";
import "../Styles/profile.css";
import { Link } from "react-router-dom";

export default function ProfileView() {
  const containerStyle = { marginTop: "60px", marginLeft: "22%", width: "70%" };
  return (
    <div>
      <Container style={containerStyle}>
        <Box>
          <img className="view_profile_image" alt="Profile" src={image} />
          <form method="PUT" noValidate>
                
            <h1>View Profile</h1>
            <Grid container spacing={4}>
              <Grid item sx={6}>
                <TextField
                  disabled
                  type="name"
                  sx={{ width: "330px" }}
                  label="First Name"
                  defaultValue="Khalil"
                />
              </Grid>
              <Grid item sx={6}>
                <TextField
                  disabled
                  type="name"
                  sx={{ width: "330px" }}
                  label="Last Name"
                  defaultValue="Faizi"
                />
              </Grid>
              <Grid item sx={12}>
                <TextField
                  disabled
                  type="email"
                  sx={{ width: "693px" }}
                  label="Email"
                  defaultValue="khalil36@gmail.com"
                />
              </Grid>
              <Grid item sx={12}>
                <TextField
                  disabled
                  sx={{ width: "693px" }}
                  label="Password"
                  defaultValue="******"
                  type="password"
                />
              </Grid>
            </Grid>

            <Box sx={{ marginTop: "50px" }}>
              <Link to={"/profile_edit"}>
                <Button
                    
                    variant="contained"
                    color="primary"
                >
                    Edit
                </Button>
              
              </Link>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
}
