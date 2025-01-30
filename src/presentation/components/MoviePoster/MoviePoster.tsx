import type { Movie } from '@core/capabilities/movies';
import Config from 'react-native-config';
import { scale } from 'src/shared/utils/sizes';
import styled from 'styled-components/native';

type MoviePosterProps = {
  path: Movie['poster_path'];
  quality?: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
  size?: number;
};

export const MoviePoster: React.FC<MoviePosterProps> = ({
  path,
  quality = 'w500',
  size = 150,
}) => {
  const URL = `${Config.API_IMAGE_URL}/${quality}/${path}`;

  return <Poster source={{ uri: URL }} resizeMode="contain" height={scale(size)} />;
};

const Poster = styled.Image`
  aspect-ratio: 640 / 960;
  border-radius: 8px;
  background-color: #404040;
`;
