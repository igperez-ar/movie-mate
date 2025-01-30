import type { ScreenProps } from '@core/infrastructure/navigation/navigation.types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';
import { useWelcomePresenter } from './welcome.presenter';

export const WelcomeScreen: React.FC<ScreenProps<GlobalRoutesEnum.WELCOME>> = (props) => {
  const { handleButtonPress } = useWelcomePresenter(props);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MovieMate!</Text>
      <Text style={styles.description}>
        Explore the world of cinema with personalized recommendations, lists and more
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
