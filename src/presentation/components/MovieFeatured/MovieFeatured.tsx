import { MoviePoster } from '@components/index';
import { Movie } from '@core/capabilities/movies';
import styled from 'styled-components/native';

type MovieFeaturedProps = Movie & {
  onPress?: () => void;
};

export const MovieFeatured: React.FC<MovieFeaturedProps> = (props) => {
  return (
    <FeaturedContainer>
      <MoviePoster path={props.poster_path} size={180} />
      <DetailContainer>
        <DescriptionText numberOfLines={6}>{props.overview}</DescriptionText>
        {props.onPress ? (
          <ActionButton onPress={props.onPress}>
            <ButtonText>See more</ButtonText>
          </ActionButton>
        ) : null}
      </DetailContainer>
    </FeaturedContainer>
  );
};

const FeaturedContainer = styled.View`
  bottom: 0px;
  flex-direction: row;
  padding: 16px;
  background-color: #1a1a1a;
`;

const DetailContainer = styled.View`
  flex: 1;
  margin-left: 16px;
  justify-content: space-between;
`;

const DescriptionText = styled.Text`
  color: #cccccc;
  line-height: 20px;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #e50914;
  padding: 12px;
  border-radius: 6px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
`;
