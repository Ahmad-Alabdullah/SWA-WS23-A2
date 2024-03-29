'use client';

import { Buch, BuchQueryField, FilterParam } from '../../graphql/interfaces';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { queryBuecher } from '../../graphql/graphql';
import { truncate } from 'fs';

function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(undefined);
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState({
    titel: '',
    isbn: '',
    art: '',
    lieferbar: false,
    rating: 0,
  });
  const [buecher, setBuecher] = useState([]);

  const resetFilter = () => {
    setFilter({
      titel: '',
      isbn: '',
      art: '',
      lieferbar: false,
      rating: 0,
    });
  };

  const handleFilterChange = (e: any) => {
    const { name } = e.target;
    let value;
    switch (name) {
      case 'lieferbar':
        value = e.target.checked;
        break;
      case 'rating':
        value = parseInt(e.target.value, 10);
        break;
      default:
        // eslint-disable-next-line prefer-destructuring
        value = e.target.value;
        break;
    }
    setFilter({ ...filter, [name]: value });
  };

  async function fetchBuecher() {

    console.log(`titel: ${filter.titel}`);

    setIsLoading(true);
    setIsError(undefined);

    const queryFilter: FilterParam[] = [];

    if (filter.titel.length > 0) {
      queryFilter.push({ key: 'titel', value: filter.titel });
    }
    if (filter.isbn.length > 0) {
      queryFilter.push({ key: 'isbn', value: filter.isbn });
    }
    if (filter.art.length > 0) {
      queryFilter.push({ key: 'art', value: filter.art });
    }
    if (filter.lieferbar) {
      queryFilter.push({ key: 'lieferbar', value: filter.lieferbar });
    }
    if (filter.rating > 0) {
      queryFilter.push({ key: 'rating', value: filter.rating });
    }

    try {
      const result = await queryBuecher(
        [
          BuchQueryField.id,
          BuchQueryField.titel,
          BuchQueryField.isbn,
          BuchQueryField.art,
          BuchQueryField.lieferbar,
          BuchQueryField.rating,
        ],
        queryFilter,
      );

      setIsLoading(false);

      if (result.data.data.buecher) {
        setBuecher(result.data.data.buecher);
      }
      if (result.data.errors) {
        const errorString = result.data.errors
          .flatMap((error: any) => error.message)
          .toString();
        setIsError(errorString);
      }
    } catch (err: any) {
      setIsLoading(false);
      setIsError(err.message);
    }
  }

  const handleFilterSubmit = (e: any) => {
    e.preventDefault();
    fetchBuecher();
  };

  useEffect(() => {
    const term = searchParams.get('term');
    const type = searchParams.get('type');
  
    // Funktion zum Aktualisieren des Zustands
    const updateFilter = () => {
      if (type === 'title') {
        setFilter((prevFilter) => ({
          ...prevFilter,
          titel: term || '',
          isbn: '',
          art: '',
          lieferbar: false,
          rating: 0,
        }));
      } else if (type === 'isbn') {
        setFilter((prevFilter) => ({
          ...prevFilter,
          titel: '',
          isbn: term || '',
          art: '',
          lieferbar: false,
          rating: 0,
        }));
      } else {
        setFilter({
          titel: '',
          isbn: '',
          art: '',
          lieferbar: false,
          rating: 0,
        });
      }
    };
  
    // Zustand basierend auf Bedingungen aktualisieren
    updateFilter();
  
    // Weitere Logik oder Funktionen hier ausführen, wenn erforderlich
    fetchBuecher();
  }, [searchParams]);

  return (
    <>
      <Box paddingLeft="100px" paddingTop="30px" >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item md={3} paddingTop="50px">
            <Typography variant="h6" fontWeight={'bold'}>
              Suchfilter festlegen
            </Typography>
            <p>Sie können mehrere Suchfilter gleichzeitig festlegen</p>
            <div style={{ textAlign: 'right', paddingBottom: '0.3rem' }}>
              <Button onClick={resetFilter}>Zurücksetzen</Button>
            </div>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Titel"
                name="titel"
                variant="outlined"
                value={filter.titel}
                onChange={handleFilterChange}
                style={{ marginBottom: '1rem' }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="ISBN"
                name="isbn"
                variant="outlined"
                value={filter.isbn}
                onChange={handleFilterChange}
                style={{ marginBottom: '1rem' }}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="art-select-label">Art</InputLabel>
              <Select
                labelId="art-select-label"
                id="art-select"
                label="Art"
                name="art"
                value={filter.art}
                onChange={handleFilterChange}
                style={{ marginBottom: '1rem' }}
              >
                <MenuItem value={'DRUCKAUSGABE'}>DRUCKAUSGABE</MenuItem>
                <MenuItem value={'KINDLE'}>KINDLE</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="lieferbar"
                  checked={filter.lieferbar}
                  onChange={handleFilterChange}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              }
              label="Buch ist lieferbar"
            />
            <Typography sx={{ display: 'flex', alignItems: 'bottom' }}>
              Rating
              <Rating
                name="rating"
                value={filter.rating}
                onChange={handleFilterChange}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 28 },
                  paddingLeft: '30px',
                  paddingBottom: '30px',
                }}
              />
            </Typography>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              onClick={handleFilterSubmit}
            >
              Anwenden
            </Button>
          </Grid>
          <Grid item md={9}>
            <div style={{ padding: '3rem' }}>
              {isLoading === true ? (
                <Card
                  style={{
                    textAlign: 'left',
                    marginBottom: '2rem',
                    paddingLeft: '1rem',
                  }}
                >
                  <CardContent>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  </CardContent>
                  <CardActions style={{ justifyContent: 'end' }}>
                    <Skeleton variant="rounded" width={120} height={30} />
                  </CardActions>
                </Card>
              ) : (
                false
              )}
              {isError === undefined ? (
                false
              ) : (
                <Card
                  style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    paddingLeft: '1rem',
                  }}
                >
                  <CardContent>
                    <WarningAmberOutlinedIcon fontSize="large" />
                    <Typography gutterBottom variant="h5" component="div">
                      Keine Suchergebnisse gefunden
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                      component="div"
                      style={{ color: 'red', marginTop: '1rem' }}
                    >
                      {isError}
                    </Typography>
                  </CardContent>
                </Card>
              )}
              {!isLoading && !isError && buecher.length > 0
                ? buecher.map((buch: Buch) => (
                  <Card
                    style={{
                      textAlign: 'left',
                      marginBottom: '2rem',
                      paddingLeft: '1rem',
                    }}
                    key={buch.id}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {buch.titel?.titel}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        style={{ marginLeft: '0.5rem' }}
                      >
                        <b>ISBN:</b> {buch.isbn}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        style={{ marginLeft: '0.5rem' }}
                      >
                        <b>ART:</b> {buch.art}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        style={{ marginLeft: '0.5rem' }}
                      >
                        <b>LIEFERBAR:</b>{' '}
                        {buch.lieferbar === true ? 'Ja' : 'Nein'}
                      </Typography>
                      <Rating
                        value={buch.rating}
                        readOnly={true}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                        style={{ marginLeft: '0.5rem' }}
                      />
                    </CardContent>
                    <CardActions style={{ justifyContent: 'end' }}>
                      <Link href={`/search/${buch.id}`} passHref>
                        <Button>Details anzeigen</Button>
                      </Link>
                    </CardActions>
                  </Card>
                ))
                : false}
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Search;
