import {ListItem, Typography} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import MouseIcon from "@mui/icons-material/Mouse";
import {articleForm} from "../../../../store/slices/dummy/dummy";
import './BoardArticle.scss'

const BoardArticle = (props : articleForm) => {
    const {boardName, author, like, comment, visit, title} = props

    return(
        <ListItem className={"board-article-responsive-box"} sx={{width: '100%'}} divider >
            <Typography display="block" sx={{minWidth: 70, maxWidth: 70,textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12, fontWeight: 'bold', color: '#868e96', textAlign: 'center'}}>
                {boardName}
            </Typography>
            <Typography display="block" variant={"subtitle2"} sx={{pl: 2, pr:2, minWidth: '50%', maxWidth: '50%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 15, fontWeight: 600, color: '#333'}} >
                {title}
            </Typography>
            <Typography sx={{pr: 1,minWidth: '10%', maxWidth: '10%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                <CommentIcon sx={{color: 'black', pt: 0.2,pr: 0.2, width: 12, height: 12}} /> {comment}
            </Typography>
            <Typography sx={{minWidth: '15%', maxWidth: '15%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                {author}
            </Typography>
            <Typography className={"board-article-responsive-like"} sx={{pl: 1, minWidth: '9%', maxWidth: '9%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                <ThumbUpAltIcon sx={{color: 'red',pt: 0.6,pr: 0.5, width: 13, height: 13}} />{like}
            </Typography>
            <Typography className={"board-article-responsive"} sx={{pl: 1, minWidth: '7%', maxWidth: '7%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12}}>
                <MouseIcon sx={{color: 'blue',pt: 0.6,pr: 0.5, width: 11, height: 11}}/>{visit}
            </Typography>
        </ListItem>
    )
}

export default BoardArticle