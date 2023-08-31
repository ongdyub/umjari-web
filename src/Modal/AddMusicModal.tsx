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
import {musicItemAdd, musicListGet, selectMusic} from "../store/slices/music/music";
import IconButton from '@mui/material/IconButton';
import {concert, concertSetListAdd, selectConcert} from "../store/slices/concert/concert";
import {selectUser} from "../store/slices/user/user";
import {useParams} from "react-router-dom";
import {groupInfo, groupSetListAdd, selectGroup} from "../store/slices/group/group";
import {myPlayListGet, myPlayListPut, selectMyConcert} from "../store/slices/myconcert/myconcert";

const style = {
    position: 'absolute' as 'absolute',
    top: '48%',
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
    const userState = useSelector(selectUser)
    const dispatch = useDispatch<AppDispatch>()

    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    const [open, setOpen] = useState(false);
    const [composerEng, setComposerEng] = useState<string>('')
    const [shortComposerEng, setShortComposerEng] = useState<string>('')
    const [composerKor, setComposerKor] = useState<string>('')
    const [shortComposerKor, setShortComposerKor] = useState<string>('')
    const [nameEng, setNameEng] = useState<string>('')
    const [shortNameEng, setShortNameEng] = useState<string>('')
    const [nameKor, setNameKor] = useState<string>('')
    const [shortNameKor, setShortNameKor] = useState<string>('')

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addMusicItem = async () => {
        if(composerEng === '' || shortComposerEng === '' || composerKor === '' || shortComposerKor === '' || nameEng === '' || shortNameEng === '' || nameKor === '' || shortNameKor === ''){
            window.alert("공백을 채워주세요")
            return
        }
        else{
            const data = {
                composerEng : composerEng,
                shortComposerEng : shortComposerEng,
                composerKor : composerKor,
                shortComposerKor : shortComposerKor,
                nameEng : nameEng,
                shortNameEng : shortNameEng,
                nameKor : nameKor,
                shortNameKor : shortNameKor
            }
            const result = await dispatch(musicItemAdd({data : data, token : userState.accessToken}))

            if(result.type === `${musicItemAdd.typePrefix}/fulfilled`){
                // setOpen(false)
            }
        }

    }

    return (
        <React.Fragment>
            <Button sx={{ml: 'auto',maxWidth: res550 ? 50 : 55, minWidth: res550 ? 50 : 55, maxHeight: 30, minHeight: 30, fontSize : res550 ? 7 : 10}} size={"small"} variant={"contained"} onClick={handleOpen}>곡 추가</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: '95%', height: '85%', overflowY: 'scroll', '&::-webkit-scrollbar': {display: 'none'} }}>
                    <Stack sx={{width: '100%', mb: 2}}>
                        <Stack direction={"row"} alignItems={'center'} sx={{mt: 1}}>
                            <Typography sx={{mr:1, fontSize: 14}}>작곡가 영문 풀네임</Typography>
                            <Typography variant={"caption"} sx={{color: 'grey', fontSize: 8}}>ex) Pyotr Ilyich Tchaikovsky</Typography>
                        </Stack>
                        <Stack sx={{mt: -1}}>
                            <Input
                                id="standard-adornment-amount"
                                sx={{fontSize: 12, pt: 0.5}}
                                value={composerEng}
                                onChange={(e) => setComposerEng(e.target.value)}
                            />
                        </Stack>
                    </Stack>
                    <Stack sx={{width: '100%', mb: 2}}>
                        <Stack direction={"row"} alignItems={'center'}>
                            <Typography sx={{mr:1, fontSize : 14}}>작곡가 영문 약칭</Typography>
                            <Typography variant={"caption"} sx={{color: 'grey', fontSize: 8}}>ex) P. I. Tchaikovsky</Typography>
                        </Stack>
                        <Stack sx={{mt: -1}}>
                            <Input
                                id="standard-adornment-amount"
                                sx={{fontSize: 12, pt: 0.5}}
                                value={shortComposerEng}
                                onChange={(e) => setShortComposerEng(e.target.value)}
                            />
                        </Stack>
                    </Stack>
                    <Stack sx={{width: '100%', mb: 2}}>
                        <Stack direction={"row"} alignItems={'center'}>
                            <Typography sx={{mr:1, fontSize: 14}}>작곡가 한글 풀네임</Typography>
                            <Typography variant={"caption"} sx={{color: 'grey', fontSize: 8}}>ex) 표토르 일리치 차이코프스키</Typography>
                        </Stack>
                        <Stack sx={{mt: -1}}>
                            <Input
                                id="standard-adornment-amount"
                                sx={{fontSize: 12, pt: 0.5}}
                                value={composerKor}
                                onChange={(e) => setComposerKor(e.target.value)}
                            />
                        </Stack>
                    </Stack>
                    <Stack sx={{width: '100%', mb: 2}}>
                        <Stack direction={"row"} alignItems={'center'}>
                            <Typography sx={{mr:1, fontSize:14}}>작곡가 한글 약칭</Typography>
                            <Typography variant={"caption"} sx={{color: 'grey', fontSize: 8}}>ex) 차이코프스키</Typography>
                        </Stack>
                        <Stack sx={{mt: -1}}>
                            <Input
                                id="standard-adornment-amount"
                                sx={{fontSize: 12, pt: 0.5}}
                                value={shortComposerKor}
                                onChange={(e) => setShortComposerKor(e.target.value)}
                            />
                        </Stack>
                    </Stack>
                    <Stack sx={{width: '100%', mb: 2}}>
                        <Stack direction={"row"} alignItems={'center'}>
                            <Typography sx={{mr:1, fontSize:14}}>곡명 영문 풀네임</Typography>
                            <Typography variant={"caption"} sx={{color: 'grey', fontSize: 7}}>ex) Symphony No. 5 in e minor, Op. 64</Typography>
                        </Stack>
                        <Stack sx={{mt: -1}}>
                            <Input
                                id="standard-adornment-amount"
                                sx={{fontSize: 12, pt: 0.5}}
                                value={nameEng}
                                onChange={(e) => setNameEng(e.target.value)}
                            />
                        </Stack>
                    </Stack>
                    <Stack sx={{width: '100%', mb: 2}}>
                        <Stack direction={"row"} alignItems={'center'}>
                            <Typography sx={{mr:1, fontSize: 14}}>곡명 영문 약칭</Typography>
                            <Typography variant={"caption"} sx={{color: 'grey', fontSize: 7}}>ex) Symphony No. 5</Typography>
                        </Stack>
                        <Stack sx={{mt: -1}}>
                            <Input
                                id="standard-adornment-amount"
                                sx={{fontSize: 12, pt: 0.5}}
                                value={shortNameEng}
                                onChange={(e) => setShortNameEng(e.target.value)}
                            />
                        </Stack>
                    </Stack>
                    <Stack sx={{width: '100%', mb: 2}}>
                        <Stack direction={"row"} alignItems={'center'}>
                            <Typography sx={{mr:1, fontSize: 14}}>곡명 한글 풀네임</Typography>
                            <Typography variant={"caption"} sx={{color: 'grey', fontSize: 8}}>ex) 교향곡 제 5번 마단조 Op. 64</Typography>
                        </Stack>
                        <Stack sx={{mt: -1}}>
                            <Input
                                id="standard-adornment-amount"
                                sx={{fontSize: 12, pt: 0.5}}
                                value={nameKor}
                                onChange={(e) => setNameKor(e.target.value)}
                            />
                        </Stack>
                    </Stack>
                    <Stack sx={{width: '100%', mb: 2}}>
                        <Stack direction={"row"} alignItems={'center'}>
                            <Typography sx={{mr:1, fontSize:14}}>곡명 한글 약칭</Typography>
                            <Typography variant={"caption"} sx={{color: 'grey', fontSize: 8}}>ex) 교향곡 5번</Typography>
                        </Stack>
                        <Stack sx={{mt: -1}}>
                            <Input
                                id="standard-adornment-amount"
                                sx={{fontSize: 12, pt: 0.5}}
                                value={shortNameKor}
                                onChange={(e) => setShortNameKor(e.target.value)}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={'row'}>
                        <Typography variant={'body2'} color={'error'} sx={{pr: 2}}>추가한 곡에 대한 정보는 수정 및 삭제가 불가능 하니 오타가 없는지 다시한번 확인해 주세요. 잘못된 곡을 등록 할 시에 검색이 그대로 실행되기 때문에 오타에 다시 한번 주의하시기 바랍니다.</Typography>
                        <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                            <Button variant={'contained'} size={'small'} onClick={addMusicItem}>추가</Button>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'}>
                        <Typography sx={{fontSize: 11, mt:1}}>클래식 곡이 아닌 경우는 적절히 모든 칸을 채워서 작성해주시면 됩니다.</Typography>
                    </Stack>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

