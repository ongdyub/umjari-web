import {Button, ButtonGroup, Divider, Stack, Typography} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import SelfIntro from "./SelfIntro/SelfIntro";


const myButtons = [
    <Button key="one">소개</Button>,
    <Button key="two">연주회 목록</Button>,
    <Button key="three">방명록</Button>,
]

const MyHome = () => {
    return (
        <Stack sx={{width: '100%'}}>
            <Stack sx={{width: '100%', mt: 3, mb: 2}} justifyContent={"flex-start"}>
                <Typography sx={{ml: 8, fontWeight: 300, fontSize: 35}}>아쎄이 악!</Typography>
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
                    <Route path="list" />
                    <Route path="visit" />
                </Routes>
            </Stack>
        </Stack>
    );
}

export default MyHome