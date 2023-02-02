import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import MyProfile from "./MyProfile/MyProfile";
import MyHome from "./MyHome/MyHome";

const MyConcert = () => {

    const theme = useTheme();
    const resSize = useMediaQuery(theme.breakpoints.down("md"))
    const res800 = useMediaQuery(theme.breakpoints.down("res800"))

    return(
        <Stack sx={{height: '1000px'}}>
            <Stack direction={"row"}>
                <MyProfile />
                <Divider orientation={"vertical"}/>
                <MyHome />
            </Stack>
        </Stack>
    )
}

export default MyConcert