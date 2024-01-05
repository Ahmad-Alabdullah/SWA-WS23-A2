'use client';

import ImageCarousel from '@/components/Carousel';
import React, { useEffect, useState } from 'react';
import { queryBuecher, queryLoadImage } from '../../graphql/graphql';
import { BuchQueryField, Buch } from '@/graphql/interfaces';

const Top = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | undefined>(undefined);
  const [buecher, setBuecher] = useState<Buch[]>([]);
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});

  const fetchBuecher = async () => {
    setIsLoading(true);
    setIsError(undefined);

    try {
      const result = await queryBuecher([
        BuchQueryField.id,
        BuchQueryField.titel,
        BuchQueryField.rating,
      ]);
      setIsLoading(false);

      if (result.data.data.buecher) {
        const sortedBuecher = result.data.data.buecher.sort(
          (a: any, b: any) => b.rating - a.rating,
        );
        setBuecher(sortedBuecher);
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
  };

  const fetchImages = async () => {
    try {
      const imagePromises = buecher.map(async (buch) => {
        if (buch.id) {
          const result = await queryLoadImage(buch.id);

          const imageDataResult = result.data.data.findImage;

          setImageData((prevImageData) => ({
            ...prevImageData,
            [buch.id as string]: imageDataResult ? imageDataResult.image : '',
          }));
        }
      });

      await Promise.all(imagePromises);
    } catch (error: any) {
      console.error('Error loading images:', error.message);
    }
  };
  useEffect(() => {
    fetchBuecher();
  }, []);

  useEffect(() => {
    fetchImages();
  }, [buecher]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {isError}</p>}
      {!isLoading && !isError && buecher.length > 0 && (
        <ImageCarousel
          items={buecher.map((buch) => ({
            imgPath:
              buch.id && imageData[buch.id]
                ? `data:image/jpeg;base64, ${imageData[buch.id]}`
                : '',
            label: buch.titel?.titel || 'Unknown',
            rating: buch.rating || 0,
          }))}
        />
      )}
    </div>
  );
};

export default Top;
