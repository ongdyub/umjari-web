import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import { useParams } from "react-router-dom";
import ConcertInfo from "./ConcertInfo/ConcertInfo";
import ConcertDetail from "./ConcertDetail/ConcertDetail";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import {concert, concertStateActions, selectConcert} from "../store/slices/concert/concert";

const Concert = () => {

    const theme = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const res800 = useMediaQuery(theme.breakpoints.down("res800"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const concertSelector = useSelector(selectConcert)

    useEffect(() => {
        dispatch(concert(id))
        return () => {
            dispatch(concertStateActions.resetConcert());
        };
    },[id,dispatch])

    if(concertSelector.concert === null){
        return(
            <div>
                로딩중
            </div>
        )
    }
    else{
        return(
            <Stack sx={{height: '1000px'}}>
                <Stack>
                    <ConcertInfo concertData={concertSelector.concert} />
                    <Divider orientation={"horizontal"} sx={{mt:1, mb:1, width: '100%'}}/>
                    <ConcertDetail />
                </Stack>
            </Stack>
        )
    }
}

export default Concert