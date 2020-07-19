import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export class SpeakerView extends React.Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://talkwithme.herokuapp.com/talk/booklist.html'
        }}
      />
    );
  }
}