import {Avatar, Divider, Stack, Typography} from "@mui/material";
import { FaCrown } from 'react-icons/fa';
import {GiQueenCrown} from 'react-icons/gi'
import {CgCrown} from 'react-icons/cg'
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {concertMemberGet, concertStateActions, selectConcert} from "../../../store/slices/concert/concert";


const ConcertMember = () => {

    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const memberState = useSelector(selectConcert)

    useEffect(() => {
        dispatch(concertMemberGet(id))

        return () => {
            dispatch(concertStateActions.resetParticipants())
        }
    },[id,dispatch])

    return (
        <Stack justifyContent={"flex-start"} sx={{width: '100%'}}>
            <Divider sx={{width: '90%', mt: -1}}/>
            <Stack sx={{mt: 2, pl:5, pr: 5, mb:10}}>
                {
                    memberState.participants.map((item, idx) => (
                        <Stack key={idx} sx={{mb:2, width : '100%'}}>
                            <Stack justifyContent={"flex-start"} sx={{mb: 1}}>
                                <Typography sx={{fontSize: 35, fontWeight: 100, fontFamily: "Open Sans"}}>{item.part}</Typography>
                            </Stack>
                            <Stack direction={"row"} alignContent={"center"} justifyContent={"flex-start"} flexWrap={'wrap'} sx={{width : '100%'}}>
                                {item.master.map((item) => (
                                        <Stack onClick={() => navigate(`/myconcert/${item.profileName}/selfintro`)} key={item.id} direction="row" spacing={5} sx={{mr:2, mb:2, cursor: 'pointer', height: 44}}>
                                            <Stack sx={{borderRadius: 20, bgcolor: '#000000',pt:1, pl:1.5, pr:3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                                <Avatar alt={item.profileName} src={`${item.profileImage}`} sx={{width: 33, height: 33}} />
                                                <Typography sx={{ml: 2, fontSize: 15, fontWeight: 600, color:'#ffffff', mr:1}}>{item.profileName}</Typography>
                                                <GiQueenCrown color={'#ffff00'} />
                                            </Stack>
                                        </Stack>
                                ))}
                                {item.principal.map((item) => (
                                    <Stack onClick={() => navigate(`/myconcert/${item.profileName}/selfintro`)} key={item.id} direction="row" spacing={5} sx={{mr:2, mb:2, cursor: 'pointer', height: 44}}>
                                        <Stack sx={{borderRadius: 20, bgcolor: '#444444',pt:1, pl:1.5, pr:3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                            <Avatar alt={item.profileName} src={`${item.profileImage}`} sx={{width: 33, height: 33}} />
                                            <Typography sx={{ml: 2, fontSize: 15, fontWeight: 400, color:'#ffffff', mr:1}}>{item.profileName}</Typography>
                                            <FaCrown color={'#ffffff'}/>
                                        </Stack>
                                    </Stack>
                                ))}
                                {item.assistantPrincipal.map((item) => (
                                    <Stack onClick={() => navigate(`/myconcert/${item.profileName}/selfintro`)} key={item.id} direction="row" spacing={5} sx={{mr:2, mb:2, cursor: 'pointer', height: 44}}>
                                        <Stack sx={{borderRadius: 20, bgcolor: '#546e7a',pt:1, pl:1.5, pr:3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                            <Avatar alt={item.profileName} src={`${item.profileImage}`} sx={{width: 33, height: 33}} />
                                            <Typography sx={{ml: 2, fontSize: 15, fontWeight: 400, color:'#ffffff', mr:1}}>{item.profileName}</Typography>
                                            <CgCrown color={'#ffffff'}/>
                                        </Stack>
                                    </Stack>
                                ))}
                                {item.member.map((item,idx) => (
                                    <Stack onClick={() => navigate(`/myconcert/${item.profileName}/selfintro`)} key={idx} direction="row" spacing={5} sx={{mr:2, mb:2, cursor: 'pointer', height: 44}}>
                                        <Stack sx={{borderRadius: 20, bgcolor: '#eeeeee',pt:1, pl:1, pr:1.5, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                            <Avatar alt={item.profileName} src={`${item.profileImage}`} sx={{width: 33, height: 33}} />
                                            <Typography sx={{ml: 1, fontSize: 14, fontWeight: 400, color:'#424242'}}>{item.profileName}</Typography>
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                            <Divider sx={{width:'75%'}} />
                        </Stack>
                    ))
                }
            </Stack>
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