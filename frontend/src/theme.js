import { createMuiTheme } from '@material-ui/core/styles';

// Theme sombre pour le site
export const theme = createMuiTheme({
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

// Theme sombre pour les graphiques
export const chartDarkTheme = {
    chart: {
        layout: {
            backgroundColor: '#303030',
            lineColor: '#2B2B43',
            textColor: '#D9D9D9',
        },
        crosshair: {
            color: '#758696',
        },
        grid: {
            vertLines: {
                color: '#2B2B43',
            },
            horzLines: {
                color: '#363C4E',
            },
        },
    },
    series: {
        color: '#20E22F',
    },
};
