import React, { type PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, Platform, type ViewProps } from 'react-native';
import styled from 'styled-components';

type GlowContainerProps = PropsWithChildren<{
  animated?: boolean;
  color?: string;
  duration?: number;
}> &
  ViewProps;

export const GlowContainer: React.FC<GlowContainerProps> = ({
  animated = true,
  color,
  children,
  duration = 1000,
  ...props
}) => {
  const glowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!!color && animated) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnimation, {
            toValue: 1,
            duration,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnimation, {
            toValue: 0,
            duration,
            useNativeDriver: false,
          }),
        ]),
      );
      animation.start();
      return () => animation.stop();
    }
  }, [color, animated]);

  return (
    <Container glowColor={color} shadowOpacity={animated ? glowAnimation : 1} {...props}>
      {children}
    </Container>
  );
};

type ContainerProps = {
  glowColor?: string;
  shadowOpacity: Animated.Value | number;
};

const Container = styled(Animated.View).attrs<ContainerProps>(({ shadowOpacity }) => ({
  style: { shadowOpacity },
}))<ContainerProps>`
  ${({ glowColor, theme }) =>
    glowColor &&
    Platform.select({
      ios: `
      shadow-color: ${glowColor};
      shadow-offset: 0px 0px;
      shadow-radius: ${theme.spacing.md}px;
    `,
      android: `
      elevation: 5;
    `,
    })}
`;
