import {Avatar, Box, Button, Divider, Stack, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {
    groupQnADelete,
    groupQnAItemGet,
    groupQnAReplyPost,
    groupStateActions,
    selectGroup
} from "../../../store/slices/group/group";
import dayjs from "dayjs";
import {selectUser, userActions} from "../../../store/slices/user/user";
import GroupQnAComment from "./GroupQnAComment";
import GroupQnAWriteModal from "../../../Modal/GroupQnAWriteModal";
import DeleteConfirmModal from "../../../Modal/DeleteConfirmModal";


const GroupQnAItem = () => {

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>()
    const { id, qid } = useParams();
    const navigate = useNavigate()

    const groupState = useSelector(selectGroup)
    const userState = useSelector(selectUser)

    const [replyText, setReplyText] = useState('')
    const [hide, setHide] = useState(false)
    const [writeOpen, setWriteOpen] = useState<boolean>(false)
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)

    const handleWriteClose = () => {
        setWriteOpen(false)
    }

    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    const onClickAuthor = () => {
        if(groupState.groupQnAItem !== null && groupState.groupQnAItem?.isAnonymous){
            window.alert("익명글입니다.")
        }
        else{
            navigate(`/myconcert/${groupState.groupQnAItem?.authorInfo.profileName}/list`)
        }
    }

    const handleFocus = () => {
        if(userState.isLogin){
            return
        }
        else{
            dispatch(userActions.openModal())
        }
    }

    const handleSubmitReply = async () => {
        if(replyText === ''){
            window.alert("댓글을 입력하세요")
            return
        }
        if(userState.isLogin){
            const data = {
                content : replyText,
                isAnonymous : hide
            }
            const result = await dispatch(groupQnAReplyPost({id, qid, token: userState.accessToken, data}))
            if (result.type === `${groupQnAReplyPost.typePrefix}/fulfilled`) {
                window.alert("댓글 작성 성공")
                setReplyText('')
                dispatch(groupQnAItemGet({id, qid, token : userState.accessToken}))
            } else {
                if(result.payload == 4003){
                    window.alert("존재하지 않는 글입니다.")
                    navigate(-1)
                }
                if(result.payload == 3001){
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
            dispatch(groupQnADelete({id : id, qid : qid, token : userState.accessToken}))
            setDeleteOpen(false)
            navigate(-1)
        }
    },[confirm])

    useEffect(() => {
        if(!confirm){
            dispatch(groupQnAItemGet({id, qid, token : userState.accessToken}))
        }

        return () => {
            dispatch(groupStateActions.resetGroupQnAItem())
        }
    },[id, dispatch, confirm])

    useEffect(() => {
        dispatch(groupQnAItemGet({id, qid, token : userState.accessToken}))
    },[writeOpen])

    if(groupState.groupQnAItem === null){
        if(!groupState.groupQnAExist){
            return(
                <div>
                        존재하지 않는 QnA ID 입니다.
                </div>
            )
        }
        return(
            <div>
                로딩중
            </div>
        )
    }
    else{
        return(
            <Stack sx={{mb: 5}} alignItems="center">
                <Divider sx={{width: res700 ? '100%' : '90%', mt: -1}}/>
                <Stack alignItems="center" sx={{width:'100%'}} flexDirection={'column'}>

                    <Stack direction={"row"} alignContent={"center"} alignItems="center" sx={{width: '80%', mt: 2}}>
                        <Typography gutterBottom sx={{width: '100%', fontWeight: 600, fontSize: res700 ? 14 : 20, wordWrap: 'break-word'}}>
                            {groupState.groupQnAItem.title}
                        </Typography>
                    </Stack>

                    <Divider orientation={"horizontal"} sx={{width: '90%', mt:1}}/>

                    <Stack alignItems="center" sx={{width: '90%', mt:1, mb:1}} flexDirection={"row"}>
                        <Stack>
                            <Avatar sx={{width: 45, height: 45}} alt={`${process.env.PUBLIC_URL}/Logo_posit.png`}>
                                <Box
                                    component="img"
                                    sx={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    alt="Profile Img"
                                    onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                                    src={`${groupState.groupQnAItem.isAnonymous ? `${process.env.PUBLIC_URL}/Logo_posit.png` : `${groupState.groupQnAItem.authorInfo.profileImage}`}`}
                                />
                            </Avatar>
                        </Stack>
                        <Stack alignContent={"center"} alignItems={"center"} sx={{ml: 2}}>
                            <Typography onClick={onClickAuthor} sx={{cursor:'pointer',fontWeight: 900, fontSize: res700 ? 16 : 19}}>{groupState.groupQnAItem.isAnonymous ? groupState.groupQnAItem.nickname : groupState.groupQnAItem.authorInfo.profileName}</Typography>
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
                    <Typography sx={{fontSize : res700 ? 14 : 18, width: '100%', wordBreak: 'break-word'}}>{groupState.groupQnAItem.content}</Typography>
                </Stack>

                {/* 댓글 부분 */}

                <Stack alignItems="center" sx={{width: '80%', mt:4}} flexDirection={"row"} justifyContent={"space-between"}>
                    <Typography sx={{fontWeight: 900, fontSize: res700 ? 13 : 15}}>댓글 수 {groupState.groupQnAItem.replyList.length}</Typography>
                    {
                        groupState.groupQnAItem.isAuthor ?
                            <Stack alignItems={"center"} sx={{ml: 'auto'}} flexDirection={"row"}>
                                <Button size={"small"} color={"info"} onClick={() => setWriteOpen(true)}>수정</Button>
                                <Button size={"small"} color={"error"} onClick={() => setDeleteOpen(true)} >삭제</Button>
                            </Stack>
                            :
                            null
                    }
                </Stack>

                {/* 댓글 입력 */}
                <Divider orientation={"horizontal"} sx={{width: '80%', mt:1, mb:1}}/>
                <Stack alignItems="center" sx={{width: '80%'}}>
                    {groupState.groupQnAItem.replyList.map((item) => (
                        <GroupQnAComment key={item.id} item={item} />
                    ))}
                </Stack>
                <Stack sx={{width: '80%', mb:10, mt:2}}>
                    <TextField
                        placeholder="댓글을 입력해 주세요. 그룹에 속해있는 계정만 답글을 달 수 있습니다."
                        multiline
                        minRows={6}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        variant={"standard"}
                        onClick={handleFocus}
                    />
                    <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                        <Button size={"medium"} onClick={handleSubmitReply}>작성하기</Button>
                        {
                            hide ?
                                <Button size={"medium"} sx={{mr: 1}} color={"error"} onClick={() => setHide(false)}>비공개</Button>
                                :
                                <Button size={"medium"} sx={{mr: 1}} color={"info"} onClick={() => setHide(true)}>공개</Button>
                        }
                    </Stack>
                </Stack>
                <GroupQnAWriteModal open={writeOpen} handleClose={handleWriteClose} mode={'edit'}/>
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

export default GroupQnAItem