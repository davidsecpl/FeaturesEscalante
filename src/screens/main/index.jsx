import { View, Button, Alert } from 'react-native';
import { styles } from './styles';
import { ImageSelector, LocationSelector } from '../../components';
import { useState } from 'react';
import { documentDirectory, copyAsync } from 'expo-file-system';

const MainScreen = () => {
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');

  const getImage = (imageUri) => {
    setImage(imageUri);
  };

  const getLocation = (location)=>{
    setLocation(location);
  }

  const saveImage = async () => {
    const filename = image.split('/').pop();
    const newPath = `${documentDirectory}${filename}`;

    try {
      await copyAsync({
        from: image,
        to: newPath,
      });
      Alert.alert(newPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageSelector onImage={getImage} />
      
      <LocationSelector onLocation={getLocation}/>

      <Button title="Guardar" onPress={saveImage} />
    </View>
  );
};

export default MainScreen;
