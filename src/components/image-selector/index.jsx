import { View, Text, Image, Button, Alert } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import { requestCameraPermissionsAsync, launchCameraAsync } from 'expo-image-picker';

const ImageSelector = ({ onImage }) => {
  const [pickerUrl, setPickerUrl] = useState(null);

  const verifyPermissions = async () => {
    const { status } = await requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita autorización para usar la camara', [
        { text: 'Ok' },
      ]);
      return false;
    }
    return true;
  };

  const onHandlerTakeImage = async () => {
    const isCameraPermission = await verifyPermissions();

    if (!isCameraPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    console.warn('image', image);
    setPickerUrl(image.uri);
    onImage(image.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickerUrl ? (
          <Text style={styles.textAlternative}>No hay imagen seleccionada</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickerUrl }} />
        )}
      </View>
      <Button title="Tomar Foto" color="#3EC300" onPress={onHandlerTakeImage} />
    </View>
  );
};

export default ImageSelector;
