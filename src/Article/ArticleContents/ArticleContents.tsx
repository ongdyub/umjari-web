import {Stack, useMediaQuery, useTheme} from "@mui/material";
import ArticleHead from "./ArticleHead/ArticleHead";
import ArticleText from "./ArticleText/ArticleText";
import ArticleComments from "./ArticleComments/ArticleComments";

const ArticleContents = (props: any) => {
    const {title, contents} = props
    const theme = useTheme()
    const res800 = useMediaQuery('(max-width:800px)')
    const resMd = useMediaQuery(theme.breakpoints.down("md"))
    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{height: res800 ? 'auto' : '1000px', width: res800 ? '100%' : resMd ? 'calc(100% - 160px)' : 'calc(100% - 325px)'}}>
            <ArticleHead title={title} />
            <ArticleText />
            <ArticleComments />
        </Stack>
    )
}

export default ArticleContents
