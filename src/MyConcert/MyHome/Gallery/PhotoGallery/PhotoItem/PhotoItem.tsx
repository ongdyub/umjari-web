import {IconButton, ImageListItem, ImageListItemBar, Typography, useMediaQuery, useTheme} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import * as React from "react";
// import {useNavigate, useParams} from "react-router-dom";
// import {useDispatch} from "react-redux";
// import {AppDispatch} from "../../../../../store";
import {useState} from "react";
import PhotoModal from "../../../../../Modal/PhotoModal";


const PhotoItem = (props : any) => {

    const {item} = props

    //나중에 comment 및 본인 연동
    // const {profileName,albumId} = useParams()
    // const navigate = useNavigate()
    // const dispatch = useDispatch<AppDispatch>()

    const theme = useTheme();

    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const [openPhoto, setOpenPhoto] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)

    return(
        <>
            <ImageListItem sx={{cursor: 'pointer', display : load ? 'block' : 'none'}} onClick={() => setOpenPhoto(true)}>
                <img
                    src={item.url}
                    onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/img/fail-loading.png`}
                    onLoad={() => setLoad(true)}
                    alt="갤러리 사진입니다."
                />
                <ImageListItemBar
                    sx={{height: res750 ? '25px' : 'auto', pt: -1, pb: -1}}
                    // title={'title'}
                    //시리즈 모음집 이름
                    // subtitle={<Typography sx={{fontSize: 8}}>photo</Typography>}
                    //개별 사진 title
                    actionIcon={
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item}`}
                        >
                            <FavoriteIcon sx={{width: 10, height: 10}} />
                            <Typography sx={{fontSize: 8, ml:0.5, mr:1}}>
                                0
                            </Typography>
                            <CommentIcon sx={{width: 10, height: 10}} />
                            <Typography sx={{fontSize: 8, ml:0.5}}>
                                0
                            </Typography>
                        </IconButton>
                    }
                />
            </ImageListItem>
            {
                openPhoto ?
                    <PhotoModal open={openPhoto} setOpen={setOpenPhoto} item={item} />
                    :
                    null
            }
        </>
    )
}

export default PhotoItem