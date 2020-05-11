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
import Videos from '../assets/videos.png'; 
import Start from '../assets/start.png'; 
import Letsread from '../assets/letsread.png'; 


const useStyles = makeStyles({
  root: {
    maxWidth: "345px",
    width: "42%",
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
        <CardActionArea
        onClick={() => navigation.navigate('VideoList')}>
          <CardMedia
            component="img"
            alt="Go to introductory videos"
            className={classes.media}
            image={Videos}
            title="Videos"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Videos
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Tips for building young kids' literacy skills.
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
            image={Letsread}
            title="Let's Read"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Let's Read
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Learn and practice simple literacy-building strategies for reading aloud with your child.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

    </View>
		);
	// }
}
