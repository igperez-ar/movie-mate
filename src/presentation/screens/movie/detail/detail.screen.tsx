import {
  MainContainer,
  MovieCarousel,
  MoviePoster,
  ScrollContainer,
  TicketButton,
} from '@components/index';
import Icon from '@react-native-vector-icons/material-design-icons';
import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from 'src/shared/utils/sizes';
import styled from 'styled-components/native';
import { useMovieDetailPresenter } from './detail.presenter';
import type { MovieDetailScreenProps, MovieDetailState } from './detail.types';

type CategoryParams = {
  data: NonNullable<MovieDetailState['data']>;
  isWatchlisted: boolean;
  onWatchlistPress: () => void;
  onSimilarPress: (id: number) => void;
};

const BaseCard = styled(Animated.View)`
  margin: 16px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
`;

const ContentContainer = styled.View`
  padding: 16px;
`;

const TitleAnim = styled(Animated.Text)`
  font-size: 28px;
  margin-bottom: 8px;
`;

const GenreContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const MetaContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const TrendingHeader = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  background-color: #ff4500;
`;

const TrendingGenre = styled(Animated.Text)`
  background-color: #ff6b6b;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-family: 'OpenSans-SemiBold';
`;

const Watermark = styled(Animated.Text)`
  position: absolute;
  right: -30px;
  top: -30px;
  font-size: 48px;
  opacity: 0.1;
  color: #00b4d8;
  transform: rotate(-45deg);
  z-index: -1;
`;

const GoldBorder = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-width: 2px;
  border-color: gold;
  border-radius: 12px;
  z-index: 1;
`;

const NowPlayingBanner = styled(Animated.View)`
  width: 100px;
  height: 100px;
  padding: 4px 30px;
  transform: rotate(-45deg);
`;

const TrendingMovieDetails: React.FC<CategoryParams> = ({
  data,
  isWatchlisted,
  onSimilarPress,
  onWatchlistPress,
}) => {
  return (
    <BaseCard>
      <TrendingHeader>
        <Icon name="fire" size={24} color="white" />
        <Text style={{ color: 'white', marginLeft: 8, fontWeight: 'bold' }}>TRENDING</Text>
      </TrendingHeader>

      <Image
        source={{ uri: `${Config.API_IMAGE_URL}/w780/${data.backdrop_path}` }}
        style={{ width: '100%', height: 200 }}
      />

      <ContentContainer>
        <TitleAnim style={{ color: '#ff4500', fontFamily: 'MapleMono-Bold' }}>
          {data.title}
        </TitleAnim>

        <GenreContainer>
          {data.genres.map((genre) => (
            <TrendingGenre key={genre.id}>{genre.name}</TrendingGenre>
          ))}
        </GenreContainer>

        <MetaContainer>
          <Icon name="star" size={16} color="#ffd700" />
          <Text style={{ color: '#666' }}>{data.vote_average.toFixed(1)}</Text>
          <Text style={{ color: '#666' }}>• {data.runtime} min</Text>
        </MetaContainer>

        <TouchableOpacity
          onPress={onWatchlistPress}
          style={[styles.button, { backgroundColor: '#ff4500' }]}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Remove Watchlist</Text>
          <Icon name="minus-circle" size={20} color="white" />
        </TouchableOpacity>
      </ContentContainer>
    </BaseCard>
  );
};

