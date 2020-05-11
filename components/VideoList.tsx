import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import Button from '@material-ui/core/Button';
import 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  button: {
    marginTop: 16,
    width: '70%',
    margin: 'auto'
  }
}));


export function VideoList({navigation, route}) {
	// render() {
  const classes = useStyles();
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

      <Button
        onClick={() => navigation.navigate('VideoWatch', {video: 'Welcome'})}
        color="primary"
        variant="contained"
        className={classes.button}>
        Welcome
      </Button>
      <Button
        onClick={() => navigation.navigate('VideoWatch', {video: 'READY'})}
        color="primary"
        variant="contained"
        className={classes.button}>
        READY TO Read
      </Button>
      <Button
        onClick={() => navigation.navigate('VideoWatch', {video: 'Reading Fun'})}
        color="primary"
        variant="contained"
        className={classes.button}>
        Making Reading Fun
      </Button>
      <Button
        onClick={() => navigation.navigate('VideoWatch', {video: 'Connections'})}
        color="primary"
        variant="contained"
        className={classes.button}>
        Making Life Connections
      </Button>
      <Button
        onClick={() => navigation.navigate('VideoWatch', {video: 'Word'})}
        color="primary"
        variant="contained"
        className={classes.button}>
        What's That Word?
      </Button>
      <Button
        onClick={() => navigation.navigate('VideoWatch', {video: 'Picture'})}
        color="primary"
        variant="contained"
        className={classes.button}>
        Check Out the Pictures
      </Button>
           

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
}
