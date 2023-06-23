import {Divider, Stack} from "@mui/material";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import {useNavigate} from "react-router-dom";


const AlbumItem = (props : any) => {

    const {item} = props;

    const navigate = useNavigate()

    return(
        <Card sx={{cursor:'pointer', maxWidth: 345, boxShadow: 8 }} onClick={() => navigate(`${item.id}/${item.title}`)}>
            <Stack sx={{width: '100%', mt: 0.7, mb: 0.5}} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
                <Typography sx={{fontSize: 12, fontWeight: 400}}>
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
            <Stack sx={{width: '100%',mt:1, mb:1}} direction={"row"} justifyContent={"flex-start"} alignItems={"center"} alignContent={"center"}>
                <PhotoLibraryIcon sx={{ml: 1, width: 15, height: 15}} />
                <Typography sx={{fontSize : 12, ml: 1, mr: 0.5}}>
                    {item.photoCount}
                </Typography>
                <Typography sx={{color: 'grey', fontSize: 8, fontWeight: 500, marginLeft: 'auto', pr:1}}>
                    created At {item.createAt.slice(2,10)}
                </Typography>
            </Stack>
        </Card>
    )
}

export default AlbumItem