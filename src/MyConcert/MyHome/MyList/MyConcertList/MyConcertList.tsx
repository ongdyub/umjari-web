import {Button, Card, CardActions, CardContent, CardMedia, Collapse, Divider, Stack, Typography} from "@mui/material";
import {useState} from "react";

const MyConcertList = (props : any) => {

    const {item} = props
    const [expanded, setExpanded] = useState(false)

    return(
        <Card sx={{mb: 5, mt:3, width: '40%'}}>
            <Stack sx={{cursor: 'pointer'}} onClick={() => setExpanded(!expanded)}>
                <CardMedia
                    component="img"
                    sx={{ objectFit: 'fill'}}
                    image={item.img}
                    alt="Live from space album cover"
                />
            </Stack>
            <Collapse in={expanded} orientation={"vertical"} timeout="auto" unmountOnExit>
                <CardContent sx={{flexDirection: 'column', width: '100%', pt:3, pl: 3}}>
                    {item.program.map((item : any) => (
                        <Stack sx={{width: '100%', cursor: 'pointer', mb: 3}} onClick={() => setExpanded(!expanded)}>
                            <Stack direction={"row"} alignContent={"center"} alignItems={"center"}>
                                <Typography variant="caption"  display="block" sx={{fontWeight: 600, fontSize: 12}}>
                                    {item.composer}
                                </Typography>
                                <Divider orientation={"vertical"} sx={{ml:2, mr: 2, height: 20}} />
                                <Typography variant="caption"  display="block" sx={{fontSize: 12, fontWeight: 300}}>
                                    [ {item.part} ]
                                </Typography>
                                <Divider orientation={"vertical"} sx={{ml:2, mr: 2, height: '50%'}} />
                            </Stack>
                            <Stack direction={"row"} alignContent={"center"} alignItems={"center"} sx={{width: '100%'}}>
                                <Typography variant="overline"  display="block" sx={{fontSize: 15, color: 'grey'}}>
                                    {item.song}
                                </Typography>
                            </Stack>
                            <Divider sx={{mt:1, mb:1}} />
                        </Stack>
                    ))}
                    <Stack>
                        <CardActions>
                            <Button size="small" sx={{ml: -2}}>후기 쓰러가기</Button>
                        </CardActions>
                    </Stack>
                </CardContent>
                <Stack onClick={() => setExpanded(!expanded)} justifyContent={"flex-end"} sx={{marginLeft: 'auto', position: 'relative', bottom:10, right: 25, minWidth: 145, cursor: 'pointer'}}>
                    <Stack justifyContent={"flex-end"}  direction={"row"}>
                        <Typography variant={"caption"} sx={{color: 'grey'}}>{item.date}</Typography>
                    </Stack>
                    <Stack justifyContent={"flex-end"} direction={"row"}>
                        <Typography variant={"caption"} sx={{color: 'grey'}}>{item.place}</Typography>
                    </Stack>
                    <Stack sx={{}} justifyContent={"flex-end"} alignContent={"center"} alignItems={"center"} direction={"row"}>
                        <Typography variant={"caption"} sx={{color: 'grey'}}>{item.group}</Typography>
                        <Divider orientation={"vertical"} sx={{height: '50%', mr:1, ml:1}} />
                        <Typography variant={"caption"} sx={{color: 'grey'}}>{item.concert}</Typography>
                    </Stack>
                </Stack>
            </Collapse>
        </Card>
    )
}

export default MyConcertList