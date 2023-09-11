import React, { useState, useEffect,useRef,useCallback } from 'react'
import { Text, View, StyleSheet,SafeAreaView,Alert,useWindowDimensions,ScrollView, Modal, Pressable, Button,Image,FlatList } from 'react-native';
import {
  Audio,
} from "expo-av";
import { audioData } from '../assets/data';
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const itemHeight = 200;
const Audios = () => {
  const [sound, setSound] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [playingState, setPlayingState] = useState('');
  const { width,height } = useWindowDimensions();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const screenIsFocused = useIsFocused();




  const handleScroll = useCallback(

  (e) => {
      const offset = Math.round(e.nativeEvent.contentOffset.y / itemHeight);
     audioData.forEach((item,index) => (
     offset === index && screenIsFocused ? ( 
        setFocusedIndex(offset),
    playSound()
       ) : null
     ))
    
    },
    [focusedIndex,setFocusedIndex]
  );

  //console.log(focusedIndex,audioUrl)
 const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(audioData[focusedIndex].track);
    setSound(sound);

    setPlayingState('Playing Sound');
    await sound.playAsync();
  }
//  const pauseSound = async () => {
//     console.log('Loading Sound');
//     const { sound } = await Audio.Sound.createAsync(audioUrl);
//     setSound(sound);

//     setPlayingState('Paused Sound');
//       await sound.pauseAsync();
 
//    }

// useEffect(() => {
//   Audio.setAudioModeAsync({
//     staysActiveInBackground: false,
//     shouldDuckAndroid: true,
//     interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
//     playThroughEarpieceAndroid: false
//   });


// }, [index])


// const   _loadNewPlaybackInstance = async (playing) => {
//   if (this.playbackInstance != null) {
//     await this.playbackInstance.unloadAsync();
//     // this.playbackInstance.setOnPlaybackStatusUpdate(null);
//     this.playbackInstance = null;
//   }
// const source = { uri: PLAYLIST[this.index].uri };


// if (PLAYLIST[this.index].isVideo) {
//   await _video.loadAsync(source, initialStatus);
//   // this._video.onPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
//   this.playbackInstance = this._video;
//   const status = await this._video.getStatusAsync();
// } else {
//   const { sound, status } = await Audio.Sound.createAsync(
//     source,
//     initialStatus,
//     this._onPlaybackStatusUpdate
//   );
//   this.playbackInstance = sound;
// }

// this._updateScreenForLoading(false);
// }


 useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();

        }
      : undefined;
  }, [sound,focusedIndex]);

 const handleHideModal =  () => {
  if(playingState === 'Playing Sound'){
   // pauseSound()
  }
setModalVisible(!modalVisible)
 }
 const handleShowModal =  () => {
  if(playingState === 'Playing Sound'){
   // pauseSound()
  }
  setModalVisible(true)
 }
  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.container}>
       <View style={styles.container}>
    <Text>Audio Player</Text>
     <FlatList
     getItemLayout={(data, index) => ( {length: itemHeight, offset: itemHeight * index, index})}
     onScroll={handleScroll}
     data={audioData}
     renderItem={({item}) => (
       <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
      itemHeight,
      alignSelf: "center",
      width: "100%",
     
       }}>
         <Image source={{uri:item.thumbnail}}
         style={{ width,height:300, aspectRatio: 1 }}
         />
         <Text style={styles.name}>{item.name}</Text>
        
     </View>
     )}
     />
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleHideModal}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={handleShowModal}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
       </View>
    
    </SafeAreaView>
  )
}

export default Audios

const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",


    },
    audioContainer:{
      flex:1,
        justifyContent:"center",
        alignItems:"center",
   
      alignSelf: "center",
      width: "100%",
      aspectRatio: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: "500",
      marginVertical: 10,
    },
    container: {
      flex: 1,
      flexDirection:"column",
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      textAlign:"center",
      padding: 10,
    },
    image:{
      flex:1,
        width:"100%",
        aspectRatio: 1,
        objectFit:"contain"
    },
    buttons:{
      flexDirection:"row",
      justifyContent: 'center',
      alignItems:"center",
      gap:10,
      marginTop:10
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
})