import {Avatar, Divider, Stack, Typography} from "@mui/material";
import MouseIcon from "@mui/icons-material/Mouse";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const ArticleHead = (props : any) => {
    const {title} = props
    return(
        <Stack alignItems="center" sx={{width:'100%'}} flexDirection={'column'}>
            <Stack alignItems="center" sx={{width: '80%', mt: 5}}>
                <Typography gutterBottom sx={{fontWeight: 600, fontSize: 20}}>
                    다른 오케보고 지렁이라니 불 - 편하네요
                    {/*title 자리*/}
                </Typography>
            </Stack>
            <Divider orientation={"horizontal"} sx={{width: '80%', mt:1}}/>
            <Stack alignItems="center" sx={{width: '80%', mt:1, mb:1}} flexDirection={"row"}>
                <Stack>
                    <Avatar>A</Avatar>
                </Stack>
                <Stack alignContent={"center"} alignItems={"center"} sx={{ml: 2}}>
                    <Typography sx={{fontWeight: 900, fontSize: 15}}> 탈덴탈덴</Typography>
                </Stack>
                <Stack alignItems="center" flexDirection={"row"} sx={{ml: 'auto'}}>
                    <Stack alignItems="center" flexDirection={"column"} sx={{mr: 1}}>
                        <Stack alignItems="center" flexDirection={"row"} justifyContent={"space-between"} sx={{width: 55}}>
                            <ThumbUpAltIcon sx={{color: 'red', width:15, height: 15}} />
                            <Typography variant="caption" sx={{color: 'black'}}>32</Typography>
                        </Stack>
                        <Stack alignItems="center" flexDirection={"row"} justifyContent={"space-between"} sx={{width: 55}}>
                            <MouseIcon sx={{color: 'blue', width:15, height: 15}}/>
                            <Typography variant="caption" sx={{color: 'black'}}>4123</Typography>
                        </Stack>
                    </Stack>
                    <Stack alignItems="center" flexDirection={"column"}>
                        <Typography variant="caption" sx={{color: 'grey'}}>2022/01/01 17:30</Typography>
                        <Typography variant="caption" sx={{color: 'grey'}}>2022/01/03 21:11</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Divider orientation={"horizontal"} sx={{width: '80%'}}/>
        </Stack>
    )
}

export default ArticleHead
