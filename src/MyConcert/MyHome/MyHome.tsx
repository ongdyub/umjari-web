import {Button, ButtonGroup, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import SelfIntro from "./SelfIntro/SelfIntro";
import MyList from "./MyList/MyList";
import Gallery from "./Gallery/Gallery";


const myButtons = [
    <Button key="one">짧은소개</Button>,
    <Button key="two">연주회목록</Button>,
    <Button key="three">사진첩</Button>,
    <Button key="three">다이어리</Button>,
    <Button key="four">방명록</Button>,
]

const MyHome = () => {

    const profile_img = "secure.gravatar.com/avatar/217b46f9ae197e33b88883b0e38f0fa4?s=150&d=identicon"
    const theme = useTheme();
    const resSize = useMediaQuery(theme.breakpoints.down("md"))
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    return (
        <Stack sx={{width: res750 ? '100%' : 'calc(100% - 200px)'}}>
            {
                res750 ?
                    <Divider sx={{width: '100%'}} />
                    :
                    null
            }
            <Stack sx={{width: '95%', mt: 3, mb: 2}} justifyContent={"flex-start"}>
                <Typography sx={{ml: 8, fontWeight: 300, fontSize: 35, pr: 5}}>한줄 소개 입력 공간한줄 소개 입력 소개 입력 공간</Typography>
            </Stack>
            <Divider sx={{Width: '90%'}}/>
            <Stack sx={{pl: res550 ? 0 : 6}} justifyContent={res550 ? "center" : ''} alignItems={res550 ? "center" : ''} alignContent={res550 ? "center" : ''}>
                <Stack sx={{mt:5}}>
                    <ButtonGroup variant={"text"} size="large">
                        {myButtons}
                    </ButtonGroup>
                </Stack>
                <Routes>
                    <Route path="selfintro" element={<SelfIntro />}/>
                    <Route path="list" element={<MyList />}/>
                    <Route path="gallery" element={<Gallery />}/>
                    <Route path="visit" />
                </Routes>
            </Stack>
        </Stack>
    );
}

export default MyHome