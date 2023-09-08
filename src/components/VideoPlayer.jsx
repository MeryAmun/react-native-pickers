import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import InViewPort from './InViewPort'; //this class will be created next
export default class VideoPlayer extends React.Component {
  pauseVideo = () => {
    if(this.video) {
      this.video.pauseAsync();
    }
  }
  playVideo = () => {
    if(this.video) {
      this.video.playAsync();
    }
  }
  handlePlaying = (isVisible) => {
    isVisible ? this.playVideo() : this.pauseVideo();
  }
  
  render() {
      return (
        <View style={styles.container}>
         <InViewPort onChange={this.handlePlaying}>
          <Video
            ref={ref => {this.video = ref}}
            source={{uri: 'https://d8vywknz0hvjw.cloudfront.net/fitenium-media-prod/videos/45fee890-a74f-11ea-8725-311975ea9616/proccessed_720.mp4'}}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            style={styles.video}
          />
          </InViewPort>
        </View>
      )
  }  
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%"
  },
  video: {
    alignSelf: "center",
    width: "100%",
    aspectRatio:1
  },
});