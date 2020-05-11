import React from 'react';
import { View, Alert, AsyncStorage } from 'react-native';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';
import bearcover from '../assets/books/bear-cover.png';
import bearPages from '../assets/books/bearList';
// import ForwardRoundedIcon from '@material-ui/icons/ForwardRounded';
// import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

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


export function BookRead({navigation, route}) {
  const classes = useStyles();
  const bookName = route.params["book"];
  //****TODO: make this list dynamic in the future
  const [userInfo, setUserInfo] = React.useState();
  const [bookPages, setBookPages] = React.useState("{}");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [imageName, setImageName] = React.useState("p1");
  var storeData = async (vals) => {
    try {
      setUserInfo(await AsyncStorage.getItem('userInfo'));
    } catch (error) {
      console.log(error);
    }
    try {
      setBookPages(await AsyncStorage.getItem('bookPages'));
    } catch (error) {
      console.log(error);
    }
    var bp = {};
    bp = JSON.parse(bookPages);

    if (bookName in bp) {
      console.log("found book in bp");
      setCurrentPage(parseInt(bp[bookName]));
      setImageName("p" + currentPage);
      console.log(imageName);
    }
    else {
      bp[bookName] = currentPage;
      console.log(bp);
      await AsyncStorage.setItem('bookPages', JSON.stringify(bp));
      setImageName("p" + currentPage);
    }
        
    // await AsyncStorage.setItem('bookPages', JSON.stringify(bp));
    // }
    // if (currentPage == 0) {
    //   console.log("currentPage empty");
    // }
  };
  storeData();
  async function changePage(dir) {
    console.log(dir);
    if (currentPage == 1 && dir == -1) {
      console.log("first page!");
    }
    else if (currentPage == 30 && dir == 30) {
      console.log("last page!");
    }
    else {
      var cp = currentPage + dir;
      setCurrentPage(cp);
      var bp = JSON.parse(bookPages);
      bp[bookName] = cp;
      setImageName("p" + cp);
      console.log(bp);
      await AsyncStorage.setItem('bookPages', JSON.stringify(bp));
    }
  };
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>

     <IconButton 
       color="primary" 
       onClick={() => {changePage(-1)}}
       variant="outlined" 
       aria-label="Previous Page" 
       component="span">
        <ArrowBackRoundedIcon />
      </IconButton>

      <Card className={classes.root} variant="outlined">
        <CardMedia
          component="img"
          alt="Book Page"
          className={classes.media}
          src={bearPages[imageName]}
          title="Bears Fighting!"
        />        
      </Card>

       <IconButton onClick={() => {changePage(1)}} color="primary" aria-label="Next Page" component="span">
          <ArrowForwardRoundedIcon />
        </IconButton>

    </View>
  );
}