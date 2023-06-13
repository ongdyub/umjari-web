import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import {
    Divider,
    FormControl,
    Input,
    InputAdornment,
    Stack,
    Typography,
    Card,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {useEffect, useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from "@mui/icons-material/Search";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import {musicListGet, selectMusic} from "../store/slices/music/music";
import IconButton from '@mui/material/IconButton';
import {concert, concertSetListAdd, selectConcert} from "../store/slices/concert/concert";
import {selectUser} from "../store/slices/user/user";
import {useParams} from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 3,
    pb: 3,
};

const ChildModal = () => {
    const theme = useTheme();

    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button sx={{ml: 'auto',maxWidth: 55, minWidth: 55, maxHeight: 30, minHeight: 30, fontSize : res550 ? 8 : 10}} size={"small"} variant={"contained"} onClick={handleOpen}>곡 추가</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

const AddMusicModal = (props : any) => {

    const {open, setOpen} = props
    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector(selectUser)
    const musicState = useSelector(selectMusic)
    const concertState = useSelector(selectConcert)

    const [searchComposer, setSearchComposer] = useState<string>('')
    const [searchName, setSearchName] = useState<string>('')

    const handleClose = () => {
        setOpen(false);
    };

    const onClickAddMusic = async (musicId : number) => {
        const musicIdList = concertState.concert?.setList.map((item) => (item.musicInfo.id))
        musicIdList?.push(musicId)

        const data = {
            musicIds : musicIdList
        }

        if(musicIdList === null || musicIdList === undefined){
            window.alert("잘못된 요청입니다.")
            return
        }
        else{
            const result = await dispatch(concertSetListAdd({data, token : userState.accessToken, id : id}))
            if(result.type === `${concertSetListAdd.typePrefix}/fulfilled`){
                dispatch(concert(id))
            }
            setOpen(false)
        }
    }

    useEffect(() => {
        const params = {
            composerEng : searchComposer,
            nameEng : searchName
        }

        dispatch(musicListGet(params))

    },[dispatch, searchComposer, searchName])

    // @ts-ignore
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: '85%', height: '80%'}}>
                    <Stack direction={"row"} sx={{width: '100%'}} alignItems={'center'}>
                        <Stack sx={{width: '90%'}}>
                            <Stack direction={"row"} alignItems={'center'}>
                                <Typography sx={{fontSize : 14,fontWeight: 700, width: 50}}>작곡가</Typography>
                                <FormControl variant="standard" sx={{width: '75%'}}>
                                    <Input
                                        id="standard-adornment-amount"
                                        sx={{fontSize: 13, pt: 0.5}}
                                        value={searchComposer}
                                        onChange={(e) => setSearchComposer(e.target.value)}
                                        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction={"row"} alignItems={'center'}>
                                <Typography sx={{fontSize : 14,fontWeight: 700, width: 50}}>곡명</Typography>
                                <FormControl variant="standard" sx={{width: '75%'}}>
                                    <Input
                                        id="standard-adornment-amount"
                                        sx={{fontSize: 13, pt: 0.5}}
                                        value={searchName}
                                        onChange={(e) => setSearchName(e.target.value)}
                                        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                                    />
                                </FormControl>
                            </Stack>
                        </Stack>
                        <Stack justifyContent="flex-end" sx={{height: '64px'}} alignItems={'center'}>
                            <ChildModal />
                        </Stack>
                    </Stack>
                    <Divider sx={{width: '100%', mt: 2, mb: 0.5}} />
                    <Stack>
                        <Typography sx={{fontSize : 12}}>총 {musicState.counts}개의 검색 결과가 있습니다.</Typography>
                    </Stack>
                    <Divider sx={{width: '100%', mt: 0.5}} />
                    <Stack sx={{height: '80%',overflowY: 'scroll', '&::-webkit-scrollbar': {display: 'none'}}}>
                        <Stack>
                            {
                                musicState.musicList.map((item, idx) => (
                                    <Card key={idx} sx={{width: '100%', alignItems: 'center', shadows: 10, mb:1}}>
                                        <Stack direction={"row"} alignItems={'center'}>
                                            <Typography sx={{fontWeight: 600, fontSize: 11, pl:1, pt: 0.5}}>{item.shortComposerEng}</Typography>
                                            <IconButton aria-label="delete" size="small" sx={{ml: 'auto'}} onClick={() => onClickAddMusic(item.id)}>
                                                <AddIcon fontSize="inherit" sx={{color: 'blue'}} />
                                            </IconButton>
                                        </Stack>
                                        <Stack direction={"row"} alignItems={'center'}>
                                            <Typography variant={"caption"} sx={{fontWeight: 200, fontSize: 12, pl: 1, mb:1}}>{item.shortNameEng}</Typography>
                                        </Stack>
                                    </Card>
                                ))
                            }
                        </Stack>
                    </Stack>

                </Box>
            </Modal>
        </div>
    );

}

export default AddMusicModal