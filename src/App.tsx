import React from 'react';
import './App.css';
import {BreakpointOverrides, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import Header from "./Common/Header/Header";
import Board from "./Board/Board";
import Write from "./Write/Write";
import Article from "./Article/Article";
import GroupSearch from "./GroupSearch/GroupSearch";
import MyConcert from "./MyConcert/MyConcert";
import Concert from "./Concert/Concert";
import Group from "./Group/Group";
import AddConcert from "./AddConcert/AddConcert";
import Manage from "./Manage/Manage";
import About from "./About/About";
import Account from "./Account/Account";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        res300: true;
        res400: true;
        res450: true;
        res500: true;
        res550: true;
        res650: true;
        res700: true;
        res750: true;
        res800: true;
        res950: true;
        res1000: true;
        res1050: true;
        res1100: true;
    }
}

const blueTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main : '#292929',
            light: '#606060',
            dark : '#252525',
        },
        secondary: {
            main : '#ba68c8',
            light: '#ffffff',
            dark : '#111111'
        },

    },
    breakpoints : {
        values: {
            xs: 0,
            res300: 300,
            res400: 400,
            res450: 450,
            res500: 500,
            res550: 550,
            sm: 600,
            res650: 650,
            res700: 700,
            res750: 750,
            res800: 800,
            md: 900,
            res950: 950,
            res1000: 1000,
            res1050: 1050,
            res1100: 1100,
            lg: 1200,
            xl: 1536,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    '&:focus': {
                        outline: 'none',
                    },
                    'WebkitTapHighlightColor' : 'transparent',
                    '-webkit-scrollbar': {display: 'none'}
                },
            },
        },
    },
});


export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function App() {
    return (
        <ThemeProvider theme={blueTheme}>
            <CssBaseline/>
            <div>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/write" element={<Write/>}/>
                        <Route path="/community/:boardName" element={<Board/>}/>
                        <Route path="/community/:boardName/:id/*" element={<Article/>}/>
                        <Route path="/community/:boardName/:id/edit" element={<Write mode={'edit'}/>}/>
                        <Route path="/groupsearch" element={<GroupSearch/>}/>
                        <Route path="/myconcert/:profileName/*" element={<MyConcert/>}/>
                        <Route path="/manage/:profileName/*" element={<Manage/>}/>
                        <Route path="/concert/:id/*" element={<Concert/>}/>
                        <Route path="/group/:id/*" element={<Group/>}/>
                        <Route path="/add/:id" element={<AddConcert/>}/>
                        <Route path="/account" element={<Account/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
