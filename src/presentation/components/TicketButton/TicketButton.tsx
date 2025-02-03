import { GlowContainer, GradientContainer } from '@components/index';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { LinearGradientProps } from 'react-native-linear-gradient';
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
  return (
    <TouchableOpacity onPress={onPress}>
      <GlowContainer color={isActive ? glowColor : undefined}>
        <TicketContainer>
          <GradientContainer colors={colors}>
            <TextContainer>
              <ButtonText>{title}</ButtonText>
            </TextContainer>
          </GradientContainer>
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

const TicketContainer = styled.View`
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  border-radius: 4;
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
  opacity: ${({ isActive }) => (isActive ? 0 : 1)};
  background-color: ${({theme}) => theme.colors.overlay};
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
  font-size: 14px;
  font-family: Nunito;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
`;
