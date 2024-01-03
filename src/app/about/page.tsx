import * as React from 'react';
import { 
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';

interface Profile {
  index: number;
  imgPath: string;
  imgAlt: string;
  name: string;
  jobDescription: string;
}

const profiles: Profile[] = [
  {
    index: 0,
    imgPath: '/Elena.jpeg',
    imgAlt: 'Elena',
    name: 'Elena Badliuk',
    jobDescription: 'UI/UX Designerin'
  },
  {
    index: 1,
    imgPath: '/Edgar.jpeg',
    imgAlt: 'Edgar',
    name: 'Edgar Fuchs',
    jobDescription: 'Backend-Entwickler'
  },
  {
    index: 2,
    imgPath: '/Ahmad.jpeg',
    imgAlt: 'Ahmad',
    name: 'Ahmad Alabdullah',
    jobDescription: 'Frontend-Entwickler'
  }
]

export function About() {
  return (
    <Grid 
    sx={{ flexGrow: 1, minHeight: '110vh'}} 
    container spacing={5}
    justifyContent="center"
    alignItems="center"
    >
      <Grid item xs={12} container justifyContent="center" alignItems="center">
      <Typography variant="h4" fontWeight="bold" marginBottom={3} >
      Unser Team
    </Typography>
        <Grid container justifyContent="center" alignItems="center" spacing={5}>
          {profiles.map((value) => (
            <Grid key={value.index} item>
              <Card
                sx={{
                  height: 400,
                  width: 300,
                  backgroundColor: '#E6F1EE',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                
                <CardContent>
                  <Box sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardMedia
                  component="img" 
                  sx={{
                    width: '90%',
                    height: '50%',
                    objectFit: 'cover',
                    maxHeight: '50vh',
                  }}
                  image={value.imgPath}
                  alt={value.imgAlt}
                />
                  <Typography variant="h6" fontWeight="bold" marginTop={2}>
                    {value.name}
                  </Typography>
                  <Typography variant="h6" >
                    {value.jobDescription}
                  </Typography>
                </Box>
                </CardContent>
               </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default About;
