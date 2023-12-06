// themes.ts
import { createTheme } from '@mui/material';



const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0866ff', // Change the primary color for light mode
        },
        secondary: {
            main: '#fec84b', // Change the secondary color for light mode
        },
        action: {
            active: '#1976D2',
            hover: 'rgba(25, 118, 210, 0.08)',
            selected: 'rgba(25, 118, 210, 0.16)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)'
        },
        divider: 'rgba(0, 0, 0, 0.12)',
        background: {
            default: '#f0f2f5', // Set the default background color for light mode
            paper: '#FFFFFF',   // Set the background color for paper components (like cards) in light mode
        },
        text: {
            primary: '#000000', // Set the text color for primary elements in light mode
            secondary: 'rgba(0, 0, 0, 0.7)', // Set the text color for secondary elements in light mode
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF', // Change the navigation color
                    color: '#000000', // Change the text color for navigation items
                },
            },
        },
         MuiTextField: {
      styleOverrides: {
        root: {
          '& fieldset': {
            // Customize the default border color for TextField
            borderColor: 'rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    },
    
    // ... (other configurations)
});

export default defaultTheme;
