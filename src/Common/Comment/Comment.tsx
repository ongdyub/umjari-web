import {Avatar, Divider, Stack, Typography} from "@mui/material";
import {commentForm} from "../../store/slices/dummy/dummy";


const Comment = (props : commentForm) => {

    const {author, author_img, comment} = props

    return(
        <Stack sx={{width: '100%',}}>
            <Stack sx={{width: '100%', mt:1,mb: 2}} direction={"row"}>
                <Stack sx={{mr: 3}}>
                    <Avatar sx={{height:32, width: 32}}>A</Avatar>
                </Stack>
                <Stack justifyContent={"center"} alignContent={"center"} alignItems={"center"} textAlign={"center"}>
                    <Typography sx={{fontWeight: 900, fontSize: 15}}>{author}</Typography>
                </Stack>
            </Stack>
            <Stack sx={{mb:1}}>
                <Typography>
                    {comment}
                </Typography>
            </Stack>
            <Divider orientation={"horizontal"} sx={{width: '100%', mt:1, mb:1}}/>
        </Stack>
    )

}

export default Comment