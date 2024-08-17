import {Dimensions, Platform, PixelRatio} from 'react-native';
import {
  heightPercentageToDP as hptdp,
  widthPercentageToDP as wptdp,
} from 'react-native-responsive-screen';
import {RFValue as ResponsiveFontValue} from 'react-native-responsive-fontsize';

const fetchFontFamily = (weight: any) => {
  switch (weight) {
    case 300:
      return 'Poppins-Light';
    case 400:
      return 'Poppins-Regular';
    case 500:
      return 'Poppins-Medium';
    case 600:
      return 'Poppins-SemiBold';
    case 700:
      return 'Poppins-Bold';
    case 800:
      return 'Poppins-ExtraBold';
    default:
      return 'Poppins-Regular';
  }
};

const scaleFontSize = (value: number) => ResponsiveFontValue(value, 812);

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

const calcWidthPercentage = (input: number) => wptdp((input * 100) / 375);

const calcHeightPercentage = (input: number) => hptdp((input * 100) / 812);

const scalingFactor = DEVICE_WIDTH / 320;

const normalizeDimension = (size: any) => {
  const adjustedSize = size * scalingFactor;
  const roundedSize = PixelRatio.roundToNearestPixel(adjustedSize);
  return Platform.OS === 'ios'
    ? Math.round(roundedSize)
    : Math.round(roundedSize) - 2;
};

export const generateTextStyle = (
  weight: number,
  fontSizeValue: number,
  textColor: string,
) => {
  return {
    fontFamily: fetchFontFamily(weight),
    fontSize: scaleFontSize(fontSizeValue),
    color: textColor,
  };
};
export {
  fetchFontFamily,
  scaleFontSize,
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  calcWidthPercentage as wp,
  calcHeightPercentage as hp,
  normalizeDimension,
};
