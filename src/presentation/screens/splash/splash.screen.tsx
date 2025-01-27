import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LogoTMDB } from 'assets/images';
import React from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalRoutesEnum } from 'src/shared/enums/routes';
import { useSplashPresenter } from './splash.presenter';

export const SplashScreen: React.FC<
  NativeStackScreenProps<ReactNavigation.MainNavigator, GlobalRoutesEnum.SPLASH>
> = (props) => {
  const { opacity } = useSplashPresenter(props);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View style={[styles.container, { opacity }]}>
        <Text style={styles.title}>MovieMate</Text>
        <View style={styles.footer}>
          <Text style={styles.credit}>Powered by</Text>
          <Image source={LogoTMDB} style={styles.logo} resizeMode="contain" />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  logo: {
    height: 25,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  credit: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 10,
  },
});
