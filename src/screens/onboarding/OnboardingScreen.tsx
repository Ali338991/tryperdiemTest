import React, {useCallback, useRef} from 'react';
import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {onboarded} from '@store/state/onboardingSlice';
import Text from '@app/components/Text';
import {onboardingData} from '@app/constant';
import PressableOpacity from '@components/PressableOpacity';
import {COLOR} from '@app/constant/color';
import {normalizeDimension, DEVICE_WIDTH, hp, wp} from '@app/util/design';

const OnboardingScreen = () => {
  const ref = useRef<FlatList>(null);
  const dispatch = useDispatch();

  const scrollTo = useCallback(
    (currentIndex: number) => {
      if (currentIndex >= onboardingData.length - 1) {
        dispatch(onboarded());
      } else {
        ref.current?.scrollToIndex({index: currentIndex + 1});
      }
    },
    [dispatch],
  );

  return (
    <FlatList
      ref={ref}
      data={onboardingData}
      keyExtractor={(_, i) => i.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      renderItem={({item, index}) => (
        <ImageBackground
          source={{uri: `${item.image}?t=${new Date().getTime()}`}}
          style={styles.image}>
          <View style={styles.darkOverlay}>
            <View style={styles.gap}>
              <Text color="white" weight="600" align="center" size={32}>
                {item.title}
              </Text>
              <Text color="white" align="center" size={18}>
                {item.description}
              </Text>
            </View>
            <PressableOpacity
              testID={`NextBtn${index}`}
              style={styles.button}
              onPress={() => scrollTo(index)}>
              <Text color="white" weight="700">
                {index < onboardingData.length - 1 ? 'Next' : 'Finish'}
              </Text>
            </PressableOpacity>
            {index < onboardingData.length - 1 && (
              <PressableOpacity
                testID={`SkipBtn${index}`}
                onPress={() => dispatch(onboarded())}>
                <Text color="white">Skip</Text>
              </PressableOpacity>
            )}
          </View>
        </ImageBackground>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: COLOR.primaryColor,
    height: hp(88),
    width: wp(88),
    borderRadius: normalizeDimension(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: DEVICE_WIDTH,
    flex: 1,
    justifyContent: 'center',
  },
  darkOverlay: {
    backgroundColor: COLOR.shadow,
    width: DEVICE_WIDTH,
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    paddingBottom: normalizeDimension(40),
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: normalizeDimension(20),
  },
  gap: {
    gap: normalizeDimension(5),
  },
});

export default OnboardingScreen;
