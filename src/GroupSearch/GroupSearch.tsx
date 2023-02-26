import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import BoardSide from "../Board/BoardSide/BoardSide";
import GroupSearchMenu from "./GroupSearchMenu/GroupSearchMenu";
import GroupSearchContents from "./GroupSearchContents/GroupSearchContents";
import GroupSide from "./GroupSide/GroupSide";

const GroupSearch = () => {

    const theme = useTheme();
    const resSize = useMediaQuery(theme.breakpoints.down("md"))
    const res800 = useMediaQuery('(max-width:800px)')

    return(
        <Stack sx={{height: '1000px'}}>
            <Stack justifyContent="flex-start" direction={res800 ? 'column' : 'row'}>
                <GroupSearchMenu />
                {
                    res800 ?
                        null
                        :
                        <Divider orientation={"vertical"}/>
                }
                <GroupSearchContents />
                {
                    resSize ?
                        null
                        :
                        <Divider orientation={"vertical"}/>
                }
                <GroupSide />
            </Stack>
        </Stack>
    )
}

export default GroupSearch