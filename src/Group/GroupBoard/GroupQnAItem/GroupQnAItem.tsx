import {Avatar, Button, Divider, Stack, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MouseIcon from "@mui/icons-material/Mouse";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {groupQnAItemGet, groupStateActions, selectGroup} from "../../../store/slices/group/group";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Comment from "../../../Common/Comment/Comment";
import {selectDummy} from "../../../store/slices/dummy/dummy";
import {selectUser, userActions} from "../../../store/slices/user/user";

const GroupQnAItem = () => {

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>()
    const { id, qid } = useParams();
    const navigate = useNavigate()

    const groupState = useSelector(selectGroup)
    const userState = useSelector(selectUser)
    const dummySelector = useSelector(selectDummy);

    const [replyText, setReplyText] = useState('')

    const res500 = useMediaQuery(theme.breakpoints.down("res500"))
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    const handleFocus = () => {
        if(userState.isLogin){
            return
        }
        else{
            dispatch(userActions.openModal())
        }
    }

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
            <Stack sx={{mb: 5}} alignItems="center">
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

                <Stack alignItems="flex-start" sx={{width:'80%', mt: 2, pt:1, pl: 1}} flexDirection={'column'}>
                    <Typography sx={{fontSize : res700 ? 14 : 18}}>{groupState.groupQnAItem.content}</Typography>
                </Stack>

                {/* 댓글 부분 */}

                <Stack alignItems="center" sx={{width: '80%', mt:4}} flexDirection={"row"} justifyContent={"space-between"}>
                    <Typography sx={{fontWeight: 900, fontSize: res700 ? 13 : 15}}>댓글 수 {groupState.groupQnAItem.replyList.length}</Typography>
                </Stack>
                <Divider orientation={"horizontal"} sx={{width: '80%', mt:1, mb:1}}/>
                <Stack alignItems="center" sx={{width: '80%'}}>
                    {groupState.groupQnAItem.replyList.map((item) => (
                        <Comment author={item.author} author_img={item.author} comment={item.content} />
                    ))}
                </Stack>
                <Stack sx={{width: '80%', mb:10, mt:2}}>
                    <TextField
                        placeholder="댓글을 입력해 주세요"
                        multiline
                        minRows={6}
                        value={replyText}
                        variant={"standard"}
                        onClick={handleFocus}
                    />
                    <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                        <Button size={"medium"}>작성하기</Button>
                    </Stack>
                </Stack>

            </Stack>
        )
    }
}

export default GroupQnAItem