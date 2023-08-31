import {
    Button,
    ButtonGroup,
    Divider,
    IconButton,
    Input,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Routes, Route, useParams} from "react-router-dom";
import SelfIntro from "./SelfIntro/SelfIntro";
import MyList from "./MyList/MyList";
import Visit from "./Visit/Visit";
import Diary from "./Diary/Diary";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {myConcertStateActions, myIntroPut, selectMyConcert} from "../../store/slices/myconcert/myconcert";
import {selectUser} from "../../store/slices/user/user";
import {useState} from "react";
import {AppDispatch} from "../../store";
import AlbumGallery from "./Gallery/AlbumGallery/AlbumGallery";
import PhotoGallery from "./Gallery/PhotoGallery/PhotoGallery";
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import FavoriteMusicListModal from "./FavoriteMusicListModal";


const MyHome = () => {

    const myConcertState = useSelector(selectMyConcert)

    //For Token
    const userState = useSelector(selectUser)

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { profileName } = useParams();
    const navigate = useNavigate();
    // const resSize = useMediaQuery(theme.breakpoints.down("md"))
    // const res550 = useMediaQuery(theme.breakpoints.down("res550"))
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const [isEdit, setIsEdit] = useState(false)
    const [introText, setIntroText] = useState('')

    const [openFavorite, setOpenFavorite] = useState(false)

    const onClickGoSelf = () => {
        navigate(`/myconcert/${profileName}/selfintro`)
    }
    const onClickGoList = () => {
        navigate(`/myconcert/${profileName}/list`)
    }
    const onClickGoGallery = () => {
        navigate(`/myconcert/${profileName}/gallery`)
    }
    const onClickGoDiary = () => {
        navigate(`/myconcert/${profileName}/diary`)
    }
    const onClickGoVisit = () => {
        navigate(`/myconcert/${profileName}/visit`)
    }

    const handleEditIntro = async () => {

        if(introText.length > 30){
            window.alert("길이가 초과되었습니다.")
            return
        }

        const data = {
            intro: introText,
            profileName : userState.profileName,
            nickname : userState.nickname
        }

        const result = await dispatch(myIntroPut({token : userState.accessToken, data : data}))

        if (result.type === `${myIntroPut.typePrefix}/fulfilled`) {
            dispatch(myConcertStateActions.setMyIntro({intro : introText}))
            window.alert("변경 성공")
            setIntroText(introText)
        } else {
            window.alert("변경 실패")
            setIntroText('')
        }
        setIsEdit(false)
    }

    const myButtons = [
        <Button onClick={onClickGoSelf} sx={{fontSize: res700 ? 12 : 14}} key="selfintro">짧은소개</Button>,
        <Button onClick={onClickGoList} sx={{fontSize: res700 ? 12 : 14}} key="list">연주회목록</Button>,
        <Button onClick={onClickGoGallery} sx={{fontSize: res700 ? 12 : 14}} key="gallery">사진첩</Button>,
        <Button onClick={onClickGoDiary} sx={{fontSize: res700 ? 12 : 14}} key="diary">다이어리</Button>,
        <Button onClick={onClickGoVisit} sx={{fontSize: res700 ? 12 : 14}} key="visit">방명록</Button>,
    ]

    return (
        <Stack sx={{width: res750 ? '100%' : 'calc(100% - 200px)'}}>
            {
                res750 ?
                    <Divider sx={{width: '100%'}} />
                    :
                    null
            }
            <Stack sx={{width: '100%', mt: 3, mb: 2, position: 'relative'}} justifyContent={res750 ? "center" : "flex-start"} alignContent={"center"} alignItems={"center"}>
                {
                    isEdit ?
                        <Input sx={{pl: 2, fontWeight: 300, fontSize: res750 ? 14 : 23, pr: 2, width: '70%', mb:1}} placeholder="30자 이하의 소개를 입력해주세요." value={introText} onChange={(e) => setIntroText(e.target.value)} />
                        :
                        <Typography sx={{pl: 2, fontWeight: 300, fontSize: res750 ? 17 : 23, pr: 2}}>{myConcertState.myDefaultInfo?.intro === '' ? '한줄 소개가 없습니다.' : `${myConcertState.myDefaultInfo?.intro}`}</Typography>
                }
                {
                    myConcertState.myDefaultInfo?.isSelfProfile ?
                        isEdit ?
                            <>
                                <Button onClick={handleEditIntro} sx={{maxWidth: 45, minWidth: 45, maxHeight: 22, minHeight: 22, fontSize : 10, position: 'absolute', right: 5, bottom: -15}} disableRipple>작성</Button>
                                <Button onClick={() => setIsEdit(false)} sx={{maxWidth: 45, minWidth: 45, maxHeight: 22, minHeight: 22, fontSize : 10, position: 'absolute', right: 45, bottom: -15}} disableRipple>취소</Button>
                            </>
                            :
                            <Button onClick={() => setIsEdit(true)} sx={{maxWidth: 45, minWidth: 45, maxHeight: 22, minHeight: 22, fontSize : 10, position: 'absolute', right: 5, bottom: -15}} disableRipple>수정</Button>
                        :
                        null
                }
            </Stack>
            <Divider sx={{Width: '90%'}}/>

            {/*내가 좋아하는 곡 목록 수정 & 보기*/}
            <Stack sx={{pl: res750 ? 0 : 6, width: '100%', mt:0.5, mb: 0.5}} justifyContent={'center'} direction={'row'} alignItems={'center'}>
                <Typography variant={'caption'} sx={{fontSize: 16, color: 'black', fontWeight: 300, mr:1}}>Top 10 PlayList</Typography>
                <IconButton onClick={() => setOpenFavorite(true)}>
                    <QueueMusicIcon sx={{height: 25, width: 25, color: 'grey', cursor: 'pointer'}} />
                </IconButton>
            </Stack>
            <Divider sx={{width: '100%'}}/>

            <Stack sx={{pl: res750 ? 0 : 6, width: '100%'}} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
                <Stack sx={{mt:2}}>
                    <ButtonGroup variant={"text"} size={"small"}>
                        {myButtons}
                    </ButtonGroup>
                </Stack>
                <Routes>
                    <Route path="selfintro" element={<SelfIntro />}/>
                    <Route path="list" element={<MyList />}/>
                    <Route path="gallery/*" element={<AlbumGallery />} />
                    <Route path="gallery/:albumId/:title" element={<PhotoGallery />} />
                    <Route path="visit" element={<Visit />}/>
                    <Route path="diary" element={<Diary />}/>
                </Routes>
            </Stack>
            {
                openFavorite ?
                    <FavoriteMusicListModal open={openFavorite} setOpen={setOpenFavorite} />
                    :
                    null
            }
        </Stack>
    );
}

export default MyHome