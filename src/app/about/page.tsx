'Use client';

import { Box, Card, CardContent, Grid } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Typography from '@mui/material/Typography';

function About() {
  return (
    <Box sx={{ flexGrow: 1, padding: '2rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <AccountCircleOutlinedIcon
              sx={{ marginLeft: 1, display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <CardContent>
              <h3>card</h3>
              <Typography
                sx={{ width: '60%', margin: 'auto', marginBottom: '1rem' }}
              >
                text
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        </Grid>
    </Box>
   );
}

export default About;