import type { Movie } from '@core/capabilities/movies';
import Icon from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import type { ImageProps } from 'react-native';
import Config from 'react-native-config';
import { scale } from 'src/shared/utils/sizes';
import styled from 'styled-components/native';

type MoviePosterProps = ImageProps & {
  path: Movie['poster_path'];
  quality?: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
  size?: number;
};

export const MoviePoster: React.FC<MoviePosterProps> = ({ quality = 'w500', ...props }) => {
  const URL = `${Config.API_IMAGE_URL}/${quality}/${props.path}`;

  return (
    <PosterContainer>
      <NoImageIcon name="camera-off" size={scale(24)} color="gray" />
      <Poster source={{ uri: URL }} resizeMode="contain" {...props} />
    </PosterContainer>
  );
};

const PosterContainer = styled.View`
  justify-content: center;
  background-color: #404040;
  border-radius: 8px;
  overflow: hidden;
`;

const Poster = styled.Image<MoviePosterProps>`
  width: ${({ size }) => (size ? scale(size) + 'px' : 'undefined')};
  aspect-ratio: 640 / 960;
`;

const NoImageIcon = styled(Icon)`
  position: absolute;
  align-self: center;
`;
