import {Box, Button, ButtonGroup, Divider, Stack, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../store";
import {getVisitList, postVisit, selectVisit} from "../../../../store/slices/visit/visit";
import {selectUser} from "../../../../store/slices/user/user";
import {selectMyConcert} from "../../../../store/slices/myconcert/myconcert";
import {useParams} from "react-router-dom";

const VisitList = (props : any) => {

    const {item, write} = props

    const {profileName} = useParams()

    const userState = useSelector(selectUser)
    const visitState = useSelector(selectVisit)
    const myConcertState = useSelector(selectMyConcert)

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const dispatch = useDispatch<AppDispatch>()

    const [text, setText] = useState('')
    const [hide, setHide] = useState(false)

    const handlePostVisit = async () => {
        if(write){
            if(text === '' || text.length < 1){
                window.alert("본문을 입력해주세요.")
                return
            }
            if(text.length > 500){
                window.alert("500자 초과")
                return
            }
            const data = {
                content : text,
                private : hide
            }
            const result = await dispatch(postVisit({id : myConcertState.myDefaultInfo?.id, token : userState.accessToken, data}))
            if(result.type === `${postVisit.typePrefix}/fulfilled`){
                const param = {
                    page: 1,
                    size: 20,
                    sort: "createdAt,DESC"
                }
                dispatch(getVisitList({profileName, token : userState.accessToken, param}))
            }
        }
        else{
            return
        }
    }

    return(
        <Stack  sx={{width: '95%', mt:1}} justifyContent={res550 ? "center" : 'center'} alignItems={res550 ? "center" : 'center'} alignContent={res550 ? "center" : 'center'}>
            <Divider sx={{width: '90%'}} />
            <Stack direction={"row"} sx={{width: '90%'}}>
                <Stack direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{ml: 2, fontWeight:800, fontSize: 13}}>
                        No. {item.userId}
                    </Typography>
                    <Typography sx={{fontSize:12,ml: 2}}>
                        {item.authorId.profileName}
                    </Typography>
                    <Typography sx={{ml: 2, color:'grey',fontSize:10, fontWeight:300}}>
                        {write ? '' : item.createdAt.slice(2,10) + " " + item.createdAt.slice(11,16)}
                    </Typography>
                </Stack>
                <Stack sx={{marginLeft: 'auto'}} direction={"row"}>
                    <ButtonGroup>
                        <Button sx={{fontSize:10}} variant={"text"}>수정</Button>
                        <Button sx={{fontSize:10}} variant={"text"}>삭제</Button>
                        {
                            hide ?
                                <Button onClick={() => setHide(false)} sx={{fontSize:10, color: 'red'}} variant={"text"}>비공개</Button>
                                :
                                <Button onClick={() => setHide(true)} sx={{fontSize:10, color: 'blue'}} variant={"text"}>공개</Button>
                        }
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
                            width: res750 ? 103 : 133,
                            height: res750 ? 103 : 133,
                            borderRadius: '20%',
                            objectFit: 'cover',
                            boxShadow: 'rgb(0 0 0 / 6%) 0px 0px 4px 0px'
                        }}
                        onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                        alt="Profile Img"
                        src={write ? item.profileImg : item.authorId.profileImage}

                    />
                </Stack>
                {
                    write ?
                        <Stack sx={{pl:3, width: '100%'}}>
                            <TextField
                                placeholder="최대 500자의 방명록을 입려해 주세요. 비공개 설정은 서로 친구 상태만 가능합니다,"
                                multiline
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows={5}
                                sx={{fontSize : 11}}
                                variant={"standard"}
                            />
                            <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                                <Button onClick={handlePostVisit} sx={{fontSize: 12}} size={"small"}>작성하기</Button>
                            </Stack>
                        </Stack>
                        :
                        <Stack sx={{pl:2}}>
                            {item.content.slice(0,500)}
                        </Stack>
                }
            </Stack>
        </Stack>
    )
}

export default VisitList