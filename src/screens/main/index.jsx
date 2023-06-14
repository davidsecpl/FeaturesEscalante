import { View, Button, Alert } from 'react-native';
import { styles } from './styles';
import { ImageSelector } from '../../components';
import { useState } from 'react';
import { documentDirectory, moveAsync } from 'expo-file-system';

const MainScreen = () => {
  const [image, setImage] = useState('');

  const getImage = (imageUri) => {
    setImage(imageUri);
  };

  const saveImage = async () => {
    const filename = image.split('/').pop();
    const newPath = `${documentDirectory}${filename}`;

    try {
      await moveAsync({
        from: image,
        to: newPath,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageSelector onImage={getImage} />
      <Button title="Guardar Foto" onPress={saveImage} />
    </View>
  );
};

export default MainScreen;
