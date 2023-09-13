import React, { useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  useWindowDimensions,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import Carousel from "react-native-snap-carousel";
import { audioData } from "../assets/data";

const itemWidth = 350;
const CarouselComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carousel, setCarousel] = useState(audioData);
  const carouselRef = useRef();
  const { width } = useWindowDimensions();

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          source={{ uri: item.thumbnail }}
          style={{ flex:1,aspectRatio:1 }}
        />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.container}>
       <View style={styles.container}>
        <Carousel
          layout={"default"}
          ref={carouselRef}
          data={audioData}
          sliderWidth={width}
          itemWidth={itemWidth}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex({ activeIndex: index })}
        />
      </View>
      </View>
    </SafeAreaView>
  );
};

export default CarouselComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    padding: 10,
    backgroundColor:'floralwhite',
    // backgroundColor: "rebeccapurple",
  },
  title: {
    marginTop:20,
    fontSize:20,
  },
});
