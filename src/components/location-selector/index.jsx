import { View, Text, Button, Image, Alert } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import MapPreview from '../map-preview';
import { useNavigation, useRoute } from '@react-navigation/native';

const LocationSelector = ({ onLocation }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mapLocation } = route.params || {};

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

  const onHandlerLocation = async (isMaps = false) => {
    const isLocationPermission = await verifyPermissions();
    if (!isLocationPermission) return;

    const location = await getCurrentPositionAsync({
      timeout: 5000,
    });

    const { latitude, longitude } = location.coords;

    setPickeLocation({ lat: latitude, lng: longitude });
    onLocation({ lat: latitude, lng: longitude });

    if (isMaps) {
      navigation.navigate('Maps', { coords: { lat: latitude, lng: longitude } });
    }
  };

  useEffect(() => {
    if (mapLocation) {
      setPickeLocation(mapLocation);
      onLocation(mapLocation);
    }
  }, [mapLocation]);

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview}>
        <Text style={styles.text}>Selecciona una ubicación</Text>
      </MapPreview>
      <Button title="Ubícame" color="#3EC300" onPress={() =>onHandlerLocation()} />
      <Button
        title="Seleccionar ubicación"
        color="#3EC300"
        onPress={() => onHandlerLocation(true)}
      />
    </View>
  );
};
export default LocationSelector;
