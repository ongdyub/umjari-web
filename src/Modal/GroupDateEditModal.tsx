import {
    Fade,
    Modal,
    Stack,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    selectUser,
} from "../store/slices/user/user";
import MyCareerTimeEdit from "../MyConcert/MyProfile/MyCareer/MyCareerTimeEdit/MyCareerTimeEdit";
import {AppDispatch} from "../store";

const styleLog = (theme: any) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    maxHeight: '80%',
    bgcolor: 'secondary.light',
    boxShadow: 24,
    p: 3,
    overflow: 'scroll',
    [theme.breakpoints.down(800)]: {
        width: 0.8,
    },
});

const NameChangeModal = (props : any) => {

    const {open, close} = props

    const userState = useSelector(selectUser)

    const handleClose = () => {
        close(false)
    }

    return(
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Stack spacing={2} sx={styleLog}>
                    {userState.career.map((item) => (
                        <MyCareerTimeEdit item={item} />
                    ))}
                </Stack>
            </Fade>
        </Modal>
    )
}

export default NameChangeModal