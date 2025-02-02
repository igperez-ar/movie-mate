import styled from 'styled-components/native';

export const ScrollContainer = styled.ScrollView.attrs((props) => ({
  scrollEventThrottle: 16,
  showsVerticalScrollIndicator: false,
  contentInsetAdjustmentBehavior: 'automatic',
  bounces: false,
  contentContainerStyle: { padding: props.theme.spacing.lg, ...(props.contentContainerStyle as object) },
}))``;
