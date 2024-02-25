import {
    Box,
    Button, Divider,
    Modal,
    Stack,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { concertCommentPost, concertCommentPut } from "../../../store/slices/concert/concert";
import { selectUser } from "../../../store/slices/user/user";
import { selectConcert } from "../../../store/slices/concert/concert";
// import {
//     groupQnAItemGet,
//     groupQnAListGet,
//     groupQnAPost, groupQnAPut, selectGroup,
// } from "../store/slices/group/group";
import { AppDispatch } from "../../../store";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddConcertCommentModal = (props: any) => {

    const { open, handleClose, mode, comment, cid } = props;

    const dispatch = useDispatch<AppDispatch>()

    const userState = useSelector(selectUser)
    const concertState = useSelector(selectConcert)
    // const groupState = useSelector(selectGroup)

    const { id } = useParams();

    const [contents, setContents] = useState('')

    const handleSubmit = async () => {
        if (contents === '') {
            window.alert("내용을 입력하세요.")
            return
        }
        if (contents.length > 500) {
            window.alert("500자를 초과하였습니다. 현재 길이는 " + contents.length + " 입니다.")
            return
        }
        const concertCommentData = {
            comment: contents,
        }
        const data = {
            data: concertCommentData,
            token: userState.accessToken,
            id: id,
        }
        const param = {
            text: '',
            page: 1,
            sort: 'createAt,DESC',
        }

        if (mode === 'post') {
            const result = await dispatch(concertCommentPost(data))
            if (result.type === `${concertCommentPost.typePrefix}/fulfilled`) {
                window.alert("작성 성공")
                handleClose(true)
                return
            } else {
                if (result.payload.data.errorCode === 16) {
                    window.alert("이미 존재하는 평이 있습니다.")
                    return
                }
                else {
                    window.alert("네트워크 오류. 다시 시도해주세요.")
                    return
                }
            }
        }
        else {
            const editData = {
                data: concertCommentData,
                token: userState.accessToken,
                id: id,
                cid: cid
            }
            const result = await dispatch(concertCommentPut(editData))
            if (result.type === `${concertCommentPut.typePrefix}/fulfilled`) {
                window.alert("수정 성공")
                window.location.reload()
            } else {
                if (result.payload == 3001) {
                    window.alert("그룹에 속해있지 않은 계정입니다.")
                }
                else if (result.payload === 1) {
                    window.alert("존재하는 댓글이 있어 수정이 불가능합니다.")
                }
                else {
                    window.alert("수정 실패. 네트워크 오류")
                }
            }
        }
        handleClose(true)
    }

    useEffect(() => {
        if (mode === 'edit' && comment !== null && comment !== undefined) {
            setContents(comment)
        }
    }, [])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField
                    hiddenLabel
                    placeholder="한 계정당 하나의 평만 작성 가능합니다"
                    variant="filled"
                    size="small"
                    sx={{ width: '100%' }}
                    disabled
                />
                <Divider sx={{ width: '100%', mt: 1, mb: 1 }} />
                <Stack sx={{ height: '80%' }}>
                    <TextField
                        placeholder="내용을 입력해 주세요. 글자수 제한은 500자 입니다."
                        multiline
                        minRows={10}
                        maxRows={10}
                        variant={"standard"}
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}
                    />
                </Stack>
                <Stack alignItems={"center"} justifyContent={"flex-start"} direction={"row"} sx={{ mt: 1 }}>
                    <Button variant={"contained"} onClick={handleSubmit}>{mode === 'post' ? '작성하기' : '수정하기'}</Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default AddConcertCommentModal
