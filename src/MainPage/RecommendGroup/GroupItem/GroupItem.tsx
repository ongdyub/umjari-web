import {Box, Card, CardContent, CardMedia, IconButton, Typography, useTheme} from "@mui/material";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {groupFrom} from "../../../store/slices/dummy/dummy";

const GroupItem = (props : groupFrom) => {

    const theme = useTheme();

    const {name, img, song, friend, region, recruit} = props

    return(
        <Card sx={{justifyContent:"flex-start", alignItems:"center" ,display: 'flex', width: '90%', marginBottom: '30px' }}>
            <CardMedia
                component="img"
                sx={{ width: 80, height: 80, objectFit: 'fill', marginLeft: 2 }}
                image={img}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{justifyContent:"flex-start", flexDirection: 'column',display: 'flex', alignItems: 'center', ml: 2}}>
                {
                    song.map((item) => (
                        <Typography variant="overline" display="block" gutterBottom>
                            {item}
                        </Typography>
                    ))
                }
                {/*<IconButton aria-label="previous">*/}
                {/*    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}*/}
                {/*</IconButton>*/}
                {/*<IconButton aria-label="play/pause">*/}
                {/*    <PlayArrowIcon sx={{ height: 38, width: 38 }} />*/}
                {/*</IconButton>*/}
                {/*<IconButton aria-label="next">*/}
                {/*    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}*/}
                {/*</IconButton>*/}
            </Box>

        </Card>
    )
}

export default GroupItem