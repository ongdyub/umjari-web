import {useSelector} from "react-redux";
import {selectDummy} from "../../store/slices/dummy/dummy";
import {Stack, Grid, Divider} from "@mui/material";
import ConcertFilter from "./ConcertFilter/ConcertFilter";
import ConcertItem from "./ConcertItem/ConcertItem";

const ConcertList = () => {

    const dummySelector = useSelector(selectDummy)

    return(
        <Stack sx={{height: '400px'}}>
            <ConcertFilter />
            <Divider orientation="horizontal"  />
            <Stack direction="row" sx={{height: '340px', pb: '20px', pt: '10px', overflowX: 'scroll','&::-webkit-scrollbar': {display: 'none'}}}>
                {dummySelector.img.map((item: string) => (
                    <Grid justifyContent="center" direction="row" alignItems="center" key={item} container sx={{width: 'auto', ml:'20px', mr: '20px'}}>
                        <ConcertItem key={item} img={item} />
                    </Grid>
                ))}
            </Stack>
            <Divider orientation="horizontal" sx={{pt: '10px'}} />
        </Stack>
    )
}

export default ConcertList