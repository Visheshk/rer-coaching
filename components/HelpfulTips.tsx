import React, { Component } from "react";
import { Container, Header, Content, Accordion } from "native-base";

import { Text, Keyboard, StyleSheet } from 'react-native';

const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

export class HelpfulTips extends React.Component {

  constructor(props) {
    super(props);    
    const { navigation } = this.props;
  
  }
  // Keyboard.dismiss();

  // handleOnPress = () => 

  render() {
    return (
       <Container>
        <Header />
        <Content padder>
          <Accordion dataArray={dataArray} expanded={0}/>
        </Content>
      </Container>
    );
  }
}

