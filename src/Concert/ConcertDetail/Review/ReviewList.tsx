import {Box, Button, ButtonGroup, Divider, Stack, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";

const ReviewList = (props: any) => {

    const {item, write} = props

    const theme = useTheme();
    const res400 = useMediaQuery(theme.breakpoints.down("res400"))
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    return(
        <Stack  sx={{width: '100%', mt:3}}>
            <Divider sx={{width: '90%'}} />
            <Stack direction={res400 ? "column" : "row"} sx={{width: '90%', mt: res400 ? 1 : 0}}>
                <Stack direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{ml: 2, fontWeight:800, fontSize: 13}}>
                        No. {item}
                    </Typography>
                    <Typography sx={{ml: 2}}>
                        이름자리
                    </Typography>
                    <Typography sx={{ml: 2, color:'grey', fontWeight:300}}>
                        2010.10.10
                    </Typography>
                </Stack>
                <Stack sx={{marginLeft: 'auto'}} direction={"row"}>
                    <ButtonGroup>
                        <Button variant={"text"}>수정</Button>
                        <Button variant={"text"}>삭제</Button>
                        <Button variant={"text"}>비공개</Button>
                    </ButtonGroup>
                </Stack>
            </Stack>
            <Divider sx={{width: '90%'}} />

            <Stack direction={"row"} sx={{width: '90%', mt:2}}>
                <Stack sx={{width: res750 ? 'auto' : 'auto'}}>
                    <Box
                        component="img"
                        sx={{
                            display: 'block',
                            width: res750 ? 133 : 133,
                            height: res750 ? 133 : 133,
                            borderRadius: '20%',
                            objectFit: 'cover',
                            boxShadow: 'rgb(0 0 0 / 6%) 0px 0px 4px 0px'
                        }}
                        alt="기타 공연 봤다는 인증 사진 업로드"
                        src={``}
                    />
                </Stack>
                {
                    write ?
                        <Stack sx={{pl:3, width: '100%'}}>
                            <TextField
                                placeholder="댓글을 입력해 주세요"
                                multiline
                                rows={6}
                                variant={"standard"}
                            />
                            <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                                <Button size={"large"}>작성하기</Button>
                            </Stack>
                        </Stack>
                        :
                        <Stack sx={{pl:2}}>
                            {'ㅁㄴㅇㄹㅁㄴㅇㄹㄴㅁㅇㄹㄴㅇㄹ'.repeat(item*2)}
                        </Stack>
                }
            </Stack>
        </Stack>
    )
}

export default ReviewList