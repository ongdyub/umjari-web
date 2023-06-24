import {Stack, Typography, Divider, Avatar, useTheme, useMediaQuery} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {friendStateActions, getRequestFriend, selectFriend} from "../../store/slices/manage/friend/friend";
import {selectUser} from "../../store/slices/user/user";

const Friend = () => {

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    const {profileName} = useParams()

    const navigate = useNavigate()

    const userState = useSelector(selectUser)
    const friendState = useSelector(selectFriend)

    const dispatch = useDispatch<AppDispatch>()

    const [reqNum, setReqNum] = useState(0)
    const [rePage, setRePage] = useState(1)
    const [reTotalPage, setReTotalPage] = useState(1)

    const [curNum, setCurNum] = useState(0)
    const [curPage, setCurPage] = useState(1)
    const [curTotalPage, setCurTotalPage] = useState(1)

    useEffect(() => {
        const param = {
            page: 0,
            size: 1,
            sort: "createdAt,DESC"
        }
        dispatch(getRequestFriend({token : userState.accessToken, param}))
    },[profileName])

    useEffect(() => {
        if(friendState.requestFriend !== null){
            setRePage(friendState.requestFriend.currentPage)
            setReTotalPage(friendState.requestFriend.totalPages)
            setReqNum(friendState.requestFriend.totalElements)
        }
    },[friendState.requestFriend])

    useEffect(() => {
        if(friendState.currentFriend !== null){
            setCurPage(friendState.currentFriend.currentPage)
            setCurTotalPage(friendState.currentFriend.totalPages)
            setCurNum(friendState.currentFriend.totalElements)
        }
    },[friendState.currentFriend])

    return(
        <Stack sx={{width: '100%'}} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 25, fontWeight: 300}}>친구 요청</Typography>
                <Typography sx={{ml:2,fontSize : 15}}>{reqNum} 명의 요청이 있습니다.</Typography>
            </Stack>

            <Divider sx={{mt : 1, width: '90%'}} />

            <Stack direction={"row"} alignContent={"center"} justifyContent={"flex-start"} flexWrap={'wrap'} sx={{width : '90%'}}>
                {friendState.requestFriend?.contents.map((item, idx) => (
                    <Stack onClick={() => navigate(`/myconcert/${item.user.profileName}/selfintro`)} key={idx} direction="row" spacing={res550 ? 0 : 5} sx={{mr: res550 ? 0.5 : 2, mb : res550 ? 0.5 : 2, cursor: 'pointer', height: res550 ? 33 : 44}}>
                        <Stack sx={{borderRadius: 20, bgcolor: '#eeeeee',pt:1, pl:1, pr:res550 ? 2 : 3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                            <Avatar alt={item.user.profileName} src={`${item.user.profileImage}`} sx={{width: res550 ? 20 : 33, height: res550 ? 20 : 33, fontSize : res550 ? 12 : ''}} />
                            <Typography sx={{ml: res550 ? 1 : 2, fontSize: res550 ? 12 : 15, fontWeight: 400, color:'#424242'}}>{item.user.profileName}</Typography>
                        </Stack>
                    </Stack>
                ))}
            </Stack>

            <Divider sx={{mt : 1, mb: 1, width: '90%'}} />

            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 25, fontWeight: 300}}>친구 목록</Typography>
                <Typography sx={{ml:2,fontSize : 15}}>{curNum} 명의 친구가 있습니다.</Typography>
            </Stack>

            <Divider sx={{mt : 1, width: '90%'}} />

            <Stack direction={"row"} alignContent={"center"} justifyContent={"flex-start"} flexWrap={'wrap'} sx={{width : '90%'}}>
                {friendState.currentFriend?.contents.map((item, idx) => (
                    <Stack onClick={() => navigate(`/myconcert/${item.user.profileName}/selfintro`)} key={idx} direction="row" spacing={res550 ? 0 : 5} sx={{mr: res550 ? 0.5 : 2, mb : res550 ? 0.5 : 2, cursor: 'pointer', height: res550 ? 33 : 44}}>
                        <Stack sx={{borderRadius: 20, bgcolor: '#eeeeee',pt:1, pl:1, pr:res550 ? 2 : 3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                            <Avatar alt={item.user.profileName} src={`${item.user.profileImage}`} sx={{width: res550 ? 20 : 33, height: res550 ? 20 : 33, fontSize : res550 ? 12 : ''}} />
                            <Typography sx={{ml: res550 ? 1 : 2, fontSize: res550 ? 12 : 15, fontWeight: 400, color:'#424242'}}>{item.user.profileName}</Typography>
                        </Stack>
                    </Stack>
                ))}
            </Stack>

        </Stack>
    )
}

export default Friend
