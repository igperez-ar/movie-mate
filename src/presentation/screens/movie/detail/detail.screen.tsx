import {
  Icon,
  MainContainer,
  MovieCarousel,
  MoviePoster,
  ScrollContainer,
  TicketButton,
} from '@components/index';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useMovieDetailPresenter } from './detail.presenter';
import type { MovieDetailScreenProps } from './detail.types';

export const MovieDetailScreen: React.FC<MovieDetailScreenProps> = (props) => {
  const {
    isWatchlisted,
    movieState: { isLoading, data },
    categoryColors,
    goToSimilar,
    toggleWatchlist,
  } = useMovieDetailPresenter(props);

  const renderContent = () => {
    if (isLoading) return <ActivityIndicator />;

    if (data)
      return (
        <>
          <Title>{data.title}</Title>
          <DetailHeaderContainer>
            <PosterContainer>
              <MoviePoster path={data.poster_path} quality="w780" />
            </PosterContainer>
            <InfoContainer>
              <Text>{data.genres.map((genre) => genre.name).join(', ')}</Text>
              <DetailsContainer>
                <AttributeContainer>
                  <Icon name="calendar" size={20} />
                  <AttributeText>{new Date(data.release_date).getFullYear()}</AttributeText>
                </AttributeContainer>
                <AttributeContainer>
                  <Icon name="clock" size={20} />
                  <AttributeText>{data.runtime} min</AttributeText>
                </AttributeContainer>
                <AttributeContainer>
                  <Icon name="star" size={20} />
                  <AttributeText>{data.vote_average.toFixed(1)}</AttributeText>
                </AttributeContainer>
              </DetailsContainer>
              <TicketButton
                title={isWatchlisted ? 'watchlisted' : '+watchlist'}
                isActive={!isWatchlisted}
                onPress={toggleWatchlist}
                {...categoryColors}
              />
            </InfoContainer>
          </DetailHeaderContainer>
          <SectionTitle>Synopsis</SectionTitle>
          <DescriptionText>{data.overview}</DescriptionText>
          {data.similar?.length ? (
            <>
              <SectionTitle>Recommended</SectionTitle>
              <MovieCarousel data={data.similar} onPressItem={(item) => goToSimilar(item.id)} />
            </>
          ) : null}
        </>
      );
    return null;
  };

  return (
    <MainContainer>
      <ScrollContainer>{renderContent()}</ScrollContainer>
    </MainContainer>
  );
};

const Title = styled.Text`
  align-self: center;
  max-width: 80%;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 24px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  text-align: center;
  font-family: Cascadia Mono;
`;

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 20px;
  font-weight: 600;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  font-family: Nunito;
`;

const PosterContainer = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
  text-align: center;
  font-family: Nunito;
`;

const DescriptionText = styled(Text)`
  line-height: 20px;
  text-align: justify;
`;

const DetailHeaderContainer = styled.View`
  flex-direction: row;
`;

const DetailsContainer = styled.View`
  justify-content: 'space-around';
  margin: ${({ theme }) => theme.spacing['md-plus']}px 0px;
`;

const AttributeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md}px;
`;

const InfoContainer = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.lg}px;
  justify-content: space-around;
`;

const AttributeText = styled(Text)`
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;
