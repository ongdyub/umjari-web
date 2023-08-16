import {Button, CircularProgress, Divider, Stack, TextField, Typography} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Backdrop from "@mui/material/Backdrop";
import {changePw, selectUser} from "../../store/slices/user/user";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";

const AccountInfo = () => {

    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector(selectUser)

    const [oldPw, setOldPw] = useState<string>('')
    const [newPw, setNewPw] = useState<string>('')

    const [pending, setPending] = useState<boolean>(false)

    const checkPW = (asValue: string) => {
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/
        return regExp.test(asValue);
    }

    const onClickChangePw = async () => {
        if(!checkPW(newPw) || newPw.length < 1 || newPw === ''){
            window.alert("비밀번호 형식이 올바르지 않습니다.")
            return
        }
        if(userState.accessToken === null){
            window.alert("잘못된 접근입니다. 다시 로그인 해주세요.")
        }

        setPending(true)
        const data = {
            currentPassword : oldPw,
            newPassword : newPw,
            token : userState.accessToken
        }
        const result = await dispatch(changePw(data))
        if (result.type === `${changePw.typePrefix}/fulfilled`) {
            window.alert("변경 완료 되었습니다.")
        } else {
            if(result.payload === 3051){
                window.alert("비밀번호가 일치하지 않습니다.")
            }
            else{
                window.alert("네트워크 오류 발생. 새로고침 후 다시 시도해주세요")
            }
        }
        setPending(false)
    }

    return(
        <Stack sx={{width: '100%'}} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pending}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {/*지역 변경*/}
            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 20, fontWeight: 300}}>계정 정보 변경</Typography>
            </Stack>
            <Divider sx={{mt : 1,mb:1, width: '90%'}} />
            <Stack sx={{width:'90%', mb:2}} direction={'row'} alignItems={'end'} alignContent={'end'}>
                <Stack sx={{width: '50%'}} direction={'row'} alignItems={'end'} alignContent={'end'}>
                    <Typography>지역 1</Typography>
                </Stack>
                <Stack sx={{width: '50%'}} direction={'row'} alignItems={'end'} alignContent={'end'}>
                    <Typography>지역 2</Typography>
                </Stack>
            </Stack>


            {/*비밀번호 변경*/}
            <Stack direction={'row'} sx={{width: '90%', mt:3}} alignItems={'center'}>
                <Typography sx={{fontSize : 20, fontWeight: 300}}>비밀번호 변경</Typography>
            </Stack>
            <Divider sx={{mt : 1,mb:1, width: '90%'}} />
            <Stack sx={{width: '90%', mb:2}} direction={'row'} alignItems={'end'} alignContent={'end'}>
                <TextField
                    required
                    type={'password'}
                    label="현재 비밀번호를 입력하세요"
                    InputLabelProps={{style: {fontSize: 12}}}
                    value={oldPw}
                    onChange={(e) => setOldPw(e.target.value)}
                    variant="standard"
                    sx={{width: '70%'}}
                />
            </Stack>
            <Stack sx={{width: '90%'}} direction={'row'} alignItems={'end'} alignContent={'end'}>
                <TextField
                    required
                    type={'password'}
                    label="변경할 비밀번호를 입력하세요"
                    InputLabelProps={{style: {fontSize: 12}}}
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    variant="standard"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onClickChangePw().then(() => {});
                        }
                    }}
                    sx={{width: '70%'}}
                />
                <Button onClick={onClickChangePw}  sx={{ml: '10%', width: '15%'}} variant={'outlined'}>변경</Button>
            </Stack>
            <Stack sx={{width: '90%'}} direction={'row'}>
                <Typography variant={'body2'} sx={{mt:2,fontSize : 11}}>특수문자(!@#$%^&*) 영문과 숫자가 모두 들어간 8-20자의 비밀번호를 설정해주세요.</Typography>
            </Stack>

            <Divider sx={{mt : 2,mb:1, width: '90%'}} />

        </Stack>
    )
}

export default AccountInfo