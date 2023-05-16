import {Divider, Stack} from "@mui/material";
import { useParams } from "react-router-dom";
import ConcertInfo from "./ConcertInfo/ConcertInfo";
import ConcertDetail from "./ConcertDetail/ConcertDetail";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import {concert, concertStateActions, selectConcert} from "../store/slices/concert/concert";
import {signUp} from "../store/slices/user/user";

const Concert = () => {

    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const [exist, setExist] = useState(true)

    const concertSelector = useSelector(selectConcert)

    useEffect(() => {
        const fetchConcert = async () => {
            const result = await dispatch(concert(id))
            if (result.type === `${signUp.typePrefix}/fulfilled`) {

            }
            else{
                if(result.payload === 4002){
                    setExist(false)
                }
            }
        }

        fetchConcert()

        return () => {
            dispatch(concertStateActions.resetConcert());
        };
    },[id,dispatch])

    if(concertSelector.concert === null){
        if(exist){
            return(
                <div>
                    로딩중
                </div>
            )
        }
        else{
            return(
                <div>
                    존재하지 않는 concert 의 id 입니다.
                </div>
            )
        }

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