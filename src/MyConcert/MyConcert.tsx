import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import MyProfile from "./MyProfile/MyProfile";
import MyHome from "./MyHome/MyHome";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import {myConcertDefaultInfoGet, myConcertStateActions, selectMyConcert} from "../store/slices/myconcert/myconcert";
import {selectUser} from "../store/slices/user/user";

const MyConcert = () => {

    const theme = useTheme();
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const dispatch = useDispatch<AppDispatch>();

    const {profileName} = useParams()

    const userState = useSelector(selectUser)
    const myConcertState = useSelector(selectMyConcert)

    {/* TODO handle my and another user group list*/}

    useEffect(() => {

        dispatch(myConcertDefaultInfoGet({token : userState.accessToken, profileName : profileName}))

        return () => {
            dispatch(myConcertStateActions.resetMyConcertDefaultInfo())
        }
    },[profileName, dispatch, userState.accessToken])

    if(myConcertState.myDefaultInfo === null) {
        if (myConcertState.isExist) {
            return (
                <Stack>
                    로딩중...
                </Stack>
            )
        } else {
            return(
                <Stack>
                    {profileName} 은 존재하지 않는 유저입니다.
                </Stack>
            )
        }
    }
    else{
        return(
            <Stack sx={{height: '800px'}}>
                <Stack direction={res750 ? "column" : "row"}>
                    <MyProfile />
                    {
                        res750 ?
                            null
                            :
                            <Divider orientation={"vertical"}/>
                    }
                    <MyHome />
                </Stack>
            </Stack>
        )
    }
}

export default MyConcert