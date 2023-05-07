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

    const [title,setTitle] = useState('')
    const [contents, setContents] = useState('')

    const handleSubmit = async () => {
        const data = {
            title : title,
            content : contents,
            isPrivate : false
        }
        const token = "asdf"
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
