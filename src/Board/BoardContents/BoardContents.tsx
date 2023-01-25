import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import BoardSearch from "./BoardSearch/BoardSearch";
import BoardArticleList from "./BoardAritcleList/BoardArticleList";
import BoardUtil from "./BoardUtil/BoardUtil";

const BoardContents = () => {
    const theme = useTheme()
    const res800 = useMediaQuery('(max-width:800px)')
    const resMd = useMediaQuery(theme.breakpoints.down("md"))

    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{height: res800 ? 'auto' : '1000px', width: res800 ? '100%' : resMd ? 'calc(100% - 160px)' : 'calc(100% - 325px)'}}>
            <BoardSearch />
            <Divider orientation={"horizontal"} sx={{width: '100%', mt: -3}} />
            <BoardArticleList />
            <Divider orientation={"horizontal"} sx={{width: '100%'}} />
            <BoardUtil />
        </Stack>
    )
}

export default BoardContents