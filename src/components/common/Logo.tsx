import React from 'react';
import { Image, ImageStyle } from 'react-native';
import { images } from '../../assets/images';

interface LogoProps {
  size?: number;
  style?: ImageStyle;
}

export const Logo: React.FC<LogoProps> = ({ size = 40, style }) => {
  // Calculate the dimensions while maintaining aspect ratio
  const imageStyle = {
    width: size,
    height: size,
    // Using resizeMode='contain' ensures the logo fits within
    // the specified dimensions without distortion
    resizeMode: 'contain' as const,
  };

  return (
    <Image
      source={images.logo}
      style={[imageStyle, style]}
      // Adding these props improves image loading performance
      fadeDuration={0}
      accessible={true}
      accessibilityLabel="SwoleStory Logo"
    />
  );
};
