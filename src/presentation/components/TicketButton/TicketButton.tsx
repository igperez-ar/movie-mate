import React, { useEffect, useRef } from 'react';
import { Animated, Platform, TouchableOpacity, View } from 'react-native';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import styled from 'styled-components/native';

type TicketButtonProps = {
  title: string;
  onPress: () => void;
  isActive: boolean;
  glowColor?: string;
  colors: LinearGradientProps['colors'];
};

export const TicketButton: React.FC<TicketButtonProps> = ({
  title,
  onPress,
  isActive,
  glowColor,
  colors,
}) => {
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.sequence([
          Animated.timing(glowAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]),
      ]),
    ).start();
  }, []);

  const rotateInterpolation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <GlowContainer
        glowColor={!isActive ? glowColor : undefined}
        style={{ shadowOpacity: glowAnimation }}
      >
        <TicketContainer>
          <GradientContainer
            style={{
              transform: [{ rotate: rotateInterpolation }],
            }}
          >
            <Gradient colors={colors} useAngle angle={45}></Gradient>
          </GradientContainer>
          <TextContainer>
            <ButtonText>{title}</ButtonText>
          </TextContainer>
        </TicketContainer>
        <DetailsContainer>
          <DottedDivider />
          <OpacitySquare isActive={isActive} />
          <Circle color={glowColor} />
        </DetailsContainer>
      </GlowContainer>
    </TouchableOpacity>
  );
};

const GlowContainer = styled(Animated.View)<{ glowColor?: string }>`
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

const TicketContainer = styled.View`
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  border-radius: 4;
`;

const Gradient = styled(LinearGradient)`
  flex: 1;
`;

const GradientContainer = styled(Animated.View)`
  position: absolute;
  width: 120%;
  left: -10%;
  aspect-ratio: 1;
`;

const DetailsContainer = styled.View`
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 4;
  position: absolute;
  flex-direction: row;
  align-items: center;
`;

const DottedDivider = styled.View`
  left: -1;
  border-style: dotted;
  border-color: ${({ theme }) => theme.colors.background};
  border-width: 2;
  height: 130%;
  width: 80%;
`;

const OpacitySquare = styled.View<{ isActive: boolean }>`
  left: -2;
  width: 100%;
  height: 100%;
  justify-content: center;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  background-color: #000000ac;
`;

const Circle = styled.View<{ color?: string }>`
  position: absolute;
  height: 50%;
  aspect-ratio: 1;
  right: -15;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const TextContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  align-items: center;
  width: 80%;
`;

const ButtonText = styled.Text`
  text-transform: uppercase;
  font-size: 14;
  font-family: Maple Mono;
  font-weight: bold;
  color: white;
`;
