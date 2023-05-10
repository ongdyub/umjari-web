import {Button, ButtonGroup, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Routes, Route, useParams} from "react-router-dom";
import SelfIntro from "./SelfIntro/SelfIntro";
import MyList from "./MyList/MyList";
import Gallery from "./Gallery/Gallery";
import Visit from "./Visit/Visit";
import Diary from "./Diary/Diary";
import {useNavigate} from "react-router";




const MyHome = () => {

    const profile_img = "secure.gravatar.com/avatar/217b46f9ae197e33b88883b0e38f0fa4?s=150&d=identicon"
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const resSize = useMediaQuery(theme.breakpoints.down("md"))
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const onClickGoSelf = () => {
        navigate(`/myconcert/${id}/selfintro`)
    }
    const onClickGoList = () => {
        navigate(`/myconcert/${id}/list`)
    }
    const onClickGoGallery = () => {
        navigate(`/myconcert/${id}/gallery`)
    }
    const onClickGoDiary = () => {
        navigate(`/myconcert/${id}/diary`)
    }
    const onClickGoVisit = () => {
        navigate(`/myconcert/${id}/visit`)
    }

    const myButtons = [
        <Button onClick={onClickGoSelf} sx={{fontSize: res700 ? 12 : 14}} key="one">짧은소개</Button>,
        <Button onClick={onClickGoList} sx={{fontSize: res700 ? 12 : 14}} key="two">연주회목록</Button>,
        <Button onClick={onClickGoGallery} sx={{fontSize: res700 ? 12 : 14}} key="three">사진첩</Button>,
        <Button onClick={onClickGoDiary} sx={{fontSize: res700 ? 12 : 14}} key="three">다이어리</Button>,
        <Button onClick={onClickGoVisit} sx={{fontSize: res700 ? 12 : 14}} key="four">방명록</Button>,
    ]

    return (
        <Stack sx={{width: res750 ? '100%' : 'calc(100% - 200px)'}}>
            {
                res750 ?
                    <Divider sx={{width: '100%'}} />
                    :
                    null
            }
            <Stack sx={{width: '100%', mt: 3, mb: 2}} justifyContent={res750 ? "center" : "flex-start"} alignContent={"center"} alignItems={"center"}>
                <Typography sx={{ml: res750 ? 0 : 2, fontWeight: 300, fontSize: res750 ? 17 : 30, pr: res750 ? 0 : 2}}>한줄 소개 입력 공간한줄 소개 입력 소개 입력 공간</Typography>
            </Stack>
            <Divider sx={{Width: '90%'}}/>
            <Stack sx={{pl: res750 ? 0 : 6}} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
                <Stack sx={{mt:2}}>
                    <ButtonGroup variant={"text"} size={"small"}>
                        {myButtons}
                    </ButtonGroup>
                </Stack>
                <Routes>
                    <Route path="selfintro" element={<SelfIntro />}/>
                    <Route path="list" element={<MyList />}/>
                    <Route path="gallery" element={<Gallery />}/>
                    <Route path="visit" element={<Visit />}/>
                    <Route path="diary" element={<Diary />}/>
                </Routes>
            </Stack>
        </Stack>
    );
}

export default MyHome