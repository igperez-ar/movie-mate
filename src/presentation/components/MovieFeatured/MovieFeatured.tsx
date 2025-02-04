import { Icon } from '@components/Icon/Icon';
import { MoviePoster } from '@components/MoviePoster/MoviePoster';
import { ProgressBar } from '@components/ProgressBar/ProgressBar';
import type { Movie } from '@core/capabilities/movies';
import { View } from 'react-native';
import { createTypographyStyles } from 'src/shared/utils/typography';
import styled from 'styled-components/native';

type MovieFeaturedProps = {
  movie: Movie;
  onPress?: () => void;
  onComplete?: () => void;
};

export const MovieFeatured: React.FC<MovieFeaturedProps> = ({ movie, onPress, onComplete }) => {
  return (
    <FeaturedContainer>
      <InnerContainer>
        <MoviePoster path={movie.poster_path} size={140} />
        <DetailContainer>
          <View>
            <TitleContainer>
              <Title numberOfLines={2}>{movie.title}</Title>
              <Icon name="close" size={16} />
            </TitleContainer>
            <Description numberOfLines={6}>{movie.overview}</Description>
          </View>
          <ActionButton onPress={onPress}>
            <ButtonText>See more</ButtonText>
          </ActionButton>
        </DetailContainer>
      </InnerContainer>
      <ProgressBar key={movie.id} onComplete={onComplete} />
    </FeaturedContainer>
  );
};

const FeaturedContainer = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing['md-plus']}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const InnerContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const DetailContainer = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing['md-plus']}px;
  justify-content: space-between;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.lg}px;
  ${({ theme }) => createTypographyStyles(theme.typography.h1)}
  font-size: 16px;
`;

const Description = styled.Text`
  ${({ theme }) => createTypographyStyles(theme.typography.body)}
`;

const ActionButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing['md-plus']}px;
  border-radius: 6px;
  align-items: center;
`;

const ButtonText = styled.Text`
  ${({ theme }) => createTypographyStyles(theme.typography.button)}
`;
