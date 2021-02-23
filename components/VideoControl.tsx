import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
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
    // console.log(props.progressHandler)
    // if (props.progressHandler != undefined){
    //   this.progressHandler = props.progressHandler;
    // }
    //if props.progressHandler is defined, then set progressHandler
  }

  // const 

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.vidPlaying);
    if (prevProps.uri !== this.props.uri) {
      console.log("uri change");
      this.setState({"vidPlaying": true});
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
  
  _handleVideoRef = component => {
    this.video = component; 
    this.setState({"video": component});
  }

  _playState = async (playStatus) => {
    if (playStatus.isPlaying == true && this.state.vidPlaying == false) {
      activateKeepAwake();
      this.toggleButton(true);
    }
    else if (playStatus.isPlaying == false && this.state.vidPlaying == true) {
      deactivateKeepAwake();
      this.toggleButton(false);
    }
    if (playStatus.didJustFinish == true) {
      console.log("video did just finish");
      // console.log(this.props);
      if (this.props.progressHandler != undefined) {
        this.props.progressHandler(true);
      }
    }
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
      </View>
  )
}
}