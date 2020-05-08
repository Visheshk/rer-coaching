import React from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    var storeData = async (vals) => {
      try {
        setUserInfo(await AsyncStorage.getItem('userInfo'));
      } catch (error) {
        console.log(error);
        Alert.alert("user information not found! Go home and enter details again?");
      }
    };
    storeData();
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <Card className={classes.root} variant="outlined">
          <CardActionArea
            onClick={() => navigation.navigate('BookRead', {book: 'BearFight'})}>>
            <CardMedia
              component="img"
              alt="Go to introductory videos"
              className={classes.media}
              image={bearcover}
              title="Videos"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Start Reading!
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </View>
    );
}