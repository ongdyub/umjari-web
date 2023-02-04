import {Button, ButtonGroup, Divider, Stack, Typography} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import SelfIntro from "./SelfIntro/SelfIntro";
import MyList from "./MyList/MyList";


const myButtons = [
    <Button key="one">짧은 소개</Button>,
    <Button key="two">연주회 목록</Button>,
    <Button key="three">사진첩</Button>,
    <Button key="four">방명록</Button>,
]

const MyHome = () => {
    return (
        <Stack sx={{width: '100%'}}>
            <Stack sx={{width: '100%', mt: 3, mb: 2}} justifyContent={"flex-start"}>
                <Typography sx={{ml: 8, fontWeight: 300, fontSize: 35}}>한줄 소개 입력 공간</Typography>
            </Stack>
            <Divider sx={{Width: '90%'}}/>
            <Stack sx={{pl: 6}}>
                <Stack sx={{mt:5}}>
                    <ButtonGroup variant={"text"} size="large">
                        {myButtons}
                    </ButtonGroup>
                </Stack>
                <Routes>
                    <Route path="selfintro" element={<SelfIntro />}/>
                    <Route path="list" element={<MyList />}/>
                    <Route path="visit" />
                </Routes>
            </Stack>
        </Stack>
    );
}

export default MyHome