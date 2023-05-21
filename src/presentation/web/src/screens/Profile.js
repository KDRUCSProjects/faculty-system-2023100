import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import image from '../images/k.jpg';



function Profile() {
    const imageStyle = {width:'180px' , marginTop:'65px' }
    
  return (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={9}>
                <Box textAlign={'center'} marginTop={'25%'}>
                    <Link >
                        <Button variant="outlined"  >
                            View Personal information
                        </Button>
                    </Link>
                    <br/>
                    <br/>
                    <Link >
                        <Button variant="outlined"  >
                            View Personal information
                        </Button>
                    </Link>
                </Box>
               
            </Grid>

            <Grid item xs={3}>  
                <img style={imageStyle} src={image} />
                <h3>Name</h3>
            </Grid>

        </Grid>
     
        
    </div>
  )
}

export default Profile
