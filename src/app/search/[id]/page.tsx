'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button, Rating, Card, CardContent, Typography, Container, CssBaseline } from '@mui/material';
import { queryBuch, queryLoadImage } from '../../../graphql/graphql';
import Link from 'next/link';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

interface BuchDetailsProps {
  id: string;
  titel: {
    titel: string;
  };
  isbn: string;
  art: string;
  lieferbar: boolean;
  rating: number;
  preis: number;
  rabatt: number;
  datum: string;
  // Füge weitere Eigenschaften bei Bedarf hinzu
}

function BuchDetails({ params }: { params: { id: string } }) {
  const [buch, setBuch] = useState<BuchDetailsProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [coverImage, setCoverImage] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchBuchDetails = async () => {
      setIsLoading(true);

      try {
        const result = await queryBuch(params.id ?? '');

        if (result.data.data.buch) {
          setBuch(result.data.data.buch as BuchDetailsProps);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Buchdetails:', error);
        setError('Fehler beim Abrufen der Buchdetails. Bitte versuchen Sie es später erneut.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuchDetails();
  }, [params.id]);

  useEffect(() => {
    const fetchCoverImage = async () => {
      if (buch?.id) {
        try {
          const result = await queryLoadImage(buch.id);

          if (result.data.data.findImage) {
            setCoverImage(`data:image/jpeg;base64, ${result.data.data.findImage.image}`);
          }
        } catch (error: any) {
          console.error('Fehler beim Laden des Cover-Bildes:', error.message);
          setError('Fehler beim Laden des Cover-Bildes. Bitte versuchen Sie es später erneut.');
        }
      }
    };

    fetchCoverImage();
  }, [buch]);

  if (isLoading) {
    return (
      <Card style={{ textAlign: 'center', marginBottom: '2rem', padding: '1rem' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lade Buchdetails...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card style={{ textAlign: 'center', marginBottom: '2rem', padding: '1rem' }}>
        <CardContent>
          <WarningAmberOutlinedIcon fontSize="large" />
          <Typography variant="h6" gutterBottom>
            Fehler beim Laden der Buchdetails
          </Typography>
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!buch) {
    return (
      <Card style={{ textAlign: 'center', marginBottom: '2rem', padding: '1rem', marginTop: '30px'}}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Buch nicht gefunden
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '20px' }}>
        <Typography variant="h5" gutterBottom paddingTop={4.65} style={{ alignSelf: 'center', fontWeight: '600' }}>
          Detailansicht
        </Typography>
        <Link href="/search" passHref>
          <Button variant="contained" color="primary" style={{ alignSelf: 'flex-start', backgroundColor: '#047857', width: '80%', height: '30%', margin: '0px 0px 15px 40px'}}>
            ZURÜCK
          </Button>
        </Link>
        <Card style={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '800px', margin: '0 auto 20px', backgroundColor: '#F5FFFA' }}>
          <div style={{ flex: '1', margin: '30px 50px 20px 75px' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {buch.titel?.titel}
              </Typography>
              <Typography color="textSecondary" gutterBottom margin={1.5}>
                <Rating value={buch.rating} readOnly sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }} />
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                <b>ISBN:</b> {buch.isbn}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                <b>ART:</b> {buch.art}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                <b>PREIS:</b> {buch.preis + " €"}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                <b>RABATT:</b> {buch.rabatt}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                <b>LIEFERBAR:</b> {buch.lieferbar ? 'Ja' : 'Nein'}
              </Typography>              
              <Typography color="textSecondary" gutterBottom>
                <b>DATUM:</b> {buch.datum}
              </Typography>
              {/* Füge weitere Buchdetails hier hinzu, falls benötigt */}
            </CardContent>
          </div>
          <div style={{ width: '30%', height: '30%', margin: '15px 75px 15px 0px' }}>
            {coverImage && <Image src={coverImage} alt="Cover" layout="responsive" width={300} height={200} />}
          </div>
        </Card>
      </div>
    </Container>
  );
}

export default BuchDetails;