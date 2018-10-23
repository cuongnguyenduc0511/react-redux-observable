// import Requests from "./pages/Requests";
// import { Song } from "./pages/Song";
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { AppLoader } from './component/Loader';

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

const routes = [
    {
        path: '/requests',
        component: Requests,
    },
    {
      path: '/song',
      component: Song,
    }
]

export default routes;
