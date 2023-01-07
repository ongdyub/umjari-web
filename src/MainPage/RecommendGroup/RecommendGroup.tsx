import {Stack, useMediaQuery, useTheme} from "@mui/material";

const RecommendGroup = () => {

    const theme = useTheme();

    return(
        <Stack direction="column" sx={{bgcolor:'pink', width: useMediaQuery(theme.breakpoints.down("md")) ? "100%" : "40%"}}>
            <div>
                Recoomend
            </div>
            <div>
                Recoomend
            </div>
            <div>
                Recoomend
            </div>
            <div>
                Recoomend
            </div>
            <div>
                Recoomend
            </div>
        </Stack>
    )
}

export default RecommendGroup