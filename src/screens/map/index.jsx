import Ionicons from "@expo/vector-icons/Ionicons";
import { useLayoutEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { styles } from "./styles";

const MapsScreen = ({ navigation, route }) => {
  const { coords } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);

  const initialRegion = {
    latitude: coords?.lat,
    longitude: coords?.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onHandlerPickLocation = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const onHandlerSaveLocation = () => {
    if (selectedLocation) navigation.navigate("Main", { mapLocation: selectedLocation });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity disabled={!selectedLocation} onPress={onHandlerSaveLocation}>
          <Ionicons
            name="md-save-sharp"
            size={21}
            color={!selectedLocation ? '#BDC4A7' : '#080705'}
          />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <MapView
      initialRegion={initialRegion}
      style={styles.container}
      onPress={onHandlerPickLocation}
      minZoomLevel={14}>
      {selectedLocation ? (
        <Marker
          title="Ubicacion Seleccionada"
          coordinate={{
            latitude: selectedLocation?.lat,
            longitude: selectedLocation?.lng,
          }}
        />
      ) : null}
    </MapView>
  );
};

export default MapsScreen;