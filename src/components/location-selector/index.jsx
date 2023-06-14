import { View, Text, Button, Image, Alert } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import MapPreview from '../map-preview';

const LocationSelector = ({ onLocation }) => {
  const [pickedLocation, setPickeLocation] = useState(null);

  const verifyPermissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permisos insuficientes', 'Se necesita autorización para obtener la ubicación', [
        { text: 'OK' },
      ]);
      return false;
    }
    return true;
  };

  const onHandlerLocation = async () => {
    const isLocationPermission = await verifyPermissions();
    if (!isLocationPermission) return;

    const location = await getCurrentPositionAsync({
      timeout: 5000,
    });

    const { latitude, longitude } = location.coords;

    setPickeLocation({ lat: latitude, lng: longitude });
    onLocation({ lat: latitude, lng: longitude });
  };

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview}>
          <Text style={styles.text}>Selecciona una ubicación</Text>
      </MapPreview>
      <Button title="Ubicame" color="#3EC300" onPress={onHandlerLocation} />
    </View>
  );
};
export default LocationSelector;
