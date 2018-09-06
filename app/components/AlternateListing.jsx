import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import TextField from '@material-ui/core/TextField';
import { Avatar, Snackbar} from '@material-ui/core/';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import seattle from '../../assets/images/seattle.jpg'
var axios = require('axios');

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  hotelImagesRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  subheader: {
    width: '100%',
  },
  userImg: {
    width: '25%',
    height: '25%'
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

const images = [
  {
    url: '/static/images/grid-list/breakfast.jpg',
    title: 'Breakfast',
    width: '100%',
  },
  {
    url: '/static/images/grid-list/burgers.jpg',
    title: 'Burgers',
    width: '30%',
  },
  {
    url: '/static/images/grid-list/camera.jpg',
    title: 'Camera',
    width: '30%',
  },
];

class ListingWithDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      openModal: false,
      openSnack: false,
      scroll: 'paper',
      listingMessage: ''
    };
  }

  handleMessageChange(e) {
    this.setState({listingMessage: e.target.value})
  }

  handleClickOpen() {
    this.setState({ open: true});
  };

  handleClickClose() {
    this.setState({ open: false})
  }

  handleOpenModal(listing) {
    this.setState({ openModal: true});
  };

  handleCloseModal() {
    this.setState({ openModal: false})
  }

  handleMessageSubmit(listing) {
    let message = this.state.listingMessage
    axios.post('/api/message/', {to: listing.user._id, content:message})
    .then(resp => {
      if(resp.data.success) this.setState({openSnack: true, listingMessage: ''});
      else {
        alert(resp)
      }
    })
    .catch((err) => alert(err))

    console.log(listing)

    {/*axios.post('/request', {to: listing.to, from: listing.from, listing: listing._id})*/}
  }

  render() {
    const classes = this.props.classes
    let image = images[0]
    let hotel = this.props.hotel
    return (
      <div className={classes.root}>
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '100%',
          }}
          onClick={() => this.handleClickOpen()}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${hotel.images[0]})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subheading"
              color="inherit"
              className={classes.imageTitle}
            >
              {hotel.name}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClickClose()}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogContent>
            <Typography className={classes.hotelName} variant="headline">{hotel.name}</Typography>
            <div className={classes.hotelImagesRoot}>
              <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {hotel.images.map(image => (
                  <GridListTile key={image}>
                    <img src={image}/>
                  </GridListTile>
                ))}
              </GridList>
            </div>
            <Typography variant="subheading">
              {hotel.rating}/10
            </Typography>
            <Typography variant="subheading">
              {hotel.description}
            </Typography>
            <div>
              <List >
                {hotel.listings.map((listing) => (
                  <div>
                    <ListItem>
                      <Button onClick={() => this.handleOpenModal(listing)}>
                        <ListItemText style={{color:'#008081'}} primary={'Price: $'+listing.price+' From: '+listing.from+' To: '+listing.to} />
                      </Button>
                      <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.openModal}
                        onClose={() => this.handleCloseModal()}
                      >
                        <div style={{top: '50%', left: '50%', transform: `translate(-50%, -50%`,}} className={classes.paper}>
                          <div style={{display:'inline-flex'}}>
                            {listing.user.imgUrl ? <img className={classes.userImg} src={listing.user.imgUrl} /> ? listing.user.gender === 'Male' : <img className={classes.userImg} src={'https://cdn.iconscout.com/public/images/icon/free/png-256/avatar-user-boy-389cd1eb1d503149-256x256.png'} /> : <img className={classes.userImg} src={'https://cdn.iconscout.com/public/images/icon/free/png-256/avatar-user-boy-389cd1eb1d503149-256x256.png'} />}
                            <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                              <Typography variant="title" id="modal-title" align='center' color='inherit'>
                                {listing.user.name.fname} {listing.user.name.lname}
                              </Typography>
                              <Typography variant="subheading" align='center' id="simple-modal-description" color="textPrimary">
                                Email: sample@gmail.com
                              </Typography>
                              <Typography variant="subheading" align='center' id="simple-modal-description" color="textPrimary">
                                Languages: Spanish, French
                              </Typography>
                              <Typography variant="subheading" align='center' id="simple-modal-description" color="textPrimary">
                                Gender: Male
                              </Typography>
                            </div>
                          </div>
                          <br/>
                          <Typography variant="title" id="modal-title" align="center" color="textSecondary">
                            Price: ${listing.price}
                          </Typography>
                          <Typography style={{width:'100%'}} variant="subheading" align="center" id="simple-modal-description" color="primary">
                            Dates: {listing.from} - {listing.to}
                          </Typography>
                          <Typography variant="subheading" id="simple-modal-description" align="center" color="primary">
                            Guests: {listing.guests}
                          </Typography>
                          <div>
                            <div style={{width:'100%'}}>
                              <Typography variant="subheading" align="center" id="simple-modal-description" color="primary">
                                Send {listing.user.name.fname} a message!
                              </Typography>
                            </div>
                            <TextField
                              style={{width:'100%'}}
                              defaultValue={`Message ${listing.user.name.fname} ${listing.user.name.lname}`}
                              label="Direct Message"
                              id="bootstrap-input"
                              multiline='true'
                              fullWidth='true'
                              onChange={(e) => this.handleMessageChange(e)}
                              InputProps={{
                                disableUnderline: true,
                                classes: {
                                  root: classes.bootstrapRoot,
                                  input: classes.bootstrapInput,
                                },
                              }}
                              InputLabelProps={{
                                shrink: true,
                                className: classes.bootstrapFormLabel,
                              }}
                            />
                            <div style={{display:'inline-flex'}}>
                              <Avatar src={'https://i.imgur.com/dGo8DOk.png'} />
                              <Button style={{backgroundColor:'red'}} onClick={() => this.handleMessageSubmit(listing)}>Submit</Button>
                              <Snackbar
                                varient='success'
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                                }}
                                open={this.state.openSnack}
                                autoHideDuration={6000}
                                onClose={() => this.setState({openSnack:false, openModal: false})}
                                ContentProps={{
                                  'aria-describedby': 'message-id',
                                }}
                                message={
                                  <span id="message-id">
                                    <CheckCircleIcon/>
                                    Sent message to {listing.user.name.fname}!
                                  </span>}
                                action={[
                                  <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={() => this.setState({openSnack: false, openModal: false})}
                                  >
                                    <CloseIcon />
                                  </IconButton>,
                                ]}
                              />
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </ListItem>
                    <Divider light />
                  </div>
                ))}
              </List>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClickClose()} color="primary">
              Go Back
            </Button>
            <Button onClick={() => this.handleClickClose()} color="primary">
              Subscribe
            </Button>
          </DialogActions>
      </Dialog>
      </div>
    )
  }
}

function AlternateListing(props) {
  const { classes } = props;
  let image = images[0]
  return (
    <div>
      <ListingWithDialog classes={classes} hotel={props.hotel}/>
    </div>
  );
}

AlternateListing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlternateListing);
