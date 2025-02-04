import { ExpandableActionButton } from '@components/ExpandableActionButton/ExpandableActionButton';
import { MainContainer, MovieCarousel, MovieFeatured, ScrollContainer } from '@components/index';
import type { ScreenProps } from '@core/infrastructure/navigation/navigation.types';
import React from 'react';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';
import { createTypographyStyles } from 'src/shared/utils/typography';
import styled from 'styled-components/native';
import { useHomePresenter } from './home.presenter';
import type { MovieListCategory } from './home.types';

export const HomeScreen: React.FC<ScreenProps<GlobalRoutesEnum.HOME>> = (props) => {
  const { movieState, featuredMovie, goToDetail, setNextFeatured } = useHomePresenter(props);

  return (
    <>
      <MainContainer>
        {!movieState.loading ? (
          <ScrollContainer>
            {Object.entries(movieState.lists).map(([category, list], index) =>
              list.data?.length ? (
                <CarouselContainer key={category} first={index === 0}>
                  <TitleContainer>
                    <SectionTitle>{list.title}</SectionTitle>
                  </TitleContainer>
                  <MovieCarousel
                    data={list.data}
                    onPressItem={(item) => goToDetail(item.id, category as MovieListCategory)}
                  />
                </CarouselContainer>
              ) : null,
            )}
          </ScrollContainer>
        ) : null}
        {featuredMovie ? (
          <ExpandableActionButton isExpanded>
            <MovieFeatured
              movie={featuredMovie}
              onPress={() => goToDetail(featuredMovie.id)}
              onComplete={setNextFeatured}
            />
          </ExpandableActionButton>
        ) : null}
      </MainContainer>
    </>
  );
};

type CarouselContainerProps = {
  first?: boolean;
};
const CarouselContainer = styled.View<CarouselContainerProps>`
  margin-top: ${({ first, theme }) => (first ? 0 : theme.spacing['2xl'])}px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['md-plus']}px;
`;

const SectionTitle = styled.Text`
  ${({ theme }) => createTypographyStyles(theme.typography.h2)}
  font-size: 20px;
`;
