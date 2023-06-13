import {Box, Button, Modal, Stack} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
};

const DeleteConfirmModal = (props : any) => {

    const {open, setOpen, setConfirm} = props;

    return(
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack>
                    정말 삭제하시겠습니까? 관련된 정보 모두가 삭제됩니다.
                </Stack>
                <Stack sx={{width: '100%'}} direction={"row"} justifyContent={'flex-end'}>
                    <Button size={"small"} color={"error"} onClick={() => setConfirm(true)}>삭제</Button>
                    <Button size={"small"} onClick={() => setOpen(false)}>취소</Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default DeleteConfirmModal