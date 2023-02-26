import {Box, Card, CardMedia, Chip, Divider, Stack, Typography, useTheme} from "@mui/material";
import {groupFrom, songForm} from "../../../store/slices/dummy/dummy";

const GroupSearchItem = (props : groupFrom) => {

    const {name, img, song, friend, region, recruit, re_inst} = props
    const theme = useTheme();

    return(
        <Card sx={{ display: 'flex', height: 400, width: '100%', flexDirection: 'column' }}>
            <Stack sx={{height: 70}} direction={"row"}>
                <CardMedia
                    component="img"
                    sx={{ height:70, width: 70, padding: '7px 7px 7px 7px', objectFit: 'fill'}}
                    image={img}
                    alt="Live from space album cover"
                />
                <Stack direction={"column"} justifyContent={"space-evenly"} sx={{ml: 1}} >
                    <Typography sx={{fontSize: 15, fontWeight:800}}>{name}</Typography>
                    <Stack direction={"row"}>
                        <Typography sx={{fontSize: 12, fontWeight:600, color: '#606060'}}>{region}</Typography>
                        <Divider orientation={"vertical"} sx={{height: '80%', ml:1, mr:1}}/>
                        <Typography sx={{fontSize: 12, fontWeight:600, color: '#606060'}}>{friend} 명 참여중</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Divider />
            <Stack sx={{pl: 2, mt: 1, minHeight: 140}}>
                {
                    song.map((item : songForm) => (
                        <Stack direction={"column"} justifyContent="flex-start" sx={{}}>
                            <Typography variant="caption"  display="block" gutterBottom sx={{fontWeight: 600, fontSize: 10, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                {item.composer}
                            </Typography>
                            <Typography variant="overline"  display="block" gutterBottom sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', mt:-1}}>
                                {item.name}
                            </Typography>
                        </Stack>
                    ))
                }
            </Stack>
            <Divider />
            <Stack direction={"row"} sx={{mt: 2, width:'100%'}} gap={1} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
                {
                    re_inst.map((item: string) => (
                        <Chip label={`${item}`} />
                    ))
                }
            </Stack>
        </Card>
    )
}

export default GroupSearchItem