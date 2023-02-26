import {Box, Divider, Link, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";

const GroupInfo = () => {

    const theme = useTheme();
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    return(
        <Stack direction={res700 ? "column" : "row"} sx={{mt: 2, mb:2}} >
            <Stack direction={res700 ? "row" : "column"} sx={{pl: res700 ? 0 : 6, pr: res700 ? 0 : 6, mb:2}} alignContent={"center"} alignItems={"center"}>
                <Stack direction={"row"} alignContent={"center"} alignItems={"center"} sx={{width: res700 ? 'calc(100% - 100px)' : 'auto'}}>
                    <Typography align={"center"} sx={{fontSize: 40,fontFamily: "Open Sans",fontWeight: 100, wordWrap: "break-word", width: res700 ? '100%' : 150, pl: res700 ? 2 : 0}}>SNUPO</Typography>
                </Stack>
                <Box
                    component="img"
                    sx={{
                        display: 'block',
                        width: res700 ? 80 : 200,
                        ml: res700 ? 'auto' : 0,
                        mr: res700 ? 5 : 0,
                        mt: res700 ? 0 : 2,
                        objectFit: 'contain',
                        // border: '0.5px solid black'
                    }}
                    alt="The house from the offer."
                    src={`/img/logo.png`}
                />
            </Stack>

            {
                res700 ?
                    <Divider orientation={"horizontal"} />
                    :
                    <Divider orientation={"vertical"} />
            }

            <Stack sx={{pl:3, pt: 5}}>
                <Stack direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>연습 장소</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Typography sx={{ml:1.5, mr:1.5}}>서울시   관악구   서울대학교 학생회관 라운지</Typography>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>연습 시간</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Typography sx={{ml:1.5, mr:1.5}}>매주   화/토요일   14:00 ~ 21:00 / 10:00 ~ 17:00</Typography>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>오디션</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Typography sx={{ml:1.5, mr:1.5}}>있음</Typography>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>입단비</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Typography sx={{ml:1.5, mr:1.5}}>30,000</Typography>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>월회비</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Typography sx={{ml:1.5, mr:1.5}}>없음</Typography>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>홈페이지</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Link component="button" underline={"hover"} sx={{ml:1.5, mr:1.5}} onClick={() => window.alert("사이트 이동")}>https://snupo.org</Link>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>상세 소개</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Typography sx={{ml:1.5, mr:1.5}}>서울대학교 아마추어 오케스트라 SNUPO (Seoul National University Philharmonic Orchestra)는 1992년 봄에 클래식 음악을 사랑하는 학생들의 모임으로 시작한 이래로, 전공을 불문하고 음악을 사랑하는 학생들이 모여 진지한 연주 활동을 하고 있는 중앙동아리입니다. 여러 단과대에 걸쳐 각양각색의 학생들이 모여 있고, 규모로 보나 활동으로 보나 국내에서 둘째가라면 서러워할 동아리입니다.</Typography>
                </Stack>
            </Stack>


            <Stack>

            </Stack>
        </Stack>
    )
}

export default GroupInfo