import { MoviePoster } from '@components/MoviePoster/MoviePoster';
import type { Movie } from '@core/capabilities/movies';
import React from 'react';
import { TouchableOpacity, type FlatListProps, type ListRenderItem } from 'react-native';
import { SCREEN_WIDTH } from 'src/shared/constants';
import { scale } from 'src/shared/utils/sizes';
import styled from 'styled-components/native';

type MovieCarouselProps = Partial<FlatListProps<Movie>> & {
  onPressItem?: (item: Movie) => void;
  data: Movie[];
};

const CarouselItem: React.FC<{ movie: Movie; onPress?: (item: Movie) => void }> = ({
  movie,
  onPress,
}) => (
  <TouchableOpacity onPress={() => onPress?.(movie)}>
    <MoviePoster path={movie.poster_path} size={100} />
  </TouchableOpacity>
);

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  data,
  onPressItem,
  ...flatListProps
}) => {
  const renderItem: ListRenderItem<Movie> = ({ item }) => (
    <CarouselItem movie={item} onPress={onPressItem} />
  );

  return (
    <Carousel
      {...flatListProps}
      horizontal
      data={data}
      keyExtractor={(item: Movie) => item.id}
      ItemSeparatorComponent={<Separator />}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: scale(16) }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const Carousel = styled.FlatList`
  width: ${SCREEN_WIDTH}px;
  margin: 0 -${({ theme }) => theme.spacing.lg}px;
`;

const Separator = styled.TouchableOpacity`
  width: ${({ theme }) => theme.spacing.md}px;
`;
