import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import routes from '../../routes';
import Navigation from '../../component/Navigation'
import { renderRoutes } from 'react-router-config';

export class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('app component mounted');
    }

    render() {
        document.getElementsByTagName('body')[0].className = ''
        return (
            <Router>
                <div>
                    <Navigation></Navigation>
                    <Switch>
                        {renderRoutes(routes)}
                    </Switch>
                </div>
            </Router>
        );
    }
}