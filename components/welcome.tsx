import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import { Audio, Video } from 'expo-av';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';

export function WelcomeScreen({navigation, route}) {
	// render() {
    const [userInfo, setUserInfo] = React.useState();
    var storeData = async (vals) => {
      try {
        // console.log(vals);
        await AsyncStorage.setItem('currentScreen', 'WelcomeScreen');
      } catch (error) {
        // Error saving data
      }
      try {
        setUserInfo(await AsyncStorage.getItem('userInfo'));
      } catch (error) {
        console.log(error);
      }
    };
    storeData();
		return (
			<View>
        <Text style={styles.title}>READY to Read {userInfo} </Text>
        <Video
          source={{ uri: 'https://www.dropbox.com/s/qtnn10iru7v89xt/welcomevid.mp4?raw=1' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          useNativeControls={true}
          shouldPlay={false}
          isLooping
          style={{ width: 450, height: 300 }}
        />

				<Button
          onPress={() => navigation.navigate('Login', {name: 'Jane'})}
          color="black"
          mode="contained"
          style={{ marginTop: 16 }}>
          Home
        </Button>
				<Button
          onPress={() => console.log(JSON.stringify(userInfo))}
          color="black"
          mode="contained"
          style={{ marginTop: 16 }}>
          Info
        </Button>
        <Button
          onPress={() => navigation.navigate('Menu', {name: 'Jane'})}
          color="black"
          mode="contained"
          style={{ marginTop: 16 }}>
          Go to Menu
        </Button>
			</View>
		);
	// }
}
