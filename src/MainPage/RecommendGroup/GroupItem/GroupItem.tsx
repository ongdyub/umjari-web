import {Box, Card, CardContent, CardMedia, IconButton, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {groupFrom, songForm} from "../../../store/slices/dummy/dummy";
import './GroupItem.scss'

const GroupItem = (props : groupFrom) => {

    const {name, img, song, friend, region, recruit} = props
    const theme = useTheme();

    return(
        <Card sx={{justifyContent:"flex-start", alignItems:"center" ,display: 'flex', width: '90%', marginBottom: '30px', height: 'auto' }}>
            <CardMedia
                component="img"
                sx={{ width: 60, height: 60, objectFit: 'fill', marginLeft: 3, marginRight: 3 }}
                image={img}
                alt="Live from space album cover"
            />
            <Box sx={{width: 160,display: 'flex', flexDirection: 'column', justifyContent: "flex-start", alignItems: "center"}}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', pt:3}}>
                    <Typography component="div" variant="h6" sx={{textOverflow: 'ellipsis'}}>
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {region}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{textOverflow: 'ellipsis',whiteSpace: 'nowrap'}} component="div">
                        {friend}명이 참여중입니다.
                    </Typography>
                </CardContent>
            </Box>
            <Box className={"groupitem-box-song"} sx={{justifyContent:"flex-start", flexDirection: 'column', alignItems: 'center'}}>
                {
                    song.map((item : songForm) => (
                        <Stack direction="row" justifyContent="flex-start" alignItems="center">
                            <Box sx={{width: 120}}>
                                <Typography variant="caption"  display="block" gutterBottom sx={{fontWeight: 600, fontSize: 12, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                    {item.composer}
                                </Typography>
                            </Box>
                            <Box className={"groupitem-box-name"} sx={{width: 180,textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}} >
                                <Typography variant="overline"  display="block" gutterBottom sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                    {item.name}
                                </Typography>
                            </Box>
                        </Stack>
                    ))
                }
            </Box>

        </Card>
    )
}

export default GroupItem