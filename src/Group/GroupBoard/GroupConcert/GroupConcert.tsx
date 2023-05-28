import {
    Button,
    Card,
    CardActions,
    CardMedia, Chip,
    Divider,
    Grid, MenuItem, Select, SelectChangeEvent,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import GroupConcertList from "./GroupConcertList/GroupConcertList";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import MyConcertList from "../../../MyConcert/MyHome/MyList/MyConcertList/MyConcertList";
import {useEffect, useState} from "react";
import {groupConcertListGet, groupStateActions, selectGroup} from "../../../store/slices/group/group";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";

const careerList = [
    {
        date: '2023.03.02',
        place: '서울대학교 문화관 대강당',
        group: 'SNUPO',
        concert: '제 60회 정기연주회',
        img: '/img/poster.jpeg',
        program: [
            {
                composer: 'J.Strauss II',
                song: 'Kaiser-Walzer, Op. 437',
                part: 'Vn 1st'
            },
            {
                composer: 'A.Borodin',
                song: 'Symphony No. 2 in b minor',
                part: 'Vn 1st'
            },
            {
                composer: 'H.Berlioz',
                song: 'Symphonie Fantastique, H. 48',
                part: 'Trb 3rd'
            },
        ]
    },
    {
        date: '2018.09.01',
        place: '서울대학교 문화관 대강당',
        group: 'SNUPO',
        concert: '53회 정기연주회',
        img: 'https://www.snupo.org/files/attach/images/157797/872/028/001/%E1%84%8E%E1%85%AC%E1%84%8C%E1%85%A9%E1%86%BC.jpg',
        program: [
            {
                composer: 'J.Brahms',
                song: 'Academic Festival Overture, OP. 80',
                part: 'Vn 2nd'
            },
            {
                composer: 'P. I. Tchaikovsky',
                song: 'Excerpts from Swan Lake, Op. 20',
                part: 'Vn 2nd'
            },
            {
                composer: 'J.Brahms',
                song: 'Symphony No. 2 in D Major, Op. 73',
                part: 'Vn 2nd'
            },
        ]
    },
    {
        date: '2019.03.02',
        place: '서울대학교 문화관 대강당',
        group: 'SNUPO',
        concert: '54회 정기연주회',
        img: 'https://www.snupo.org/files/attach/images/157797/304/062/001/KakaoTalk_20190403_111324077.png',
        program: [
            {
                composer: 'C. M. v. Weber',
                song: 'Der Freischütz Overture, Op. 77',
                part: 'Trp 2nd'
            },
            {
                composer: 'A. Dvořák',
                song: 'Cello Concerto in b minor, Op. 104',
                part: 'Trp 2nd'
            },
            {
                composer: 'J. Sibelius',
                song: 'Symphony No. 2 in D Major, Op. 43',
                part: 'Vn 2nd'
            },
        ]
    },
    {
        date: '2019.09.01',
        group: 'SNUPO',
        place: '서울대학교 문화관 대강당',
        concert: '55회 정기연주회',
        img: 'https://www.snupo.org/files/attach/images/157797/514/111/001/55.jpg',
        program: [
            {
                composer: 'A. Dvořák',
                song: 'Othello Overture, Op. 77',
                part: 'Trp 2nd'
            },
            {
                composer: 'P. I. Tchaikovsky',
                song: 'The Sleeping Beauty (suite), Op. 66a',
                part: 'Trp 1st'
            },
            {
                composer: 'J. Sibelius',
                song: 'Symphony No. 1 in e minor, Op. 39',
                part: 'Trp 1st'
            },
        ]
    },
    {
        date: '2021.09.27',
        group: 'SNUPO',
        place: '유니버셜아트센터 대극장',
        concert: '57회 정기연주회',
        img: 'https://www.snupo.org/files/attach/images/157797/193/123/001/SNUPO57%ED%8F%AC%EC%8A%A4%ED%84%B0%EC%95%95%EC%B6%95.jpg',
        program: [
            {
                composer: 'J. Strauss II',
                song: 'Overture to Die Fledermaus',
                part: 'Trp 1st'
            },
            {
                composer: 'S. Rachmaninoff',
                song: 'Piano Concerto No.2 in C Minor, op. 18',
                part: 'Trp 2nd'
            },
            {
                composer: 'J. Brahms',
                song: 'Symphony No.4 in E Minor, op. 98',
                part: 'Vn 1st'
            },
        ]
    },
    {
        date: '2022.03.02',
        group: 'SNUPO',
        place: '서울대학교 문화관 대강당',
        concert: '58회 정기연주회',
        img: 'https://www.snupo.org/files/attach/images/157797/537/137/001/8697fc06-3b79-48d3-af93-d47be8d65871.pdf-0001.png',
        program: [
            {
                composer: 'C. Saint-Saëns',
                song: 'Danse Macabre, Op. 40',
                part: 'Vn 1st'
            },
            {
                composer: 'F. Mendelssohn',
                song: 'Violin Concerto in E minor, Op. 64',
                part: 'Vn 1st'
            },
            {
                composer: 'G. Mahler',
                song: 'Symphony No.1 in D major "Titan"',
                part: 'Trp 3rd'
            },
        ]
    },
    {
        date: '2022.09.01',
        group: 'SNUPO',
        place: '서울대학교 문화관 대강당',
        concert: '59회 정기연주회',
        img: 'https://www.snupo.org/files/attach/images/157797/561/154/001/59%ED%9A%8C%20%ED%8F%AC%EC%8A%A4%ED%84%B0.png',
        program: [
            {
                composer: 'J. Brahms',
                song: 'Academic Festival Overture, Op.80',
                part: 'Vn 1st'
            },
            {
                composer: 'É. Lalo',
                song: 'Symphonie Espagnole, Op.21',
                part: 'Vn 1st'
            },
            {
                composer: 'P. I. Tchaikovsky',
                song: 'Symphony No.5 in E minor, Op.64',
                part: 'Trb 3rd'
            },
        ]
    },
    {
        date: '2022.10.15',
        group: '가우디움',
        place: '인천 아트센터',
        concert: '창단 10주년 기념 연주회',
        img: 'https://modo-phinf.pstatic.net/20220929_263/1664462069809sDOej_PNG/mosa1YMLrv.png?type=w720',
        program: [
            {
                composer: 'G. Mahler',
                song: 'Lieder eines fahrenden Gesellen',
                part: 'Vn 2nd'
            },
            {
                composer: 'G. Mahler',
                song: 'Symphony No. 5 in c# minor',
                part: 'Vn 2nd'
            },
        ]
    },
]

const GroupConcert = () => {

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const groupState = useSelector(selectGroup)

    const sort = ['시간']
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
        dispatch(groupConcertListGet({id : id, params : searchParams}))
        return () => {
            dispatch(groupStateActions.resetGroupConcertList())
        }
    },[dispatch, id])

    useEffect(() => {
        dispatch(groupStateActions.sortGroupList({rule: sortRule, direction: sortDirection}))
    },[dispatch, sortRule, sortDirection])

    return(
        <Stack sx={{mt: -1, width: '100%'}} alignItems={res750 ? 'center' : ''}>
            <Divider sx={{width: '90%'}}/>
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
            <Stack sx={{mt: 1, width: '100%', mb: 10}} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
                {
                    res750 ?
                        <Stack sx={{width: '90%'}} alignItems={"center"} justifyContent={'center'}>
                            <Grid container columns={14} spacing={1} >
                                {groupState.groupConcertList?.contents.map((item, idx) => (
                                    <Grid key={idx} sx={{mt: 0.5}} item xs={7} direction={'row'} alignItems={'center'} >
                                        <GroupConcertList item={item} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                        :
                        groupState.groupConcertList?.contents.map((item, idx) => (
                            <Card key={idx} sx={{position: 'relative', display: 'flex', mb: 2, width: '90%', height: 'auto'}}>
                                <Stack sx={{height: '100%', width: '246px'}} direction={'row'} alignItems={'center'}>
                                    <CardMedia
                                        component="img"
                                        sx={{ objectFit: 'contain', height: 'auto', width: '100%' }}
                                        image={item.posterImg}
                                        alt="Poster"
                                    />
                                </Stack>

                                <Stack sx={{flexDirection: 'column', ml: 4, pt: 2, width: 'calc(100% - 300px)'}}>
                                    {item.setList?.map((item, idx) => (
                                        <Stack key={idx} sx={{width: '100%'}}>
                                            <Stack direction={"row"} alignContent={"center"} alignItems={"center"}>
                                                <Typography variant="caption"  display="block" sx={{fontWeight: 600, fontSize: 12, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                                    {item.musicInfo.shortComposerEng}
                                                </Typography>
                                                <Divider orientation={"vertical"} sx={{ml:2, mr: 2, height: '50%'}} />
                                            </Stack>
                                            <Stack direction={"row"} alignContent={"center"} alignItems={"center"} sx={{width: '100%'}}>
                                                <Typography variant="overline"  display="block" gutterBottom sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 15, color: 'grey'}}>
                                                    {item.musicInfo.nameEng}
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
                                                <Typography variant={"caption"} sx={{color: 'grey', fontSize: 8}}>{item.concertDate?.slice(2,10)}</Typography>
                                                <Divider orientation={"vertical"} sx={{height: '50%', mr:0.5, ml:0.5}} />
                                                <Typography variant={"caption"} sx={{color: 'grey', fontSize:8}}>{groupState.groupInfo?.name}</Typography>
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

export default GroupConcert
