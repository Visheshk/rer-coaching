import React, { Component } from "react";
import { Container, Header, Content, Accordion } from "native-base";

import { View, Text, Keyboard, StyleSheet, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';

import ImageView from "react-native-image-viewing";
import phone from '../assets/tips/img1.png';
import i2 from '../assets/tips/img2.png';
import i3 from '../assets/tips/img3.png';
import i4 from '../assets/tips/img4.png';


const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

const images = [
  require('../assets/tips/img1.png'),
  require('../assets/tips/img2.png'),
  require('../assets/tips/img3.png'),
  require('../assets/tips/img4.png'),
];


export class HelpfulTips extends React.Component {

  constructor(props) {
    super(props);    
    const { navigation } = this.props;
    this.state = {
      fullscreenStyle: {width: "100%"},
      normalStyle: {flex: 1},
      imageState: {flex: 1},
      galleryVisible: false,
      bigImage: 0
    }
  
  }

  openLink = () => {
    console.log("opening link");
    Linking.openURL("https://support.google.com/pixelphone/?hl=en#topic=7078250");
  }

  makeBullet = (text) => {
    return (
      <View style={ styles.row }>
        <View style={ styles.bullet }><Text>{'\u2022' + " "}</Text></View>
        <View style={ styles.bulletText }><Text>{text}</Text></View>
      </View>
    );
  }
  // Keyboard.dismiss();

  // handleOnPress = () => 

  render() {
    return (
      
       <Container style={{padding: 20}}>
       <ImageView
        images={images}
        imageIndex={this.state.bigImage}
        visible={this.state.galleryVisible}
        onRequestClose={() => this.setState({"galleryVisible": false})}
      />
        <Content padder>
        <View style={{flexDirection: "row", flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={styles.header}> Set up your device </Text>
            <Text style={styles.body}> 
            Turn up your volume so you can hear our videos, audio clips, and Floppy.
            {"\n"} </Text>
            <Text style={styles.link} onPress={() => this.openLink()}> 
            New to Androids and need more help? Click here for more information. 
            </Text>
          </View>
          <View style={this.state.imageState}>
              <TouchableOpacity onPress={() => this.setState({"galleryVisible": true, "bigImage": 0}) }>
                <Image source={phone}  style={{maxWidth: "100%", height: 250, resizeMode: 'contain'}} />
              </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.header}>Ready to try the R.E.A.D.Y. App?</Text>
        <Text style={styles.body}> It's simple to get started! Tap on the Coaching Experience (and Let's Read) to begin {"\n"}</Text>

        <Text style={styles.header}> Coaching Experience </Text>
        {this.makeBullet("View or check-off all R.E.A.D.Y. videos to start using the coaching experience activity")}
        {this.makeBullet("Buttons to know:")}
        
        <View style={{flexDirection: "row", flex: 2, marginTop: -10, marginBottom: -30}}>
          <TouchableOpacity style={{width: "50%", maxHeight: 150}} onPress={() => this.setState({"galleryVisible": true, "bigImage": 1}) }>
            <Image source={i2}  style={{width: "100%", maxHeight: 150, resizeMode: 'contain'}} />
          </TouchableOpacity>

          <TouchableOpacity style={{width: "50%", maxHeight: 150}} onPress={() => this.setState({"galleryVisible": true, "bigImage": 2}) }>
            <Image source={i3}  style={{width: "100%", maxHeight: 150, resizeMode: 'contain'}} />
          </TouchableOpacity>
        </View>

        <Text style={styles.header}> {"\n"}Read Aloud with Floppy</Text>
        {this.makeBullet("There are 5 books to read with your child. Scroll down if you don't see all 5 in the menu.")}
        {this.makeBullet("When reading with your child, you should hear Floppy’s prompts within the first few pages. If you don’t, tap “Debug” to see a transcript of what Floppy heard you say. Nothing transcribed in Debug? Check your internet and/or contact us.")}
        {this.makeBullet("Button to know:")}
        <View style={{flexDirection: "row", flex: 2, marginTop: -30, marginBottom: -30}}>
          <TouchableOpacity style={{width: "90%", maxHeight: 150}} onPress={() => this.setState({"galleryVisible": true, "bigImage": 3}) }>
            <Image source={i4}   style={{width: "90%", resizeMode: 'contain'}}/>
          </TouchableOpacity>
        </View>

        <Text style={styles.header}> {"\n"}Remember to have fun! this is a no stakes, no stress app made just for you!</Text>
        <Text style={styles.link} onPress={() => {Linking.openURL("mailto:ilanasch@mit.edu")}}> {"\n"}Still have questions? Feel free to e-mail us at ilanasch@mit.edu.</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold"
  },

  body: {
    // fontSize: 16
  },

  link: {
    // fontSize: 16,
    color: "blue",
    textDecorationLine: "underline"
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
    marginVertical: 4
  },
  bullet: {
    width: 10
  },
  bulletText: {
    flex: 1
  }
})