import {Button, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import GroupItem from "./GroupItem/GroupItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {groupRecommendGet, groupSearchGet, groupStateActions, selectGroup} from "../../store/slices/group/group";
import {AppDispatch} from "../../store";
import {useNavigate} from "react-router-dom";
import {selectUser} from "../../store/slices/user/user";

const RecommendGroup = () => {

    const theme = useTheme();
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()
    const groupSelector = useSelector(selectGroup)
    const userState = useSelector(selectUser)

    useEffect(() => {
        if(userState.accessToken === null || !userState.refreshed){
            const params = {
                regionParent : null,
                regionChild : null,
                composer: null,
                musicName: null,
                name : null,
                instruments : null,
                page : 1,
                size: 5,
                sort : "id,DESC",
            }

            dispatch(groupSearchGet({params, token : userState.accessToken}))

            return () => {
                dispatch(groupStateActions.resetGroupSearchList())
            }
        }
        else{
            dispatch(groupRecommendGet({token : userState.accessToken}))
            return () => {
                dispatch(groupStateActions.resetGroupSearchList())
            }
        }
    },[userState.refreshed])

    useEffect(() => {
        if(groupSelector.groupRecommend.length < 1){
            const params = {
                regionParent : null,
                regionChild : null,
                composer: null,
                musicName: null,
                name : null,
                instruments : null,
                page : 1,
                size: 5,
                sort : "id,DESC",
            }

            dispatch(groupSearchGet({params, token : userState.accessToken}))

            return () => {
                dispatch(groupStateActions.resetGroupSearchList())
            }
        }
    },[groupSelector.groupRecommend])

    return(
        <Stack direction="column" justifyContent="flex-start" alignContent={'center'} alignItems="center" sx={{width: useMediaQuery(theme.breakpoints.down("md")) ? "100%" : "42%"}}>
            <Typography sx={{fontWeight: 300, fontSize: 22, mb: 2}} mt={2} >{userState.accessToken === null || groupSelector.groupRecommend.length < 1 ? '최근 등록된 단체' : '추천 단체'}</Typography>
            <Grid direction={'row'} justifyContent={"flex-start"} flexWrap={"wrap"} container spacing={1} columns={15} sx={{pr:2, pl:2, width:'100%'}}>
                {
                    userState.accessToken === null || groupSelector.groupRecommend.length < 1 ?
                        groupSelector.groupSearchList?.contents.map((item, idx) => (
                            <Grid key={idx} item xs={15} res500={15} res1050={15} sx={{mb:1}}>
                                <GroupItem key={idx} item={item}/>
                            </Grid>
                        ))
                        :
                        groupSelector.groupRecommend.map((item, idx) => (
                            <Grid key={idx} item xs={15} res500={15} res1050={15} sx={{mb:1}}>
                                <GroupItem key={idx} item={item}/>
                            </Grid>
                        ))
                }
            </Grid>
            <Stack justifyContent="flex-start" alignItems="center" sx={{width: '100%'}}>
                <Button sx={{}} onClick={() => navigate('/groupsearch')}>더보기</Button>
            </Stack>
        </Stack>
    )
}

export default RecommendGroup