const AddMusicModal = (props : any) => {

    const {open, setOpen, scope} = props
    const { id, profileName } = useParams();

    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector(selectUser)
    const musicState = useSelector(selectMusic)
    const concertState = useSelector(selectConcert)
    const groupState = useSelector(selectGroup)
    const myConcertState = useSelector(selectMyConcert)

    const [searchComposer, setSearchComposer] = useState<string>('')
    const [searchName, setSearchName] = useState<string>('')

    const handleClose = () => {
        setOpen(false);
    };

    const onClickAddMusic = async (musicId : number) => {

        if(scope === 'group'){
            const groupMusicIdList = groupState.groupInfo?.setList.map((item) => (item.id))
            groupMusicIdList?.push(musicId)

            const data = {
                musicIds : groupMusicIdList
            }

            if(groupMusicIdList === null || groupMusicIdList === undefined){
                window.alert("잘못된 요청입니다.")
                return
            }
            else{
                const result = await dispatch(groupSetListAdd({data, token : userState.accessToken, id : id}))
                if(result.type === `${groupSetListAdd.typePrefix}/fulfilled`){
                    dispatch(groupInfo(id))
                }
                setOpen(false)
            }
            return
        }

        if(scope === 'myPlayList'){
            if(!myConcertState.myDefaultInfo?.isSelfProfile){
                window.alert("권한이 없습니다.")
                return
            }
            if(userState.accessToken === null){
                window.alert("다시 로그인해주세요.")
                return
            }
            const musicIdList = myConcertState.myPlayList.musicList.map((item) => (item.id))
            musicIdList.push(musicId)
            const result = await dispatch(myPlayListPut({token : userState.accessToken, data : {musicIds : musicIdList}}))
            if(result.type === `${myPlayListPut.typePrefix}/fulfilled`){
                dispatch(myPlayListGet(profileName))
                setOpen(false)
            }
            return
        }

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
            composer : searchComposer,
            name : searchName
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
                <Box sx={{...style, width: scope === 'myPlayList' ? '80%' : '85%', height: '90%'}}>
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
                                            <Typography sx={{fontWeight: 600, fontSize: 11, pl:1, pt: 0.5}}>{item.composerEng}</Typography>
                                            <IconButton aria-label="delete" size="small" sx={{ml: 'auto'}} onClick={() => onClickAddMusic(item.id)}>
                                                <AddIcon fontSize="inherit" sx={{color: 'blue'}} />
                                            </IconButton>
                                        </Stack>
                                        <Stack direction={"row"} alignItems={'center'}>
                                            <Typography variant={"caption"} sx={{fontWeight: 200, fontSize: 12, pl: 1, mb:1}}>{item.nameEng}</Typography>
                                        </Stack>
                                        <Stack direction={"row"} alignItems={'center'}>
                                            <Typography variant={"caption"} sx={{fontWeight: 400, fontSize: 10, pl: 1, mb:1}}>{item.nameKor}</Typography>
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