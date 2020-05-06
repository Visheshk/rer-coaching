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

export function WelcomeScreen({navigation, route}) {
	// render() {
		return (
			<View>
		        <Text style={styles.title}>READY to Read</Text>
				<Button
					title="Go home"
					onPress={() => navigation.navigate('Login', {name: 'Jane'})}
				/>
				<Button
	                onPress={() => navigation.navigate('Login', {name: 'Jane'})}
	                color="black"
	                mode="contained"
	                style={{ marginTop: 16 }}>
	                Home
	            </Button>
				<Button
	                onPress={() => console.log(route.params)}
	                color="black"
	                mode="contained"
	                style={{ marginTop: 16 }}>
	                Info
	            </Button>
			</View>
		);
	// }
}
