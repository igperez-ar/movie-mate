import React, { type PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, Easing, type ViewProps } from 'react-native';
import LinearGradient, { type LinearGradientProps } from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export type GradientContainerProps = PropsWithChildren<{
  colors: LinearGradientProps['colors'];
  animated?: boolean;
}> &
  ViewProps;

export const GradientContainer: React.FC<GradientContainerProps> = ({
  animated = true,
  colors,
  children,
  ...props
}) => {
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      const animation = Animated.loop(
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      animation.start();
      return () => animation.stop();
    }
  }, [animated]);

  const rotateInterpolation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <Container style={{ transform: [{ rotate: rotateInterpolation }] }} {...props}>
        <Gradient colors={colors} useAngle angle={45} />
      </Container>
      {children}
    </>
  );
};

const Gradient = styled(LinearGradient)`
  flex: 1;
`;

const Container = styled(Animated.View)`
  position: absolute;
  align-self: center;
  width: 120%;
  left: -10%;
  aspect-ratio: 1;
`;
