/**
 * @flow
 */

import React from 'react';
import {
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View, AsyncStorage,
} from 'react-native';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

class PreRecording {
  constructor(module) {
    this.module = module;
    Asset.fromModule(this.module).downloadAsync();
    // try {  this.soundObject.loadAsync(this.module);  }
  }
}

const irbWidth = 80;
const irbHeight = 80;
const ICON_RECORD_BUTTON = new Icon(require('../assets/images/record-blue.png'), 200, 200);
// const ICON_RECORDING = new Icon(require('../assets/images/record_icon.png'), 200, 200);
const ICON_RECORDING_ACTIVE = new Icon(require('../assets/images/record-red.png'), 200, 200);

const ICON_EXPERT_PLAY = new Icon(require('../assets/images/bulb-yellow.png'), 200, 200);
const ICON_PLAY_BUTTON = new Icon(require('../assets/images/play-green.png'), 200, 200);
const ICON_PAUSE_BUTTON = new Icon(require('../assets/images/stop-red.png'), 200, 200);
const ICON_STOP_BUTTON = new Icon(require('../assets/images/stop-red.png'), 200, 200);

const PRERECORDINGS = [
  0, 
  new PreRecording(require('../assets/prerecordings/media1.m4a')),  
  new PreRecording(require('../assets/prerecordings/media2.m4a')),
  new PreRecording(require('../assets/prerecordings/media3.m4a'))
]

const PRERECORDINGURIS = [
  0,
  0,
  require('../assets/prerecordings/media1.m4a'),  //do you remember the last time
  require('../assets/prerecordings/media2.m4a'),  //what do you think they dig for?
  require('../assets/prerecordings/media3.m4a'),  //what does a ferocious - p4
  require('../assets/prerecordings/media4.m4a'),  //what do you think that giant panda is eating
  require('../assets/prerecordings/media5.m4a'),  //can you point to something nearby
  require('../assets/prerecordings/media6.m4a'),  //if you became a grizzly bear tomorrow
  require('../assets/prerecordings/media7.m4a'),  //how tall are you
  0,    // - p9 - slide 62
  require('../assets/prerecordings/media8.m4a'),  //which footprint - s66, p10
  require('../assets/prerecordings/media9.m4a'),  //why do you think they have such - s72, p11
  require('../assets/prerecordings/media10.m4a'),  //which food do you think - s78, p12
  require('../assets/prerecordings/media11.m4a'),  //do you think a polar bear or - s84, p13
  require('../assets/prerecordings/media12.m4a'),  //where are the polar bears - s90, p14
  require('../assets/prerecordings/media13.m4a'),  //why do you think their strong - s96, p15
  0,    // s102 - p16
  0,    // s106 p -17
  require('../assets/prerecordings/media14.m4a'),  //how many limbs do you have - s110, p18
  require('../assets/prerecordings/media15.m4a'),  //how do you think polar bears and  - s116, p19
  require('../assets/prerecordings/media16.m4a'),  //do you know what solitary - s122, p20
  require('../assets/prerecordings/media17.m4a'),  //dyk any other animals - s128, p21
  require('../assets/prerecordings/media18.m4a'),  //what would you miss most - s134, p22
  require('../assets/prerecordings/media19.m4a'),  //what type of food do you - s140, p23
  require('../assets/prerecordings/media20.m4a'),  //what do you think the polar bears thought - s146, p24
  require('../assets/prerecordings/media21.m4a'),  //how do you think he felt - s152, p25
  require('../assets/prerecordings/media22.m4a'),  //what do you think is going to happen - s158, p26
  require('../assets/prerecordings/media23.m4a'),  //who do you think will win - s164, p27
  require('../assets/prerecordings/media24.m4a'),  //what do you think the polar bear will do - s170, p28
  require('../assets/prerecordings/media25.m4a'),  //if the bears meet again - s176, p29
  0
]

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#DDD';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.2;
const RATE_SCALE = 3.0;

