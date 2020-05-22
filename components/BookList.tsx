import React from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { Card, ListItem, Button, Icon, Tile } from 'react-native-elements'

import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

import bearcover from '../assets/books/bear-cover.png';

const useStyles = makeStyles({
  root: {
    maxWidth: "345px",
    // width: "40%",
    height: "auto"
  },

  media: {
    padding: "5px",
    display: "block",
    margin: "auto",
    width: "100%"
  }
});


export function BookList({navigation, route}) {
  const classes = useStyles();
  //****TODO: make this list dynamic in the future
  const [userInfo, setUserInfo] = React.useState();
  const [bookPage, setBookPage] = React.useState(1);
  var storeData = async (vals) => {
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));
    } catch (error) {
      console.log(error);
      Alert.alert("user information not found! Go home and enter details again?");
    }
    // try {
    //   setBookPage(await AsyncStorage.getItem('bookPage'));
    //   console.log(bookPage);
    // } catch (error) {
    //   console.log(error);
    //   Alert.alert("user information not found! Go home and enter details again?");
    // }
  };
  storeData();
  return (
    <View style={{ flex: 1, flexDirection: 'column'}}>
    <Tile
      imageSrc={bearcover}
      title="Start Reading"
      containerStyle={{ height: "100%"}}
      titleStyle = {{textAlign: "center"}}
      imageProps={{resizeMode: "contain"}}
      onPress={() => navigation.navigate('BookRead', {book:"BearFight"})}
    >
    </Tile>
    
      
    </View>
  );
}