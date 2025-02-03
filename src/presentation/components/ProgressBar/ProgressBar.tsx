import React, { useEffect, useRef } from 'react';
import { Animated, type ViewProps } from 'react-native';
import styled from 'styled-components/native';

type ProgressBarProps = ViewProps & {
  duration?: number;
  onComplete?: () => void;
  backgroundColor?: string;
  color?: string;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  color,
  duration = 5000,
  onComplete,
  ...props
}) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    }).start(() => {
      onComplete?.();
    });
  }, [progress, onComplete]);

  const widthAnimated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Container {...props}>
      <AnimatedBar color={color} width={widthAnimated} />
    </Container>
  );
};

const Container = styled.View<{ backgroundColor?: string }>`
  height: 6px;
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor ?? 'gray'};
  overflow: hidden;
`;

type AnimatedBarProps = {
  color?: string;
  width: Animated.AnimatedInterpolation<string | number>;
};

const AnimatedBar = styled(Animated.View).attrs<AnimatedBarProps>((props) => ({
  style: {
    width: props.width,
  },
}))<AnimatedBarProps>`
  height: 100%;
  background-color: ${({ color }) => color ?? 'white'};
`;
