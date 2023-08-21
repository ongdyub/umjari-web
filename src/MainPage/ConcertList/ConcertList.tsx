import {useDispatch, useSelector} from "react-redux";
import {Stack, Grid, Divider, Pagination, useTheme, useMediaQuery} from "@mui/material";
import ConcertFilter from "./ConcertFilter/ConcertFilter";
import ConcertItem from "./ConcertItem/ConcertItem";
import {Concert, concertStateActions, dashboardList, selectConcert} from "../../store/slices/concert/concert";
import {useEffect, useState} from "react";
import {AppDispatch} from "../../store";
import * as React from "react";
import {useSearchParams} from "react-router-dom";
import {selectUser} from "../../store/slices/user/user";

const ConcertList = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const userState = useSelector(selectUser)

    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set('page',value.toString())
        setSearchParams(searchParams)
        setPage(value);
    };

    useEffect(() => {
        const now = new Date()
        const year = now.getFullYear()
        let monthNum = now.getMonth() + 1
        let month
        if(monthNum < 10){
            month = `0${monthNum}`
        }
        else{
            month = monthNum
        }
        const date = now.getDate()
        const today = year + '-' + month + '-' + date
        // const today = '2023-03-01'

        const regionParent = searchParams.get('regionParent')
        const regionChild = searchParams.get('regionChild')
        const startDate = (searchParams.get('startDate') === null) ? today : searchParams.get('startDate') === '' ? null : searchParams.get('startDate')
        const endDate = (searchParams.get('endDate') === null) ? null : searchParams.get('endDate') === '' ? null : searchParams.get('endDate')
        const composer = searchParams.get('composer')
        const musicName = searchParams.get('musicName')
        const text = searchParams.get('text')
        const page = searchParams.get('page')

        const params = {
            regionParent : regionParent,
            regionChild : regionChild,
            startDate : startDate,
            endDate : endDate,
            composer: composer === '' ? null : composer,
            musicName: musicName === '' ? null : musicName,
            text : text === '' ? null : text,
            page : page,
            size: 10,
            sort : "concertDate,ASC",
        }

        dispatch(dashboardList({params : params, token : userState.accessToken}))

        return () => {
            dispatch(concertStateActions.resetConcertList())
        }
    }, [])

    const concertListSelector = useSelector(selectConcert)

    useEffect(() => {
        if(concertListSelector.concertList !== null){
            setTotalPage(concertListSelector.concertList.totalPages)
            setPage(concertListSelector.concertList.currentPage)
        }
    },[concertListSelector.concertList])

    useEffect(() => {

        const now = new Date()
        const year = now.getFullYear()
        let monthNum = now.getMonth() + 1
        let month
        if(monthNum < 10){
            month = `0${monthNum}`
        }
        else{
            month = monthNum
        }
        const date = now.getDate()
        const today = year + '-' + month + '-' + date
        // const today = '2023-03-01'

        const regionParent = searchParams.get('regionParent')
        const regionChild = searchParams.get('regionChild')
        const startDate = (searchParams.get('startDate') === null) ? today : (searchParams.get('startDate') === '' || searchParams.get('startDate') === undefined) ? null : searchParams.get('startDate')
        const endDate = (searchParams.get('endDate') === null) ? null : (searchParams.get('endDate') === '' || searchParams.get('endDate') === undefined) ? null : searchParams.get('endDate')
        const composer = searchParams.get('composer')
        const musicName = searchParams.get('musicName')
        const text = searchParams.get('text')
        const page = searchParams.get('page')

        const params = {
            regionParent : regionParent,
            regionChild : regionChild,
            startDate : startDate,
            endDate : endDate,
            composer: composer === '' ? null : composer,
            musicName: musicName === '' ? null : musicName,
            text : text === '' ? null : text,
            page : page,
            size: 10,
            sort : "concertDate,ASC",
        }
        dispatch(dashboardList({params : params, token : userState.accessToken}))

    },[searchParams])

    return(
        <Stack sx={{height: 'auto'}}>
            <ConcertFilter />
            <Divider orientation="horizontal" sx={{mb:0.5}}  />
            <Stack direction="row" sx={{height: '370px', overflowX: 'scroll','&::-webkit-scrollbar': {display: 'none'}}}>
                {concertListSelector.concertList?.contents.map((item: Partial<Concert>) => (
                    <Grid justifyContent="center" direction="row" alignItems="center" key={item.posterImg} container sx={{width: 'auto', ml:'20px', mr: '20px'}}>
                        <ConcertItem key={item.id} item={item} />
                    </Grid>
                ))}
            </Stack>
            <Divider orientation="horizontal" sx={{pt: '10px'}} />
            <Stack alignItems="center" sx={{width:'100%', height: '50px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res750 ? "small" : "large"} count={totalPage} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <Divider orientation="horizontal" />
        </Stack>
    )
}

export default ConcertList