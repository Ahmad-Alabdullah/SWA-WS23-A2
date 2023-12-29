import {
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
