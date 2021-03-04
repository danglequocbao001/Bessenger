import React from 'react';
import { Loader } from './src/component';
import Nav from './src/navigation'
import { StoreProvider } from './src/context/store'

const App = () => (
    <StoreProvider>
        <Nav/>
        <Loader/>
    </StoreProvider>
)

export default App