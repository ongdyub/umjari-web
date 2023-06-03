import {Button, Divider, Stack, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {useState} from "react";
import IconButton from '@mui/material/IconButton';
import Comment from "../../../Common/Comment/Comment";
import {selectArticle} from "../../../store/slices/article/article";

const ArticleComments = () => {

    const [thumb, setThumb] = useState(false)
    const articleState = useSelector(selectArticle)

    const handleThumb = () => {
        window.alert('준비중입니다.')
        // setThumb(!thumb)
    }

    return(
        <Stack alignItems="center" sx={{width:'100%'}} flexDirection={'column'}>
            <Stack alignItems="center" sx={{width: '80%', mt:1}} flexDirection={"row"} justifyContent={"space-between"}>
                <Typography sx={{fontWeight: 900, fontSize: 15}}>댓글 수 {articleState.replies.length}</Typography>
                <IconButton onClick={handleThumb}>
                    <ThumbUpOffAltIcon  sx={{color: thumb ? 'red' : ''}}  />
                </IconButton>
            </Stack>
            <Divider orientation={"horizontal"} sx={{width: '80%', mt:1, mb:1}}/>
            <Stack alignItems="center" sx={{width: '80%'}}>
                {articleState.replies.map((item, idx) => (
                    <Comment key={idx} item={item} />
                ))}
            </Stack>
            <Stack sx={{width: '80%', mb:20, mt:2}}>
                <TextField
                    placeholder="댓글을 입력해 주세요"
                    multiline
                    minRows={6}
                    variant={"standard"}
                />
                <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                    <Button size={"large"}>작성하기</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ArticleComments