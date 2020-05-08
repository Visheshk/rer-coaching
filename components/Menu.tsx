import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import { styles } from '../style';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import videos from '../assets/videos.png'; 
import start from '../assets/start.png'; 
import letsread from '../assets/letsread.png'; 


const useStyles = makeStyles({
  root: {
    maxWidth: "345px",
    width: "40%",
    height: "auto"
  },

  media: {
    padding: "20px",
    display: "block",
    margin: "auto",
    width: "60%"
  }
});

export function MenuScreen({navigation, route}) {
	// render() {
    const classes = useStyles();
    const [userInfo, setUserInfo] = React.useState();
    var storeData = async (vals) => {
      try {
        setUserInfo(await AsyncStorage.getItem('userInfo'));
      } catch (error) {
        console.log(error);
      }
    };
    storeData();
		return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
			
      <Card className={classes.root} variant="outlined">
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Go to introductory videos"
            className={classes.media}
            image={videos}
            title="Videos"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Videos
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Videos on how to navigate and use this app
            </Typography>
          </CardContent>
        </CardActionArea>

      </Card>
   
      <Card className={classes.root} variant="outlined">
      <CardActionArea
        onClick={() => navigation.navigate('BookList')}>
        <CardMedia
          component="img"
          alt="Read through books and practice recording prompts"
          className={classes.media}
          image={letsread}
          title="Let's Read"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Let's Read
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Read introductory books
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
    </View>
		);
	// }
}
