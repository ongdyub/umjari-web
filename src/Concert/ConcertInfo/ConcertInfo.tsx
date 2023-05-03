import {Box, Button, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useNavigate} from "react-router";

const ConcertInfo = (props : any) => {

    const {concertData} = props
    const navigate = useNavigate();

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

    const onClickGoGroup = () => {
        navigate(`/group/${concertData.groupId}`)
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
                    src={concertData.posterImg}
                />
            </Stack>
            <Stack justifyContent={"flex-start"} sx={{height: '100%', width: '100%', pl: 5, mb:1}}>
                {
                    res600 ?
                        <Divider sx={{width: '90%', mt: 3, mb: 1}} />
                        :
                        null
                }
                <Stack sx={{width: '100%', mt: 1, mb:1}}>
                    <Typography variant={"h3"} sx={{fontSize: 40, fontWeight: 1300, pr: 3}}>{concertData.title}</Typography>
                    <Typography sx={{fontSize: 30, fontWeight: 300, mt: 1, pr: 3}}>{concertData.subtitle}</Typography>
                </Stack>
                <Divider sx={{width: '90%'}} />
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>장소</Typography>
                    <Typography sx={fontInfo}>{concertData.regionDetail}</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>날짜</Typography>
                    <Typography>{concertData.concertDate}</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>시간</Typography>
                    <Typography>{concertData.concertTime.substring(0, 5)}</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>지휘자</Typography>
                    <Typography>{concertData.conductor}</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>가격</Typography>
                    <Typography>{concertData.fee === 0 ? '전석 무료' : concertData.fee}</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>러닝타임</Typography>
                    <Typography>{concertData.concertRunningTime}분</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>주최</Typography>
                    <Typography>{concertData.host}</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography sx={fontTitle}>후원</Typography>
                    <Typography>{concertData.support}</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                    <Typography variant={"subtitle2"} sx={fontTitle}>문의</Typography>
                    <Typography>{concertData.qna}</Typography>
                </Stack>
                <Stack direction={"row"} sx={{mt:1.5, width: '100%', pr: 5}} alignItems={"end"} alignContent={"center"}>
                    <Button onClick={onClickGoGroup} sx={{ml: 'auto'}} size={"small"} variant="contained">단체 보기</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ConcertInfo