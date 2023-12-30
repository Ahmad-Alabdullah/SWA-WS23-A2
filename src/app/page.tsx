import {
<<<<<<< HEAD
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
      <Box sx={{ flexGrow: 1, padding: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardMedia
                component="img"
                sx={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  maxHeight: '40vh',
                }}
                image="\public\images\library.jpg"
                alt="Cover Image"
              />
              <Typography variant="h5" className="title" sx={{ width: '60%', margin: 'auto', marginBottom: '1rem', alignItems: 'center', justifyContent: 'center' }}>
              Willkommen in unserem online Buchhandel!
              </Typography>
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
                    style={{ justifyContent: 'space-between', width: '100%', marginBottom: '40px' }}
                  >
                    <FormControlLabel value="nach Titel" control={<Radio />} label="nach Titel" style={{ paddingRight: '40px' }} />
                    <FormControlLabel value="nach Author" control={<Radio />} label="nach Author" style={{ paddingRight: '40px' }} />
                    <FormControlLabel value="nach ISBN" control={<Radio />} label="nach ISBN" style={{ paddingRight: '40px' }} />
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
=======
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Link from 'next/link';

function Home() {
  return (
    <Container
      style={{
        paddingTop: '80px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Card style={{ width: '100%' }}>
        <CardMedia component="img" height="300" image="/Home.jpg" alt="bib" />
        <CardContent style={{ backgroundColor: '#FFFFFF' }}>
          <Container>
            <Typography variant="h4" component="h2" align="center">
              Willkommen zur Bibliothek!
            </Typography>
          </Container>
        </CardContent>
      </Card>
      <Card style={{ width: 'auto', maxWidth: '500px' }}>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '40px',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Starte deine Suche
          </Typography>
          <FormControl
            component="div"
            style={{
              padding: '16px',
            }}
          >
            <Input placeholder="Deine Suchanfrage" fullWidth />
            <RadioGroup
              row
              aria-label="search-options"
              name="searchOptions"
              style={{ marginTop: '16px' }}
            >
              <FormControlLabel
                value="title"
                control={<Radio style={{ color: '#047857' }} />}
                label="nach Titel"
              />
              <FormControlLabel
                value="author"
                control={<Radio style={{ color: '#047857' }} />}
                label="nach Autor"
              />
              <FormControlLabel
                value="isbn"
                control={<Radio style={{ color: '#047857' }} />}
                label="nach ISBN"
              />
            </RadioGroup>
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: '#047857',
                marginTop: '16px',
                marginBottom: '20px',
              }}
            >
              Erweiterte Suche
            </Button>
          </FormControl>
        </Container>
      </Card>

      <Card style={{ width: 'auto', maxWidth: '300px' }}>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '40px',
          }}
        >
          <Typography variant="h5" component="h2" align="center">
            Aktuell beliebte bücher
          </Typography>
          <Link href="/books" passHref>
            <Button variant="contained" color="primary">
              Alle Bücher anzeigen
            </Button>
          </Link>
        </Container>
      </Card>
    </Container>
  );
}

export default Home;
>>>>>>> eb7dd9512294a2fd853dcbad6f47b6cac108b034
