import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/app.css'
import './assets/css/loader.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faAlignCenter } from '@fortawesome/free-solid-svg-icons'
import Root from './Root';
import store from './store';

library.add([
    faSpinner, faAlignCenter
])

ReactDOM.render(
    <Root store={store}/>
    ,
    document.getElementById('app'));
