import {Avatar, Button, Chip, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import { FaCrown } from 'react-icons/fa';

const playerData = [
    {
        role: 'Conductor',
        head: [],
        member: ['이준호']
    },
    {
        role: 'Vn1',
        head: ['이신지', '김상준'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Vn2',
        head: ['이이이'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문','김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Va',
        head: ['김김김', '이이이'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Vc',
        head: ['김김김', '이이이'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Db',
        head: ['김김김'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Fl',
        head: ['김김김'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Cl',
        head: ['김김김'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Ob',
        head: ['김김김'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Fg',
        head: ['김김김', '이이이'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Hn',
        head: ['김김김', '이이이'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Trp',
        head: [],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Trb',
        head: ['김김김', '이이이'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
    {
        role: 'Tub',
        head: ['김김김', '이이이'],
        member: ['김김김', '이이이', '박박박', '최최최', '한한한', '정정정', '윤윤윤', '오오오', '권권권', '유유유', '문문문']
    },
]

const ConcertMember = () => {

    const theme = useTheme();
    const res500 = useMediaQuery(theme.breakpoints.down("res500"))
    const res800 = useMediaQuery(theme.breakpoints.down("res800"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    return (
        <Stack justifyContent={"flex-start"}>
            <Divider sx={{width: '90%', mt: -1}}/>
            <Stack sx={{mt: 5, pl:5, mb:10}}>
                {
                    playerData.map((item) => (
                        <Stack sx={{mb:5}}>
                            <Stack direction={"row"} alignContent={"center"} justifyContent={"flex-start"} alignItems={"center"} sx={{mb:2}} flexWrap={"wrap"}>
                                <Stack justifyContent={"flex-start"}>
                                    <Typography sx={{fontSize: 45, fontWeight: 100, fontFamily: "Open Sans", mr:5}}>{item.role}</Typography>
                                </Stack>
                                <Stack direction={"row"} alignContent={"center"} justifyContent={"flex-start"} flexWrap={"wrap"}>
                                    {
                                        item.head.map((item, idx) => (
                                            <Stack direction="row" spacing={5} sx={{mr:2, mb: res500 ? 1 : 0,mt: res500 ? 1 : 0,cursor: 'pointer', height: 48, width: 160}}>
                                                <Stack sx={{borderRadius: 20, bgcolor: '#212121',pt:1, pl:1.5, pr:3, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                                    <Avatar alt={item} src={`/img/${idx*25}.jpg`} sx={{width: 33, height: 33}} />
                                                    <Typography sx={{ml: 2, fontSize: 15, fontWeight: 400, color:'#ffffff', mr:1}}>{item}</Typography>
                                                    <FaCrown color={'#ffffff'}/>
                                                </Stack>
                                            </Stack>
                                        ))
                                    }
                                </Stack>
                            </Stack>
                            <Stack sx={{mb:0.5}} direction={"row"} justifyContent={"flex-start"} flexWrap={"wrap"}>
                                {item.member.map((item,idx) => (
                                    <Stack direction="row" spacing={5} sx={{mr:2, mb:2, cursor: 'pointer', height: 48, width: 130}}>
                                        <Stack sx={{borderRadius: 20, bgcolor: '#eeeeee',pt:1, pl:1, pr:2.5, pb:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                            <Avatar alt={item} src={`/img/${idx*25}.jpg`} sx={{width: 33, height: 33}} />
                                            <Typography sx={{ml: 2, fontSize: 15, fontWeight: 400, color:'#424242'}}>{item}</Typography>
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