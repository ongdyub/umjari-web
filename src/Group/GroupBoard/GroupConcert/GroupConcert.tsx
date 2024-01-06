import {
    Button,
    Card,
    CardActions,
    CardMedia,
    Divider,
    Grid, MenuItem, Pagination, Select, SelectChangeEvent,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import GroupConcertList from "./GroupConcertList/GroupConcertList";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {groupConcertListGet, groupStateActions, selectGroup} from "../../../store/slices/group/group";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";


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
    const [sortDirection, setSortDirection] = useState('내림차순')
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        searchParams.set('page', value.toString())
        setSearchParams(searchParams)
    }
    const handleRuleChange = (event: SelectChangeEvent) => {
        setSortRule(event.target.value);
    };
    const handleDirectionChange = (event: SelectChangeEvent) => {
        setSortDirection(event.target.value);
        if(event.target.value === '내림차순'){
            searchParams.set('sort','DESC')
        }
        else{
            searchParams.set('sort','ASC')
        }
        setSearchParams(searchParams)
    };


    useEffect(() => {
        const page = searchParams.get('page')
        const sort = searchParams.get('sort')

        const param = {
            size : 10,
            page : page === null || '' || undefined ? '1' : page.toString(),
            sort : sort === null || '' || undefined ? 'concertDate,DESC' : ("concertDate," + sort),
        }

        dispatch(groupConcertListGet({id : id, param : param}))
        return () => {
            dispatch(groupStateActions.resetGroupConcertList())
        }
    },[dispatch, id, searchParams])

    useEffect(() => {
        if(searchParams.get('page') !== null && searchParams.get('sort') !== null){
            const param = {
                page: searchParams.get('page'),
                size: 10,
                sort: "concertDate," + searchParams.get('sort')
            }
            dispatch(groupConcertListGet({id : id, param : param}))
        }
    },[searchParams])

    useEffect(() => {
        if(groupState.groupConcertList !== null){
            setTotalPage(groupState.groupConcertList.totalPages)
        }
    },[groupState.groupConcertList, groupState.groupConcertList?.totalPages])

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
                        {sort.map((option, idx) => (
                            <MenuItem sx={{fontSize: 13, maxHeight: 30,minHeight: 30}} key={idx} value={option}>
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
                        {direction.map((option, idx) => (
                            <MenuItem key={idx} sx={{fontSize: 13, maxHeight: 30,minHeight: 30}} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
            </Stack>
            <Stack sx={{mt: 1, width: '100%', mb: 3}} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
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
                                                <Typography variant="caption"  display="block" gutterBottom sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 17, mt:1, mb:1, color: 'grey'}}>
                                                    {item.musicInfo.nameEng}
                                                </Typography>
                                            </Stack>
                                            <Divider sx={{mt:-1, mb:1}} />
                                        </Stack>
                                    ))}
                                    <Stack direction={"row"}>
                                        <CardActions sx={{ml:-2}}>
                                            <Button onClick={() => navigate(`/concert/${item.id}/member`)} size="small" sx={{fontSize: 12,maxHeight:40, minHeight:40, maxWidth: 60, minWidth:60}}>정보 보기</Button>
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
            <Stack sx={{width: '100%', mb: 5}} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                <Pagination count={totalPage} size={"small"} showFirstButton showLastButton page={page} onChange={handlePage} defaultPage={1} />
            </Stack>

        </Stack>
    )
}

export default GroupConcert
