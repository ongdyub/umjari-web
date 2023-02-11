import {Avatar, Divider, Stack, Typography} from "@mui/material";
import {commentForm} from "../../store/slices/dummy/dummy";


const GarlleyComment = (props : commentForm) => {

    const {author, author_img, comment} = props

    return(
        <Stack sx={{width: '100%',}}>
            <Stack sx={{width: '100%', mt:0.5,mb: 1}} direction={"row"}>
                <Stack sx={{mr: 0.5}}>
                    <Avatar sx={{height:15, width: 15}}>A</Avatar>
                </Stack>
                <Stack justifyContent={"center"} alignContent={"center"} alignItems={"center"} textAlign={"center"}>
                    <Typography sx={{fontWeight: 900, fontSize: 10}}>{author}</Typography>
                </Stack>
            </Stack>
            <Stack sx={{mb:1}}>
                <Typography sx={{fontSize: 12}}>
                    {comment}
                </Typography>
            </Stack>
            <Divider orientation={"horizontal"} sx={{width: '100%',mb:1}}/>
        </Stack>
    )

}

export default GarlleyComment