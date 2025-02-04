import type { MovieWatchlisted } from '@core/infrastructure/storage/modules/movie';
import React from 'react';
import { type FlatListProps, type ListRenderItem } from 'react-native';
import Config from 'react-native-config';
import { SCREEN_WIDTH } from 'src/shared/constants';
import { createTypographyStyles } from 'src/shared/utils/typography';
import styled from 'styled-components/native';

type MovieGridProps = Partial<FlatListProps<MovieWatchlisted>> & {
  data: MovieWatchlisted[];
  onPress?: (item: MovieWatchlisted) => void;
};

const MovieGridItem: React.FC<{
  movie: MovieWatchlisted;
  onPress: () => void;
}> = ({ movie, onPress }) => (
  <GridItem key={movie.id} onPress={onPress}>
    <Poster source={{ uri: `${Config.API_IMAGE_URL}/w500/${movie.poster_path}` }} />
    <Title>{movie.title}</Title>
  </GridItem>
);

const MovieGrid: React.FC<MovieGridProps> = ({ data, onPress }) => {
  const renderItem: ListRenderItem<MovieWatchlisted> = ({ item }) => {
    return <MovieGridItem movie={item} onPress={() => onPress?.(item)} />;
  };

  return <GridContainer data={data} renderItem={renderItem} numColumns={3} bounces={false} />;
};

export default MovieGrid;

const GridContainer = styled.FlatList.attrs(({ theme }) => ({
  contentContainerStyle: {
    padding: theme.spacing['md-plus'],
  },
}))``;

const GridItem = styled.TouchableOpacity`
  flex: 1;
  background-color: #252525;
  border-radius: 8px;
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.sm}px;
  max-width: ${({ theme }) => SCREEN_WIDTH / 3 - (theme.spacing.sm + theme.spacing['md-plus'])}px;
`;

const Poster = styled.Image`
  aspect-ratio: 640 / 960;
`;

const Title = styled.Text`
  ${({ theme }) => createTypographyStyles(theme.typography.h1)}
  font-size: 12px;
  letter-spacing: -0.5px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;