export const UpcomingMovieDetails: React.FC<CategoryParams> = ({
  data,
  isWatchlisted,
  onSimilarPress,
  onWatchlistPress,
}) => {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const glowInterpolation = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(147,51,234,0.3)', 'rgba(147,51,234,0.7)'],
  });

  return (
    <BaseCard>
      <NowPlayingBanner style={{ backgroundColor: glowInterpolation }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>COMING SOON</Text>
      </NowPlayingBanner>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export const PopularMovieDetails: React.FC<CategoryParams> = ({
  data,
  isWatchlisted,
  onSimilarPress,
  onWatchlistPress,
}) => {
  return (
    <BaseCard style={{ backgroundColor: '#f0f8ff' }}>
      <Watermark>POPULAR</Watermark>
      <TitleAnim style={{ fontFamily: 'Nunito-Bold', color: '#00b4d8' }}>MOANA 2</TitleAnim>
      {/* <WatchlistButton>
        <Icon name="heart" size={16} color="white" />
        <ButtonText>Remove Watchlist</ButtonText>
      </WatchlistButton> */}
    </BaseCard>
  );
};

export const NowPlayingMovieDetails: React.FC<CategoryParams> = ({
  data,
  isWatchlisted,
  onSimilarPress,
  onWatchlistPress,
}) => {
  return (
    <BaseCard style={{ backgroundColor: '#f0f8ff' }}>
      <Watermark>NOW PLAYING</Watermark>
      <TitleAnim style={{ fontFamily: 'Nunito-Bold', color: '#00b4d8' }}>MOANA 2</TitleAnim>
      {/* <WatchlistButton>
        <Icon name="heart" size={16} color="white" />
        <ButtonText>Remove Watchlist</ButtonText>
      </WatchlistButton> */}
    </BaseCard>
  );
};

export const TopRatedMovieDetails: React.FC<CategoryParams> = ({
  data,
  isWatchlisted,
  onSimilarPress,
  onWatchlistPress,
}) => {
  return (
    <BaseCard style={{ borderColor: '#gold' }}>
      <LinearGradient colors={['#2c2c2c', '#000']}>
        <Watermark>POPULAR</Watermark>
        <TitleAnim style={{ fontFamily: 'Nunito-Bold', color: '#00b4d8' }}>MOANA 2</TitleAnim>
        {/* <WatchlistButton>
          <Icon name="heart" size={16} color="white" />
          <ButtonText>Remove Watchlist</ButtonText>
        </WatchlistButton> */}
      </LinearGradient>
    </BaseCard>
  );
};

const BaseMovieDetails: React.FC<CategoryParams> = ({
  data,
  isWatchlisted,
  onSimilarPress,
  onWatchlistPress,
}) => {
  return (
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
          <InfoText style={{}}>{data.genres.map((genre) => genre.name).join(', ')}</InfoText>
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
            title={isWatchlisted ? 'watchlisted' : 'watchlist'}
            isActive={isWatchlisted}
            onPress={onWatchlistPress}
            glowColor="#ff6f91"
            colors={['#845ec2', '#d65db1', '#ff6f91', '#ff9671', '#ffc75f', '#f9f871']}
          />
        </InfoContainer>
      </DetailHeaderContainer>
      <SectionTitle>Synopsis</SectionTitle>
      <DescriptionText>{data.overview}</DescriptionText>
      {data.similar?.length ? (
        <>
          <SectionTitle>Recommended</SectionTitle>
          <MovieCarousel data={data.similar} onPressItem={(item) => onSimilarPress(item.id)} />
        </>
      ) : null}
    </>
  );
};

export const MovieDetailScreen: React.FC<MovieDetailScreenProps> = (props) => {
  const {
    isSaved,
    movieState: { loading, data },
    goToSimilar,
    toggleWatchlist,
  } = useMovieDetailPresenter(props);
  const category = /* props.route.params.category ??  */'default';

  const renderCategory = () => {
    if (data) {
      const categoryParams = {
        data,
        isWatchlisted: isSaved,
        onWatchlistPress: toggleWatchlist,
        onSimilarPress: goToSimilar,
      };
      switch (category) {
        case 'trending':
          return <TrendingMovieDetails {...categoryParams} />;
        case 'popular':
          return <PopularMovieDetails {...categoryParams} />;
        case 'top_rated':
          return <TopRatedMovieDetails {...categoryParams} />;
        case 'upcoming':
          return <UpcomingMovieDetails {...categoryParams} />;
        case 'now_playing':
          return <NowPlayingMovieDetails {...categoryParams} />;
        default:
          return <BaseMovieDetails {...categoryParams} />;
      }
    }
    return null;
  };

  return (
    <MainContainer>
      <ScrollContainer>{loading ? <ActivityIndicator /> : renderCategory()}</ScrollContainer>
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

const WatchlistButton = styled.TouchableOpacity<{ watchlisted: boolean }>`
  border-color: #e50914;
  border-width: 1px;
  background-color: ${(props) => (props.watchlisted ? '#e50914' : 'undefined')};
  padding: 12px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  margin-left: 8px;
`;
