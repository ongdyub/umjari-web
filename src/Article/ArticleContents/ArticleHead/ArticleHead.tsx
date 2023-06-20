import {Avatar, Divider, Stack, Typography} from "@mui/material";
import MouseIcon from "@mui/icons-material/Mouse";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {useSelector} from "react-redux";
import {selectArticle} from "../../../store/slices/article/article";
import {useNavigate} from "react-router-dom";

const ArticleHead = () => {

    const articleState = useSelector(selectArticle)
    const dayjs = require('dayjs');
    const navigate = useNavigate()

    const onClickAuthor = () => {
        if(articleState.anonymous){
            window.alert("익명글입니다.")
        }
        else{
            navigate(`/myconcert/${articleState.authorInfo.profileName}/selfintro`)
        }
    }

    return(
        <Stack alignItems="center" sx={{width:'100%'}} flexDirection={'column'}>
            <Stack alignItems="center" sx={{width: '80%', mt: 2.5}}>
                <Typography gutterBottom sx={{fontWeight: 600, fontSize: 20}}>
                    {articleState.title}
                </Typography>
            </Stack>
            <Divider orientation={"horizontal"} sx={{width: '80%', mt:1}}/>
            <Stack alignItems="center" sx={{width: '80%', mt:1, mb:1}} flexDirection={"row"}>
                <Stack>
                    {
                        articleState.anonymous ?
                            <Avatar>A</Avatar>
                            :
                            <Avatar alt={`${articleState.authorInfo.profileName}`} src={`${articleState.authorInfo.profileImage}`}/>
                    }
                </Stack>
                <Stack alignContent={"center"} alignItems={"center"} sx={{ml: 2}}>
                    <Typography onClick={onClickAuthor} sx={{cursor: 'pointer',fontWeight: 900, fontSize: 15}}>{articleState.anonymous ? articleState.nickname : articleState.authorInfo.profileName}</Typography>
                </Stack>
                <Stack alignItems="center" flexDirection={"row"} sx={{ml: 'auto'}}>
                    <Stack alignItems="center" flexDirection={"column"} sx={{mr: 1}}>
                        <Stack alignItems="center" flexDirection={"row"} justifyContent={"space-between"} sx={{width: 55}}>
                            <ThumbUpAltIcon sx={{color: 'red', width:15, height: 15}} />
                            <Typography variant="caption" sx={{color: 'black'}}>{articleState.likeCount}</Typography>
                        </Stack>
                        <Stack alignItems="center" flexDirection={"row"} justifyContent={"space-between"} sx={{width: 55}}>
                            <MouseIcon sx={{color: 'blue', width:15, height: 15}}/>
                            <Typography variant="caption" sx={{color: 'black'}}>-</Typography>
                        </Stack>
                    </Stack>
                    <Stack alignItems="center" flexDirection={"column"}>
                        <Typography variant="caption" sx={{color: 'grey'}}>{dayjs(articleState.createAt).format('MM/DD HH:mm')}</Typography>
                        <Typography variant="caption" sx={{color: 'grey'}}>{dayjs(articleState.updatedAt).format('MM/DD HH:mm')}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Divider orientation={"horizontal"} sx={{width: '80%'}}/>
        </Stack>
    )
}

export default ArticleHead
