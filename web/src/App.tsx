import React from 'react';
import { useHelloQuery } from './generated/graphql';

function App() {
  const { data, loading } = useHelloQuery()

  if (loading || !data) {
    return <div>Loading...</div>
  }
  return (
  <h1>{data.hello}</h1>
  )
}

export default App;
