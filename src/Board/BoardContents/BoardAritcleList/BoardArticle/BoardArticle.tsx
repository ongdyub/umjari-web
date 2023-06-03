import {ListItem, Stack, Typography} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MouseIcon from "@mui/icons-material/Mouse";
import './BoardArticle.scss'
import {useNavigate} from "react-router-dom";

const BoardArticle = (props : any) => {
    const {item} = props
    const navigate = useNavigate()

    const onClickBoard = () => {
        navigate(`/community/${item.boardName}`)
    }

    const onClickTitle = () => {
        navigate(`/community/${item.boardName}/${item.id}`)
    }

    const onClickAuthor = () => {
        if(item.isAnonymous){
            window.alert("익명글입니다.")
        }
        else{
            navigate(`/myconcert/${item.authorInfo.profileName}/selfintro`)
        }
    }

    return(
        <ListItem className={"board-article-responsive-box"} sx={{width: '100%', justifyContent: 'space-between'}} divider >
            <Typography onClick={onClickBoard} display="block" sx={{cursor: 'pointer',minWidth: 65, maxWidth: 65,textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 10, fontWeight: 'bold', color: '#868e96', textAlign: 'center'}}>
                {item.board}
            </Typography>
            <Typography onClick={onClickTitle} display="block" variant={"subtitle2"} sx={{cursor: 'pointer', pl: 2, pr:2, minWidth: '45%', maxWidth: '45%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 13, fontWeight: 600, color: '#333'}} >
                {item.title}
            </Typography>
            <Stack sx={{minWidth: '17%', maxWidth: '17%'}} direction={'row'} justifyContent={'center'}>
                <Typography onClick={onClickAuthor} sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12, cursor: 'pointer'}}>
                    {item.isAnonymous ? item.nickname : item.authorInfo.profileName}
                </Typography>
            </Stack>
            <Typography sx={{pr: 1,minWidth: '10%', maxWidth: '10%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                <CommentIcon sx={{color: 'black', pt: 0.2,pr: 0.2, width: 12, height: 12}} /> {item.replyCount}
            </Typography>
            <Typography className={"board-article-responsive-like"} sx={{minWidth: '9%', maxWidth: '9%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                <ThumbUpAltIcon sx={{color: 'red',pt: 0.6,pr: 0.5, width: 13, height: 13}} />{0}
            </Typography>
            {/*<Typography className={"board-article-responsive"} sx={{minWidth: '8%', maxWidth: '8%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>*/}
            {/*    <MouseIcon sx={{color: 'blue',pt: 0.6,pr: 0.5, width: 11, height: 11}}/>-*/}
            {/*</Typography>*/}
        </ListItem>
    )
}

export default BoardArticle