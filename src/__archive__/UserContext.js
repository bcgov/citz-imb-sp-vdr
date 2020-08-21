import React from 'react'

const UserContext = React.createContext()

const UserContextProvider = UserContext.Provider
const UserContextConsumer = UserContext.Consumer

export {UserContextProvider, UserContextConsumer}