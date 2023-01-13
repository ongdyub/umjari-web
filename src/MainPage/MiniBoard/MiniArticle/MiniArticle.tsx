import {articleForm} from "../../../store/slices/dummy/dummy";
import {ListItem, Typography} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MouseIcon from '@mui/icons-material/Mouse';
import './MiniArticle.scss'

const MiniArticle = (props : articleForm) => {

    const {boardName, author, like, comment, visit, title} = props

    return(
        <ListItem className={"mini-article-responsive-box"} sx={{width: '100%'}} divider >
            <Typography display="block" sx={{minWidth: 70, maxWidth: 70,textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12, fontWeight: 'bold', color: '#868e96', textAlign: 'center'}}>
                {boardName}
            </Typography>
            <Typography display="block" variant={"subtitle2"} sx={{pl: 2, pr:2, minWidth: '50%', maxWidth: '50%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 15, fontWeight: 600, color: '#333'}} >
                {title}
            </Typography>
            <Typography className={"mini-article-responsive"} sx={{pr: 1,minWidth: '8%', maxWidth: '8%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 13}}>
                <CommentIcon sx={{pt: 0.2,pr: 0.2, width: 10, height: 10}} /> {comment}
            </Typography>
            <Typography sx={{minWidth: '15%', maxWidth: '15%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                {author}
            </Typography>
            <Typography sx={{pl: 1, minWidth: '10%', maxWidth: '10%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                <ThumbUpAltIcon sx={{color: 'red',pt: 0.6,pr: 0.5, width: 15, height: 15}} />{like}
            </Typography>
            <Typography className={"mini-article-responsive"} sx={{pl: 1, minWidth: '8%', maxWidth: '8%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                <MouseIcon sx={{color: 'blue',pt: 0.6,pr: 0.5, width: 15, height: 15}}/>{visit}
            </Typography>
        </ListItem>
    )
}

export default MiniArticle