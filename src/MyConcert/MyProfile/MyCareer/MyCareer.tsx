import {Chip, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";


const MyCareer = (props : any) => {

    const {idx, groupId, groupName, joinedAt, leavedAt} = props

    const theme = useTheme();
    const navigate = useNavigate()

    const res500 = useMediaQuery(theme.breakpoints.down("res500"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const onClickGoGroup = () => {
        navigate(`/group/${groupId}/list`)
    }

    return(
        <Stack key={idx} justifyContent={"center"} sx={{width: res750 ? 'auto' : '100%', mb: res750 ? 1 : 3, flexWrap: res750 ? 'wrap' : '', mr: res750 ? 2 : 0, ml: res750 ? 2 : 0}} direction={"column"}>
            {
                res750 ?
                    <Chip onClick={onClickGoGroup} label={groupName} sx={{fontSize : res500 ? 10 : 13, width: '100%', height: res500 ? 20 : 30, cursor: 'pointer'}} />
                    :
                    <Typography onClick={onClickGoGroup} sx={{fontWeight: 900, fontSize: res500 ? 8 : 17, color: '#111111', cursor: 'pointer'}}>{groupName}</Typography>
            }
            {
                res750 ?
                    <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"} sx={{width: 'auto', mt:0.5}}>
                        <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{joinedAt === null ? '' : joinedAt.slice(0, 7)}</Typography>
                        {
                            joinedAt === null && leavedAt === null ?
                                <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12, ml:0.5, mr: 0.5}}>-</Typography>
                                :
                                <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12, ml:0.5, mr: 0.5}}>~</Typography>
                        }
                        <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{leavedAt === null ? '' : leavedAt.slice(0, 7)}</Typography>
                    </Stack>
                    :
                    <Stack direction={"row"} justifyContent={"flex-start"} sx={{width: '100%', mt:1}}>
                        <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{joinedAt === null ? '' : joinedAt.slice(0, 7)}</Typography>
                        {
                            joinedAt === null && leavedAt === null ?
                                <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12, ml:0.5, mr: 0.5}}>-</Typography>
                                :
                                <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12, ml:0.5, mr: 0.5}}>~</Typography>
                        }
                        <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{leavedAt === null ? '' : leavedAt.slice(0, 7)}</Typography>
                    </Stack>
            }
        </Stack>
    )
}

export default MyCareer