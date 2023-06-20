import {
    Box,
    Button,
    Card,
    CardActions,
    Collapse,
    Divider,
    Stack,
    Typography
} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const GroupConcertList = (props : any) => {

    const {item} = props
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false)

    return(
        <Stack direction={'row'} alignItems={'center'} sx={{height: '100%', cursor: 'pointer'}}>
            <Card sx={{width: '100%',height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Box
                    component="img"
                    sx={{ objectFit: 'contain', height: 'auto', width: '100%'}}
                    src={item.posterImg}
                    alt="Live from space album cover"
                    onClick={() => setExpanded(!expanded)}
                />
                <Collapse sx={{mt:1}} in={expanded} orientation={"vertical"} timeout="auto" unmountOnExit>
                    {item.setList.map((item:any, idx:any) => (
                        <Stack key={idx} sx={{width: '100%', cursor: 'pointer', mb: 0.5}} alignItems={'center'} onClick={() => setExpanded(!expanded)}>

                            <Stack sx={{width: '80%', mt:1.5, mb:0.5}} direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                                <Typography variant="caption" sx={{fontWeight: 600, fontSize: 12, mr: 'auto'}}>
                                    {item.musicInfo.shortComposerEng}
                                </Typography>
                            </Stack>

                            <Divider orientation={"horizontal"} sx={{width: '80%'}}/>

                            <Stack direction={"column"} justifyContent={"flex-start"} alignContent={"center"} alignItems={"center"} sx={{width: '80%', mt:0.5}}>
                                <Typography  variant="overline"  sx={{fontSize: 14, color: 'grey'}}>{item.musicInfo.shortNameEng}</Typography>
                            </Stack>
                            <Divider orientation={"horizontal"} sx={{width: '90%', mt: 0.5}}/>
                        </Stack>
                    ))}
                    <CardActions sx={{mt:-1.5,mb:-0.5, display: 'flex', justifyContent: 'center'}}>
                        <Button onClick={() => navigate(`/concert/${item.id}/review`)} size="small" sx={{fontSize: 11,maxHeight:25, minHeight:25, maxWidth: 60, minWidth:60}}>후기 쓰기</Button>
                    </CardActions>
                </Collapse>
            </Card>
        </Stack>
    )
}

export default GroupConcertList
