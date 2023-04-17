import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import img from '../../assets/screen1_icon.png';
import img2 from '../../assets/screen2_icon.png';
import img3 from '../../assets/screen3_icon.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {theme} from '../../core/theme';

const dotData = ({selected}) => {
  let backgroundColor;
  backgroundColor = selected ? '#018795' : '#B0BEC5';
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
        borderRadius: 5,
      }}
    />
  );
};
export default function OnboardingScreen({navigation}) {
  return (
    <Onboarding
      imageContainerStyles={styles.iconStyle}
      titleStyles={styles.titleStyle}
      subTitleStyles={styles.text}
      // transitionAnimationDuration={2000}
      // transitionAnimationDuration={2000}
      DotComponent={dotData}
      onSkip={() => navigation.navigate('Auth')}
      onDone={() => navigation.navigate('Auth')}
      pages={[
        {
          image: <Image source={img} />,
          backgroundColor: 'white',
          title: 'Clean and Balanced water',
          subtitle:
            'Erie water is sourced from deep underground reservoirs and processed by using latest water purification technologies.',
        },
        {
          image: <Image source={img2} />,
          backgroundColor: 'white',
          title: 'Water Quality Assurance',
          subtitle:
            'Although, we left with no doubt the quality of purified water whicj is processed and filled through high tech machinery',
        },
        {
          image: <Image source={img3} />,
          backgroundColor: 'white',
          title: 'Instant Free Delivery',
          subtitle:
            "Erie's representative will delivery the water bottle at your door step without any additional charges",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    marginBottom: hp('10%'),
    // marginLeft: wp('20%'),
    // marginRight: wp('20%'),
  },
  titleStyle: {
    color: theme.colors.primary,
    fontFamily: 'Cursive',
    // fontWeight: '100',
  },
  text: {
    color: theme.colors.lightGrey,
    width: wp('60%'),
    marginBottom: wp('10%'),
    marginTop: wp('5%'),
  },
});
