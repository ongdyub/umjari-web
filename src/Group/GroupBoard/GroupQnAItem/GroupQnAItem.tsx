import {Avatar, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MouseIcon from "@mui/icons-material/Mouse";

const GroupQnAItem = () => {

    const theme = useTheme();
    const { id, qid } = useParams();
    const navigate = useNavigate()
    const res500 = useMediaQuery(theme.breakpoints.down("res500"))
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    return(
        <Stack sx={{mb: 5}}>
            <Divider sx={{width: res700 ? '100%' : '90%', mt: -1}}/>
            <Stack alignItems="center" sx={{width:'100%'}} flexDirection={'column'}>
                <Stack alignItems="center" sx={{width: '80%', mt: 2}}>
                    <Typography gutterBottom sx={{fontWeight: 600, fontSize: res700 ? 14 : 20}}>
                        다른 오케보고 지렁이라니 불 - 편하네요 다른 오케보고 지렁이라니 불 - 편하네요 다른 오케보고 지렁이라니 불 - 편하네요
                        {/*title 자리*/}
                    </Typography>
                </Stack>
                <Divider orientation={"horizontal"} sx={{width: '90%', mt:1}}/>
                <Stack alignItems="center" sx={{width: '90%', mt:1, mb:1}} flexDirection={"row"}>
                    <Stack>
                        <Avatar sx={{width: 30, height: 30}}>A</Avatar>
                    </Stack>
                    <Stack alignContent={"center"} alignItems={"center"} sx={{ml: 2}}>
                        <Typography sx={{fontWeight: 900, fontSize: res700 ? 13 : 15}}>포고듐덴 포고듐덴 포고듐덴</Typography>
                    </Stack>
                    <Stack alignItems="center" flexDirection={"row"} sx={{ml: 'auto'}}>
                        <Stack alignItems="center" flexDirection={"column"}>
                            <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>2022/01/01 17:30</Typography>
                            <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>2022/01/03 21:11</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Divider orientation={"horizontal"} sx={{width: '80%'}}/>
            </Stack>
        </Stack>
    )
}

export default GroupQnAItem