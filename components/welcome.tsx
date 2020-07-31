import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert, AsyncStorage, Linking, Image } from 'react-native';
import { Button } from 'react-native-elements';
// import Button from '@material-ui/core/Button';
import { Tile } from 'react-native-elements';
import 'react-native-gesture-handler';
import { Audio, Video } from 'expo-av';
// import { AVPlaybackStatus, VideoProps } from 'expo-av/build/Video'
// import { styles } from '../style';
import { useNavigation } from '@react-navigation/native';

import {logo} from '../assets/images/ready-logo.png';
import coachApp from '../assets/icons/coaching-app.png';
import bunnyReading from '../assets/images/bunny-reading.png';

// export function WelcomeScreen({navigation, route}) {
export class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props);    
    const { navigation } = this.props;
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
            // this.setState({speakerAppURL: "http://192.168.1.222:8000/bl2.html"});
            console.log(this.state.speakerAppURL);
            // return json;
          } catch (error) {
            console.log("fetch failing");
            console.error(error);
          }
        })();
      }
      else {
        navigation.navigate('Login');
      }
      console.log(response);
    });

    

  }
  
  render() {
  const { navigation } = this.props;
	return (
		<View style={{flexDirection: "column"}}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Image source={require('../assets/images/ready-logo.png')} style={{width: "100%", height: 200, resizeMode: 'contain'}}/>
      </View>
       <Text style={styles.title}> Hi {this.state.name} </Text>
       <View style={{flex: 1, flexDirection: 'row'}}>
         
         <View style={styles.tileView}>
          <Tile
            imageSrc={coachApp}
            title="READY Coaching App"
            
            containerStyle={styles.tileContainer}
            imageProps={{resizeMode: "contain"}}
            onPress={() => {navigation.navigate('Menu', {name: this.state.name})}}
          >
          </Tile>
          
        </View>

        <View style={styles.tileView}>
          <Tile
            imageSrc={bunnyReading}
            title="Read Aloud with Floppy"
            containerStyle={[styles.tileContainer, {opacity: this.state.isLoading ? 0.3: 1.0}]}
            disabled={this.state.isLoading}
            imageProps={{resizeMode: "contain"}}
            onPress={() => {
              if (!this.state.isLoading){ 
                Linking.openURL(this.state.speakerAppURL); 
                // navigation.navigate('Speaker', {'speakerurl': this.state.speakerAppURL}) ;
              } 
            }}
          >
          </Tile>
          
        </View>
       
      </View>



		</View>
	);
	}
}

export default function(props) {
  const navigation = useNavigation();
  return <MyBackButton {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  tileContainer: {
    width: "100%", padding: 5, elevation: 4, borderWidth: 3, borderColor: '#333'
  },

  tileView: {
    flex: 0.5, padding: 5
  },

  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
  }

});

