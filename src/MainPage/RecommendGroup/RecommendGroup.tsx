import {Button, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import GroupItem from "./GroupItem/GroupItem";
import {useSelector} from "react-redux";
import {groupFrom, selectDummy} from "../../store/slices/dummy/dummy";
import {it} from "node:test";

const RecommendGroup = () => {

    const theme = useTheme();
    const dummySelector = useSelector(selectDummy)

    return(
        <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2} sx={{width: useMediaQuery(theme.breakpoints.down("md")) ? "96%" : "42%"}}>
            <Typography sx={{fontWeight: 300, fontSize: 30}} mt={2} >추천 단체</Typography>
            <Grid justifyContent="center" alignItems="center" container xs={15} sm={15} md={15}>
                {
                    dummySelector.group.map((item: groupFrom) => (
                        <GroupItem img={item.img} name={item.name} song={item.song} recruit={item.recruit} region={item.region} friend={item.friend} />
                    ))
                }
            </Grid>
            <Button size="medium" sx={{top: -25, ml: '15%'}}>더보기</Button>
        </Stack>
    )
}

export default RecommendGroup