import { GradientContainer } from '@components/Containers/GradientContainer';
import { Icon } from '@components/Icon/Icon';
import React, { type PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from 'src/shared/constants';
import { scale } from 'src/shared/utils/sizes';
import styled, { useTheme } from 'styled-components/native';

export type ExpandableActionButtonProps = PropsWithChildren<{
  duration?: number;
  isExpanded?: boolean;
}>;

const BUTTON_SIZE = scale(60);
const CARD_HEIGHT = scale(250);
const INITIAL_RIGHT = scale(20);
const INITIAL_BOTTOM = scale(20);

export const ExpandableActionButton: React.FC<ExpandableActionButtonProps> = ({
  duration = 400,
  isExpanded = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(isExpanded);
  const animation = useRef(new Animated.Value(0)).current;
  const theme = useTheme();

  const CARD_WIDTH = SCREEN_WIDTH - theme.spacing.md * 2;
  const TARGET_LEFT = (SCREEN_WIDTH - CARD_WIDTH) / 2;

  const animate = (toValue: number) => {
    Animated.timing(animation, {
      toValue,
      duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (isExpanded) animate(1);
  }, [isExpanded]);

  const toggleExpansion = () => {
    const newValue = !isOpen;
    setIsOpen(newValue);
    animate(newValue ? 1 : 0);
  };

  const animatedValues = {
    left: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [SCREEN_WIDTH - BUTTON_SIZE - INITIAL_RIGHT, TARGET_LEFT],
    }),
    width: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [BUTTON_SIZE, CARD_WIDTH],
    }),
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [BUTTON_SIZE, CARD_HEIGHT],
    }),
    borderRadius: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [BUTTON_SIZE / 2, 16],
    }),
    contentOpacity: animation.interpolate({
      inputRange: [0.7, 1],
      outputRange: [0, 1],
    }),
    contentScale: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    }),
  };

  return (
    <MainContainer>
      <TouchableWithoutFeedback onPress={toggleExpansion} testID='expandable_button'>
        <ButtonContainer
          left={animatedValues.left}
          width={animatedValues.width}
          height={animatedValues.height}
          borderRadius={animatedValues.borderRadius}
        >
          {!isOpen && (
            <GradientContainer colors={['#3d0a0a', '#6d1c1c', '#b62b2b', '#f55b5b', '#ff8f8f']}>
              <IconContainer>
                <Icon name="theater" size={24} />
              </IconContainer>
            </GradientContainer>
          )}

          <ContentContainer
            opacity={animatedValues.contentOpacity}
            scale={animatedValues.contentScale}
          >
            {children}
          </ContentContainer>
        </ButtonContainer>
      </TouchableWithoutFeedback>
    </MainContainer>
  );
};

const MainContainer = styled.View`
  position: absolute;
  bottom: ${INITIAL_BOTTOM}px;
`;

type ButtonProps = {
  left: Animated.AnimatedInterpolation<string | number>;
  width: Animated.AnimatedInterpolation<string | number>;
  height: Animated.AnimatedInterpolation<string | number>;
  borderRadius: Animated.AnimatedInterpolation<string | number>;
};
const ButtonContainer = styled(Animated.View).attrs<ButtonProps>((props) => ({
  style: {
    left: props.left,
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius,
  },
}))<ButtonProps>`
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  border-color: ${({ theme }) => theme.colors.surface};
  border-width: 2px;
`;

const IconContainer = styled.View`
  position: absolute;
`;

type ContentContainerProps = {
  opacity: Animated.AnimatedInterpolation<string | number>;
  scale: Animated.AnimatedInterpolation<string | number>;
};
const ContentContainer = styled(Animated.View).attrs<ContentContainerProps>(
  ({ opacity, scale }) => ({
    style: {
      opacity,
      transform: [{ scale }],
    },
  }),
)<ContentContainerProps>`
  width: 100%;
  height: 100%;
`;
