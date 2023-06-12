import {Avatar, Button, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import dayjs from "dayjs";
import {articleGet, articleReplyDelete} from "../../store/slices/article/article";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {useParams} from "react-router-dom";
import {selectUser} from "../../store/slices/user/user";

const Comment = (props : any) => {

    const {item} = props
    const dispatch = useDispatch<AppDispatch>()
    const {boardName, id} = useParams()
    const userState = useSelector(selectUser)

    const theme = useTheme();
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    const handleDeleteArticleReply = async () => {
        const result = await dispatch(articleReplyDelete({boardType : boardName, id : id, rId : item.id, token : userState.accessToken}))

        if (result.type === `${articleReplyDelete.typePrefix}/fulfilled`) {
            window.alert("댓글이 삭제되었습니다.")
            dispatch(articleGet({boardType : boardName, id: id, token : userState.accessToken}))
        }
        else {
            console.log(result.payload)
            window.alert("오류 발생. 다시 시도해주세요")
        }
    }

    if(item.isDeleted){
        return(
            <Stack sx={{width: '100%',}}>
                <Stack sx={{width: '100%', mt:0,mb: 0}} direction={"row"}>
                    <Stack justifyContent={"center"} alignContent={"center"} alignItems={"center"} textAlign={"center"} sx={{mr:3}}>
                        <Typography>
                            {item.content}
                        </Typography>
                    </Stack>
                    <Stack alignItems="center" flexDirection={"row"} sx={{ml: 'auto'}}>
                        <Stack alignItems="center" flexDirection={"column"}>
                            <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>{dayjs(item.createAt).format('YYYY-MM-DD HH:mm')}</Typography>
                            <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>{dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm')}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Divider orientation={"horizontal"} sx={{width: '100%', mt:1, mb:1}}/>
            </Stack>
        )
    }
    else {
        return(
            <Stack sx={{width: '100%',}}>
                <Stack sx={{width: '100%', mt:1,mb: 2}} direction={"row"}>
                    <Stack sx={{mr: 3}}>
                        {
                            item.isAnonymous ?
                                <Avatar sx={{height:32, width: 32}}>A</Avatar>
                                :
                                <Avatar alt={`${item.authorInfo.profileName}`} src={`${item.authorInfo.profileImage}`} sx={{height:32, width: 32}} />
                        }
                    </Stack>
                    <Stack justifyContent={"center"} alignContent={"center"} alignItems={"center"} textAlign={"center"}>
                        <Typography sx={{fontWeight: 900, fontSize: 15}}>{item.isAnonymous ? item.nickname : item.authorInfo.profileName}</Typography>
                    </Stack>
                    <Stack alignItems="center" flexDirection={"row"} sx={{ml: 'auto'}}>
                        <Stack alignItems="center" flexDirection={"column"}>
                            <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>{dayjs(item.createAt).format('YYYY-MM-DD HH:mm')}</Typography>
                            <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>{dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm')}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack sx={{mb:1}}>
                    <Typography>
                        {item.content}
                    </Typography>
                </Stack>
                <Stack alignItems="center" sx={{width: '100%'}} flexDirection={"row"} justifyContent={"space-between"}>
                    {
                        item.isAuthor === true ?
                            <Stack alignItems={"center"} sx={{ml: 'auto'}} flexDirection={"row"}>
                                <Button size={"small"} color={"info"} onClick={() => window.alert("준비중입니다.")}>수정</Button>
                                <Button size={"small"} color={"error"} onClick={handleDeleteArticleReply} >삭제</Button>
                            </Stack>
                            :
                            null
                    }
                </Stack>
                <Divider orientation={"horizontal"} sx={{width: '100%', mt:1, mb:1}}/>
            </Stack>
        )
    }
}

export default Comment