import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import GroupInfo from "./GroupInfo/GroupInfo";
import GroupBoard from "./GroupBoard/GroupBoard";

const Group = () => {

    const theme = useTheme();
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    return(
        <Stack sx={{height: 1000}}>
            <Stack>
                <GroupInfo />
                <Divider orientation={"horizontal"} sx={{mt:1, mb:1, width: '100%'}}/>
                <GroupBoard />
            </Stack>
        </Stack>
    )
}

export default Group
