import {Avatar, Button, Divider, Stack, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import dayjs from "dayjs";
import {articleGet, articleReplyDelete, articleReplyEdit} from "../../store/slices/article/article";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {useNavigate, useParams} from "react-router-dom";
import {selectUser, userActions} from "../../store/slices/user/user";
import {useEffect, useState} from "react";
import DeleteConfirmModal from "../../Modal/DeleteConfirmModal";

const Comment = (props : any) => {

    const {item} = props
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {boardName, id} = useParams()
    const userState = useSelector(selectUser)

    const theme = useTheme();
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(item.content)
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
    const [confirm, setConfirm] = useState(false)

    const onClickAuthor = () => {
        if(item.isAnonymous){
            window.alert("익명글입니다.")
        }
        else{
            navigate(`/myconcert/${item.authorInfo.profileName}/selfintro`)
        }
    }

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

    const handleEditArticleReply = async () => {
        if(userState.isLogin){
            const data = {
                content : text,
                isAnonymous : false
            }
            if(text === '' || text.length < 1){
                window.alert("댓글 내용을 적어주세요.")
                return
            }
            const result = await dispatch(articleReplyEdit({boardType : boardName, id, token: userState.accessToken, rId : item.id, data}))
            if (result.type === `${articleReplyEdit.typePrefix}/fulfilled`) {
                window.alert("수정 성공")
                setText('')
                dispatch(articleGet({boardType : boardName, id : id, token : userState.accessToken}))
                setEditMode(false)
            } else {
                if(result.payload === 3001){
                    window.alert("그룹에 속해있지 않은 계정입니다.")
                    setEditMode(false)
                }
                else{
                    window.alert("댓글 작성 실패")
                    setEditMode(false)
                }
            }
        }
        else{
            dispatch(userActions.openModal())
        }
    }

    useEffect(() => {
        if(confirm){
            handleDeleteArticleReply().then(() => window.alert("처리 완료"))
        }
    },[confirm])

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
                        <Typography onClick={onClickAuthor} sx={{cursor:'pointer',fontWeight: 900, fontSize: 15}}>{item.isAnonymous ? item.nickname : item.authorInfo.profileName}</Typography>
                    </Stack>
                    <Stack alignItems="center" flexDirection={"row"} sx={{ml: 'auto'}}>
                        <Stack alignItems="center" flexDirection={"column"}>
                            <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>{dayjs(item.createAt).format('YYYY-MM-DD HH:mm')}</Typography>
                            <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>{dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm')}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack sx={{mb:1}}>
                    {
                        editMode ?
                            <Stack>
                                <TextField
                                    placeholder="댓글을 입력해 주세요"
                                    multiline
                                    minRows={6}
                                    variant={"standard"}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                                    <Button size={"medium"} onClick={handleEditArticleReply}>작성</Button>
                                    <Button size={'small'} onClick={() => setEditMode(false)}>취소</Button>
                                </Stack>
                            </Stack>
                            :
                            <Typography>
                                {item.content}
                            </Typography>
                    }
                </Stack>
                <Stack alignItems="center" sx={{width: '100%'}} flexDirection={"row"} justifyContent={"space-between"}>
                    {
                        item.isAuthor === true ?
                            editMode ?
                                null
                                :
                                <Stack alignItems={"center"} sx={{ml: 'auto'}} flexDirection={"row"}>
                                    <Button size={"small"} color={"info"} onClick={() => setEditMode(true)}>수정</Button>
                                    <Button size={"small"} color={"error"} onClick={() => setDeleteOpen(true)} >삭제</Button>
                                </Stack>
                            :
                            null
                    }
                </Stack>
                <Divider orientation={"horizontal"} sx={{width: '100%', mt:1, mb:1}}/>
                {
                    deleteOpen ?
                        <DeleteConfirmModal open={deleteOpen} setOpen={setDeleteOpen} setConfirm={setConfirm} />
                        :
                        null
                }
            </Stack>
        )
    }
}

export default Comment