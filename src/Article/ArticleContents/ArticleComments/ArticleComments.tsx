import {Divider, Stack, TextField, Typography} from "@mui/material";
import {selectDummy} from "../../../store/slices/dummy/dummy";
import {useSelector} from "react-redux";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {useState} from "react";
import IconButton from '@mui/material/IconButton';
import Comment from "../../../Common/Comment/Comment";

const ArticleComments = () => {

    const [thumb, setThumb] = useState(false)

    const dummySelector = useSelector(selectDummy);
    const num = 31
    const emptyComment = []

    const handleThumb = () => {
        setThumb(!thumb)
    }

    return(
        <Stack alignItems="center" sx={{width:'100%'}} flexDirection={'column'}>
            <Stack alignItems="center" sx={{width: '80%', mt:1}} flexDirection={"row"} justifyContent={"space-between"}>
                <Typography sx={{fontWeight: 900, fontSize: 15}}>댓글 수 {num}</Typography>
                <IconButton onClick={handleThumb}>
                    <ThumbUpOffAltIcon  sx={{color: thumb ? 'red' : ''}}  />
                </IconButton>
            </Stack>
            <Divider orientation={"horizontal"} sx={{width: '80%', mt:1, mb:1}}/>
            <Stack alignItems="center" sx={{width: '80%'}}>
                {dummySelector.commentList.map((item) => (
                    <Comment author={item.author} author_img={item.author_img} comment={item.comment} />
                ))}
            </Stack>
            <Stack sx={{width: '80%', mb:20, border: '1px solid #606060'}}>
                <TextField
                    placeholder="댓글을 입력해 주세요"
                    multiline
                    variant={"standard"}
                />
            </Stack>
        </Stack>
    )
}

export default ArticleComments