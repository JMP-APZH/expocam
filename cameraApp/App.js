import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import React, { useEffect, useRef, useState } from 'react';

import { Camera } from 'expo-camera';

export default function App() {

  let cameraRef = useRef();

  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [camera, setCamera] = useState();
  const [image, setImage] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      // const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      
      // setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");

    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      setImage(data.uri);
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No Camera Access</Text>;
  }

  return (
    <View 
      style={{flex:1}}
    >
      <View style={styles.cameraContainer}>
        <Camera 
          ref={ref => setCamera(ref)}
          styles={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>
      <Button
        title="Flip Camera"
        onPress={() => {
          setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
        }}></Button>
        <Button
        title="Take Picture"
        onPress={() => takePicture()}></Button>
        {image && <Image source={{uri: image}} style={{flex:1}} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }
});
