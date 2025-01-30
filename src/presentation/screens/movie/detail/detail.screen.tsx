import { MainContainer, MovieCarousel, MoviePoster, ScrollContainer } from '@components/index';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useMovieDetailPresenter } from './detail.presenter';
import type { MovieDetailScreenProps } from './detail.types';

export const MovieDetailScreen: React.FC<MovieDetailScreenProps> = (props) => {
  const {
    movieState: { loading, data },
    goToSimilar,
  } = useMovieDetailPresenter(props);

  return (
    <MainContainer>
      <ScrollContainer>
        {loading ? (
          <ActivityIndicator />
        ) : data ? (
          <>
            <DetailHeaderContainer>
              <MoviePoster path={data.poster_path} size={200} />
              <InfoContainer>
                <InfoText>Genre: {data.genres.map((genre) => genre.name).join(', ')}</InfoText>
                <InfoText>Duration: {data.runtime} min</InfoText>
                <InfoText>Rating: {data.vote_average.toFixed(1)}</InfoText>
              </InfoContainer>
            </DetailHeaderContainer>

            <SectionTitle>Synopsis</SectionTitle>
            <DescriptionText>{data.overview}</DescriptionText>

            {data.similar?.length ? (
              <>
                <SectionTitle>Similar movies</SectionTitle>
                <MovieCarousel data={data.similar} onPressItem={(item) => goToSimilar(item.id)} />
              </>
            ) : null}
          </>
        ) : null}
      </ScrollContainer>
    </MainContainer>
  );
};

const DescriptionText = styled.Text`
  color: #cccccc;
  line-height: 20px;
`;

const SectionTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 8px;
`;

const DetailHeaderContainer = styled.View`
  flex-direction: row;
`;

const InfoContainer = styled.View`
  flex: 1;
  margin-left: 16px;
  justify-content: space-around;
`;

const InfoText = styled.Text`
  color: #cccccc;
  font-size: 14px;
`;
