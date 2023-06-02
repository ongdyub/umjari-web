import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import BoardSearch from "./BoardSearch/BoardSearch";
import BoardArticleList from "./BoardAritcleList/BoardArticleList";
import BoardUtil from "./BoardUtil/BoardUtil";
import {useParams} from "react-router-dom";

const BoardContents = () => {
    const theme = useTheme()
    const {boardName} = useParams()
    const res800 = useMediaQuery('(max-width:800px)')
    const resMd = useMediaQuery(theme.breakpoints.down("md"))

    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{height: res800 ? 'auto' : '1000px', width: res800 ? '100%' : resMd ? 'calc(100% - 164px)' : 'calc(100% - 325px)'}}>
            <BoardSearch />
            <Divider orientation={"horizontal"} sx={{width: '100%', mt: res800 ? -3 : 0}} />
            <BoardArticleList boardName={boardName} />
            <Divider orientation={"horizontal"} sx={{width: '100%'}} />
            <BoardUtil />
        </Stack>
    )
}

export default BoardContents