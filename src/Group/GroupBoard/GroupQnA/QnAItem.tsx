import {Card, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import {useSelector} from "react-redux";
import {selectDummy} from "../../../store/slices/dummy/dummy";
import {useState} from "react";

const QnAItem = (props : any) => {

    const {title, author, comment} = props
    const theme = useTheme();
    const res500 = useMediaQuery(theme.breakpoints.down("res500"))

    return(
        <Card sx={{width: '100%',justifyContent:"flex-start", alignItems:"center" ,display: 'flex',height: 50, alignContent: 'center', pr:1, cursor: 'pointer'}}>
            <Stack sx={{width: 30}} alignItems={"center"} alignContent={"center"} justifyContent={"center"}>
                <Typography sx={{color: '#00b0ff', fontSize: 20, fontWeight: 800, pl:1}}>Q.</Typography>
            </Stack>
            <Stack sx={{pl: res500? 0.5 : 2, width: res500 ? 'calc(100% - 120px)' : '70%', pr: res500 ? 0.5 : 2}}>
                <Typography sx={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{title}</Typography>
            </Stack>
            <Stack sx={{ml: 'auto',width: 30}}>
                <CommentIcon sx={{width: '100%'}}/>
            </Stack>
            <Stack sx={{width: 50}}>
                <Typography sx={{pl: 2,pr: 2, width: '100%'}}>{comment}</Typography>
            </Stack>
        </Card>
    )
}

export default QnAItem
