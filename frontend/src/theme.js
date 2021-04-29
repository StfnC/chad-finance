import { createMuiTheme} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({

    // TODO: Le text est blanc, donc invisible presque partout
    palette: {
        type: 'dark',

        primary: {
          main: '#333f44',
          contrastText: '#fff',
        },
        secondary: {
          main: '#8bc34a',
          contrastText: '#000',
        },
        background: {
            default: "#303030",
            paper: "#424242",
        },

        contrastThreshold: 3,
        tonalOffset: 0.2,
      },
});

export default theme;