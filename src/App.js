import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import Appcontent from './components/AppContent'
import './css/App.css'
import { render } from '@testing-library/react'
/**
 * apply theme scheme to application
 */
export default function App() {

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#234075'
            },
            secondary: {
                main: '#E3A82B'
            },
            text: {
                secondary: '#eeeeee'
            }

        }
    })

    console.log("theme", theme)

    return (
        <MuiThemeProvider theme={theme}>
            <Appcontent />
        </MuiThemeProvider>
    )

}
