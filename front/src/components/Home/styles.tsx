import { AppStyle } from 'decorators/withStyles';

const styles: AppStyle = {
  container: {
    margin: 20,
  },
  gridContainer: {
    maxWidth: 450,
    margin: '60px auto'
  },
  buttonAdd: {
    textAlign: 'right',
  },
  logo: {
    textAlign: 'center',
    '& img': {
      width: 250,
      maxWidth: '100%'
    },
    '& h1': {
      marginTop: -22,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: 20,
      opacity: 0.6
    }
  },
  loader: {
    textAlign: 'center',
    '& p': {
      marginTop: 20,
      fontSize: 18
    }
  }
};

export default styles;