import {Avatar, Button, Chip, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import { FaCrown } from 'react-icons/fa';
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {concertMemberGet, concertStateActions, selectConcert} from "../../../store/slices/concert/concert";

// const playerData = [
//     {
//         role: 'Conductor',
//         head: [],
//         member: ['지휘자']
//     },
//     {
//         role: 'Vn1',
//         head: ['퍼스트', '수석진'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Vn2',
//         head: ['이이이'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문','김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Va',
//         head: ['김김김', '이이이'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Vc',
//         head: ['김김김', '이이이'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Db',
//         head: ['김김김'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Fl',
//         head: ['김김김'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Cl',
//         head: ['김김김'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Ob',
//         head: ['김김김'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Fg',
//         head: ['김김김', '이이이'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Hn',
//         head: ['김김김', '이이이'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Trp',
//         head: [],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Trb',
//         head: ['김김김', '이이이'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
//     {
//         role: 'Tub',
//         head: ['김김김', '이이이'],
//         member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
//     },
// ]

const ConcertMember = () => {

    const theme = useTheme();
    const navigate = useNavigate()
    const res500 = useMediaQuery(theme.breakpoints.down("res500"))
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
                                        <Stack onClick={() => navigate(`/myconcert/${item.profileName}/selfintro`)} key={item.id} direction="row" spacing={5} sx={{mr:2, mb: res500 ? 1 : 0,mt: res500 ? 1 : 0,cursor: 'pointer', height: 48, width: 160}}>
                                            <Stack sx={{borderRadius: 20, bgcolor: '#212121',pt:1, pl:1.5, pr:3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                                <Avatar alt={item.profileName} src={`${item.profileImage}`} sx={{width: 33, height: 33}} />
                                                <Typography sx={{ml: 2, fontSize: 15, fontWeight: 400, color:'#ffffff', mr:1}}>{item.profileName}</Typography>
                                                <FaCrown color={'#ffffff'}/>
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