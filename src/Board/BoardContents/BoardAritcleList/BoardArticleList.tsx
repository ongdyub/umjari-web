import {List} from "@mui/material";
import {useSelector} from "react-redux";
import {selectDummy} from "../../../store/slices/dummy/dummy";
import BoardArticle from "./BoardArticle/BoardArticle";
import {useParams} from "react-router-dom";

const BoardArticleList = () => {

    const dummySelector = useSelector(selectDummy)
    const {boardName} = useParams<string>()

    return(
        <List sx={{width: '100%'}}>
            {
                dummySelector.boardArticle.map((item) => (
                    <BoardArticle boardName={boardName} title={item.title} author={item.author} like={item.like} visit={item.visit} comment={item.comment} />
                ))
            }
        </List>
    )
}
export default BoardArticleList