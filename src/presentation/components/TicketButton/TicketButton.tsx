import { GlowContainer } from '@components/Containers/GlowContainer';
import { GradientContainer } from '@components/Containers/GradientContainer';
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
  border-radius: 4px;
`;

const DetailsContainer = styled.View`
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  position: absolute;
  flex-direction: row;
  align-items: center;
`;

const DottedDivider = styled.View`
  left: -1px;
  border-style: dotted;
  border-color: ${({ theme }) => theme.colors.background};
  border-width: 2px;
  height: 130%;
  width: 80%;
`;

const OpacitySquare = styled.View<{ isActive: boolean }>`
  left: -2px;
  width: 100%;
  height: 100%;
  justify-content: center;
  opacity: ${({ isActive }) => (isActive ? 0 : 1)};
  background-color: ${({ theme }) => theme.colors.overlay};
`;

const Circle = styled.View<{ color?: string }>`
  position: absolute;
  height: 50%;
  aspect-ratio: 1;
  right: -15px;
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
