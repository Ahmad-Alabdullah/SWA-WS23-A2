import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField,
    Radio,
    RadioGroup,
    Typography,
  } from '@mui/material';
  import Link from 'next/link';
  
  function Home() {
    return (
      <Box sx={{ 
        flexGrow: 1, 
        padding: '2rem', 
        textAlign: 'center', 
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        color: 'white',
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  sx={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    maxHeight: '50vh',
                  }}
                  image="/library.jpg"
                  alt="Cover Image"
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: 'rgba(255, 255, 255, 0.54)',
                    color: 'black',
                    padding: '10px',
                  }}
                >
                  <Typography variant="h5">Willkommen in unserem online Buchhandel!</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card>
            <CardContent style={{ display: 'flex', flexDirection: 'column', height: '250px', alignItems: 'center' }}>
                <h3>Starte hier Deine Suche</h3>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="Suchen"
                  label="Suchen"
                  name="Suchen"
                  type="text"
                  autoFocus
                  style={{ backgroundColor: '#E6F1EE', marginBottom: '10px' }}
                />
                <FormControl>
                  <FormLabel id="row-radio-buttons-group-label"></FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    style={{ justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}
                  >
                    <FormControlLabel value="nach Titel" control={<Radio color="success" />} label="nach Titel" style={{ paddingRight: '40px' }} />
                    <FormControlLabel value="nach Author" control={<Radio color="success" />} label="nach Author" style={{ paddingRight: '40px' }} />
                    <FormControlLabel value="nach ISBN" control={<Radio color="success" />} label="nach ISBN" style={{ paddingRight: '40px' }} />
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#047857' }}
                >
                  erweiterte Suche
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
            <CardContent style={{ display: 'flex', flexDirection: 'column', height: '250px', alignItems: 'center', justifyContent: 'center' }}>
                <h3>Aktuell beliebteste Bücher</h3>
                <Typography
                  sx={{ width: '60%', margin: 'auto', marginBottom: '1rem' }}
                >
                </Typography>
                <Link href="/search" passHref>
                  <Button 
                    variant="contained" 
                    style={{ backgroundColor: '#047857' }}
                    >
                    Zur Ansicht
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
  
  export default Home;
