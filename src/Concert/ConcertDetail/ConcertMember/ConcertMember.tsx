import {Avatar, Button, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import { FaCrown } from 'react-icons/fa';
import {GiQueenCrown} from 'react-icons/gi'
import {CgCrown} from 'react-icons/cg'
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {concertMemberGet, concertStateActions, selectConcert} from "../../../store/slices/concert/concert";
import {selectUser} from "../../../store/slices/user/user";
import AddConcertMemberModal from "../../../Modal/AddConcertMemberModal";
import DeleteConcertMemberModal from "../../../Modal/DeleteConcertMemberModal";


const ConcertMember = () => {

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const concertState = useSelector(selectConcert)
    const userState = useSelector(selectUser)

    const [isAdminGroup, setIsAdminGroup] = useState(false)
    const [open, setOpen] = useState<boolean>(false)
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

    const handleAddMemberModalOpen = () => {
        if(concertState.concert === null || concertState.concert.setList === null || Array.isArray(concertState.concert.setList) && concertState.concert.setList.length < 1){
            window.alert("곡을 먼저 추가하세요")
            return
        }
        else{
            setOpen(true)
        }
    }
    const handleDeleteMemberModalOpen = () => {
        if(concertState.concert === null || concertState.concert.setList === null || Array.isArray(concertState.concert.setList) && concertState.concert.setList.length < 1){
            window.alert("곡을 먼저 추가하세요")
            return
        }
        else{
            setDeleteOpen(true)
        }
    }

    useEffect(() => {
        if(!open || !deleteOpen){
            dispatch(concertMemberGet(id))
        }
        return () => {
            dispatch(concertStateActions.resetParticipants())
        }
    },[id,dispatch,open,deleteOpen])

    useEffect(() => {
        if(userState.isLogin){
            const userGroup = userState.career.find((userGroup) => userGroup.groupId === concertState.concert?.groupId)

            if(userGroup !== null && userGroup !== undefined && userGroup.memberType === 'ADMIN'){
                setIsAdminGroup(true)
            }
        }
    },[userState.career, concertState.concert, userState.isLogin])

    return (
        <Stack justifyContent={"flex-start"} sx={{width: '100%', mb:10}}>
            <Divider sx={{width: '90%', mt: -1}}/>
            <Stack sx={{mt: 2, pl:5, pr: 5, mb:2}}>
                {
                    concertState.participants.map((item, idx) => (
                        <Stack key={idx} sx={{mb:2, width : '100%'}}>
                            <Stack justifyContent={"flex-start"} sx={{mb: 1}}>
                                <Typography sx={{fontSize: res550 ? 25 : 35, fontWeight: 100, fontFamily: "Open Sans"}}>{item.part}</Typography>
                            </Stack>
                            <Stack direction={"row"} alignContent={"center"} justifyContent={"flex-start"} flexWrap={'wrap'} sx={{width : '100%'}}>
                                {item.master.map((item) => (
                                        <Stack onClick={() => navigate(`/myconcert/${item.profileName}/selfintro`)} key={item.id} direction="row" spacing={res550 ? 0 : 5} sx={{mr: res550 ? 0.5 : 2, mb:res550 ? 0.5 : 2, cursor: 'pointer', height: res550 ? 33 : 44}}>
                                            <Stack sx={{borderRadius: 20, bgcolor: '#000000',pt:1, pl:1.5, pr:res550 ? 2 : 3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                                <Avatar alt={item.profileName} src={`${item.profileImage}`} sx={{width: res550 ? 20 : 33, height: res550 ? 20 : 33, fontSize : res550 ? 12 : ''}} />
                                                <Typography sx={{ml: res550 ? 1 : 2, fontSize: res550 ? 12 : 15, fontWeight: 600, color:'#ffffff', mr:1}}>{item.profileName}</Typography>
                                                <GiQueenCrown color={'#ffff00'} />
                                            </Stack>
                                        </Stack>
                                ))}
                                {item.principal.map((item) => (
                                    <Stack onClick={() => navigate(`/myconcert/${item.profileName}/selfintro`)} key={item.id} direction="row" spacing={res550 ? 0 : 5} sx={{mr: res550 ? 0.5 : 2, mb : res550 ? 0.5 : 2, cursor: 'pointer', height: res550 ? 33 : 44}}>
                                        <Stack sx={{borderRadius: 20, bgcolor: '#444444',pt:1, pl:1.5, pr:res550 ? 2 : 3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                            <Avatar alt={item.profileName} src={`${item.profileImage}`} sx={{width: res550 ? 20 : 33, height: res550 ? 20 : 33, fontSize : res550 ? 12 : ''}} />
                                            <Typography sx={{ml: res550 ? 1 : 2, fontSize: res550 ? 12 : 15, fontWeight: 400, color:'#ffffff', mr:1}}>{item.profileName}</Typography>
                                            <FaCrown color={'#ffffff'}/>
                                        </Stack>
                                    </Stack>
                                ))}
                                {item.assistantPrincipal.map((item) => (
                                    <Stack onClick={() => navigate(`/myconcert/${item.profileName}/selfintro`)} key={item.id} direction="row" spacing={res550 ? 0 : 5} sx={{mr: res550 ? 0.5 : 2, mb : res550 ? 0.5 : 2, cursor: 'pointer', height: res550 ? 33 : 44}}>
                                        <Stack sx={{borderRadius: 20, bgcolor: '#546e7a',pt:1, pl:1.5, pr:res550 ? 2 : 3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                            <Avatar alt={item.profileName} src={`${item.profileImage}`} sx={{width: res550 ? 20 : 33, height: res550 ? 20 : 33, fontSize : res550 ? 12 : ''}} />
                                            <Typography sx={{ml: res550 ? 1 : 2, fontSize: res550 ? 12 : 15, fontWeight: 400, color:'#ffffff', mr:1}}>{item.profileName}</Typography>
                                            <CgCrown color={'#ffffff'}/>
                                        </Stack>
                                    </Stack>
                                ))}
                                {item.member.map((item,idx) => (
                                    <Stack onClick={() => navigate(`/myconcert/${item.profileName}/selfintro`)} key={idx} direction="row" spacing={res550 ? 0 : 5} sx={{mr: res550 ? 0.5 : 2, mb : res550 ? 0.5 : 2, cursor: 'pointer', height: res550 ? 33 : 44}}>
                                        <Stack sx={{borderRadius: 20, bgcolor: '#eeeeee',pt:1, pl:1, pr:res550 ? 2 : 3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                            <Avatar alt={item.profileName} src={`${item.profileImage}`} sx={{width: res550 ? 20 : 33, height: res550 ? 20 : 33, fontSize : res550 ? 12 : ''}} />
                                            <Typography sx={{ml: res550 ? 1 : 2, fontSize: res550 ? 12 : 15, fontWeight: 400, color:'#424242'}}>{item.profileName}</Typography>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                            <Divider sx={{width:'75%'}} />
                        </Stack>
                    ))
                }
            </Stack>
            {
                isAdminGroup ?
                    <Stack sx={{width: '90%', mb : 5}} direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                        <Button size={"small"} color={"error"} variant={"contained"} sx={{mr:1}} onClick={handleDeleteMemberModalOpen} >멤버 삭제</Button>
                        <Button size={"small"} variant={"contained"} onClick={handleAddMemberModalOpen}>멤버 추가</Button>
                    </Stack>
                    :
                    null
            }
            {
                concertState.concert === null || concertState.concert.setList.length < 1 ?
                    null
                    :
                    <>
                        <AddConcertMemberModal open={open} setOpen={setOpen} />
                        <DeleteConcertMemberModal open={deleteOpen} setOpen={setDeleteOpen} />
                    </>
            }
        </Stack>
    );
}

// {
//     <Stack direction="row" spacing={5} sx={{mr:2, mb:2, cursor: 'pointer'}}>
//         <Button sx={{borderRadius: 20, bgcolor: '#eeeeee',pt:1, pl:1.5, pr:3, pb:1}} >
//             <Avatar alt={item} src={`/img/${idx}.jpg`} />
//             <Typography sx={{ml: 2, fontSize: 15, fontWeight: 400, color:'#424242'}}>{item}</Typography>
//         </Button>
//     </Stack>
// }

export default ConcertMember