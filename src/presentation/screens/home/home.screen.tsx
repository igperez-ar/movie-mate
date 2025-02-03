import { ExpandableActionButton } from '@components/ExpandableActionButton/ExpandableActionButton';
import { MainContainer, MovieCarousel, MovieFeatured, ScrollContainer } from '@components/index';
import type { ScreenProps } from '@core/infrastructure/navigation/navigation.types';
import React from 'react';
import { View } from 'react-native';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';
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
            {Object.entries(movieState.lists).map(([category, list]) =>
              list.data?.length ? (
                <View key={category}>
                  <TitleContainer>
                    <SectionTitle>{list.title}</SectionTitle>
                  </TitleContainer>
                  <MovieCarousel
                    data={list.data}
                    onPressItem={(item) => goToDetail(item.id, category as MovieListCategory)}
                  />
                </View>
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

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing['2xl']}px;
  margin-bottom: ${({ theme }) => theme.spacing['md-plus']}px;
`;

const SectionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 20px;
  font-weight: bold;
  font-family: Nunito;
  text-transform: capitalize;
`;
