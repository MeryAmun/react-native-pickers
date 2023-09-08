import React, { useState, useEffect,useRef } from 'react'
import { Text, View, StyleSheet,SafeAreaView,Alert,useWindowDimensions, Modal, Pressable, Button,Image,FlatList } from 'react-native';
import { Audio } from 'expo-av';
import { audioData } from '../assets/data';

const Audios = () => {
  const [sound, setSound] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [playingState, setPlayingState] = useState('');
  const { width } = useWindowDimensions();


 const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/audios/test.mp3')
    );
    setSound(sound);

    setPlayingState('Playing Sound');
    await sound.playAsync();
  }
 const pauseSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/audios/test.mp3')
    );
    setSound(sound);

    setPlayingState('Paused Sound');
      await sound.pauseAsync();
 
   }

 useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

 const handleHideModal =  () => {
  if(playingState === 'Playing Sound'){
    pauseSound()
  }
setModalVisible(!modalVisible)
 }
 const handleShowModal =  () => {
  if(playingState === 'Playing Sound'){
    pauseSound()
  }
  setModalVisible(true)
 }
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
    <Text>Audio Player</Text>
     <FlatList
     data={audioData}
     renderItem={({item}) => (
       <View style={styles.root}>
         <Image source={{uri:item.thumbnail}}
         style={{ width, aspectRatio: 1 }}
         />
         <Text style={styles.name}>{item.name}</Text>
         <View style={styles.buttons}>
     <Button title="Play" onPress={playSound}/>
     <Button title="Pause" onPress={pauseSound}/>
   </View>
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