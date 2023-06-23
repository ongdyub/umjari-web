import {Box, Button, FormControl, Input, InputLabel, Modal, Stack, Typography} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import {selectUser} from "../store/slices/user/user";
import {albumListGet, photoListGet, postAlbum, putAlbum} from "../store/slices/gallery/gallery";
import {useNavigate, useParams} from "react-router-dom";

const style = (theme: any) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'secondary.light',
    boxShadow: 24,
    p: 3,
    overflow: 'scroll',
    [theme.breakpoints.down(800)]: {
        width: 0.8,
    },
    '&::-webkit-scrollbar': {display: 'none'}
});

const AddAlbumModal = (props : any) => {

    const {open, setOpen, mode} = props

    const dispatch = useDispatch<AppDispatch>()
    const {profileName, albumId} = useParams()
    const navigate = useNavigate()
    const userState = useSelector(selectUser)

    const [title, setTitle] = useState('')

    const handleClose = () => setOpen(false);

    const handleAddAlbum = async () => {
        if(title === '' || title === null || title === undefined || title.length === 0){
            window.alert("제목을 입력해주세요")
            return
        }
        if(title.length > 20){
            window.alert("제목 길이 제한")
            return
        }

        const data = {
            title : title
        }
        const result = await dispatch(postAlbum({data : data, token : userState.accessToken}))

        if(result.type === `${postAlbum.typePrefix}/fulfilled`){
            const param = {
                page : 1,
                size : 10,
                sort : "createdAt,DESC",
            }
            dispatch(albumListGet({profileName : profileName, token : userState.accessToken, param : param}))
            setOpen(false)
        }
    }

    const handleEditAlbum = async () => {
        if(title === '' || title === null || title === undefined || title.length === 0){
            window.alert("제목을 입력해주세요")
            return
        }
        if(title.length > 20){
            window.alert("제목 길이 제한")
            return
        }

        const data = {
            title : title
        }
        const result = await dispatch(putAlbum({albumId, token : userState.accessToken, data : data}))

        if(result.type === `${putAlbum.typePrefix}/fulfilled`){
            const param = {
                page : 1,
                size : 10,
                sort : "createdAt,DESC",
            }
            dispatch(photoListGet({albumId, token: userState.accessToken, param}))
            navigate(`/myconcert/${profileName}/gallery`)
            setOpen(false)
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    앨범 제목을 입력하세요
                </Typography>
                <Stack direction={"row"} sx={{width: '100%'}}>
                    <FormControl variant="standard" sx={{width: '80%'}}>
                        <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">20자 이하의 문자를 입력해 주세요</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            sx={{fontSize: 12, pt: 0.5}}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <FormControl sx={{bottom: 0, pt: 2, ml: 'auto'}}>
                        {
                            mode === 'edit' ?
                                <Button onClick={handleEditAlbum} sx={{bottom: 0,minWidth: 45, maxWidth: 45,maxHeight: 30, minHeight: 30, fontSize: 11}} variant={'contained'} size={'small'}>변경</Button>
                                :
                                <Button onClick={handleAddAlbum} sx={{bottom: 0,minWidth: 45, maxWidth: 45,maxHeight: 30, minHeight: 30, fontSize: 11}} variant={'contained'} size={'small'}>생성</Button>
                        }
                    </FormControl>
                </Stack>
            </Box>
        </Modal>
    );
}

export default AddAlbumModal
