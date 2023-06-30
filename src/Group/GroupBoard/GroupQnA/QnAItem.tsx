import {Card, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import {useSelector} from "react-redux";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const QnAItem = (props : any) => {

    const {item} = props
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate()
    const res500 = useMediaQuery(theme.breakpoints.down("res500"))
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    const onClickQnAItem = () => {
        navigate(`/group/${id}/qna/${item.id}`)
    }

    return(
        <Card onClick={onClickQnAItem} sx={{width: '100%',justifyContent:"flex-start", alignItems:"center" ,display: 'flex',height: 40, alignContent: 'center',cursor: 'pointer'}}>
            <Stack sx={{width: 20}} alignItems={"center"} alignContent={"center"} justifyContent={"center"}>
                <Typography sx={{color: '#00b0ff', fontSize: 15, fontWeight: 800, pl:1}}>Q.</Typography>
            </Stack>
            <Stack sx={{pl: res500? 1 : 2, width: res500 ? '45%' : '50%', pr: res500 ? 0.5 : 2}}>
                <Typography sx={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: 12}}>{item.title}</Typography>
            </Stack>
            <Stack sx={{ml: 'auto', width: res500 ? '20%' : '20%', mr: res700 ? 1 : -1}}>
                <Typography sx={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: 9, fontWeight: 200}}>{item.isAnonymous ? item.nickname : item.authorInfo.profileName}</Typography>
            </Stack>
            <Stack sx={{ml: 'auto'}}>
                <CommentIcon sx={{maxWidth: res700 ? 15 : 20, maxHeight: res700 ? 15 : 20, minWidth: res700 ? 15 : 20, minHeight: res700 ? 15 : 20}}/>
            </Stack>
            <Stack sx={{width: 'auto'}}>
                <Typography sx={{pl : 1,pr: 2, width: '100%', fontSize: res700 ? 12 : 14}}>{item.replyCount}</Typography>
            </Stack>
        </Card>
    )
}

export default QnAItem
