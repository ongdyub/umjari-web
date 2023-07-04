import React from 'react';
import {  Route } from 'react-router';
import MainPage from "../src/MainPage/MainPage";
import About from "../src/About/About";
import Write from "../src/Write/Write";
import Board from "../src/Board/Board";
import Article from "../src/Article/Article";
import GroupSearch from "../src/GroupSearch/GroupSearch";
import MyConcert from "../src/MyConcert/MyConcert";
import Manage from "../src/Manage/Manage";
import Concert from "../src/Concert/Concert";
import Group from "../src/Group/Group";
import AddConcert from "../src/AddConcert/AddConcert";
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