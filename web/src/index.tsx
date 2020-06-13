import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import React from 'react'
import ReactDOM from 'react-dom'
import { getAccessToken } from './accessToken'
import { Routes } from './Routes'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  request: (operation) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      operation.setContext({
        headers: {
          authorization: `bearerr ${accessToken}`
        }
      })
    }
  }
})

ReactDOM.render(
  <ApolloProvider client={ client }>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
)