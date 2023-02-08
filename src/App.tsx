import React from 'react';
import './App.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {blue, grey, lightBlue} from "@mui/material/colors";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import Header from "./Common/Header/Header";
import Board from "./Board/Board";
import Write from "./Write/Write";
import Article from "./Article/Article";
import GroupSearch from "./GroupSearch/GroupSearch";
import MyConcert from "./MyConcert/MyConcert";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        res300: true;
        res500: true;
        res550: true;
        res650: true;
        res700: true;
        res750: true;
        res800: true;
        res950: true;
        res1000: true;
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
            main : '#313131',
            light: '#ffffff',
            dark : '#111111'
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            res300: 300,
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
            res1100: 1100,
            lg: 1200,
            xl: 1536,
        },
    },
});


function App() {
  return (
      <ThemeProvider theme={blueTheme}>
        <CssBaseline />
        <div>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/community/:boardName" element={<Board />} />
                    <Route path="/community/:boardName/:id" element={<Article />} />
                    <Route path="/groupsearch" element={<GroupSearch />} />
                    <Route path="/myconcert/:id/*" element={<MyConcert />} />
                </Routes>
            </BrowserRouter >
        </div>
      </ThemeProvider>
  );
}

export default App;
