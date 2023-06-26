import {Stack, Typography, Divider, Avatar, useTheme, useMediaQuery, IconButton, Pagination} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {
    getCurFriend,
    getRequestFriend, receiveFriendPost, rejectCurFriend, rejectFriendPost,
    selectFriend
} from "../../store/slices/manage/friend/friend";
import {selectUser} from "../../store/slices/user/user";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from '@mui/icons-material/Clear';
import * as React from "react";
import DeleteConfirmModal from "../../Modal/DeleteConfirmModal";

const tempList = [
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    },
    {
        "id": 0,
        "user": {
            "id": 0,
            "profileName": "string",
            "profileImage": "string"
        }
    }
]

const Friend = () => {

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    const {profileName} = useParams()

    const navigate = useNavigate()

    const userState = useSelector(selectUser)
    const friendState = useSelector(selectFriend)

    const dispatch = useDispatch<AppDispatch>()

    const [open, setOpen] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<number>(0)

    const [reqNum, setReqNum] = useState(0)
    const [rePage, setRePage] = useState(1)
    const [reTotalPage, setReTotalPage] = useState(1)

    const [curNum, setCurNum] = useState(0)
    const [curPage, setCurPage] = useState(1)
    const [curTotalPage, setCurTotalPage] = useState(1)

    const [openFriend, setOpenFriend] = useState<boolean>(false)
    const [confirmFriend, setConfirmFriend] = useState<boolean>(false)
    const [deleteFriendId, setDeleteFriendId] = useState<number>(0)

    const handleReChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setRePage(value);
    }
    const handleCurChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurPage(value);
    }

    const handleAddFriend = async (id : number) => {
        const result = await dispatch(receiveFriendPost({token : userState.accessToken, id}))
        if(result.type === `${receiveFriendPost.typePrefix}/fulfilled`){
            const param = {
                page: rePage,
                size: 20,
                sort: "createdAt,DESC"
            }
            dispatch(getRequestFriend({token : userState.accessToken, param}))
            dispatch(getCurFriend({profileName, token : userState.accessToken, param}))
        }
    }
    const handleDeleteReq = async (id : number) => {
        setOpen(true)
        setDeleteId(id)
    }
    const handleRejectFriend = async () => {
        const result = await dispatch(rejectFriendPost({token : userState.accessToken, id : deleteId}))
        if(result.type === `${rejectFriendPost.typePrefix}/fulfilled`){
            const param = {
                page: rePage,
                size: 20,
                sort: "createdAt,DESC"
            }
            dispatch(getRequestFriend({token : userState.accessToken, param}))
        }
        setOpen(false)
    }


    const handleDeleteFriend = async (id : number) => {
        setOpenFriend(true)
        setDeleteFriendId(id)
    }
    const handleDeleteCurFriend = async () => {
        const result = await dispatch(rejectCurFriend({token : userState.accessToken, id : deleteFriendId}))
        if(result.type === `${rejectCurFriend.typePrefix}/fulfilled`){
            const param = {
                page: rePage,
                size: 20,
                sort: "createdAt,DESC"
            }
            dispatch(getCurFriend({profileName, token : userState.accessToken, param}))
        }
        setOpenFriend(false)
    }

    useEffect(() => {
        const param = {
            page: 1,
            size: 20,
            sort: "createdAt,DESC"
        }
        dispatch(getRequestFriend({token : userState.accessToken, param}))
        dispatch(getCurFriend({profileName, token : userState.accessToken, param}))
    },[profileName])

    useEffect(() => {
        const param = {
            page: rePage,
            size: 20,
            sort: "createdAt,DESC"
        }
        dispatch(getRequestFriend({token : userState.accessToken, param}))
    },[rePage])
    useEffect(() => {
        const param = {
            page: curPage,
            size: 20,
            sort: "createdAt,DESC"
        }
        dispatch(getCurFriend({profileName, token : userState.accessToken, param}))
    },[curPage])

    useEffect(() => {
        if(friendState.requestFriend !== null){
            setReTotalPage(friendState.requestFriend.totalPages)
            setReqNum(friendState.requestFriend.totalElements)
        }
    },[friendState.requestFriend])

    useEffect(() => {
        if(friendState.currentFriend !== null){
            setCurTotalPage(friendState.currentFriend.totalPages)
            setCurNum(friendState.currentFriend.totalElements)
        }
    },[friendState.currentFriend])

    useEffect(() => {
        if(confirm){
            handleRejectFriend().then(() => {})
        }
        setConfirm(false)
    },[confirm])
    useEffect(() => {
        if(confirmFriend){
            handleDeleteCurFriend().then(() => {})
        }
        setConfirmFriend(false)
    },[confirmFriend])

    return(
        <Stack sx={{width: '100%'}} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 25, fontWeight: 300}}>친구 요청</Typography>
                <Typography sx={{ml:2,fontSize : 15}}>{reqNum} 명의 요청이 있습니다.</Typography>
            </Stack>

            <Divider sx={{mt : 1,mb:1, width: '90%'}} />

            <Stack direction={"row"} alignContent={"center"} justifyContent={"flex-start"} flexWrap={'wrap'} sx={{width : '90%'}}>
                {friendState.requestFriend?.contents.map((item, idx) => (
                    <Stack key={idx} direction="row" spacing={res550 ? 0 : 3} sx={{mr: res550 ? 0.5 : 1, mb : res550 ? 0.5 : 1.5, cursor: 'pointer', height: res550 ? 33 : 44}}>
                        <Stack sx={{borderRadius: 20, bgcolor: '#eeeeee',pt:1, pl:1, pr:res550 ? 2 : 3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                            <Avatar onClick={() => navigate(`/myconcert/${item.user.profileName}/selfintro`)} alt={item.user.profileName} src={`${item.user.profileImage}`} sx={{width: res550 ? 20 : 33, height: res550 ? 20 : 33, fontSize : res550 ? 12 : ''}} />
                            <Typography onClick={() => navigate(`/myconcert/${item.user.profileName}/selfintro`)} sx={{ml: res550 ? 1 : 2, fontSize: res550 ? 12 : 15, fontWeight: 400, color:'#424242'}}>{item.user.profileName}</Typography>
                            <IconButton onClick={() => handleAddFriend(item.id)} sx={{ml:1,mr:-1, width:18, height:18}}>
                                <AddIcon  fontSize="inherit" sx={{color: 'blue',width:18, height:18}} />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteReq(item.id)} sx={{ml:1,mr:-1}}>
                                <ClearIcon fontSize="inherit" sx={{color: 'red',width:18, height:18}} />
                            </IconButton>
                        </Stack>
                    </Stack>
                ))}
            </Stack>

            <Stack alignItems="center" sx={{mt:1,mb:1,width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "large"} count={reTotalPage} page={rePage} onChange={handleReChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>

            <Divider sx={{mt : 1, mb: 1, width: '90%'}} />

            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 25, fontWeight: 300}}>친구 목록</Typography>
                <Typography sx={{ml:2,fontSize : 15}}>{curNum} 명의 친구가 있습니다.</Typography>
            </Stack>

            <Divider sx={{mt : 1,mb:1, width: '90%'}} />

            <Stack direction={"row"} alignContent={"center"} justifyContent={"flex-start"} flexWrap={'wrap'} sx={{width : '90%'}}>
                {friendState.currentFriend?.contents.map((item, idx) => (
                    <Stack key={idx} direction="row" spacing={res550 ? 0 : 5} sx={{mr: res550 ? 0.5 : 2, mb : res550 ? 0.5 : 2, cursor: 'pointer', height: res550 ? 33 : 44}}>
                        <Stack sx={{borderRadius: 20, bgcolor: '#eeeeee',pt:1, pl:1, pr:res550 ? 2 : 3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                            <Avatar onClick={() => navigate(`/myconcert/${item.user.profileName}/selfintro`)} alt={item.user.profileName} src={`${item.user.profileImage}`} sx={{width: res550 ? 20 : 33, height: res550 ? 20 : 33, fontSize : res550 ? 12 : ''}} />
                            <Typography onClick={() => navigate(`/myconcert/${item.user.profileName}/selfintro`)} sx={{ml: res550 ? 1 : 2, fontSize: res550 ? 12 : 15, fontWeight: 400, color:'#424242'}}>{item.user.profileName}</Typography>
                            <IconButton onClick={() => handleDeleteFriend(item.id)} sx={{ml:1,mr:-1}}>
                                <ClearIcon fontSize="inherit" sx={{color: 'red',width:18, height:18}} />
                            </IconButton>
                        </Stack>
                    </Stack>
                ))}
            </Stack>

            <Stack alignItems="center" sx={{mt:1,mb:1,width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "large"} count={curTotalPage} page={curPage} onChange={handleCurChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>

            {
                open ?
                    <DeleteConfirmModal open={open} setOpen={setOpen} setConfirm={setConfirm} />
                    :
                    null
            }
            {
                openFriend ?
                    <DeleteConfirmModal open={openFriend} setOpen={setOpenFriend} setConfirm={setConfirmFriend} />
                    :
                    null
            }
        </Stack>
    )
}

export default Friend