export class PR2 extends React.Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.expertRec = null
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    // if ("page" in props) {
    //   this.page = parseInt(props.page);  
    // }
    // else {
      this.page = -1;
    // }
    
    // console.log(PRERECORDINGS[1].module);
    this.state = {
      haveRecordingPermissions: false,
      expertRecExists: false,
      isRecPlaying: false,
      isLoading: false,
      isPlaybackAllowed: false,
      currentPage: this.page,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      recordingURI: null
    };
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY));

    // // UNCOMMENT THIS TO TEST maxFileSize:
    // this.recordingSettings.android['maxFileSize'] = 12000;
  }

  componentDidMount() {
    (async () => {
      await Font.loadAsync({
        'cutive-mono-regular': require('../assets/fonts/CutiveMono-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
    })();
    this._askForPermissions();
    
  }

  componentDidUpdate(props) {
    if ("page" in props) {
      if (this.state.currentPage != props.page){
        var thisPage = parseInt(props.page);
        this.setState({currentPage: thisPage});
        // console.log(thisPage);
        
        (async () => {
          var noRec = true;
          if (thisPage < PRERECORDINGURIS.length) {
            if (PRERECORDINGURIS[thisPage] != 0 && PRERECORDINGURIS[thisPage]) {
              noRec = false;
              console.log("test sound object ")
              // const soundObj = new Audio.Sound();
              // soundObj.setOnPlaybackStatusUpdate(_updateScreenForExpertStatus);
              // console.log(PRERECORDINGURIS[thisPage]);
              const { sound, status} = await Audio.Sound.createAsync(PRERECORDINGURIS[thisPage], {}, this._updateScreenForExpertStatus);
              if (sound == undefined) {
                console.log("expert rec not found");
                this.expertRec = null;
              }
              else {
                console.log("expert rec found");
                this.expertRec = sound;
                this.setState({"expertRecExists": true}) ;
              }
              
            }
          }
          if (noRec == true) {
            this.expertRec = null;
            this.setState({"expertRecExists": false}) ;

          }


          console.log("recorder for page " + parseInt(props.page));
          this.setState({recordingURI: await AsyncStorage.getItem('bookRec' + props.page)});
          // console.log(this.state.recordingURI);
          if (this.state.recordingURI !== null) {
            // var soundObject = new Audio.Sound();
            // soundObject.setOnPlaybackStatusUpdate(this._updateScreenForSoundStatus)
            const { sound, status } = await Audio.Sound.createAsync({uri: this.state.recordingURI}, {}, this._updateScreenForSoundStatus);
            if (sound == undefined) {
              this.sound = null;
            }
            else {
              console.log("sound obtained for page uri is defined");
              this.sound = sound;
              this.setState({
                isLoading: false,
              });
            } 
          }
          else {
            if (this.sound !== null){
              await this.sound.unloadAsync();
              this.sound.setOnPlaybackStatusUpdate(null);
              this.sound = null;
            }
            this.setState({
              soundDuration: null,
              soundPosition: null,
              isPlaybackAllowed: false,
            });
          }
        })();
        
      }
    }
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  _updateScreenForExpertStatus = expertStatus => {
    // console.log(expertStatus);
    if (expertStatus.isLoaded) {
      this.setState({
        isRecPlaying: expertStatus.isPlaying,
      });
    } else {
      if (expertStatus.error) {
        console.log(`FATAL PLAYER ERROR: ${expertStatus.error}`);
      }
    }

    if (expertStatus.didJustFinish) {
      this._onExpertStopPressed();
    }
  };

  _updateScreenForSoundStatus = status => {
    // console.log(status);
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }

    if (status.didJustFinish) {
      this._onStopPressed();
    }
  };

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: false,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    await AsyncStorage.setItem(('bookRec' + this.state.currentPage), info.uri);
    this.setState({
      isLoading: false,
    });
  }

  _expertPlayStop = () => {
    if (this.state.expertRecExists == true) {
      // console.log(this.expertRec);
      if (this.state.isRecPlaying) {
        this.expertRec.stopAsync();
      } else {
        this.expertRec.playAsync();
      }
    }
  };

  _onExpertStopPressed = () => {
    if (this.state.expertRecExists == true) {
      this.expertRec.stopAsync();
    }
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  _onPlayPausePressed = () => {
    if (this.sound != null) {
      if (this.state.isPlaying) {
        // this.sound.pauseAsync();
        this._onStopPressed();
      } else {
        this.sound.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.sound != null) {
      this.sound.stopAsync();
    }
  };

  _onMutePressed = () => {
    if (this.sound != null) {
      this.sound.setIsMutedAsync(!this.state.muted);
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.sound != null) {
      this.sound.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.sound != null) {
      try {
        await this.sound.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  _onPitchCorrectionPressed = async value => {
    this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = value => {
    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.sound != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.soundDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(
        this.state.soundDuration
      )}`;
    }
    return '';
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  render() {
    if(!this.state.fontLoaded) {
        return (
            <View style={styles.emptyContainer} />
        )
    }

    if (!this.state.haveRecordingPermissions){
        return (
            <View style={styles.container}>
                <View />
                <Text style={[styles.noPermissionsText, { fontFamily: 'cutive-mono-regular' }]}>
                  You must enable audio recording permissions in order to use this app.
                </Text>
                <View />
            </View>
        )
    }

    return (
      

      <View style={styles.container}>
          <View style={styles.buttonsContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={this._onRecordPressed}
              disabled={this.state.isLoading}>
              <Image 
                style={styles.image} 
                source={this.state.isRecording ? ICON_RECORDING_ACTIVE.module : ICON_RECORD_BUTTON.module} />
            </TouchableHighlight>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={[
                styles.wrapper, 
                {
                  opacity:
                    !this.state.isPlaybackAllowed || this.state.isLoading ? DISABLED_OPACITY : 1.0,
                },
              ]}
              onPress={this._onPlayPausePressed}
              disabled={!this.state.isPlaybackAllowed || this.state.isLoading}>
              <Image
                style={styles.image}
                source={this.state.isPlaying ? ICON_STOP_BUTTON.module : ICON_PLAY_BUTTON.module}
              />
            </TouchableHighlight>
          </View>
          
          <View style={styles.buttonsContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={[
                styles.wrapper, 
                {
                  opacity:
                    !this.state.expertRecExists || this.state.isLoading ? DISABLED_OPACITY : 1.0,
                },
              ]}
              onPress={this._expertPlayStop}
              disabled={this.state.isLoading || !this.state.expertRecExists}>
              <Image
                style={styles.image}
                source={this.state.isRecPlaying ? ICON_STOP_BUTTON.module : ICON_EXPERT_PLAY.module}
              />
            </TouchableHighlight>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    // paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'center',
    // backgroundColor: BACKGROUND_COLOR,
  },
  buttonsContainer: {
    width: irbWidth,
    height: irbHeight,
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    // backgroundColor: BACKGROUND_COLOR
  },

  noPermissionsText: {
    textAlign: 'center',
  },
  wrapper: {
    width: irbWidth,
    height: irbHeight
  },
  image: {
    // backgroundColor: BACKGROUND_COLOR,
    paddingLeft: 40,
    width: irbWidth,
    height: irbHeight
  },
});
