import { Button, Divider, Avatar, Card, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import DeleteConfirmModal from "../../../Modal/DeleteConfirmModal";
import { concertCommentDelete } from "../../../store/slices/concert/concert";
import { selectUser, userActions } from "../../../store/slices/user/user";
import AddConcertCommentModal from "./AddConcertCommentModal"

const ConcertCommentItem = (props: any) => {

    const { item } = props
    const theme = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const res500 = useMediaQuery(theme.breakpoints.down("res500"))
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    const userState = useSelector(selectUser)

    const [editMode, setEditMode] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
    const [confirm, setConfirm] = useState(false)

    const handleModalClose = () => {
        setEditMode(false)
    }

    const onClickAuthor = () => {
        navigate(`/myconcert/${item.simpleUserDto.profileName}/list`)
    }

    const handleDeleteConcertCommentReply = async () => {
        const result = await dispatch(concertCommentDelete({ id: id, cid: item.id, token: userState.accessToken }))

        if (result.type === `${concertCommentDelete.typePrefix}/fulfilled`) {
            window.alert("댓글이 삭제되었습니다.")
            window.location.reload()
        }
        else {
            window.alert("오류 발생. 다시 시도해주세요")
        }
        setConfirm(false)
        setDeleteOpen(false)
    }

    useEffect(() => {
        if (confirm) {
            handleDeleteConcertCommentReply().then(() => { })
        }
    }, [confirm])

    return (
        <Card sx={{pb:2, width: '100%', justifyContent: "flex-start", alignItems: "center", display: 'flex', alignContent: 'center', flexDirection: 'column' }}>
            <Stack sx={{ width: '100%', pr: 2, pl: 3, mt: 1, mb: 2, cursor: 'pointer' }} direction={"row"}>
                <Stack sx={{mr: 2}}>
                    <Avatar onClick={onClickAuthor} alt={`${item.simpleUserDto.profileName}`} src={`${item.simpleUserDto.profileImage}`} sx={{ height: 32, width: 32 }} />
                </Stack>
                <Stack justifyContent={"center"} alignContent={"center"} alignItems={"center"} textAlign={"center"}>
                    <Typography onClick={onClickAuthor} sx={{ cursor: 'pointer', fontWeight: 900, fontSize: 15 }}>{item.simpleUserDto.profileName}</Typography>
                </Stack>
                <Stack alignItems="center" sx={{  }} flexDirection={"row"} justifyContent={"space-between"}>
                    {
                        item.isOwnedComment === true ?
                        <Stack alignItems={"center"} sx={{ ml: 'auto' }} flexDirection={"row"}>
                            <Button size={"small"} color={"info"} onClick={() => setEditMode(true)}>수정</Button>
                            <Button size={"small"} color={"error"} onClick={() => setDeleteOpen(true)} >삭제</Button>
                        </Stack>
                        :
                        null
                    }
                </Stack>
                <Stack alignItems="center" flexDirection={"row"} sx={{ ml: 'auto' }}>
                    <Stack alignItems="center" flexDirection={"column"}>
                        <Typography variant="caption" sx={{ color: 'grey', fontSize: 12 }}>{dayjs(item.createAt).format('YYYY-MM-DD HH:mm')}</Typography>
                        {/* <Typography variant="caption" sx={{ color: 'grey', fontSize: res700 ? 7 : 12 }}>{dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm')}</Typography> */}
                    </Stack>
                </Stack>
            </Stack>
            <Divider sx={{mt:-1, mb:1,  width: '95%'}} />
            <Stack sx={{ width: '95%'}}>
                <Typography sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word', fontSize: 12 }}>{item.comment}</Typography>
            </Stack>
            {
                deleteOpen ?
                    <DeleteConfirmModal open={deleteOpen} setOpen={setDeleteOpen} setConfirm={setConfirm} />
                    :
                    null
            }
            {
                editMode ?
                    <AddConcertCommentModal open={editMode} handleClose={handleModalClose} mode={'edit'} comment={item.comment} cid={item.id} />
                    :
                    null
            }
        </Card>
    )
}

export default ConcertCommentItem
