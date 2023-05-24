import {
    Card, CardContent, Chip,
    Divider,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { FaCrown } from 'react-icons/fa';
import {GiQueenCrown} from 'react-icons/gi'
import {CgCrown} from 'react-icons/cg'
import {useParams} from "react-router-dom";
import {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {myConcertStateActions, mySelfIntroGet, selectMyConcert} from "../../../store/slices/myconcert/myconcert";

interface ColorMap {
    [key: string]: string;
}

const color : ColorMap = {
    "Vn 1st" : '#dd2c00',
    "Vn 2nd" : '#ff9100',
    "Va" : '#ffeb3b',
    "Vc" : '#795548',
    "Db" : '#3e2723',
    "Fl" : '#03a9f4',
    "Picc" : '#26a69a',
    "Ob" : '#dce775',
    "E.H." : '#9e9d24',
    "Cl" : '#7e57c2',
    "Fg" : '#4527a0',
    "Hn" : '#ab47bc',
    "Trp" : '#6a1b9a',
    "Trb" : '#e91e63',
    "Tub" : '#c2185b',
    "Timp" : '#78909c',
    "Perc" : '#263238',
    "Harp" : '#ffcdd2',
}

interface RoleMap {
    [key: string] : ReactElement | null
}

const RoleComponent  : RoleMap= {
    'MASTER' : <Stack direction={"row"} alignItems={'center'} sx={{width: 25, height: 25,borderRadius: 10, pl:0.55, bgcolor: 'black'}}><GiQueenCrown color={'#ffff00'}/></Stack>,
    'PRINCIPAL' : <Stack direction={"row"} alignItems={'center'} sx={{width: 25, height: 25,borderRadius: 10, pl:0.55, bgcolor: 'black'}}><FaCrown color={'white'} /></Stack>,
    'ASSISTANT_PRINCIPAL' : <Stack direction={"row"} alignItems={'center'} sx={{width: 25, height: 25,borderRadius: 10, pl:0.55, bgcolor: '#546e7a'}}><CgCrown color={'white'} /></Stack>,
    'MEMBER': null
}

const SelfIntro = () => {

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { profileName } = useParams();

    const myconcertState = useSelector(selectMyConcert)
    const sort = ['작곡가', '곡명', '파트', '시간', '단체']
    const direction = ['오름차순', '내림차순']
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))
    const res800 = useMediaQuery(theme.breakpoints.down("res800"))

    const [sortRule, setSortRule] = useState('작곡가')
    const [sortDirection, setSortDirection] = useState('오름차순')

    const handleRuleChange = (event: SelectChangeEvent) => {
        setSortRule(event.target.value);
        };
    const handleDirectionChange = (event: SelectChangeEvent) => {
        setSortDirection(event.target.value);
    };

    useEffect(() => {
        dispatch(mySelfIntroGet(profileName))
        return () => {
            dispatch(myConcertStateActions.resetMySelfIntro())
        }
    },[dispatch, profileName])

    useEffect(() => {
        dispatch(myConcertStateActions.sortMySelfIntro({rule: sortRule, direction: sortDirection}))
    },[dispatch, sortRule, sortDirection])

    return(
        <Stack sx={{mt: 2, width: '100%'}} alignItems={res750 ? 'center' : ''}>
            <Divider sx={{width: '90%', color: '#292929'}} />
            <Stack sx={{mt: 1.5}} direction={"row"}>
                <Stack sx={{width: 80, mr: 5}} >
                    <Select
                        value={sortRule}
                        onChange={handleRuleChange}
                        variant="standard"
                        sx={{fontSize: 13}}
                    >
                        {sort.map((option) => (
                            <MenuItem sx={{fontSize: 13, maxHeight: 30,minHeight: 30}} key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
                <Stack sx={{width: 80}}>
                    <Select
                        value={sortDirection}
                        onChange={handleDirectionChange}
                        variant="standard"
                        sx={{fontSize: 13}}
                    >
                        {direction.map((option) => (
                            <MenuItem sx={{fontSize: 13, maxHeight: 30,minHeight: 30}} key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
            </Stack>
            <Stack sx={{mt: 1, mb: 10, width: '100%'}}>
                {myconcertState.mySelfIntro.map((item, idx) => (
                    <Stack key={idx} sx={{mt:0.5, mb:1, width: '100%'}} alignItems={res800 ? 'center' : ''}>
                        {
                            res800 ?
                                <Card sx={{width: '80%', pb: 0, border: `0.5px solid ${color[item.part]}`}}>
                                    <CardContent sx={{pb : 0}}>
                                        <Stack direction={'row'} justifyContent={"flex-end"} alignItems={"center"} alignContent={"center"} sx={{width: '100%', mb: 0.5}}>
                                            <Stack justifyContent={"flex-start"} sx={{mr: 'auto'}}>
                                                <Typography variant={"subtitle2"} sx={{fontWeight: 800, fontSize: 13}}>{item.shortComposerEng}</Typography>
                                            </Stack>
                                            <Stack justifyContent={"flex-start"} alignItems={'center'} sx={{mt: -1}}>
                                                {RoleComponent[item.role]}
                                            </Stack>
                                            <Stack justifyContent={"flex-start"} alignItems={'center'} sx={{ml: 1,mt: -1}}>
                                                <Chip variant={"outlined"} label={`${item.part} ${item.detailPart === '.' ? '' : item.detailPart}`} sx={{color : color[item.part], borderColor : color[item.part]}} size="small" />
                                            </Stack>
                                        </Stack>
                                        <Divider sx={{width: '100%'}} />
                                        <Stack direction={'row'} justifyContent={"flex-start"} sx={{width: '100%', mt:1, mb:1}}>
                                            <Typography variant={"caption"} sx={{fontWeight: 400, fontSize: 12}}>{item.nameEng}</Typography>
                                        </Stack>
                                        <Divider sx={{width: '100%'}} />
                                        <Stack direction={'row'} justifyContent={"flex-end"} sx={{mt: 1, mb:-2}} alignItems={'center'}>
                                            <Typography variant={"caption"} sx={{fontWeight: 300, fontSize: 12}}>{item.groupName}</Typography>
                                            <Typography variant={"caption"} sx={{ml: 2, fontSize: 4, color: 'grey'}}>{item.concertDate.slice(2,10)}</Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                                :
                                <Card sx={{width: '95%', pb: 0, display: 'flex', alignItems: 'center', border: `0.5px solid ${color[item.part]}`}}>
                                    <CardContent sx={{pb: 0, mb:-1.7, mt: -1, width: '100%'}}>
                                        <Stack sx={{width: '100%', height: 'auto'}} direction={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                                            <Stack sx={{mr: 'auto'}}>
                                                <Typography sx={{fontWeight: 600, fontSize: 13}}>{item.shortComposerEng}</Typography>
                                            </Stack>
                                            <Divider orientation={'vertical'} sx={{height: '15px', border: 'solid 0.5px grey', mr: 1, ml: 1}}/>
                                            <Stack sx={{width: '55%'}}>
                                                <Typography variant={"caption"} sx={{fontWeight: 200, fontSize: 14}}>{item.nameEng}</Typography>
                                            </Stack>
                                            {RoleComponent[item.role]}
                                            <Stack sx={{width: '12%', ml:0.5}} alignItems={"center"}>
                                                <Chip variant={"outlined"} label={`${item.part} ${item.detailPart === '.' ? '' : item.detailPart}`} sx={{color : color[item.part], borderColor : color[item.part]}} size="small" />
                                            </Stack>
                                            <Stack sx={{width: '8%'}} alignItems={"center"} alignContent={"center"}>
                                                <Typography variant={"caption"} sx={{fontSize: 6, pt:0.5}}>{item.groupName}</Typography>
                                                <Typography variant={"caption"} sx={{fontSize: 4, color: 'grey'}}>{item.concertDate.slice(2,10)}</Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                        }
                        <Divider sx={{width: '80%', mt:1}} />
                    </Stack>
                ))}
            </Stack>
        </Stack>
    )
}

export default SelfIntro