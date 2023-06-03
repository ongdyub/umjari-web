import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import BoardSearch from "./BoardSearch/BoardSearch";
import BoardArticleList from "./BoardAritcleList/BoardArticleList";

const BoardContents = () => {
    const theme = useTheme()
    const res800 = useMediaQuery('(max-width:800px)')
    const resMd = useMediaQuery(theme.breakpoints.down("md"))

    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{height: res800 ? 'auto' : '1000px', width: res800 ? '100%' : resMd ? 'calc(100% - 164px)' : 'calc(100% - 325px)'}}>
            <BoardSearch />
            <Divider orientation={"horizontal"} sx={{width: '100%', mt: 0}} />
            <BoardArticleList />
        </Stack>
    )
}

export default BoardContents