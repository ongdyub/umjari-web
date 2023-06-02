import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import BoardMenu from "./BoardMenu/BoardMenu";
import BoardContents from "./BoardContents/BoardContents";
import BoardSide from "./BoardSide/BoardSide";

const Board = () => {
    const theme = useTheme();
    const resSize = useMediaQuery(theme.breakpoints.down("md"))
    const res800 = useMediaQuery('(max-width:800px)')

    return(
        <Stack sx={{height: '1000px'}}>
            <Stack justifyContent="flex-start" direction={res800 ? 'column' : 'row'}>
                <BoardMenu />
                <BoardContents />
                {
                    resSize ?
                        null
                        :
                        <Divider orientation={"vertical"}/>
                }
                <BoardSide />
            </Stack>
        </Stack>
    )
}

export default Board