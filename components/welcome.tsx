import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
// import Button from '@material-ui/core/Button';
import 'react-native-gesture-handler';
import { Audio, Video } from 'expo-av';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
import { styles } from '../style';
import { useNavigation } from '@react-navigation/native';

// export function WelcomeScreen({navigation, route}) {
export class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);    
    this.state = {userInfo: {}};
    AsyncStorage.getItem('userInfo').then(response =>  {
      this.setState({
        userInfo: response
      });
      console.log(response);
    });
  }
  
  render() {
  const { navigation } = this.props;
	return (
		<View>

      <Text style={styles.title}>READY to Read {JSON.stringify(this.state.userInfo)} </Text>

      <Button
        onPress={() => navigation.navigate('Menu', {name: 'Jane'})}
        color="primary"
        variant="contained"
        style={{ marginTop: 16 }}
        title="READY Coaching App">
      </Button>

      <Button
        onPress={() => console.log(JSON.stringify(this.state.userInfo))}
        color="primary"
        variant="contained"
        disabled={true}
        style={{ marginTop: 16 }}
        title="Read Aloud with Floppy">
      </Button>
		</View>
	);
	}
}

export default function(props) {
  const navigation = useNavigation();
  return <MyBackButton {...props} navigation={navigation} />;
}
