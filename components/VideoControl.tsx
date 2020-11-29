import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { AsyncStorage } from 'react-native';
import { Audio, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export class VideoControl extends React.Component {
  constructor (props) {
    super(props);
    this.playButton = React.createRef();
    console.log("props props props");
    console.log(props);
    this.video = null;
    this.state = {
      "video": null,
      "vidPlaying": true,
      "playOpacity": 1,
      "playbackObject": null

    }
    
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("component did update");
    // console.log(prevProps.uri);
    // console.log(prevState);
    console.log(this.state.vidPlaying);
    if (prevProps.uri !== this.props.uri) {
      console.log("uri change");
      this.setState({"vidPlaying": true});
      // this.videoComp.forceUpdate();
    }

  }

  async toggleButton(newState = 0){
    console.log("toggling button");
    
    if (newState !== 0) {
      await this.setState({"vidPlaying": newState});  
    }
    else {
      await this.setState({"vidPlaying": !this.state.vidPlaying});
    }
    // this.playButton.forceUpdate();
    return true;
  }

  // const [vidPlaying, setVidPlaying] = React.useState(false);
  // const [playOpacity, setPlayOpacity] = React.useState(1);
  // let vidUri = 
  // let playbackObject;
  
  _handleVideoRef = component => {
    this.video = component; 
    this.setState({"video": component});
  }

  _playState = async (playStatus) => {
    // console.log(playStatus);
    if (playStatus.isPlaying == true && this.state.vidPlaying == false) {
      // console.log("playing is ");
      activateKeepAwake();
      this.toggleButton(true);
      // console.log(this.state.vidPlaying);
      // console.log(playStatus);
    }
    else if (playStatus.isPlaying == false && this.state.vidPlaying == true) {
      // console.log("paused");
      deactivateKeepAwake();
      this.toggleButton(false);
      // console.log(this.state.vidPlaying);
      // console.log(playStatus);
      // if (playStatus)

    }
    // console.log(this.state.vidPlaying);
  }

  playVideo = async () => {
    if (this.state.video !== null) {
      var stat = await this.state.video.getStatusAsync();
      if (stat.isPlaying == true) {
        console.log("playing")
        this.state.video.pauseAsync(); 
      }
      else {
        console.log("not playing")
        if (stat.positionMillis == stat.playableDurationMillis) {
          this.state.video.replayAsync();
        }
        else {
          this.state.video.playAsync();
        }
      }
    }
    return true;
  }
  render(){
  return(
    <View>

        <Video
          source={{ uri: this.props.uri }}
          key="videoComp"
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          useNativeControls={true}
          shouldPlay={false}
          isLooping={false}
          style={{ height: this.props.height }}
          ref={this._handleVideoRef}
          onPlaybackStatusUpdate={this._playState}
        />
        
        <View style={{ 
          alignSelf: "center",
          flex:1,
          flexDirection: "row",
          height: "100%", 
          width: "100%", 
          alignSelf: "center",
          justifyContent: "space-around", 
          alignItems: "center", 
          flex: 1, 
          position: "absolute"}}>
          <View style={{opacity: this.state.vidPlaying? 0: 1,}}>
          <TouchableOpacity 
            ref={this.playButton}
            style={{
              backgroundColor: 'rgba(52, 52, 52, 0.4)',
              width: 80,
              height: 80,
              borderRadius:80,
              justifyContent: "space-around",
              
              alignItems: "center"
            }}
            underlayColor="#111" delayPressIn={0} delayPressOut={10} onPress={this.playVideo}>
            <Ionicons name="ios-play" 
                style={{
                    textShadowColor: '#333',
                    textShadowOffset: {width: -1, height: 1},
                    textShadowRadius: 10}} 
                size={54} 
                color="white" />
              
          </TouchableOpacity>
          </View>

        </View>
        <Text> {this.state.vidPlaying? 1: 0} </Text>

      </View>
  )
}
}