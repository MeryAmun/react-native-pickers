
import { useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getFileInfo, isLessOrEqualMaxSize } from "./utils";


export default function App() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);


  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  if (hasGalleryPermission === false) {
    // Camera permissions are still loading
    return <View style={styles.container} />;
  }

  if (hasGalleryPermission === false) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
   try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      Passthrough: 0,
      HighestQuality: 3,
    });
    if (result.assets[0].canceled) return
  

    if (!result.assets[0].canceled) {
      setImage(result.assets[0].uri);
   
    }
    console.log(result)
    //=================CALL CHECK FILE INFO AND FILE SIZE CHECK FUNCTIONS ==================== 
 const { assets } = result
    const fileInfo = await getFileInfo(assets[0].uri)
    
    if (!fileInfo?.size) {
      setMessage("Can't select this file as the size is unknown.")
      return
    }
    if (assets[0].type === 'image') {
      const imageSizeLimit = isLessOrEqualMaxSize(fileInfo.size, 50)
      if (!imageSizeLimit) {
        setMessage(`Image size must be smaller than 15MB!`)
        return
      }
    }

    if (assets[0].type === 'video') {
      const videoSizeLimit = isLessOrEqualMaxSize(fileInfo.size, 50)
      if (! videoSizeLimit) {
        setMessage("Video size must be smaller than 500MB!")
        return
      }
    }
 
   } catch (error) {
    console.log(error)
   }
  };





 
const onReset = () => {
  setImage(null)
}
  return (
    <View style={styles.container}>
    <View  style={styles.cameraContainer}>
    {image && (
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    )}
    </View>
   
    <View style={styles.icons}>
    <MaterialCommunityIcons
      name="image"
      color="grey"
      size={30}
    
      onPress={pickImage}
    />
    <Ionicons
name="attach-sharp"
 color="grey"
 size={30}
 
 onPress={pickImage}
/>
    </View>
    <View style={styles.buttonBox}>
    <Button title='save' onPress={() =>{}}
     style={styles.button}/>
    <Button title='cancel' onPress={onReset}
     style={styles.button}/>
    </View>
     <Text style={styles.text}>{message}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    gap:0
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  icons:{
    flexDirection: "row",
    backgroundColor: "transparent",
  justifyContent:"center",
    marginTop: 164,
    gap:15
  },
 
  buttonPick: {
    flex: 1,
    alignSelf: "flex-start",
    alignItems: "center",

    position: "absolute",
  },
  buttonBox:{
    width:"50%",
    flexDirection: "row",
  justifyContent:"center",
  alignItems:"flex-start",
    gap:15,
    marginTop: 54,
    marginBottom: 104,

  },
  
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
});
