import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import Button from '@material-ui/core/Button';
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
				<Button
          onClick={() => console.log(JSON.stringify(userInfo))}
          color="primary"
          variant="contained"
          disabled
          style={{ marginTop: 16 }}>
          Read Aloud with Floppy
        </Button>
        <Button
          onClick={() => navigation.navigate('Menu', {name: 'Jane'})}
          color="primary"
          variant="contained"
          style={{ marginTop: 16 }}>
          READY Coaching App
        </Button>
			</View>
		);
	// }
}
