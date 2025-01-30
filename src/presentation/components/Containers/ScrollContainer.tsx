import { theme } from 'src/app/theme/theme';
import styled from 'styled-components/native';

export const ScrollContainer = styled.ScrollView.attrs({
  scrollEventThrottle: 16,
  showsVerticalScrollIndicator: false,
  contentInsetAdjustmentBehavior: 'automatic',
  bounces: false,
  contentContainerStyle: { padding: theme.spacing.lg },
})``;
