import { View, Text } from 'react-native';
import { styles } from './styles';
import { ImageSelector } from '../../components';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <ImageSelector/>
    </View>
  );
};

export default MainScreen;
