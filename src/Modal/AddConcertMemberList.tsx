import {Stack, Chip} from "@mui/material";
import * as React from "react";
import {color} from "../MyConcert/MyHome/SelfIntro/SelfIntro";
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from "@mui/material/IconButton";


const AddConcertMemberList = (props : any) => {

    const {item, handleDeleteUserList, idx} = props
    const roleList : any = {'MASTER' : '악장', 'PRINCIPAL' : '수석', 'ASSISTANT_PRINCIPAL' : '부수석', 'MEMBER': '단원'}

    const deleteUserList = () => {
        handleDeleteUserList(idx)
    }


    return (
        <Stack alignItems={'center'} sx={{width: '100%', borderBottom: '0.2px solid grey', mt:1, pb:1}}>
            <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} sx={{width: '100%'}}>
                <Chip size={"small"} label={item.userId} sx={{mr:1, mt:0.5, mb:0.5}} />
                <Chip size={"small"} label={roleList[item.role]} sx={{mr:1,mt:0.5, mb:0.5}} />
                <Chip variant={"outlined"} label={`${item.part} ${item.detailPart === '.' ? '' : item.detailPart}`} sx={{mt:0.5, mb:0.5, color : color[item.part], borderColor : color[item.part]}} size="small" />
                <IconButton aria-label="delete" size="small" onClick={deleteUserList}>
                    <RemoveIcon fontSize="inherit" sx={{color: 'red'}} />
                </IconButton>
            </Stack>
        </Stack>
    );
}

export default AddConcertMemberList