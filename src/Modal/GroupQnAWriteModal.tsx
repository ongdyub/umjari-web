import {
    Box,
    Button, Divider,
    Fade,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel, Modal,
    Stack,
    TextField, Typography
} from "@mui/material";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, userSlice} from "../store/slices/user/user";
import {groupInfo, groupQnAPost} from "../store/slices/group/group";
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

    const {open, handleClose} = props;

    const dispatch = useDispatch<AppDispatch>()

    const userState = useSelector(selectUser)

    const { id } = useParams();

    const [title,setTitle] = useState('')
    const [contents, setContents] = useState('')

    const handleSubmit = async () => {
        const qnaData = {
            title : title,
            content : contents,
            isPrivate : false
        }
        const data = {
            qnaData : qnaData,
            token : userState.accessToken,
            id : id
        }
        const result = dispatch(groupQnAPost(data))
        handleClose(true)
        window.location.reload()
    }

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
                    defaultValue="Small"
                    variant="filled"
                    size="small"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{width: '100%'}}
                />
                <Divider sx={{width: '100%', mt: 1, mb: 1}} />
                <Stack sx={{height: '80%'}}>
                    <TextField
                        placeholder="내용을 입력해 주세요"
                        multiline
                        minRows={15}
                        maxRows={15}
                        variant={"standard"}
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}
                    />
                </Stack>
                <Stack alignItems={"center"} justifyContent={"flex-start"} direction={"row"} sx={{mt: 1}}>
                    <Button variant={"contained"} onClick={handleSubmit}>작성하기</Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default GroupQnAWriteModal
