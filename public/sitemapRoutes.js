import React from 'react';
import {  Route } from 'react-router';

export default (
    <Route>
        <Route path='/' />
        <Route path='/about' />
        <Route path="/community/:boardName"/>
        <Route path="/groupsearch"/>
        <Route path="/myconcert/:profileName/*"/>
        <Route path="/concert/:id/*"/>
        <Route path="/group/:id/*"/>
    </Route>
);