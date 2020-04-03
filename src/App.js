import React, { useEffect } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import Appcontent from './components/AppContent'
import { GetContextWebInformation, GetCurrentUser } from 'citz-imb-sp-utilities'
import './css/App.css'

/**
 * apply theme and context to application
 */

export const SiteFullUrl = React.createContext()
export const WebFullUrl = React.createContext()
export const CurrentUser = React.createContext()

export default function App() {
    let siteFullUrl, webFullUrl, currentUser

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#234075'
            },
            secondary: {
                main: '#E3A82B'
            }
        }
    })

    useEffect(() => {
        GetContextWebInformation().then(response => {
            siteFullUrl = response.SiteFullUrl
            webFullUrl = response.WebFullUrl
        })

        GetCurrentUser().then(response => {
            currentUser = response
        })

        return () => { }
    }, [])


    return (
        <MuiThemeProvider theme={theme}>
            <SiteFullUrl.Provider value={siteFullUrl}>
                <WebFullUrl.Provider value={webFullUrl}>
                    <CurrentUser.Provider value={currentUser}>
                        <Appcontent />
                    </CurrentUser.Provider>
                </WebFullUrl.Provider>
            </SiteFullUrl.Provider>
        </MuiThemeProvider >
    )

}
