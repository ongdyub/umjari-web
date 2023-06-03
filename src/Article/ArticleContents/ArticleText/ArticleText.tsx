import {Divider, Stack} from "@mui/material";
import {useSelector} from "react-redux";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css'
import {selectArticle} from "../../../store/slices/article/article";

const ArticleText = () => {

    const articleState = useSelector(selectArticle)

    return(
        <Stack alignItems="center" sx={{width:'80%'}} flexDirection={'column'}>
            <ReactQuill
                value={articleState.content}
                readOnly={true}
                theme={"bubble"}
            />
            <Divider orientation={"horizontal"} sx={{width: '100%'}}/>
        </Stack>
    )
}

export default ArticleText