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
                </Routes>
            </BrowserRouter >
        </div>
      </ThemeProvider>
  );
}

export default App;
