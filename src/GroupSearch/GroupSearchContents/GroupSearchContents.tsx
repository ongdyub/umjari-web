import {Grid, Pagination, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useSelector} from "react-redux";
import GroupSearchItem from "./GroupSearchItem/GroupSearchItem";
import * as React from "react";
import {selectGroup} from "../../store/slices/group/group";

const GroupSearchContents = (props : any) => {

    const {page, totalPage, handleChange, totalElements} = props

    const theme = useTheme()
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))
    const res800 = useMediaQuery('(max-width:800px)')
    const res950 = useMediaQuery(theme.breakpoints.down("res950"))

    const groupSelector = useSelector(selectGroup)


    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{height: res800 ? 'auto' : 'auto', width: res800 ? '100%' : res950 ? 'calc(100% - 255px)' : 'calc(100% - 415px)'}}>
            <Stack sx={{width: '100%', mb:2}}>
                <Stack sx={{mt: 2}} justifyContent={"flex-start"} direction={"row"}>
                    <Typography sx={{ml: 5}} variant={"body1"}>총</Typography>
                    <Typography sx={{fontWeight: 800, ml:1}}>{totalElements}개</Typography>
                    <Typography sx={{ml:1}} variant={"body1"}>의 단체를 찾았습니다.</Typography>
                </Stack>
            </Stack>

            <Stack sx={{ width: '100%', mb: 1}} justifyContent={res800 ? "center" : ''} alignItems={res800 ? "center" : ''} alignContent={res800 ? "center" : ''}>
                <Grid direction={'row'} justifyContent={"flex-start"} flexWrap={"wrap"} container spacing={1} columns={15} sx={{pr:2, pl:2}}>
                    {
                        groupSelector.groupSearchList?.contents.map((item, idx) => (
                            <Grid key={idx} item xs={15} res500={7.5} res1050={5} sx={{mb:1}}>
                                <GroupSearchItem item={item} />
                            </Grid>

                        ))
                    }
                </Grid>
            </Stack>

            <Stack alignItems="center" sx={{width:'100%', height: '50px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res750 ? "small" : "large"} count={totalPage} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
        </Stack>
    )
}

export default GroupSearchContents