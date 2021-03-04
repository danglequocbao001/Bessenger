import React, { Fragment } from 'react';
import { Loader } from './src/component';
import Nav from './src/navigation'

const App = () => (
    <Fragment>
        <Nav/>
        <Loader/>
    </Fragment>
)

export default App