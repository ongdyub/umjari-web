import {Box, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";

const ConcertInfo = () => {
    const theme = useTheme();
    const res600 = useMediaQuery(theme.breakpoints.down("sm"))
    const res800 = useMediaQuery(theme.breakpoints.down("res800"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const fontTitle = {
        fontSize: 16,
        fontWeight: 600,
        width: '20%',
        minWidth: 93,
    }
    const fontInfo = {
        fontWeight: 300,
        fontSize: 20,
        pr:2
    }

    return(
        <Stack direction={res600 ? "column" : 'row'} sx={{width: '100%', mt: 2}} justifyContent={"flex-start"} alignItems={"center"}>
            <Stack sx={{maxWidth: 340, width: '95%', mb:1}} justifyContent={"center"} alignItems={"center"}>
                <Box
                    component="img"
                    sx={{
                        display: 'block',
                        maxWidth: 340,
                        width: '100%',
                        objectFit: 'contain',
                        pl: res600 ? 0 : 2,
                    }}
                    alt="The house from the offer."
                    src={"/img/poster.jpeg"}
                />
            </Stack>
            <Stack justifyContent={"flex-start"} sx={{height: '100%', width: '100%', pl: 5}}>
                {
                    res600 ?
                        <Divider sx={{width: '90%', mt: 3, mb: 1}} />
                        :
                        null
                }
                <Stack sx={{width: '100%', mt: 1, mb:1}}>
                    <Typography variant={"h3"} sx={{fontSize: 40, fontWeight: 1300, pr: 3}}>SNUPO 60회 정기연주회</Typography>
                    <Typography sx={{fontSize: 30, fontWeight: 300, mt: 1, pr: 3}}>부제 없음</Typography>
                </Stack>
                <Divider sx={{width: '90%'}} />
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>장소</Typography>
                    <Typography sx={fontInfo}>서울대학교 문화관 대강당</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>날짜</Typography>
                    <Typography>2023-03-02(목)</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>시간</Typography>
                    <Typography>19 : 00</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>지휘자</Typography>
                    <Typography>이준호</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>가격</Typography>
                    <Typography>전석 무료</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>러닝타임</Typography>
                    <Typography>140분</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>주최</Typography>
                    <Typography>SNUPO</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>후원</Typography>
                    <Typography>.</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography variant={"subtitle2"} sx={fontTitle}>문의</Typography>
                    <Typography>010-0000-0000</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ConcertInfo