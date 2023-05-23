import {
    Card, CardContent, Chip,
    Divider,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {myConcertStateActions, mySelfIntroGet, selectMyConcert} from "../../../store/slices/myconcert/myconcert";

const SelfIntro = () => {

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { profileName } = useParams();

    const myconcertState = useSelector(selectMyConcert)
    // const selfList = [
    //     {
    //         composer: 'J. Brahms',
    //         part: 'Vn 2nd',
    //         title: 'Academic Festival Overture, Op. 80',
    //         role: '',
    //         group: 'SNUPO'
    //     },
    //     {
    //         composer: 'J. Brahms',
    //         part: 'Vn 2nd',
    //         title: 'Symphony No. 2 in D Major, Op. 73',
    //         role: '',
    //         group: 'SNUPO'
    //     },
    //     {
    //         composer: 'J. Brahms',
    //         part: 'Vn 1st',
    //         title: 'Symphony No. 4 in e minor, Op. 98',
    //         role: '',
    //         group: 'SNUPO'
    //     },
    //     {
    //         composer: 'J. Brahms',
    //         part: 'Vn 1st',
    //         title: 'Academic Festival Overture, Op. 80',
    //         role: '',
    //         group: 'SNUPO'
    //     },
    //     {
    //         composer: 'P. I. Tchaikovsky',
    //         part: 'Vn 2nd',
    //         title: 'Excerpts from Swan Lake, Op. 20',
    //         role: '',
    //         group: 'SNUPO'
    //     },
    //     {
    //         composer: 'P. I. Tchaikovsky',
    //         part: 'Trp 1st',
    //         title: 'The Sleeping Beauty (suite), Op. 66a',
    //         role: '',
    //         group: 'SNUPO'
    //     },
    //     {
    //         composer: 'P. I. Tchaikovsky',
    //         part: 'Vn 1st',
    //         title: 'Symphony No.5 in e minor, Op.64',
    //         role: '',
    //         group: 'SNUPO'
    //     },
    //     {
    //         composer: 'P. I. Tchaikovsky',
    //         part: 'Trp 3rd',
    //         title: 'Symphony No.5 in e minor, Op.64',
    //         role: '',
    //         group: 'SNUPO'
    //     },
    //     {
    //         composer: 'J. Sibelius',
    //         part: 'Trp 1st',
    //         title: 'Symphony No. 1 in e minor, Op. 39',
    //         role: '',
    //         group: 'SNUPO'
    //     },
    //     {
    //         composer: 'J. Sibelius',
    //         part: 'Vn 2nd',
    //         title: 'Symphony No. 2 in D Major, Op. 43',
    //         role: '',
    //         group: 'SNUPO'
    //     },
    // ]
    // const sort = ['시간','작곡가', '곡명', '파트', '단체']
    const sort = ['작곡가', '곡명', '파트', '단체']
    const direction = ['오름차순', '내림차순']
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

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
    },[sortRule, sortDirection])

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
                    <Stack key={idx} sx={{mt:0.5, mb:1, width: '100%'}} alignItems={res750 ? 'center' : ''}>
                        {
                            res750 ?
                                <Card sx={{width: '80%', pb: 0}}>
                                    <CardContent sx={{pb : 0}}>
                                        <Stack direction={'row'} justifyContent={"flex-start"} alignItems={"center"} alignContent={"center"} sx={{width: '100%', mb: 0.5}}>
                                            <Stack justifyContent={"flex-start"}>
                                                <Typography variant={"subtitle2"} sx={{fontWeight: 800, fontSize: 13}}>{item.shortComposerEng}</Typography>
                                            </Stack>
                                            <Stack justifyContent={"flex-start"} sx={{ml: 'auto'}}>
                                                <Chip variant={"outlined"} label={`${item.part} ${item.detailPart}`} color={'info'} size="small" />
                                            </Stack>
                                        </Stack>
                                        <Divider sx={{width: '100%'}} />
                                        <Stack direction={'row'} justifyContent={"flex-start"} sx={{width: '100%', mt:1, mb:1}}>
                                            <Typography variant={"caption"} sx={{fontWeight: 200, fontSize: 12}}>{item.nameEng}</Typography>
                                        </Stack>
                                        <Divider sx={{width: '100%'}} />
                                        <Stack direction={'row'} justifyContent={"flex-end"} sx={{mt: 1, mb:-2}}>
                                            <Typography variant={"caption"} sx={{fontWeight: 300, fontSize: 12}}>{item.groupName}</Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                                :
                                <Card sx={{width: '95%', pb: 0}}>
                                    <CardContent sx={{pb: 0, mb:-1, mt: -1, width: '100%'}}>
                                        <Stack sx={{width: '100%'}} direction={"row"} justifyContent={"flex-end"} alignItems={"center"}>
                                            <Stack sx={{mr: 'auto'}}>
                                                <Typography sx={{fontWeight: 600, fontSize: 15}}>{item.shortComposerEng}</Typography>
                                            </Stack>
                                            <Stack sx={{width: '55%'}}>
                                                <Typography variant={"caption"} sx={{fontWeight: 200, fontSize: 14}}>{item.nameEng}</Typography>
                                            </Stack>
                                            <Stack sx={{width: '15%'}} alignItems={"center"}>
                                                <Chip variant={"outlined"} label={`${item.part} ${item.detailPart}`} color={'info'} size="small" />
                                            </Stack>
                                            <Stack sx={{width: '10%'}} alignItems={"center"}>
                                                <Typography variant={"caption"} sx={{fontSize: 11}}>{item.groupName}</Typography>
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