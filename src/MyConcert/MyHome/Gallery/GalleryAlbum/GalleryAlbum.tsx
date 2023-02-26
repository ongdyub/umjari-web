import {Divider, Stack} from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const GalleryAlbum = (props : any) => {

    const {img} = props;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return(
        <Card sx={{ maxWidth: 345, boxShadow: 8 }}>
            <Stack sx={{width: '100%', mt: 1, mb: 0.3}} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
                <Typography sx={{fontSize: 18, fontWeight: 300}}>
                    Album Title
                </Typography>
            </Stack>
            <Divider sx={{width: '100%', mb:0.3}} />
            <CardMedia
                component="img"
                height="294"
                image={`/img/${img}.jpg`}
            />
            {/*<CardContent>*/}

            {/*</CardContent>*/}
            <Stack sx={{width: '100%'}} direction={"row"} justifyContent={"flex-start"} alignItems={"center"} alignContent={"center"}>
                <IconButton>
                    <PhotoLibraryIcon />
                    <Typography sx={{pl: 1.5}}>
                        42
                    </Typography>
                </IconButton>
                <Typography sx={{color: 'grey', fontSize: 10, fontWeight: 600, marginLeft: 'auto', pr: 0.5}}>
                    created At 2020.01.01
                </Typography>
            </Stack>
        </Card>
    )
}

export default GalleryAlbum