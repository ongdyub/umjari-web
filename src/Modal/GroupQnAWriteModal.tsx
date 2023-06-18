import {
    Box,
    Button, Divider,
    Modal,
    Stack,
    TextField,
} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../store/slices/user/user";
import {
    groupQnAItemGet,
    groupQnAListGet,
    groupQnAPost, groupQnAPut, selectGroup,
} from "../store/slices/group/group";
import {AppDispatch} from "../store";

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

const GroupQnAWriteModal = (props : any) => {

    const {open, handleClose, mode} = props;

    const dispatch = useDispatch<AppDispatch>()

    const userState = useSelector(selectUser)
    const groupState = useSelector(selectGroup)

    const { id, qid } = useParams();

    const [title,setTitle] = useState('')
    const [contents, setContents] = useState('')
    const [hide, setHide] = useState(false)

    const handleSubmit = async () => {
        if(title === ''){
            window.alert("제목을 입력하세요.")
            return
        }
        if(contents === ''){
            window.alert("내용을 입력하세요.")
            return
        }
        const qnaData = {
            title : title,
            content : contents,
            isAnonymous : hide
        }
        const data = {
            qnaData : qnaData,
            token : userState.accessToken,
            id : id,
            qid : qid
        }
        const param = {
            text : '' ,
            page : 1,
            sort : 'createAt,DESC',
        }

        if(mode === 'edit'){
            const result = await dispatch(groupQnAPut(data))
            if (result.type === `${groupQnAPut.typePrefix}/fulfilled`) {
                window.alert("수정 성공")
            } else {
                if(result.payload == 3001){
                    window.alert("그룹에 속해있지 않은 계정입니다.")
                }
                else if(result.payload === 1){
                    window.alert("존재하는 댓글이 있어 수정이 불가능합니다.")
                }
                else{
                    window.alert("수정 실패. 네트워크 오류")
                }
            }
        }
        else{
            const result = await dispatch(groupQnAPost(data))
            if (result.type === `${groupQnAPost.typePrefix}/fulfilled`) {
                window.alert("작성 성공")
            } else {
                if(result.payload == 3001){
                    window.alert("그룹에 속해있지 않은 계정입니다.")
                }
                else{
                    window.alert("작성 실패. 네트워크 오류")
                }
            }
        }
        dispatch(groupQnAListGet({id, param}))
        dispatch(groupQnAItemGet({id, qid, token : userState.accessToken}))
        handleClose(true)
    }

    useEffect(() => {
        if(mode === 'edit' && groupState.groupQnAItem !== null){
            setContents(groupState.groupQnAItem.content)
            setTitle(groupState.groupQnAItem.title)
        }
    },[])

    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    placeholder="제목을 입력해 주세요"
                    variant="filled"
                    size="small"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{width: '100%'}}
                />
                <Divider sx={{width: '100%', mt: 1, mb: 1}} />
                <Stack sx={{height: '80%'}}>
                    <TextField
                        placeholder="내용을 입력해 주세요. 공개 선택 시에는 계정 검색 가능한 현재 이름이 표시가 되고, 비공개 선택 시에는 닉네임만 표시됩니다. 댓글이 작성 될 시에 수정 및 삭제가 불가하오니 오타에 유의해주세요."
                        multiline
                        minRows={15}
                        maxRows={15}
                        variant={"standard"}
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}
                    />
                </Stack>
                <Stack alignItems={"center"} justifyContent={"flex-start"} direction={"row"} sx={{mt: 1}}>
                    {
                        hide ?
                            <Button variant={"contained"} sx={{mr: 2, bgcolor: 'red', color: 'white'}} onClick={() => setHide(false)}>비공개</Button>
                            :
                            <Button variant={"contained"} sx={{mr: 2, bgcolor: 'green', color: 'white'}} onClick={() => setHide(true)}>공개</Button>
                    }
                    {
                        mode === 'write' ?
                            <Button variant={"contained"} onClick={handleSubmit}>작성하기</Button>
                            :
                            <Button variant={"contained"} onClick={handleSubmit}>수정하기</Button>
                    }
                </Stack>
            </Box>
        </Modal>
    )
}

export default GroupQnAWriteModal
