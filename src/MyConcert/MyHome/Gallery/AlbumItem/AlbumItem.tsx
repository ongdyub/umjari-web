import {Divider, Stack} from "@mui/material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import {useNavigate} from "react-router-dom";


const AlbumItem = (props : any) => {

    const {item} = props;

    const navigate = useNavigate()

    return(
        <Card sx={{cursor:'pointer', maxWidth: 345, boxShadow: 8 }} onClick={() => navigate(`${item.id}`)}>
            <Stack sx={{width: '100%', mt: 1.5, mb: 1.3}} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
                <Typography sx={{fontSize: 13, fontWeight: 300}}>
                    {item.title}
                </Typography>
            </Stack>
            <Divider sx={{width: '100%'}} />
            <CardMedia
                component="img"
                sx={{height: 'auto', width: '100%'}}
                alt={"앨범 이미지"}
                image={item.headPhoto}
                onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
            />
            <Stack sx={{width: '100%'}} direction={"row"} justifyContent={"flex-start"} alignItems={"center"} alignContent={"center"}>
                <IconButton>
                    <PhotoLibraryIcon />
                    <Typography sx={{pl: 1.5}}>
                        {item.photoCount}
                    </Typography>
                </IconButton>
                <Typography sx={{color: 'grey', fontSize: 8, fontWeight: 500, marginLeft: 'auto', pr:1}}>
                    created At {item.createAt.slice(2,10)}
                </Typography>
            </Stack>
        </Card>
    )
}

export default AlbumItem