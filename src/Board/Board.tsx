import {Divider, Stack, useMediaQuery} from "@mui/material";
import BoardMenu from "./BoardMenu/BoardMenu";
import BoardContents from "./BoardContents/BoardContents";
import BoardSide from "./BoardSide/BoardSide";

const Board = () => {
    const res800 = useMediaQuery('(max-width:800px)')

    return(
        <Stack sx={{height: '1000px'}}>
            <Stack justifyContent="flex-start" direction={res800 ? 'column' : 'row'}>
                <BoardMenu />
                {/*boardcontents 는 menu 따라서 달라짐*/}
                <BoardContents />
                <Divider orientation={"vertical"}/>
                <BoardSide />
            </Stack>
        </Stack>
    )
}

export default Board