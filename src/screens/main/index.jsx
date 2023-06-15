import { View, Button, Alert, Text } from 'react-native';
import { styles } from './styles';
import { ImageSelector, LocationSelector } from '../../components';
import { useState } from 'react';
import { documentDirectory, copyAsync } from 'expo-file-system';
import { URL_GEOCODING } from '../../utils/maps';

const MainScreen = () => {
  const [image, setImage] = useState('');
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState('');

  const enableButton = image && coords;

  const getImage = (imageUri) => {
    setImage(imageUri);
  };

  const getLocation = (location) => {
    setCoords(location);
  };

  const saveImage = async () => {
    const filename = image.split('/').pop();
    const newPath = `${documentDirectory}${filename}`;

    try {
      await copyAsync({
        from: image,
        to: newPath,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getDireccion = async () => {
    const response = await fetch(URL_GEOCODING(coords.lat, coords.lng));

    const data = await response.json();

    if (!data.results) return Alert.alert('No se ha podido encontrar la dirección del lugar');

    const direccion = data.results[0].formatted_address;
    setAddress(direccion);
  };

  const onConfirmar = async () => {
    saveImage();
    getDireccion();
  };

  return (
    <View style={styles.container}>
      <ImageSelector onImage={getImage} />

      <LocationSelector onLocation={getLocation} />

      <Button title="Confirmar" disabled={!enableButton} onPress={onConfirmar} />
      <Text>{address}</Text>
    </View>
  );
};

export default MainScreen;
