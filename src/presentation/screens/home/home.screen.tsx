import { MainContainer, MovieCarousel, MovieFeatured, ScrollContainer } from '@components/index';
import type { ScreenProps } from '@core/infrastructure/navigation/navigation.types';
import React from 'react';
import { View } from 'react-native';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';
import styled from 'styled-components/native';
import { useHomePresenter } from './home.presenter';

export const HomeScreen: React.FC<ScreenProps<GlobalRoutesEnum.HOME>> = (props) => {
  const { movieState, featuredMovie, goToDetail } = useHomePresenter(props);

  return (
    <>
      <MainContainer>
        {!movieState.loading ? (
          <ScrollContainer>
            {Object.entries(movieState.lists).map(([category, movies]) =>
              movies?.length ? (
                <View key={category}>
                  <SectionTitle>{category.toUpperCase()}</SectionTitle>
                  <MovieCarousel data={movies} onPressItem={(item) => goToDetail(item.id)} />
                </View>
              ) : null,
            )}
          </ScrollContainer>
        ) : null}
        {featuredMovie ? (
          <MovieFeatured {...featuredMovie} onPress={() => goToDetail(featuredMovie.id)} />
        ) : null}
      </MainContainer>
    </>
  );
};

const SectionTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 8px;
`;
