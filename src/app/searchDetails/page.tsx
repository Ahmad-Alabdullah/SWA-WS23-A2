import {
  Button,
  Container,
  Typography,
} from '@mui/material';
import Link from 'next/link';

function SearchDetails() {
  return (
    <Container>
      <Typography variant="h1" component="h2" gutterBottom>
        Willkommen zur Bibliothek!
      </Typography>
      <Typography variant="body1" paragraph>
        Entdecke eine Vielzahl von Büchern und Ressourcen in unserer Bibliothek.
      </Typography>
      <Link href="/books" passHref>
        <Button variant="contained">
          Alle Bücher anzeigen
        </Button>
      </Link>
    </Container>
  );
}

export default SearchDetails;