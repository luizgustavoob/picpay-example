import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import * as logo from '../../assets/logo/logo-green.jpg';

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1,
    background: '#FFF'
  }
}));

const Header = () => {
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width='100%'>
            <img src={logo} alt="Logo Picpay" title="Logo Picpay" width="130px" />
            <Hidden xsDown>
              <Box>
                <Button color="inherit" href="https://ecommerce.picpay.com/">Quero Ser Lojista</Button>
                <Button color="inherit" href="https://ecommerce.picpay.com/doc/">Consultar API</Button>
              </Box>
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;