import React, {useState, useEffect} from 'react';
import {
    AppBar,
    Toolbar,
    useScrollTrigger,
    Tabs,
    Tab,
    Button,
    Menu,
    MenuItem,
    useMediaQuery,
    SwipeableDrawer,
    IconButton,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, useTheme } from '@material-ui/styles'
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';



function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '0.2rem'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0'
    }
  },
  logo: {
    height: '5rem',
    [theme.breakpoints.down('md')]: {
      height: '4rem'
    },
    [theme.breakpoints.down('xs')]: {
      height: '3.5rem'
    }
  },
  logoContainer: {
    padding: 0,
    '&hover': {
      backgroundColor: 'transparent'
    }
  },
  tabs: {
    marginLeft: 'auto'

  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '1.5rem'
  },
  button: {
    borderRadius: '4rem',
    margin: '0 2rem',
    textTranform: 'none',
    height: '2rem',
    color: 'white'
  },
  menuIcon: {
    marginLeft: 'auto',
    '&hover': {
      backgroundColor: 'transparent'
    }
  },
  drawer: {
    ...theme.typography.tab
  }
}))

const Header = (props) => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles()
  const theme = useTheme()
  const match = useMediaQuery(theme.breakpoints.down('md'))
  const [toggleDrawer, setToggleDrawer] = useState(null)
  const [value ,setValue ] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

  const handleChange = (e, value) => {
    setValue(value)
    
  }

  const handleClick = (e) => {
    if(!anchorEl || !open){
      setAnchorEl(e.currentTarget)
      setOpen(true)

    } else {
     setAnchorEl(null)
      setOpen(false) 
    }
   
  }

  const toggle = (e) => {
    if(!toggleDrawer){
      setToggleDrawer(true)
    } else {
      setToggleDrawer(false) 
    }
  }

  useEffect(() => {
    if(window.location.pathname === '/' && value !== 0){
      setValue(0)
    }
  })

  const tabs = (
    <React.Fragment>
      <Tabs value={value} onChange={handleChange} className={classes.tabs}>
        <Tab
          value={0}
          component={Link}
          to="/"
          className={classes.tab}
          label="Home"
        />
        <Tab
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          onClick={(e) => handleClick(e)}
          value={1}
          component={Link}
          to="/services"
          className={classes.tab}
          label="Services"
        />
        <Tab
          value={2}
          component={Link}
          to="/revo"
          className={classes.tab}
          label="Revo"
        />
        <Tab
          value={3}
          component={Link}
          to="/about"
          className={classes.tab}
          label="About"
        />
        <Tab
          value={4}
          component={Link}
          to="/contact"
          className={classes.tab}
          label="Contact"
        />
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClick={handleClick}
      >
        <MenuItem onClick={handleClick}>S 1</MenuItem>
        <MenuItem onClick={handleClick}>E 1</MenuItem>
        <MenuItem onClick={handleClick}>g 1</MenuItem>
      </Menu>
    </React.Fragment>
  );


  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={toggleDrawer}
        onClick={toggle}
        className={classes.drawer}

      >
        <List disablePadding>
          <ListItem
            divider
            button
            component={Link}
            to='/'
          >
            <ListItemText disableTypography 
            >Home</ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to='/services'
          >
            <ListItemText disableTypography
            >Services</ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to='/revo'
          >
            <ListItemText disableTypography
            >Revo</ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to='/about'
          >
            <ListItemText disableTypography
            >About</ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={Link}
            to='/contact'
          >
            <ListItemText disableTypography
            >Contact</ListItemText>
          </ListItem>

        </List>
      </SwipeableDrawer>
      <IconButton
        disableRipple
        onClick={toggle}
        className={classes.menuIcon}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>

  );



    return (
      <React.Fragment>
        <ElevationScroll>
          <AppBar>
            <Toolbar disableGutters>
              <Button
                component={Link}
                to='/'
                disableRipple
                onClick={() => setValue(0)}
                className={classes.logoContainer}
              >
                <img src={logo} alt='company' className={classes.logo}/>
              </Button>
              {match ? drawer : tabs}
                
                
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin} />
      </React.Fragment>
      
    );
    
    
};

export default Header