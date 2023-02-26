import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import MyProfile from "./MyProfile/MyProfile";
import MyHome from "./MyHome/MyHome";

const MyConcert = () => {

    const theme = useTheme();
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    return(
        <Stack sx={{height: '1000px'}}>
            <Stack direction={res750 ? "column" : "row"}>
                <MyProfile />
                {
                    res750 ?
                        null
                        :
                        <Divider orientation={"vertical"}/>
                }
                <MyHome />
            </Stack>
        </Stack>
    )
}

export default MyConcert