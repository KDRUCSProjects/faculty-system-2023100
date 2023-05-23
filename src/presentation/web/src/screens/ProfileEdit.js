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

export default function ProfileEdit() {
  const containerStyle = { marginTop:'-45px', marginLeft: "22%", width: "70%" };
  return (
    <div>
      <Container style={containerStyle}>
        <Box>
          
          <form  method="PUT" noValidate>
            <Link>
                <img className="image" alt="Profile" src={image} />
            </Link>
            <Box sx={{paddingBottom:'50px'}}><h1>Edit Profile</h1></Box>
            <Grid container spacing={4} >
              <Grid item sx={6}>
                <TextField
                  type="name"
                  sx={{ width: "330px" }}
                  label="First Name"
                  defaultValue="Khalil"
                />
              </Grid>
              <Grid item sx={6}>
                <TextField
                  type="name"
                  sx={{ width: "330px" }}
                  label="Last Name"
                  defaultValue="Faizi"
                />
              </Grid>
              <Grid item sx={12}>
                <TextField
                  type="email"
                  sx={{ width: "693px" }}
                  label="Email"
                  defaultValue="khalil36@gmail.com"
                />
              </Grid>
              <Grid item sx={12}>
                <TextField
                  sx={{ width: "693px" }}
                  label="Password"
                  defaultValue="******"
                  type="password"
                />
              </Grid>
            </Grid>

            <Box sx={{ marginTop: "100px" }}>
              <Link to={'/profile_view'}>
                <Button variant="outlined" color="primary" >
                  Cancel
                </Button>
              
              </Link>

              <Button
                type="submit"
                sx={{ marginLeft: "40px" }}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
}
