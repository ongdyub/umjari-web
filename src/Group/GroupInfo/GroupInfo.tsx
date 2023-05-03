import {Box, Divider, Link, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";

const GroupInfo = (props : any) => {

    const {groupData} = props

    const theme = useTheme();
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    return(
        <Stack direction={res700 ? "column" : "row"} sx={{mt: 2, mb:2}} >
            <Stack direction={res700 ? "row" : "column"} sx={{pl: res700 ? 0 : 6, pr: res700 ? 0 : 6, mb:2}} alignContent={"center"} alignItems={"center"}>
                <Stack direction={"row"} alignContent={"center"} alignItems={"center"} sx={{width: res700 ? 'calc(100% - 100px)' : 'auto'}}>
                    <Typography align={"center"} sx={{fontSize: 40,fontFamily: "Open Sans",fontWeight: 100, wordWrap: "break-word", width: res700 ? '100%' : 150, pl: res700 ? 2 : 0}}>{groupData.name}</Typography>
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
                    src={`${groupData.logo}`}
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
                    <Typography sx={{ml:1.5, mr:1.5}}>{groupData.region}</Typography>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>연습 시간</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Typography sx={{ml:1.5, mr:1.5}}>{groupData.practiceTime}</Typography>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>오디션</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Typography sx={{ml:1.5, mr:1.5}}>{groupData.audition ? '있음' : '없음'}</Typography>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>입단비</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Typography sx={{ml:1.5, mr:1.5}}>{groupData.membershipFee}</Typography>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>월회비</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Typography sx={{ml:1.5, mr:1.5}}>{groupData.monthlyFee}</Typography>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>홈페이지</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Link component="button" underline={"hover"} sx={{ml:1.5, mr:1.5}} onClick={() => window.alert("사이트 이동")}>{groupData.homepage}</Link>
                </Stack>

                <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>상세 소개</Typography>
                    <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                    <Typography sx={{ml:1.5, mr:1.5}}>{groupData.detailIntro}</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default GroupInfo