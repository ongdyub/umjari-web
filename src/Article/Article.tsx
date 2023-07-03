import BoardMenu from "../Board/BoardMenu/BoardMenu";
import BoardSide from "../Board/BoardSide/BoardSide";
import {Divider, Stack, useMediaQuery} from "@mui/material";
import ArticleContents from "./ArticleContents/ArticleContents";
import Banner from "../Banner/Banner";

const Article = () => {

    const res800 = useMediaQuery('(max-width:800px)')

    return(
        <Stack sx={{height: res800 ? 'auto' : '1000px'}}>
            <Stack justifyContent="flex-start" direction={res800 ? 'column' : 'row'}>
                <BoardMenu />
                <ArticleContents />
                <Divider orientation={"vertical"}/>
                <BoardSide />
                {
                    res800 ?
                        <Banner />
                        :
                        null
                }
            </Stack>
        </Stack>
    )
}

export default Article