import {Button, CircularProgress, Divider, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import Backdrop from "@mui/material/Backdrop";
import * as React from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {findEmailPost, resetPw} from "../store/slices/user/user";

const Account = () => {

    const dispatch = useDispatch<AppDispatch>()

    const [email, setEmail] = useState<string>('')
    const [pending, setPending] = useState<boolean>(false)

    const [pwEmail, setPwEmail] = useState<string>('')
    const [userId, setUserId] = useState<string>('')

    const checkEmail = (asValue: string) => {
        const regExp = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
        return regExp.test(asValue)
    }

    const checkID = (asValue: string) => {
        const regExp : RegExp = /^(?=.*[a-zA-Z])[a-zA-Z0-9_.]{4,20}$/;
        const regAdmin : RegExp = /^(?!.*관리자)(?!.*음자리)(?!.*admin)(?!.*umjari).*$/i
        return regExp.test(asValue) && regAdmin.test(asValue);
    }

    const onClickSendCode = async () => {
        if(!checkEmail(email)){
            window.alert("이메일 형식을 다시 확인해주세요")
            return
        }
        {/*이메일 보내는중*/}
        setPending(true)
        const data = {
            email : email
        }
        const result = await dispatch(findEmailPost(data))
        if (result.type === `${findEmailPost.typePrefix}/fulfilled`) {
            window.alert("메일로 아이디를 전송하였습니다.")
        } else {
            if(result.payload === 3051){
                window.alert("존재하지 않는 이메일입니다.")
            }
            else{
                window.alert("네트워크 오류 발생. 새로고침 후 다시 시도해주세요")
            }
        }
        setPending(false)
    }

    const onClickSendPw = async () => {
        if(!checkID(userId) || userId.length < 1 || userId == ''){
            window.alert("아이디 형식을 다시 확인해주세요")
            return
        }
        if(!checkEmail(pwEmail) || pwEmail.length < 1 || pwEmail == ''){
            window.alert("이메일 형식을 다시 확인해주세요")
            return
        }
        {/*임시 비밀번호 보내는중*/}
        setPending(true)
        const data = {
            userId : userId,
            email : pwEmail
        }
        const result = await dispatch(resetPw(data))
        if (result.type === `${resetPw.typePrefix}/fulfilled`) {
            window.alert("메일로 임시 비밀번호를 전송하였습니다.")
        } else {
            if(result.payload === 3051){
                window.alert("회원 정보가 일치하지 않습니다.")
            }
            else{
                window.alert("네트워크 오류 발생. 새로고침 후 다시 시도해주세요")
            }
        }
        setPending(false)
    }

    return(
        <Stack sx={{width: '100%', pt: 2, pb: 2}} justifyContent={'center'} alignItems={'center'}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pending}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {/*ID*/}
            <Stack sx={{width: '80%'}} justifyContent={'center'} alignItems={'center'}>
                <Stack sx={{width: '100%'}} direction={'row'}>
                    <Typography variant={'h6'}>아이디 찾기</Typography>
                </Stack>
                <Stack sx={{width: '100%', mt:1}} direction={'row'}>
                    <Typography variant={'body2'}>적어주신 이메일로 아이디가 전송됩니다.</Typography>
                </Stack>

                <Divider sx={{width: '100%', mt:2, mb:2}} />

                <Stack sx={{width: '100%'}} direction={'row'} alignItems={'end'} alignContent={'end'}>
                    <TextField
                        required
                        label="가입한 이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="standard"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onClickSendCode().then(() => {});
                            }
                        }}
                        sx={{width: '70%'}}
                    />
                    <Button onClick={onClickSendCode}  sx={{ml: '10%', width: '15%'}} variant={'outlined'}>전송</Button>
                </Stack>
            </Stack>

            <Divider sx={{width: '100%', mt:3, mb:3}} />

            {/*PW*/}
            <Stack sx={{width: '80%'}} justifyContent={'center'} alignItems={'center'}>
                <Stack sx={{width: '100%'}} direction={'row'}>
                    <Typography variant={'h6'}>비밀번호 찾기</Typography>
                </Stack>
                <Stack sx={{width: '100%', mt:1}} direction={'row'}>
                    <Typography variant={'body2'}>적어주신 이메일로 임시 비밀번호가 전송됩니다.</Typography>
                </Stack>
                <Stack sx={{width: '100%', mt:1}} direction={'row'}>
                    <Typography variant={'body2'}>변경된 비밀번호로 로그인 후 변경 바랍니다.</Typography>
                </Stack>

                <Divider sx={{width: '100%', mt:2, mb:2}} />

                <Stack sx={{width: '100%', mb:1}} direction={'row'} alignItems={'end'} alignContent={'end'}>
                    <TextField
                        required
                        label="가입한 아이디를 입력하세요"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        variant="standard"
                        sx={{width: '70%'}}
                    />
                </Stack>
                <Stack sx={{width: '100%'}} direction={'row'} alignItems={'end'} alignContent={'end'}>
                    <TextField
                        required
                        label="가입한 이메일을 입력하세요"
                        value={pwEmail}
                        onChange={(e) => setPwEmail(e.target.value)}
                        variant="standard"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onClickSendPw().then(() => {});
                            }
                        }}
                        sx={{width: '70%'}}
                    />
                    <Button onClick={onClickSendPw}  sx={{ml: '10%', width: '15%'}} variant={'outlined'}>전송</Button>
                </Stack>

            </Stack>
        </Stack>
    )
}

export default Account