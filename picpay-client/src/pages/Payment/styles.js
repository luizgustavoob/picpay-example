import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  qrCode: {
    padding: '50px 0 0 25px',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  figure: {
    width: '100%',
    height: '335px',
    [theme.breakpoints.only('xs')] : {
      marginTop: '15px',
      width: '100%',
      height: '240px'
    },
    [theme.breakpoints.only('sm')]: {
      marginTop: '15px',
      width: '45%',
      height: '270px'
    }
  },
  img: {
    width: '100%',
    height: '100%'
  },
  textNormal: {
    fontWeight: 'normal'
  },
  textBold: {
    fontWeight: 'bold'
  }
}));

export default useStyles;