import React, { useState, useRef, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { videoData } from "../assets/data";
import { useIsFocused } from "@react-navigation/native";

const itemHeight = 300;

const Videos = () => {
  const screenIsFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const video = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleScroll = useCallback((e) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    //console.log(scrollPosition)
    if (scrollPosition < itemHeight) {
      setIsVideoPlaying(true);
    } else if (scrollPosition > itemHeight && !isVideoPlaying) {
      setIsVideoPlaying(false);
    }
  }, []);
  const handleHideModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleShowModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEventThrottle={16} onScroll={handleScroll}>
        <View></View>
        <Video
          ref={video}
          source={{
            uri: "https://d8vywknz0hvjw.cloudfront.net/fitenium-media-prod/videos/45fee890-a74f-11ea-8725-311975ea9616/proccessed_720.mp4",
          }}
          style={{
            itemHeight,
            alignSelf: "center",
            width: "100%",
            aspectRatio: 1,
          }}
          onError={(e) => console.log("error", e)}
          resizeMode={ResizeMode.COVER}
          useNativeControls
          isLooping
          shouldPlay={isVideoPlaying && screenIsFocused}
        />
        <Text style={styles.name}>{videoData[0].name}</Text>

        <View>
          <Text style={styles.name}>{videoData[0].description}</Text>
          {
        !modalVisible && (
          <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={handleShowModal}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
        )
      }
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleHideModal}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Videos;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 10,
  },
  video: {
    alignSelf: "center",
    width: "100%",

    aspectRatio: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    textAlign: "center",
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    width: "50%",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
