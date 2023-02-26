import {
    Backdrop,
    Box, Button,
    CardMedia,
    Divider,
    Fade, IconButton,
    Modal,
    Stack, TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import {useState} from "react";
import Comment from "../Common/Comment/Comment";
import {useSelector} from "react-redux";
import {selectDummy} from "../store/slices/dummy/dummy";
import GalleryComment from "../Common/GalleryComment/GalleryComment";

const GalleryModal = (props : any) => {

    const {open, handleClose, imgId} = props;
    const dummySelector = useSelector(selectDummy);
    const commentList = [
        {

        }
    ]
    const theme = useTheme();
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const [like, setLike] = useState(false)
    const handleLike = () => {
        setLike(!like)
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '85%',
        height: res750 ? '90%' : '70%',
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {display: 'none'}
    };
    const res750Style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: res750 ? '90%' : '80%',
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
    }

    return(
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 200,
                }}
            >
                <Fade in={open}>
                    <Stack sx={res750 ? style : res750Style} alignItems={"center"} direction={res750 ? 'column' : 'row'}>
                        <Stack alignItems={"center"} sx={{width : res750 ? '100%' : '47%', height: res750 ? 'auto' : '100%'}}>

                            <Stack sx={{width: '100%'}} justifyContent={"flex-start"} alignItems={"center"}>
                                <Typography variant={"button"} sx={{fontWeight: 300, fontSize: 20, mt:0.5}}>
                                    SNUPO 55회
                                </Typography>
                            </Stack>
                            <Divider sx={{mb: 1, width: '90%'}} />
                            {
                                res750 ?
                                    <CardMedia
                                        component="img"
                                        sx={{width: '100%', objectFit: 'contain', loading: 'lazy'}}
                                        image={`/img/${imgId}.jpg`}
                                        alt="Live from space album cover"
                                    />
                                    :
                                    <Stack sx={{width: '100%', height: 'calc(72% - 10px)'}}>
                                        <CardMedia
                                            component="img"
                                            sx={{height: '100%', objectFit: 'contain', loading: 'lazy'}}
                                            image={`/img/${imgId}.jpg`}
                                            alt="Live from space album cover"
                                        />
                                    </Stack>

                            }

                            <Divider sx={{mt: 1, width: '90%'}} />

                            <Stack sx={{width: '90%',mt:0.5, mb:0.5}} alignItems={"center"} direction={"row"}>
                                <Stack alignItems={"center"} direction={"row"}>
                                    <IconButton onClick={handleLike}>
                                        <FavoriteBorderIcon sx={{width: 20, height: 20, color: like ? 'red' : ''}} />
                                    </IconButton>
                                    <Typography sx={{fontSize: 14, mr:1}}>
                                        123
                                    </Typography>
                                </Stack>
                                <Stack alignItems={"center"} direction={"row"}>
                                    <IconButton onClick={handleLike} disabled={true}>
                                        <CommentIcon sx={{width: 20, height: 20}} />
                                    </IconButton>
                                    <Typography sx={{fontSize: 14}}>
                                        51
                                    </Typography>
                                </Stack>
                                <Stack alignItems={"center"} direction={"row"} sx={{marginLeft: 'auto'}}>
                                    <Typography sx={{ml: 5, fontWeight: 300}}>
                                        2020.01.01
                                    </Typography>
                                </Stack>
                            </Stack>

                        </Stack>


                        <Divider sx={{mr: res750 ? 0 : -1, ml: res750 ? 0 : 0, mb: res750 ? 1 : 0, width: res750 ? '90%' : 0, height: res750 ? 0 : '90%'}} orientation={res750 ? 'horizontal' : 'vertical'} />

                        <Stack alignItems={"center"} sx={{height: res750? '' : '90%', width : res750 ? '100%' : '55%', overflowY: res750 ? '' : 'scroll', '&::-webkit-scrollbar': {display: 'none'}}}>
                            <Stack alignItems="center" sx={{width: '90%'}}>
                                {dummySelector.commentList.map((item) => (
                                    <GalleryComment author={item.author} author_img={item.author_img} comment={item.comment} />
                                ))}
                            </Stack>

                            <Stack sx={{width: '90%', mb:10, mt:1}}>
                                <TextField
                                    placeholder="댓글을 입력해 주세요"
                                    multiline
                                    minRows={4}
                                    variant={"standard"}
                                />
                                <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                                    <Button size={"small"}>작성하기</Button>
                                </Stack>
                            </Stack>
                        </Stack>


                    </Stack>
                </Fade>
            </Modal>
        </div>
    )
}

export default GalleryModal