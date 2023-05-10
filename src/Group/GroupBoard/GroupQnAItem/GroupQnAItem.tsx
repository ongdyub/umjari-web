import {Avatar, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MouseIcon from "@mui/icons-material/Mouse";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {groupQnAItemGet, groupStateActions, selectGroup} from "../../../store/slices/group/group";
import dayjs from "dayjs";

const GroupQnAItem = () => {

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>()
    const { id, qid } = useParams();
    const navigate = useNavigate()
    const groupState = useSelector(selectGroup)
    const res500 = useMediaQuery(theme.breakpoints.down("res500"))
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    useEffect(() => {
        dispatch(groupQnAItemGet({id, qid}))

        return () => {
            dispatch(groupStateActions.resetGroupQnAItem())
        }
    },[id, dispatch])

    if(groupState.groupQnAItem === null){
        return(
            <div>로딩중...</div>
        )
    }
    else{
        return(
            <Stack sx={{mb: 5}}>
                <Divider sx={{width: res700 ? '100%' : '90%', mt: -1}}/>
                <Stack alignItems="center" sx={{width:'100%'}} flexDirection={'column'}>
                    <Stack alignItems="center" sx={{width: '80%', mt: 2}}>
                        <Typography gutterBottom sx={{fontWeight: 600, fontSize: res700 ? 14 : 20}}>
                            {groupState.groupQnAItem.title}
                        </Typography>
                    </Stack>
                    <Divider orientation={"horizontal"} sx={{width: '90%', mt:1}}/>
                    <Stack alignItems="center" sx={{width: '90%', mt:1, mb:1}} flexDirection={"row"}>
                        <Stack>
                            <Avatar sx={{width: 30, height: 30}}>A</Avatar>
                        </Stack>
                        <Stack alignContent={"center"} alignItems={"center"} sx={{ml: 2}}>
                            <Typography sx={{fontWeight: 900, fontSize: res700 ? 13 : 15}}>포고듐덴 포고듐덴 포고듐덴</Typography>
                        </Stack>
                        <Stack alignItems="center" flexDirection={"row"} sx={{ml: 'auto'}}>
                            <Stack alignItems="center" flexDirection={"column"}>
                                <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>{dayjs(groupState.groupQnAItem.createAt).format('YYYY-MM-DD HH:mm')}</Typography>
                                <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>{dayjs(groupState.groupQnAItem.updatedAt).format('YYYY-MM-DD HH:mm')}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider orientation={"horizontal"} sx={{width: '80%'}}/>
                </Stack>
                <Stack alignItems="center" sx={{width:'100%', mt: 2}} flexDirection={'column'}>
                    <Typography sx={{fontSize : res700 ? 13 : 16}}>{groupState.groupQnAItem.content}</Typography>
                </Stack>
            </Stack>
        )
    }
}

export default GroupQnAItem