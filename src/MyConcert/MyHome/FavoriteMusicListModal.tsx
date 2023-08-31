import {Box, Button, Divider, Modal, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import AddMusicModal from "../../Modal/AddMusicModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {useParams} from "react-router-dom";
import {
    myConcertStateActions,
    myPlayListGet,
    myPlayListPut,
    selectMyConcert
} from "../../store/slices/myconcert/myconcert";
import MusicOffIcon from '@mui/icons-material/MusicOff';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import {selectUser} from "../../store/slices/user/user";

const style = {
    position: 'absolute' as 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    maxHeight: '85%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {display: 'none'},
    maxWidth: 750,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 2,
    pb: 2,
};

const FavoriteMusicListModal = (props : any) => {

    const {open, setOpen} = props

    const dispatch = useDispatch<AppDispatch>()
    const {profileName} = useParams()

    const myConcertState = useSelector(selectMyConcert)
    const userState = useSelector(selectUser)

    const [editMode, setEditMode] = useState<boolean>(false)
    const [openSearchMusic, setOpenSearchMusic] = useState<boolean>(false)

    const handleAddBtn = () => {
        if(!myConcertState.myDefaultInfo?.isSelfProfile){
            window.alert("권한이 없습니다.")
            return
        }
        if(myConcertState.myPlayList !== null && myConcertState.myPlayList.musicList.length > 10){
            window.alert("최대 10곡만 등록 가능합니다. 곡을 삭제한 뒤 진행해 주세요.")
            return
        }
        setOpenSearchMusic(true)
    }

    const deleteMusicList = async (musicId : number) => {
        if(!myConcertState.myDefaultInfo?.isSelfProfile){
            window.alert("권한이 없습니다.")
            return
        }
        if(userState.accessToken === null){
            window.alert("다시 로그인해주세요.")
            return
        }
        const musicIdList = myConcertState.myPlayList.musicList.map((item) => (item.id))
        const newMusicIds = musicIdList.filter((element) => element !== musicId)
        const result = await dispatch(myPlayListPut({token : userState.accessToken, data : {musicIds : newMusicIds}}))
        if(result.type === `${myPlayListPut.typePrefix}/fulfilled`){
            dispatch(myPlayListGet(profileName))
        }
    }

    useEffect(() => {
        dispatch(myPlayListGet(profileName))
        return () => {
            dispatch(myConcertStateActions.resetMyPlayList())
        }
    },[dispatch, profileName])

    return(
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box sx={style}>
                <Stack sx={{width: '100%'}}>
                    {
                        myConcertState.myPlayList.counts === 0 ?
                            <Stack sx={{width: '100%'}} alignItems={'center'}>
                                <Typography sx={{fontSize: 25, fontWeight: 300}}>등록된 곡이 없습니다</Typography>
                                <Stack sx={{width: '90%', mt: 2}} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                                    <SentimentVeryDissatisfiedIcon sx={{width: '35%', height: 'auto', color: 'grey'}} />
                                    <MusicOffIcon sx={{width: '35%', height: 'auto', color: 'grey'}} />
                                </Stack>
                            </Stack>
                            :
                            <Stack sx={{width: '100%'}}>
                                <Stack sx={{width: '100%'}} alignItems={'center'} justifyContent={'center'}>
                                    <Typography sx={{mt:-1,fontSize: 17, fontWeight: 300, color: '#616161'}}>{profileName}'s Top 10 List</Typography>
                                    <Divider sx={{width: '90%'}} />
                                </Stack>

                                {myConcertState.myPlayList.musicList.map((item, idx) => (
                                    <Stack sx={{width: '100%'}}>
                                        <Stack sx={{width: '100%'}} direction={'row'} alignItems={'center'}>
                                            <Typography sx={{width: 16,color : idx === 0 ? '#ffeb3b' : idx === 1 ? '#757575' : idx === 2 ? '#795548' : 'black', fontSize : idx === 0 ? 26 : idx === 1 ? 22 : idx === 2 ? 18 : 16, mr:1}}>{idx+1}</Typography>
                                            <Typography sx={{fontWeight: 600, fontSize: 11}}>{item.shortComposerEng}</Typography>
                                            {
                                                editMode ?
                                                    <IconButton size="small" sx={{ml: 'auto', mr:4}} onClick={() => deleteMusicList(item.id)}>
                                                        <RemoveIcon fontSize="inherit" sx={{color: 'red'}} />
                                                    </IconButton>
                                                    :
                                                    null
                                            }
                                        </Stack>
                                        <Stack sx={{width: '100%'}}>
                                            <Typography variant={"caption"} sx={{fontWeight: 200, fontSize: 13}}>{item.nameEng}</Typography>
                                        </Stack>
                                        <Divider sx={{width: '90%', mt:1, mb:1}} />
                                    </Stack>
                                ))}
                            </Stack>
                    }
                </Stack>
                <Stack sx={{width: '100%'}} direction={"row"} justifyContent={'flex-end'}>
                    {
                        myConcertState.myDefaultInfo?.isSelfProfile ?
                            editMode ?
                                <>
                                    <Button sx={{mb:-1}} color={"info"} size={"small"} onClick={handleAddBtn}>추가</Button>
                                    <Button sx={{mb:-1}} color={"success"} size={"small"} onClick={() => setEditMode(false)}>취소</Button>
                                </>
                                :
                                <Button sx={{mb:-1}} color={"warning"} size={"small"} onClick={() => setEditMode(true)}>수정</Button>
                            :
                            null
                    }
                </Stack>
                {
                    openSearchMusic ?
                        <AddMusicModal open={openSearchMusic} setOpen={setOpenSearchMusic} scope={'myPlayList'} />
                        :
                        null
                }
            </Box>
        </Modal>
    )
}

export default FavoriteMusicListModal
