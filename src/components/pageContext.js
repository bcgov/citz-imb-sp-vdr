import React from 'react'

const PageContext = React.createContext()

const PageContextProvider = PageContext.Provider
const PageContextConsumer = PageContext.Consumer

export {PageContextProvider, PageContextConsumer}