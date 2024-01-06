import {ListItem, Typography} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MouseIcon from '@mui/icons-material/Mouse';
import './MiniArticle.scss'
import {useNavigate} from "react-router-dom";

const MiniArticle = (props : any) => {

    const {item} = props

    const navigate = useNavigate()

    const onClickBoard = () => {
        navigate(`/community/${item.board}`)
    }

    const onClickTitle = () => {
        navigate(`/community/${item.board}/${item.id}`)
    }

    const onClickAuthor = () => {
        if(item.isAnonymous){
            window.alert("익명글입니다.")
        }
        else{
            navigate(`/myconcert/${item.authorInfo.profileName}/list`)
        }
    }

    return(
        <ListItem className={"mini-article-responsive-box"} sx={{width: '100%'}} divider >
            <Typography onClick={onClickBoard} display="block" sx={{cursor: 'pointer',minWidth: 70, maxWidth: 70,textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12, fontWeight: 'bold', color: '#868e96', textAlign: 'center'}}>
                {item.board}
            </Typography>
            <Typography onClick={onClickTitle} display="block" variant={"subtitle2"} sx={{cursor : 'pointer',pl: 2, pr:2, minWidth: '50%', maxWidth: '50%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 15, fontWeight: 600, color: '#333'}} >
                {item.title}
            </Typography>
            <Typography className={"mini-article-responsive"} sx={{pr: 1,minWidth: '8%', maxWidth: '8%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 13}}>
                <ThumbUpAltIcon sx={{color: 'red',pt: 0.6,pr: 0.5, width: 15, height: 15}} />{item.likeCount}
            </Typography>
            <Typography onClick={onClickAuthor} sx={{cursor : 'pointer',minWidth: '15%', maxWidth: '15%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                {item.isAnonymous ? item.nickname : item.authorInfo.profileName}
            </Typography>
            <Typography sx={{pl: 1, minWidth: '10%', maxWidth: '10%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                <CommentIcon sx={{pt: 0.2,pr: 0.2, width: 10, height: 10}} /> {item.replyCount}
            </Typography>
            <Typography className={"mini-article-responsive"} sx={{pl: 1, minWidth: '8%', maxWidth: '8%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                {/*<MouseIcon sx={{color: 'blue',pt: 0.6,pr: 0.5, width: 15, height: 15}}/>{visit}*/}
                <MouseIcon sx={{color: 'blue',pt: 0.6,pr: 0.5, width: 15, height: 15}}/>-
            </Typography>
        </ListItem>
    )
}

export default MiniArticle