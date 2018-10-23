import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import { AppLoader } from './component/Loader';
import Loadable from 'react-loadable';
import { history } from './store';
import Navigation from './component/Navigation';

const Requests = Loadable({
    loader: () => import('./pages/Requests'),
    loading() {
        return <AppLoader />
    }
});

const Song = Loadable({
    loader: () => import('./pages/Song'),
    loading() {
        return <AppLoader />
    }
});


class Root extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('root component mounted');
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={history}>
                    <div>
                        <Navigation />
                        <Switch>
                            <Route exact path="/" component={Requests} />
                            <Route path="/song" component={Song} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}

// Root.propTypes = {
//     store: PropTypes.object.isRequired
// }

export default Root;