
import { useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View,Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getFileInfo, isLessOrEqualMaxSize } from "./src/utils";
import * as MediaLibrary from 'expo-media-library';
import VideoPicker from "./src/components/Video";
import * as DocumentPicker from "expo-document-picker";



export default function App() {
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [videoUri, setVideoUri] = useState("");
  const [document, setDocument] = useState("");


  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  if ( hasGalleryPermission === false) {
    
    return <View style={styles.container} >
      <Text>Waiting for Camera permissions...</Text>
      </View>;
  }

  if ( hasGalleryPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }


  //=======================PICK DOCUMENT =====================

const handleDocumentPicker = async () => {
  //const FileSizeLimit = isLessOrEqualMaxSize(fileInfo.size, 50);
  let result = await DocumentPicker.getDocumentAsync({});
    
  
   //=================CALL CHECK FILE INFO AND FILE SIZE CHECK FUNCTIONS ==================== 

//  const { assets } = result
//  const fileInfo = await getFileInfo(assets[0].uri)
 
 if (!result?.size) {
   Alert.alert('Warning',"Can't select this file as the size is unknown.", [
     {
       text: 'Cancel',
       style: 'cancel',
     },
   ])
   return
 }
 if (result?.mimeType === "audio/mpeg"||result?.mimeType === "video/mp4" ||result?.mimeType === "image/jpeg") {
   Alert.alert('Warning',"Can't select this file as it is not a document.", [
     {
       text: 'Cancel',
       style: 'cancel',
     },
   ])
   return
 }

    const documentSizeLimit = isLessOrEqualMaxSize(result.size, 50)
   if (!documentSizeLimit) {
     Alert.alert('Warning','Document size must be smaller than 50MB!!', [
       {
         text: 'Cancel',
         style: 'cancel',
       },
       {
         text: 'Ok',
         onPress: async() => {onReset},
       }
     ])
     return
   }
   setDocument(result.uri)
   console.log(result);
   console.log(document);
   Alert.alert('Success','Document selected and ready for upload', [

    {
      text: 'Ok',
      onPress: async() => {onReset},
    }
  ])

   //alert(result.uri);
 
   //console.log(result);
   console.log(document);
    
    //we will implement max document size during upload
    
    }


//======================PICK IMAGE================

  const videoAndImagePicker = async () => {
    // No permissions request is necessary for launching the image library
   try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
  
    });
    if (result.assets[0].canceled) return
  

    if (!result.assets[0].canceled && result.assets[0].type === "image") {
      setImage(result.assets[0].uri);
   
    }
    if (!result.assets[0].canceled && result.assets[0].type === "video") {
      setVideoUri(result.assets[0].uri);
   
    }
    //console.log(result)


    //=================CALL CHECK FILE INFO AND FILE SIZE CHECK FUNCTIONS ==================== 

 const { assets } = result
    const fileInfo = await getFileInfo(assets[0].uri)
    
    if (!fileInfo?.size) {
      Alert.alert('Warning',"Can't select this file as the size is unknown.", [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ])
    }
    if (assets[0].type === 'image') {
      const imageSizeLimit = isLessOrEqualMaxSize(fileInfo.size, 50)
      if (!imageSizeLimit) {
        Alert.alert('Warning','Image size must be smaller than 50MB!!', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Ok',
            onPress: () => {onReset},
          }
        ])
        return
      }
    }

    if (assets[0].type === 'video') {
      const videoSizeLimit = isLessOrEqualMaxSize(fileInfo.size, 50)
      if (! videoSizeLimit) {
        Alert.alert('Warning','Video size must be smaller than 50MB!', [
          {
            text: 'Cancel',
            style: 'cancel',

          },
          {
            text: 'Ok',
            onPress: () => {onReset},
          }
        ]);
      };
      
        return
      }
 
   } catch (error) {
    console.log(error)
   }
  };




  const pickerOptions: ImagePicker.ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    allowsMultipleSelection: false,
  };

const openCameraAsync = async () => {
    const status = await ImagePicker.requestCameraPermissionsAsync();
    let { status2 } = await MediaLibrary.requestPermissionsAsync();
    console.log(status2)
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo', 'video'],
    })

    if (!status.granted) {
      return;
    }

    if (Platform.OS === 'android' && pickerOptions.mediaTypes === ImagePicker.MediaTypeOptions.All) {
      androidSelectVideoOrImagePrompt();
      return;
    }

    const result = await ImagePicker.launchCameraAsync(pickerOptions);
   // await MediaLibrary.getAssetInfoAsync(result.assets[0].type)
    MediaLibrary.saveToLibraryAsync(result.assets[0].uri)
console.log(result)
    //await mediaResponseAsync(result);
}

const androidSelectVideoOrImagePrompt =  () => {
  Alert.alert('Select Media', 'Would you like to take a picture or record a video?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Image',
      onPress: () => {
        pickerOptions.mediaTypes = ImagePicker.MediaTypeOptions.Images;
        openCameraAsync();
      
      },
    },
    {
      text: 'Video',
      onPress: () => {
        pickerOptions.mediaTypes = ImagePicker.MediaTypeOptions.Videos;
        openCameraAsync();
      },
    },
  ]);
};




 
const onReset = () => {
  setImage(null)
  setVideoUri(null);
  setDocument(null)
}
  return (
    <View style={styles.container}>
    <View  style={styles.cameraContainer}>
    {image ? (
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    ) : videoUri ? (
      <VideoPicker 
      uri={videoUri}
      /> ) 
      
      : (
      <View style={styles.cameraContainer}>
        {/* <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => setCamera(ref)}
          ratio={"1:1"}
        /> */}
      </View> )
    
    }
    </View>
   
    <View style={styles.icons}>
    {/* <MaterialCommunityIcons
        name="camera-flip-outline"
        color="grey"
        size={30}
        style={styles.button}
        onPress={toggleCameraType}
      /> */}
      <MaterialCommunityIcons
        name="camera-outline"
        color="grey"
        size={30}
        style={styles.buttonTake}
        onPress={openCameraAsync}
      />
    <MaterialCommunityIcons
      name="image"
      color="grey"
      size={30}
    
      onPress={videoAndImagePicker}
    />
    <Ionicons
name="attach-sharp"
 color="grey"
 size={30}
 
 onPress={handleDocumentPicker}
/>
    </View>
    <View style={styles.buttonBox}>
    <Button title='save' onPress={() =>{}}
     style={styles.button}/>
    <Button title='cancel' onPress={onReset}
     style={styles.button}/>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
    gap:0,
    width: "100%",
    height: "100%",
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
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
