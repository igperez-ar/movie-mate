import {
  MainContainer,
  MovieCarousel,
  MoviePoster,
  ScrollContainer,
  TicketButton,
} from '@components/index';
import Icon from '@react-native-vector-icons/material-design-icons';
import type { MovieList } from '@screens/home/home.types';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { scale } from 'src/shared/utils/sizes';
import styled from 'styled-components/native';
import { useMovieDetailPresenter } from './detail.presenter';
import type { MovieDetailScreenProps } from './detail.types';

const categoryColors: Record<MovieList | 'default', { colors: string[]; glowColor: string }> = {
  trending: {
    colors: ['#ffae00', '#ff7700', '#ff4d00', '#ff1a00', '#e00000'],
    glowColor: '#ff7700',
  },
  popular: {
    colors: ['#e7e2f3', '#a7b2e6', '#688cca', '#496d9c', '#2d3c67'],
    glowColor: '#a7b2e6',
  },
  top_rated: {
    colors: ['#ffd900', '#ffea00', '#ffc300', '#ffa600', '#ff8c00'],
    glowColor: '#ffea00',
  },
  upcoming: {
    colors: ['#b29dd8', '#8959c5', '#4f3d8a', '#2c2a6f', '#1e1a5b'],
    glowColor: '#8959c5',
  },
  now_playing: {
    colors: ['#b9dae9', '#a5c6d5', '#7ca2b1', '#4f7f8c', '#2d5b67'],
    glowColor: '#a5c6d5',
  },
  default: {
    glowColor: '#ff6f91',
    colors: ['#845ec2', '#d65db1', '#ff6f91', '#ff9671', '#ffc75f', '#f9f871'],
  },
};

export const MovieDetailScreen: React.FC<MovieDetailScreenProps> = (props) => {
  const {
    isSaved,
    movieState: { loading, data },
    goToSimilar,
    toggleWatchlist,
  } = useMovieDetailPresenter(props);
  const category = props.route.params.category ?? 'default';

  return (
    <MainContainer>
      <ScrollContainer>
        {loading ? (
          <ActivityIndicator />
        ) : (
          data && (
            <>
              <Title>{data.title}</Title>
              <DetailHeaderContainer>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <MoviePoster path={data.poster_path} quality="w780" />
                </View>
                <InfoContainer>
                  <InfoText style={{}}>
                    {data.genres.map((genre) => genre.name).join(', ')}
                  </InfoText>
                  <View style={{ justifyContent: 'space-around', marginVertical: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                      <Icon name="calendar" color="white" size={scale(20)} />
                      <InfoText style={{ marginLeft: 8 }}>
                        {new Date(data.release_date).getFullYear()}
                      </InfoText>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                      <Icon name="clock" color="white" size={scale(20)} />
                      <InfoText style={{ marginLeft: 8 }}>{data.runtime} min</InfoText>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                      <Icon name="star" color="white" size={scale(20)} />
                      <InfoText style={{ marginLeft: 8 }}>{data.vote_average.toFixed(1)}</InfoText>
                    </View>
                  </View>
                  <TicketButton
                    title={isSaved ? 'watchlisted' : '+watchlist'}
                    isActive={isSaved}
                    onPress={toggleWatchlist}
                    {...categoryColors[category]}
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
          )
        )}
      </ScrollContainer>
    </MainContainer>
  );
};

const Title = styled.Text`
  align-self: center;
  max-width: 80%;
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
  font-family: Cascadia Mono;
`;

const SectionTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 8px;
  font-family: Cascadia Mono;
`;

const DescriptionText = styled.Text`
  color: #cccccc;
  line-height: 20px;
  text-align: justify;
`;

const DetailHeaderContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

const InfoContainer = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.lg}px;
  justify-content: space-around;
`;

const InfoText = styled.Text`
  color: #cccccc;
  font-size: 14px;
  text-align: center;
`;
