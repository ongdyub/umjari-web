import {useDispatch, useSelector} from "react-redux";
import {Stack, Grid, Divider} from "@mui/material";
import ConcertFilter from "./ConcertFilter/ConcertFilter";
import ConcertItem from "./ConcertItem/ConcertItem";
import {Concert, dashboardList, selectConcert} from "../../store/slices/concert/concert";
import {useEffect} from "react";
import {AppDispatch} from "../../store";

const ConcertList = () => {

    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        const params = {
            regionParent : null,
            region_child : null,
            startDate : null,
            endDate : null,
            text : "",
            sort : "concertDate,ASC",
        }
        dispatch(dashboardList(params))
    }, [])

    const concertListSelector = useSelector(selectConcert)

    return(
        <Stack sx={{height: 'auto'}}>
            <ConcertFilter />
            <Divider orientation="horizontal"  />
            <Stack direction="row" sx={{height: '370px', overflowX: 'scroll','&::-webkit-scrollbar': {display: 'none'}}}>
                {concertListSelector.concertList.contents.map((item: Partial<Concert>) => (
                    <Grid justifyContent="center" direction="row" alignItems="center" key={item.posterImg} container sx={{width: 'auto', ml:'20px', mr: '20px'}}>
                        <ConcertItem key={item.posterImg} img={item.posterImg} />
                    </Grid>
                ))}
            </Stack>
            <Divider orientation="horizontal" sx={{pt: '10px'}} />
        </Stack>
    )
}

export default ConcertList