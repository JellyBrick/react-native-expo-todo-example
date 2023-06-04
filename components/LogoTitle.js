import { Image } from 'react-native';
import HomeImage from '../assets/snack-icon.png';

const LogoTitle = () => {
  return (
    <Image
      style={{
        width: 40,
        height: 40,
      }}
      source={HomeImage}
    />
  )
}

export default LogoTitle;