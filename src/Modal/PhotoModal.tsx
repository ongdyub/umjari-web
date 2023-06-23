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
import {useParams} from "react-router-dom";

const style = (theme: any) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    [theme.breakpoints.down(750)]: {
        width: 1,
        height: '90%',
        top:'45%'
    },
    height: '70%',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    overflow: 'scroll',
    '&::-webkit-scrollbar': {display: 'none'}
});

const PhotoModal = (props : any) => {

    const {open, setOpen, item} = props;

    const handleClose = () => {
        console.log("click")
    }

    const {title} = useParams()

    const dummySelector = useSelector(selectDummy);

    const theme = useTheme();
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const [like, setLike] = useState(false)

    return(
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack alignItems={"center"} sx={{height: '100%'}} direction={res750 ? 'column' : 'row'}>
                    <Stack alignItems={"center"} sx={{width : res750 ? '100%' : '47%', height: '100%'}}>
                        <Stack sx={{width: '100%'}} justifyContent={"flex-start"} alignItems={"center"}>
                            <Typography variant={"button"} sx={{fontWeight:300, fontSize: 20, mt:0.5}}>
                                {title}
                            </Typography>
                        </Stack>
                        <Divider sx={{mb: 0.5, width: '90%'}} />
                        {
                            res750 ?
                                <CardMedia
                                    component="img"
                                    sx={{maxHeight: '70%',width: '95%', objectFit: 'contain', loading: 'lazy'}}
                                    image={item.url}
                                    onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/img/fail-loading.png`}
                                    alt="사진입니다."
                                />
                                :
                                <Stack sx={{width: '100%', height: 'calc(100% - 90px)'}}>
                                    <CardMedia
                                        component="img"
                                        sx={{height: '100%', objectFit: 'contain', loading: 'lazy'}}
                                        image={item.url}
                                        onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/img/fail-loading.png`}
                                        alt="사진입니다."
                                    />
                                </Stack>
                        }

                        <Divider sx={{mt: 0.5, width: '90%'}} />

                        <Stack sx={{width: '90%', height: 'auto'}} alignItems={"center"} direction={"row"}>
                            <Stack alignItems={"center"} direction={"row"}>
                                <IconButton onClick={() => window.alert("준비중입니다.")}>
                                    <FavoriteBorderIcon sx={{width: 20, height: 20, color: like ? 'red' : ''}} />
                                </IconButton>
                                <Typography sx={{fontSize: 12, mr:1}}>
                                    0
                                </Typography>
                            </Stack>
                            <Stack alignItems={"center"} direction={"row"}>
                                <IconButton onClick={() => window.alert("준비중입니다.")} disabled={true}>
                                    <CommentIcon sx={{width: 20, height: 20}} />
                                </IconButton>
                                <Typography sx={{fontSize: 12}}>
                                    0
                                </Typography>
                            </Stack>
                            <Stack alignItems={"center"} direction={"row"} sx={{marginLeft: 'auto'}}>
                                <Typography sx={{ml: 5, fontWeight: 300, fontSize : 12}}>
                                    {item.createdAt.slice(2,10)}
                                </Typography>
                            </Stack>
                        </Stack>
                        {
                            res750 ?
                                <Divider sx={{mr: res750 ? 0 : -1,  mb: res750 ? 1 : 0, width: res750 ? '90%' : 0, height: res750 ? 'auto' : '90%'}} orientation={res750 ? 'horizontal' : 'vertical'} />
                                :
                                null
                        }
                        {
                            res750 ?
                                <Stack onClick={() => window.alert("준비중입니다.")} alignItems={"center"} sx={{height: res750? 'auto' : '90%', width : res750 ? '100%' : '55%', overflowY: res750 ? '' : 'scroll', '&::-webkit-scrollbar': {display: 'none'}}}>
                                    {/*<Stack alignItems="center" sx={{width: '90%'}}>*/}
                                    {/*    {dummySelector.commentList.map((item) => (*/}
                                    {/*        <GalleryComment author={item.author} author_img={item.author_img} comment={item.comment} />*/}
                                    {/*    ))}*/}
                                    {/*</Stack>*/}
                                    <Stack sx={{width: '90%', mt:1}}>
                                        <TextField
                                            sx={{fontSize : 5}}
                                            placeholder='댓글달기...'
                                            multiline
                                            minRows={1}
                                            variant={"standard"}
                                        />
                                        <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                                            <Button size={"small"} disabled>작성하기</Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                :
                                null
                        }
                    </Stack>
                    {
                        res750 ?
                            null
                            :
                            <Divider sx={{mr: res750 ? 0 : -1,  mb: res750 ? 1 : 0, width: res750 ? '90%' : 0, height: res750 ? 'auto' : '90%'}} orientation={res750 ? 'horizontal' : 'vertical'} />
                    }
                    {
                        res750 ?
                            null
                            :
                            <Stack onClick={() => window.alert("준비중입니다.")} alignItems={"center"} sx={{height: res750? 'auto' : '90%', width : res750 ? '100%' : '55%', overflowY: res750 ? '' : 'scroll', '&::-webkit-scrollbar': {display: 'none'}}}>
                                {/*<Stack alignItems="center" sx={{width: '90%'}}>*/}
                                {/*    {dummySelector.commentList.map((item) => (*/}
                                {/*        <GalleryComment author={item.author} author_img={item.author_img} comment={item.comment} />*/}
                                {/*    ))}*/}
                                {/*</Stack>*/}
                                <Stack sx={{width: '90%', mt:1}}>
                                    <TextField
                                        sx={{fontSize : 5}}
                                        placeholder='댓글달기...'
                                        multiline
                                        minRows={1}
                                        variant={"standard"}
                                    />
                                    <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                                        <Button size={"small"} disabled>작성하기</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                    }
                </Stack>
            </Box>
        </Modal>
    )
}

export default PhotoModal
