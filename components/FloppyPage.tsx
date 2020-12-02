import React from 'react';
import { Text, Dimensions, TouchableHighlight, View, StyleSheet, TextInput, Alert, Linking, Keyboard } from 'react-native';
import { Tooltip, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Content } from 'native-base'

import 'react-native-gesture-handler';
import { useKeepAwake } from 'expo-keep-awake';
import { AsyncStorage } from 'react-native'
import VideoPlayer from 'expo-video-player';
import { VideoControl } from './VideoControl';
import { Audio, Video } from 'expo-av';
import { Asset } from 'expo-asset';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';


export function FloppyPage({navigation, route}) {
  // render() {
  const speakerURL = route.params.speakerURL;
  // const pageList = Object.keys(pageTitles);

  var storeData = async (vals) => {
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));
    } catch (error) { console.log(error); }

  };
  // storeData();
  useKeepAwake();
  console.log(route.params);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {textAlign: 'center'}
    });
  });

  React.useEffect(() => {
    setTimeout(() => {
      Keyboard.dismiss();      
    }, 1000);
    
  });

  return (
    <Container>
    <Content>
    <View style={{flex: 1, flexDirection: "column"}}>
      <View style= {{alignItems: "center"}}>
        <VideoPlayer
          height={Dimensions.get('window').height*0.8}
          width={Dimensions.get('window').width*0.8}
          showControlsOnLoad={true}
          inFullscreen={false}
          videoProps={{
            shouldPlay: false,
            resizeMode: "contain",
            source: {
              uri: 'https://github.com/Visheshk/rer-coaching/blob/master/assets/videos/floppy-tut.mp4?raw=true'
            },
          }}
        />
      </View>
      <View style={{flex: 1}} />
      <View style={{flex: 1, margin: 20}}>
        <Button
          title="Go to Read Aloud With Floppy!  "
          icon={<Icon name="external-link" color="white" />}
          iconRight={true}
          onPress={() => Linking.openURL(speakerURL)}
        />
      </View>

    </View>
    </Content>
    </Container>
    
  );
  // }
}
