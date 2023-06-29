import {Box, Grid, Pagination, Paper, Stack, styled, Typography, useMediaQuery, useTheme} from "@mui/material";
import {groupFrom, selectDummy} from "../../store/slices/dummy/dummy";
import GroupItem from "../../MainPage/RecommendGroup/GroupItem/GroupItem";
import {useSelector} from "react-redux";
import GroupSearchItem from "./GroupSearchItem/GroupSearchItem";
import {useState} from "react";

const GroupSearchContents = () => {
    const theme = useTheme()
    const res800 = useMediaQuery('(max-width:800px)')
    const res950 = useMediaQuery(theme.breakpoints.down("res950"))
    const dummySelector = useSelector(selectDummy)
    const searchCnt = 152

    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{height: res800 ? 'auto' : 'auto', width: res800 ? '100%' : res950 ? 'calc(100% - 255px)' : 'calc(100% - 415px)'}}>
            <Stack sx={{width: '100%', mb:4}}>
                <Stack sx={{mt: 3}} justifyContent={"flex-start"} direction={"row"}>
                    <Typography sx={{ml: 5}} variant={"body1"}>총</Typography>
                    <Typography sx={{fontWeight: 800, ml:1}}>{searchCnt}개</Typography>
                    <Typography sx={{ml:1}} variant={"body1"}>의 단체를 찾았습니다.</Typography>
                </Stack>
            </Stack>
            <Grid justifyContent={"space-evenly"} container spacing={3} columns={14}>
                {
                    dummySelector.group.map((item: groupFrom) => (
                        <Grid item res300={12} res500={6} res800={6} lg={4}>
                            <GroupSearchItem img={item.img} name={item.name} song={item.song} recruit={item.recruit} region={item.region} friend={item.friend} re_inst={item.re_inst} />
                        </Grid>

                    ))
                }
                {
                    dummySelector.group.map((item: groupFrom) => (
                        <Grid item res300={12} res500={6} res800={6} lg={4}>
                            <GroupSearchItem img={item.img} name={item.name} song={item.song} recruit={item.recruit} region={item.region} friend={item.friend} re_inst={item.re_inst} />
                        </Grid>

                    ))
                }
                {
                    dummySelector.group.map((item: groupFrom) => (
                        <Grid item res300={12} res500={6} res800={6} lg={4}>
                            <GroupSearchItem img={item.img} name={item.name} song={item.song} recruit={item.recruit} region={item.region} friend={item.friend} re_inst={item.re_inst} />
                        </Grid>

                    ))
                }
            </Grid>
            <Stack alignItems="center" sx={{width:'100%', height: '120px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '80%',justifyContent: "center", alignItems:"center"}} size="large" count={15} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
        </Stack>
    )
}

export default GroupSearchContents