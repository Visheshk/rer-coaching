import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert, AsyncStorage, Linking } from 'react-native';
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
    this.state = {userInfo: {}, name: "", age: "", studyId: "", isLoading: true, speakerAppURL: ""};

    AsyncStorage.getItem('userInfo').then(response =>  {
      
      if (response !== null) {
        let resp = JSON.parse(response);
        this.setState({
          userInfo: resp,
          name: resp.name,
          age: resp.age,
          studyId: resp.studentId
        });
        console.log(this.state);
        (async () => {
          try {
            let resp = await fetch('https://talkwithme.herokuapp.com/api/users/', {
            method: 'POST',
            mode: 'cors',
            headers: {
               "Accept": "*/*",
              "Accept-Language": "en-US,en;q=0.5",
              'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
              "name": "xhr", "age": "123", "study_id": "abc123"
            })
          });

            let t = await resp.text();
            console.log(t);
            this.setState({isLoading: false});
            this.setState({speakerAppURL: "https://talkwithme.herokuapp.com/talk/booklist.html?session=" + t});
            console.log(this.state.speakerAppURL);
            // return json;
          } catch (error) {
            console.log("fetch failing");
            console.error(error);
          }
        })();
      }
      else {
        navigation.navigate('Welcome');
      }
      console.log(response);
    });

    

  }
  
  render() {
  const { navigation } = this.props;
	return (
		<View>

      <Text style={styles.title}>READY to Read! Hi {this.state.name} </Text>

      
        <Button
          onPress={() => navigation.navigate('Menu', {name: this.state.name})}
          color="primary"
          variant="contained"
          buttonStyle={{ marginTop: 16 }}
          title="READY Coaching App">
        </Button>

      <Button
        onPress={() =>  navigation.navigate('Speaker', {name: this.state.name})}
        color="primary"
        variant="contained"
        disabled={this.state.isLoading}
        buttonStyle={{ marginTop: 16 }}
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
