import MaterialIcon from '@react-native-vector-icons/material-design-icons';
import React, { type ComponentProps } from 'react';
import { scale } from 'src/shared/utils/sizes';

export type IconProps = ComponentProps<typeof MaterialIcon>;

export const Icon: React.FC<IconProps> = ({ size = 12, ...props }) => {
  return <MaterialIcon color="white" size={scale(size)} {...props} />;
};
