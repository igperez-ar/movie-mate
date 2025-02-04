import { TextStyle } from 'react-native';
import { FlattenSimpleInterpolation } from 'styled-components';
import { css } from 'styled-components/native';

type StyleConverter<T> = (styles: T) => FlattenSimpleInterpolation;

export const createTypographyStyles: StyleConverter<TextStyle> = (styles) => css`
  ${Object.entries(styles)
    .map(([property, value]) => {
      const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
      const formattedValue = typeof value === 'number' ? `${value}px` : value;

      return `${cssProperty}: ${formattedValue};`;
    })
    .join('\n')}
`;
