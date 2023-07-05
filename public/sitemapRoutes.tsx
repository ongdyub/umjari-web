import React from 'react';
import {  Route } from 'react-router';
import {Routes} from "react-router-dom";

export default (
    <Routes>
        <Route path="/" />
        <Route path="/about"/>
        <Route path="/community/:boardName"/>
        <Route path="/groupsearch"/>
        <Route path="/myconcert/:profileName/*"/>
        <Route path="/concert/:id/*" />
        <Route path="/group/:id/*"/>
    </Routes>
);