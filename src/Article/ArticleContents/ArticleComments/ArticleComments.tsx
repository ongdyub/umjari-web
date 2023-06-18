import {Button, Divider, Stack, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {useEffect, useState} from "react";
import IconButton from '@mui/material/IconButton';
import Comment from "../../../Common/Comment/Comment";
import {articleDelete, articleGet, articleReplyPost, selectArticle} from "../../../store/slices/article/article";
import {selectUser, userActions} from "../../../store/slices/user/user";
import {AppDispatch} from "../../../store";
import {useNavigate, useParams} from "react-router-dom";
import DeleteConfirmModal from "../../../Modal/DeleteConfirmModal";

const ArticleComments = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {boardName, id} = useParams()
    const [thumb, setThumb] = useState(false)
    const [replyText, setReplyText] = useState('')
    const [open, setOpen] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const articleState = useSelector(selectArticle)
    const userState = useSelector(selectUser)

    const handleThumb = () => {
        window.alert('준비중입니다.')
        // setThumb(!thumb)
    }
    const handleFocus = () => {
        if(userState.isLogin){
            return
        }
        else{
            dispatch(userActions.openModal())
        }
    }
    const handleDeleteArticle = async () => {
        const result = await dispatch(articleDelete({boardType : boardName, id : id, token : userState.accessToken}))

        if (result.type === `${articleDelete.typePrefix}/fulfilled`) {
            window.alert("게시글이 삭제되었습니다.")
            navigate(`/community/${boardName}`)
        }
        else {
            console.log(result.payload)
            window.alert("오류 발생. 다시 시도해주세요")
        }
    }

    const handleSubmitReply = async () => {
        if(userState.isLogin){
            const data = {
                content : replyText,
                isAnonymous : false
            }
            if(replyText === '' || replyText.length < 1){
                window.alert("댓글 내용을 적어주세요.")
                return
            }
            const result = await dispatch(articleReplyPost({boardType : boardName, id, token: userState.accessToken, data}))
            if (result.type === `${articleReplyPost.typePrefix}/fulfilled`) {
                window.alert("댓글 작성 성공")
                setReplyText('')
                dispatch(articleGet({boardType : boardName, id : id, token : userState.accessToken}))
            } else {
                if(result.payload === 3001){
                    window.alert("그룹에 속해있지 않은 계정입니다.")
                }
                else{
                    window.alert("댓글 작성 실패")
                }
            }
        }
        else{
            dispatch(userActions.openModal())
        }
    }

    useEffect(() => {
        if(confirm){
            handleDeleteArticle().then(() => window.alert("처리 완료"))
        }
    },[confirm])

    return(
        <Stack alignItems="center" sx={{width:'100%'}} flexDirection={'column'}>
            <Stack alignItems="center" sx={{width: '80%', mt:1}} flexDirection={"row"} justifyContent={"space-between"}>
                <Typography sx={{fontWeight: 900, fontSize: 15}}>댓글 수 {articleState.replies.length}</Typography>
                {
                    articleState.author ?
                        <Stack alignItems={"center"} sx={{ml: 'auto'}} flexDirection={"row"}>
                            <Button size={"small"} color={"info"} onClick={() => navigate(`/community/${boardName}/${id}/edit`)}>수정</Button>
                            <Button size={"small"} color={"error"} onClick={() => setOpen(true)} >삭제</Button>
                        </Stack>
                        :
                        null
                }
                <IconButton onClick={handleThumb}>
                    <ThumbUpOffAltIcon  sx={{color: thumb ? 'red' : ''}}  />
                </IconButton>
            </Stack>
            <Divider orientation={"horizontal"} sx={{width: '80%', mt:1, mb:1}}/>
            <Stack alignItems="center" sx={{width: '80%'}}>
                {articleState.replies.map((item, idx) => (
                    <Comment key={idx} item={item} />
                ))}
            </Stack>
            <Stack sx={{width: '80%', mb:20, mt:2}}>
                <TextField
                    placeholder="댓글을 입력해 주세요"
                    multiline
                    minRows={6}
                    variant={"standard"}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onClick={handleFocus}
                />
                <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                    <Button size={"medium"} onClick={handleSubmitReply}>작성하기</Button>
                </Stack>
            </Stack>
            {
                open ?
                    <DeleteConfirmModal open={open} setOpen={setOpen} setConfirm={setConfirm} />
                    :
                    null
            }
        </Stack>
    )
}

export default ArticleComments