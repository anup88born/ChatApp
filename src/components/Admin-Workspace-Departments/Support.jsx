import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AvatarGroup from '@material-ui/lab/AvatarGroup';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 373,
    padding: '20px',
    height: '263px'
  },
  media: {
    height: 0,
    padding: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Support() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="support" className={classes.avatar}>
            S
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" style={{marginTop: '-19px',height: '10px'}}>
            <img src="/assets/img/dropdown.svg"/>
          </IconButton>
        }

        style={{padding: '0px '}}
        
      />
      
      <CardContent style={{fontFamily: 'ProximaNova', padding: '10px'}}>
        <Typography variant ="h6">Support</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Support is something that is not taken lightly here at e-shift. Help us to help you with things that require our support to make it to your destination.
        </Typography>
      </CardContent>
      <hr/>
      <CardActions disableSpacing style={{fontFamily: 'ProximaNova'}}>
        <div className="row">
            <div style={{float:"left", paddingTop:'7px', marginLeft:'16px'}}> 
                <Typography variant="body2" color="textSecondary">
                    Team Members
                </Typography>
            </div>
            <div style={{float: "right",marginLeft:'30px'}}>
            <AvatarGroup max={5} className="Admin-Workspace-Departments-AvatarGrouping">
            <Avatar alt="Harvey Specter" src="/assets/img/Harvey Specter.jpg" />
            <Avatar alt="Mike Ross" src="/assets/img/Mike Ross.jpg" />
            <Avatar alt= "Jessica Pearson" src="/assets/img/Jessica Pearson.jpg" />
            <Avatar alt="Donna Paulsen" src="/assets/img/Donna.jpg" />
            <Avatar alt="Rachel Zane" src="/assets/img/Rachel Zane.jpg" />
            <Avatar alt="Walter White" src="/assets/img/Walter White.jpg"/>
            <Avatar alt="Jesse Pinkman" src="/assets/img/Jesse Pinkman.jpg" />
            <Avatar alt="Skinny Pete" src="/assets/img/skinn pete.jpg" />
            <Avatar alt="Badger" src="/assets/img/badger.jpg"/>
            <Avatar alt="Skyler White" src="/assets/img/Skyler White.jpg" />
            <Avatar alt="Louis Litt" src="/assets/img/Louis Litt.jpg" />
            <Avatar alt="Harvey Specter" src="/assets/img/Harvey Specter.jpg" />
            <Avatar alt="Mike Ross" src="/assets/img/Mike Ross.jpg" />
            <Avatar alt= "Jessica Pearson" src="/assets/img/Jessica Pearson.jpg" />
            <Avatar alt="Donna Paulsen" src="/assets/img/Donna.jpg" />
            <Avatar alt="Rachel Zane" src="/assets/img/Rachel Zane.jpg" />
            <Avatar alt="Walter White" src="/assets/img/Walter White.jpg"/>
            <Avatar alt="Jesse Pinkman" src="/assets/img/Jesse Pinkman.jpg" />
            <Avatar alt="Skinny Pete" src="/assets/img/skinn pete.jpg" />
            <Avatar alt="Badger" src="/assets/img/badger.jpg"/>
            <Avatar alt="Skyler White" src="/assets/img/Skyler White.jpg" />
            <Avatar alt="Louis Litt" src="/assets/img/Louis Litt.jpg" />
    </AvatarGroup>
            </div>
        </div>
      </CardActions>
      
    </Card>
  );
}
