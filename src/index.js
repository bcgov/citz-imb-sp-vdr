// import * as serviceWorker from './Helper/serviceWorker'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { App } from 'components/App'
import { SnackbarProvider } from 'notistack'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5 } },
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#234075',
    },
    secondary: {
      main: '#E3A82B',
    },
  },
})

setTimeout(() => {
  const rootEl = document.createElement('div')
  rootEl.setAttribute('id', 'vdr-root')
  const el = document.getElementById('DeltaPlaceHolderMain')
  el.appendChild(rootEl)

  ReactDOM.render(
    <SnackbarProvider
      dense
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </QueryClientProvider>
    </SnackbarProvider>,
    rootEl
  )
}, 1000)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
