import React from 'react'
import ReactDOM from 'react-dom'
import AppLayout from './AppLayout'
import unregister from './registerServiceWorker'

import './index.scss'

ReactDOM.render(<AppLayout />, document.getElementById('root'));
unregister();
