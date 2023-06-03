import {Stack, useMediaQuery, useTheme} from "@mui/material";
import ArticleHead from "./ArticleHead/ArticleHead";
import ArticleText from "./ArticleText/ArticleText";
import ArticleComments from "./ArticleComments/ArticleComments";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {articleGet, articleStateActions} from "../../store/slices/article/article";
import {selectUser} from "../../store/slices/user/user";

const ArticleContents = () => {
    const theme = useTheme()
    const dispatch = useDispatch<AppDispatch>()
    const {boardName, id} = useParams()
    const res800 = useMediaQuery('(max-width:800px)')
    const resMd = useMediaQuery(theme.breakpoints.down("md"))

    const userState = useSelector(selectUser)

    useEffect(() => {
        dispatch(articleGet({boardType : boardName, id : id, token : userState.accessToken}))
        return () => {
            dispatch(articleStateActions.resetArticle())
        }
    },[dispatch, boardName, id, userState.accessToken])

    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{height: res800 ? 'auto' : '1000px', width: res800 ? '100%' : resMd ? 'calc(100% - 160px)' : 'calc(100% - 325px)'}}>
            <ArticleHead />
            <ArticleText />
            <ArticleComments />
        </Stack>
    )
}

export default ArticleContents
