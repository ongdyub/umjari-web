import BoardMenu from "../Board/BoardMenu/BoardMenu";
import BoardSide from "../Board/BoardSide/BoardSide";
import {Divider, Stack, useMediaQuery} from "@mui/material";
import BoardContents from "../Board/BoardContents/BoardContents";
import ArticleContents from "./ArticleContents/ArticleContents";

const Article = (props : any) => {

    const res800 = useMediaQuery('(max-width:800px)')

    return(
        <Stack sx={{height: '1000px'}}>
            <Stack justifyContent="flex-start" direction={res800 ? 'column' : 'row'}>
                <BoardMenu />
                {/*boardcontents 는 menu 따라서 달라짐*/}
                <ArticleContents />
                <Divider orientation={"vertical"}/>
                <BoardSide />
            </Stack>
        </Stack>
    )
}

export default Article