import {Avatar, Divider, Stack, Typography} from "@mui/material";
import {commentForm} from "../../store/slices/dummy/dummy";


const Comment = (props : commentForm) => {

    const {author, author_img, comment} = props

    return(
        <Stack sx={{width: '100%'}}>
            <Stack sx={{width: '100%', mb: 2}} direction={"row"}>
                <Stack sx={{mr: 3}}>
                    <Avatar sx={{height:35, width: 35}}>A</Avatar>
                </Stack>
                <Stack justifyContent={"center"} alignContent={"center"} alignItems={"center"} textAlign={"center"}>
                    <Typography sx={{fontWeight: 900, fontSize: 15}}> 탈덴탈덴</Typography>
                </Stack>
            </Stack>
            <Stack>
                <Typography>
                    {comment}
                </Typography>
            </Stack>

            <Divider orientation={"horizontal"} sx={{width: '100%', mt:1, mb:1}}/>
        </Stack>
    )

}

export default Comment