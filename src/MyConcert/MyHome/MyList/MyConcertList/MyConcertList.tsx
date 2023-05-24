import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia, Chip,
    Collapse,
    Divider,
    Stack,
    Typography
} from "@mui/material";
import {ReactElement, useState} from "react";
import {GiQueenCrown} from "react-icons/gi";
import {FaCrown} from "react-icons/fa";
import {CgCrown} from "react-icons/cg";
import {useNavigate} from "react-router-dom";

interface ColorMap {
    [key: string]: string;
}

const color : ColorMap = {
    "Vn 1st" : '#dd2c00',
    "Vn 2nd" : '#ff9100',
    "Va" : '#ffeb3b',
    "Vc" : '#795548',
    "Db" : '#3e2723',
    "Fl" : '#03a9f4',
    "Picc" : '#26a69a',
    "Ob" : '#dce775',
    "E.H." : '#9e9d24',
    "Cl" : '#7e57c2',
    "Fg" : '#4527a0',
    "Hn" : '#ab47bc',
    "Trp" : '#6a1b9a',
    "Trb" : '#e91e63',
    "Tub" : '#c2185b',
    "Timp" : '#78909c',
    "Perc" : '#263238',
    "Harp" : '#ffcdd2',
}

interface RoleMap {
    [key: string] : ReactElement | null
}

const RoleComponent  : RoleMap= {
    'MASTER' : <GiQueenCrown color={'black'}/>,
    'PRINCIPAL' : <FaCrown color={'black'} />,
    'ASSISTANT_PRINCIPAL' : <CgCrown color={'black'} />,
    'MEMBER': null
}

const MyConcertList = (props : any) => {

    const {item} = props
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false)

    return(
        <Stack direction={'row'} alignItems={'center'} sx={{height: '100%', cursor: 'pointer'}}>
            <Card sx={{width: '100%',height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Box
                    component="img"
                    sx={{ objectFit: 'contain', height: 'auto', width: '100%'}}
                    src={item.concertPoster}
                    alt="Live from space album cover"
                    onClick={() => setExpanded(!expanded)}
                />
                <Collapse in={expanded} orientation={"vertical"} timeout="auto" unmountOnExit>
                    {item.participatedList.map((item : any) => (
                        <Stack sx={{width: '100%', cursor: 'pointer', mb: 0.5}} alignItems={'center'} onClick={() => setExpanded(!expanded)}>

                            <Typography variant="subtitle2" sx={{mt:1, fontWeight: 800, fontSize: 13}}>
                                {item.shortComposerEng}
                            </Typography>

                            <Divider orientation={"horizontal"} sx={{width: '50%'}}/>

                            <Stack sx={{width: '70%', mt:0.5, mb:0.5}} direction={'row'} justifyContent={'space-around'} alignItems={'center'}>
                                <Chip variant={"outlined"} label={`${item.part} ${item.detailPart === '.' ? '' : item.detailPart}`} sx={{fontSize: 9, color : color[item.part], borderColor : color[item.part], maxHeight:20, minHeight:20, maxWidth: 60, minWidth:60}} size="small" />
                                {RoleComponent[item.role]}
                            </Stack>

                            <Divider orientation={"horizontal"} sx={{width: '50%'}}/>

                            <Stack direction={"column"} justifyContent={"flex-start"} alignContent={"center"} alignItems={"center"} sx={{width: '80%', mt:0.5}}>
                                <Typography variant="caption"sx={{fontWeight: 400, fontSize: 14}}>{item.nameEng}</Typography>
                            </Stack>
                            <Divider orientation={"horizontal"} sx={{width: '90%', mt: 0.5}}/>
                        </Stack>
                    ))}
                    <CardActions sx={{mt:-1.5,mb:-0.5, display: 'flex', justifyContent: 'center'}}>
                        <Button onClick={() => navigate(`/concert/${item.id}/review`)} size="small" sx={{fontSize: 11,maxHeight:25, minHeight:25, maxWidth: 60, minWidth:60}}>후기 쓰기</Button>
                    </CardActions>
                    {/*<Stack onClick={() => setExpanded(!expanded)} justifyContent={"flex-end"} sx={{marginLeft: 'auto', position: 'relative', bottom:10, right: 25, minWidth: 145, cursor: 'pointer'}}>*/}
                    {/*    <Stack justifyContent={"flex-end"}  direction={"row"}>*/}
                    {/*        <Typography variant={"caption"} sx={{color: 'grey'}}>{item.concertDate}</Typography>*/}
                    {/*    </Stack>*/}
                    {/*    <Stack justifyContent={"flex-end"} direction={"row"}>*/}
                    {/*        <Typography variant={"caption"} sx={{color: 'grey'}}>{item.regionDetail}</Typography>*/}
                    {/*    </Stack>*/}
                    {/*    <Stack sx={{}} justifyContent={"flex-end"} alignContent={"center"} alignItems={"center"} direction={"row"}>*/}
                    {/*        <Typography variant={"caption"} sx={{color: 'grey'}}>{item.participatedList[0]?.groupName}</Typography>*/}
                    {/*        <Divider orientation={"vertical"} sx={{height: '50%', mr:1, ml:1}} />*/}
                    {/*        <Typography variant={"caption"} sx={{color: 'grey'}}>{item.title}</Typography>*/}
                    {/*    </Stack>*/}
                    {/*</Stack>*/}
                </Collapse>
            </Card>
        </Stack>
    )
}

export default MyConcertList