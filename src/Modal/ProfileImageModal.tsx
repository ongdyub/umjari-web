import {Modal, Box} from "@mui/material";

const style = (theme: any) => ({
    position: 'absolute' as 'absolute',
    top: '50vh',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75vw',
    height: 'auto',
    border: 'none',
    boxShadow: 24,
});

const ProfileImageModal = (props : any) => {

    const {src, open, setOpen} = props

    return(
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box sx={style}>
                <Box
                    component="img"
                    sx={{
                        display: 'block',
                        width: '100%',
                        objectFit: 'contain',
                        height:'auto'
                    }}
                    onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                    alt="Profile Img"
                    src={src}
                ></Box>
            </Box>
        </Modal>
    )
}

export default ProfileImageModal