import React, {useCallback, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {onboarded} from '@store/state/onboardingSlice';

import Text from '@app/components/Text';
import {onboardingData} from '@app/constant/onboarding';
import PressableOpacity from './PressableOpacity';

const OnboardingScreen = () => {
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  const scrollTo = useCallback(
    (currentIndex: number) => {
      if (currentIndex >= onboardingData.length - 1) {
        dispatch(onboarded());
      } else {
        ref.current?.scrollToIndex({index: currentIndex + 1});
      }
    },
    [dispatch, onboardingData.length],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={onboardingData}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        bounces={false}
        scrollEventThrottle={30}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({item, index}) => (
          <View>
            <ImageBackground
              source={{uri: `${item.image}?t=${new Date().getTime()}`}}
              style={styles.image}>
              <View style={styles.darkOverlay}>
                <View>
                  <View style={styles.content}>
                    <Text style={styles.heading}>{item.title}</Text>
                    <Text style={styles.subtext}>{item.description}</Text>
                  </View>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <PressableOpacity
                      testID={`NextBtn${index}`}
                      onPress={() => scrollTo(index)}>
                      <View style={styles.button}>
                        <Text>
                          {index < onboardingData.length - 1
                            ? 'Next'
                            : 'Finish'}
                        </Text>
                      </View>
                    </PressableOpacity>
                    {index < onboardingData.length - 1 && (
                      <PressableOpacity
                        testID={`SkipBtn${index}`}
                        onPress={() => dispatch(onboarded())}>
                        <Text style={styles.skipButton}>Skip</Text>
                      </PressableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    height: 88,
    width: 88,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    color: '#fff',
    fontSize: 18,
    padding: 6,
    marginTop: 33,
  },
  image: {
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  darkOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    bottom: 0,
    paddingBottom: 40,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  content: {
    marginBottom: 28,
  },
  heading: {
    fontWeight: '600',
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 48,
    paddingHorizontal: 20,
  },
  subtext: {
    fontSize: 18,
    lineHeight: 27,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default OnboardingScreen;
