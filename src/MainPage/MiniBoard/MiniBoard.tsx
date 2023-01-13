import {Button, Divider, List, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useSelector} from "react-redux";
import {selectDummy} from "../../store/slices/dummy/dummy";
import MiniArticle from "./MiniArticle/MiniArticle";

const MiniBoard = () => {

    const theme = useTheme();
    const dummySelector = useSelector(selectDummy)

    return(
        <Stack direction="column" justifyContent="flex-start" alignItems="center" sx={{ width: useMediaQuery(theme.breakpoints.down("md")) ? "96%" : "54%"}} divider={<Divider orientation="horizontal"/>}>
            <Typography sx={{fontWeight: 300, fontSize: 22}} mt={2} >전체 게시글</Typography>
            <Divider orientation={"horizontal"} />
            <List sx={{width: '98%'}}>
                {
                    dummySelector.article.map((item) => (
                        <MiniArticle boardName={item.boardName} title={item.title} author={item.author} like={item.like} visit={item.visit} comment={item.comment} />
                    ))
                }
            </List>
            <Button>더보기</Button>
        </Stack>
    )
}

export default MiniBoard