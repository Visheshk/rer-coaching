import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import { styles } from '../style';

export function MenuScreen({navigation, route}) {
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
			</View>
		);
	// }
}
