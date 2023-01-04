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
            <Stack direction="row" sx={{height: '300px', pb: '10px', pt: '10px', overflowX: 'scroll'}}>
                {dummySelector.img.map((item: string) => (
                    <Grid justifyContent="center" alignItems="center" key={item} container sx={{minWidth: 200}}>
                        <ConcertItem img={item} />
                    </Grid>
                ))}
            </Stack>
            <Divider orientation="horizontal" />
        </Stack>
    )
}

export default ConcertList