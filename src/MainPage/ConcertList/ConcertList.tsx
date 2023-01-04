import {useSelector} from "react-redux";
import {selectDummy} from "../../store/slices/dummy/dummy";
import {Stack, Grid} from "@mui/material";
import ConcertFilter from "./ConcertFilter/ConcertFilter";
import ConcertItem from "./ConcertItem/ConcertItem";

const ConcertList = () => {

    const dummySelector = useSelector(selectDummy)

    return(
        <Stack sx={{bgcolor: 'green', height: '400px'}}>
            <ConcertFilter />
            <Stack direction="row" gap={'20px'} justifyContent="center" alignItems="center" sx={{'overflow-x':"auto"}} >
                {dummySelector.img.map((item: string) => (
                    <Grid justifyContent="center" alignItems="center" key={item} item md={3} sm={5} xs={20} sx={{overflow:"auto"}}>
                        <ConcertItem img={item} />
                    </Grid>
                ))}
            </Stack>
        </Stack>
    )
}

export default ConcertList