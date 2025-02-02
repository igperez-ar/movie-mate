import { MoviePoster } from '@components/MoviePoster/MoviePoster';
import type { MovieWatchlisted } from '@core/infrastructure/storage/modules/movie';
import React from 'react';
import type { FlatListProps, ListRenderItem } from 'react-native';
import { screenWidth } from 'src/shared/constants';
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
    <MoviePoster path={movie.poster_path} />
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
    padding: theme.spacing['lg-plus'],
  },
}))``;

const GridItem = styled.TouchableOpacity`
  flex: 1;
  align-items: 'center';
  margin: ${({ theme }) => theme.spacing.md}px;
  max-width: ${screenWidth} / 3 - ${({ theme }) => theme.spacing.md + theme.spacing['lg-plus']}px;
`;
