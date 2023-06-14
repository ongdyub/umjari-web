import {
    Button,
    Card,
    CardActions,
    CardMedia, Chip,
    Divider, Grid,
    MenuItem, Select, SelectChangeEvent,
    Stack,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import MyConcertList from "./MyConcertList/MyConcertList";
import {ReactElement, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {useNavigate, useParams} from "react-router-dom";
import {myConcertStateActions, myListGet, selectMyConcert} from "../../../store/slices/myconcert/myconcert";
import {GiQueenCrown} from "react-icons/gi";
import {FaCrown} from "react-icons/fa";
import {CgCrown} from "react-icons/cg";

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
    'MASTER' : <GiQueenCrown color={'black'}/>,
    'PRINCIPAL' : <FaCrown color={'black'} />,
    'ASSISTANT_PRINCIPAL' : <CgCrown color={'black'} />,
    'MEMBER': null
}

const MyList = () => {
    const theme = useTheme();
    const navigate = useNavigate()
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))
    const dispatch = useDispatch<AppDispatch>();
    const { profileName } = useParams();

    const myconcertState = useSelector(selectMyConcert)

    const sort = ['시간', '단체']
    const direction = ['오름차순', '내림차순']

    const [sortRule, setSortRule] = useState('시간')
    const [sortDirection, setSortDirection] = useState('오름차순')

    const handleRuleChange = (event: SelectChangeEvent) => {
        setSortRule(event.target.value);
    };
    const handleDirectionChange = (event: SelectChangeEvent) => {
        setSortDirection(event.target.value);
    };

    useEffect(() => {
        dispatch(myListGet(profileName))
        return () => {
            dispatch(myConcertStateActions.resetMyList())
        }
    },[dispatch, profileName])

    useEffect(() => {
        dispatch(myConcertStateActions.sortMyList({rule: sortRule, direction: sortDirection}))
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
            <Stack sx={{mt: 2, width: '100%', mb: 10}} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
                {
                    res750 ?
                        <Stack sx={{width: '90%'}} alignItems={"center"} justifyContent={'center'}>
                            <Grid container columns={14} spacing={1} >
                                {myconcertState.myList.map((item) => (
                                    <Grid sx={{mt: 0.5}} item xs={7} direction={'row'} alignItems={'center'} >
                                        <MyConcertList item={item} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                        :
                        myconcertState.myList.map((item) => (
                            <Card key={item.id} sx={{position: 'relative', display: 'flex', mb: 2, width: '90%', height: 'auto', shadow : 45, boxShadow: 30}}>
                                <Stack sx={{height: '100%', width: '246px'}} direction={'row'} alignItems={'center'}>
                                    <CardMedia
                                        component="img"
                                        sx={{ objectFit: 'contain', height: 'auto', width: '100%' }}
                                        image={item.concertPoster}
                                        alt="Poster"
                                    />
                                </Stack>

                                <Stack sx={{flexDirection: 'column', ml: 4, pt: 2, width: 'calc(100% - 300px)'}}>
                                    {item.participatedList.map((item, idx) => (
                                        <Stack key={idx} sx={{width: '100%'}}>
                                            <Stack direction={"row"} alignContent={"center"} alignItems={"center"}>
                                                <Typography variant="caption"  display="block" sx={{fontWeight: 600, fontSize: 12, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                                    {item.shortComposerEng}
                                                </Typography>
                                                <Divider orientation={"vertical"} sx={{ml:2, mr: 2, height: '50%'}} />
                                                <Chip variant={"outlined"} label={`${item.part} ${item.detailPart === '.' ? '' : item.detailPart}`} sx={{fontSize: 13, color : color[item.part], borderColor : color[item.part]}} size="small" />
                                                <Divider orientation={"vertical"} sx={{ml:2, mr: 2, height: '50%'}} />
                                                {RoleComponent[item.role]}
                                            </Stack>
                                            <Stack direction={"row"} alignContent={"center"} alignItems={"center"} sx={{width: '100%'}}>
                                                <Typography variant="overline"  display="block" gutterBottom sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 15, color: 'grey'}}>
                                                    {item.nameEng}
                                                </Typography>
                                            </Stack>
                                            <Divider sx={{mt:-1, mb:1}} />
                                        </Stack>
                                    ))}
                                    <Stack direction={"row"}>
                                        <CardActions sx={{ml:-2}}>
                                            <Button onClick={() => navigate(`/concert/${item.id}/review`)} size="small" sx={{fontSize: 12,maxHeight:40, minHeight:40, maxWidth: 60, minWidth:60}}>후기 쓰기</Button>
                                        </CardActions>
                                        <Stack justifyContent={"flex-end"} sx={{marginLeft: 'auto'}}>
                                            <Stack justifyContent={"flex-end"}  alignContent={"center"} alignItems={"center"} direction={"row"}>
                                                <Typography variant={"caption"} sx={{color: 'grey', fontSize: 8}}>{item.concertDate.slice(2,10)}</Typography>
                                                <Divider orientation={"vertical"} sx={{height: '50%', mr:0.5, ml:0.5}} />
                                                <Typography variant={"caption"} sx={{color: 'grey', fontSize:8}}>{item.participatedList[0]?.groupName}</Typography>
                                            </Stack>
                                            <Stack justifyContent={"flex-end"} direction={"row"}>
                                                <Typography variant={"caption"} sx={{color: 'grey', fontSize:10}}>{item.regionDetail}</Typography>
                                            </Stack>
                                            <Stack justifyContent={"flex-end"} alignContent={"center"} alignItems={"center"} direction={"row"}>
                                                <Typography variant={"caption"} sx={{color: 'grey', fontSize: 12}}>{item.title}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Card>
                        ))
                }
            </Stack>
        </Stack>
    )
}

export default MyList