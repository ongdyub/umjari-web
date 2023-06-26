import {Button, ButtonGroup, Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {selectUser} from "../store/slices/user/user";
import {useEffect} from "react";
import {friendStateActions, isSelfGet, selectFriend} from "../store/slices/manage/friend/friend";
import Friend from "./Friend/Friend";

const Manage = () => {

    const theme = useTheme();
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();

    const {profileName} = useParams()

    const userState = useSelector(selectUser)
    const manageState = useSelector(selectFriend)

    const onClickGoFriend = () => {
        navigate(`/manage/${profileName}/friend`)
    }

    const onClickGoSelf = () => {
        window.alert("준비중입니다.")
    }


    const myButtons = [
        <Button onClick={onClickGoFriend} sx={{fontSize: res750 ? 12 : 14}} key="friend">친구관계</Button>,
        <Button onClick={onClickGoSelf} sx={{fontSize: res750 ? 12 : 14}} key="article">작성글</Button>,
        <Button onClick={onClickGoSelf} sx={{fontSize: res750 ? 12 : 14}} key="comment">작성댓글</Button>,
    ]



    useEffect(() => {
        dispatch(isSelfGet({profileName, token : userState.accessToken}))
        return () => {
            dispatch(friendStateActions.resetFriendState())
        }
    },[profileName])

    if(manageState.loadingState === 'base'){
        return(
            <Stack>
                로딩중...
            </Stack>
        )
    }
    else if(manageState.loadingState === 'ok' && manageState.isSelfProfile){
        return(
            <Stack sx={{mb : 5}}>
                <Stack sx={{pl: res750 ? 0 : 6, width: '100%'}} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
                    <Divider sx={{mt:1,width: '95%'}}/>
                    <Stack sx={{mt:2}}>
                        <ButtonGroup variant={"text"} size={"small"}>
                            {myButtons}
                        </ButtonGroup>
                    </Stack>
                    <Divider sx={{mt:2,mb:1, width: '95%'}}/>
                    <Routes>
                        <Route path="friend" element={<Friend />}/>
                    </Routes>
                </Stack>
            </Stack>
        )
    }
    else{
        return(
            <Stack>
                권한이 없습니다.
            </Stack>
        )
    }
}

export default Manage
