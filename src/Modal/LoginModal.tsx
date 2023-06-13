import {
    Button,
    Fade, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel,
    Modal,
    Stack, TextField,
    Typography, useMediaQuery, useTheme,
} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {login, signUp, userActions, valCode, valEmailPost, valNamePost} from "../store/slices/user/user";
import {AppDispatch} from "../store";

const styleReg = (theme: any) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'secondary.light',
    boxShadow: 24,
    p: 3,
    height: '90%',
    overflow: 'scroll',
    '&::-webkit-scrollbar': {display: 'none'},
    [theme.breakpoints.down('850')]: {
        width: 0.8,
    },
});

const styleLog = (theme: any) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'secondary.light',
    boxShadow: 24,
    p: 3,
    overflow: 'scroll',
    '&::-webkit-scrollbar': {display: 'none'},
    [theme.breakpoints.down('850')]: {
        width: 0.8,
    },
});

const LoginModal = (props : any) => {

    const {open} = props;

    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();

    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [pwConfirm, setPwConfirm] = useState<string>("")
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [errorText, setErrorText] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')
    const [nickname, setNickname] = useState('')

    const [valEmail, setValEmail] = useState<boolean>(false)
    const [authCode, setAuthCode] = useState('')
    const [disableCodeBtn, setDisableCodeBtn] = useState(true)
    const [valName, setValName] = useState<boolean>(false)

    const [profileName, setProfileName] = useState('')

    const [pending, setPending] = useState(false)

    const [submit, setSubmit] = useState<boolean>(false)

    const onClickMode = () => {
        setLoginId('');
        setLoginPassword('');
        setPwConfirm('');
        setErrorText('');
        setEmail('')
        setAuthCode('')
        // setPhone('')
        setNickname('')

        setValEmail(false)
        setValName(false)
        setDisableCodeBtn(true)
        setPending(false)
        setProfileName('')

        setIsLoginMode(!isLoginMode);

    }

    const checkID = (asValue: string) => {
        const regExp : RegExp = /^(?=.*[a-zA-Z])[a-zA-Z0-9_.]{4,20}$/;
        const regAdmin : RegExp = /^(?!.*관리자)(?!.*음자리)(?!.*admin)(?!.*umjari).*$/i
        return regExp.test(asValue) && regAdmin.test(asValue);
    }

    const checkProfileName = (asValue : string) => {
        const regExp = /^[가-힣a-zA-Z0-9_-]{2,15}$/
        const regAdmin : RegExp = /^(?!.*관리자)(?!.*음자리)(?!.*admin)(?!.*umjari).*$/i
        return regExp.test(asValue) && regAdmin.test(asValue)
    }

    const checkPW = (asValue: string) => {
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/
        return regExp.test(asValue);
    }

    const checkEmail = (asValue: string) => {
        const regExp = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
        return regExp.test(asValue)
    }

    // const checkPhone = (asValue: string) => {
    //     const regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
    //     //숫자 11개 + 3 4 4 구조만 가능
    //     return regExp.test(asValue)
    // }

    const checkNick = (asValue: string) => {
        const regExp = /^[a-zA-Z0-9가-힣_]{2,15}$/;
        const regAdmin : RegExp = /^(?!.*관리자)(?!.*음자리)(?!.*admin)(?!.*umjari).*$/i
        return regExp.test(asValue) && regAdmin.test(asValue)
    }

    const onKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            onClickLogin();
        }
    };

    const onClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const onClickShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    }

    const onChangeId = (id: string) => {
        setLoginId(id)
    }

    const onChangePw = (pw: string) => {
        setLoginPassword(pw)
    }

    const onChangeEmail = (email: string) => {
        setEmail(email)
    }

    const onClickValEmail = async () => {
        setPending(true)
        const data = {
            email : email
        }
        const result = await dispatch(valEmailPost(data))
        if (result.type === `${valEmailPost.typePrefix}/fulfilled`) {
            window.alert("인증번호 전송 성공")
            setDisableCodeBtn(false)
        } else {
            if(result.payload === 13){
                window.alert("이미 존재하는 메일입니다.")
            }
            else{
                window.alert("인증번호 전송 실패")
            }
        }
        setPending(false)
    }

    const onClickValCode = async () => {
        const data = {
            email : email,
            token : authCode
        }
        const result = await dispatch(valCode(data))
        if (result.type === `${valCode.typePrefix}/fulfilled`) {
            window.alert("인증 성공")
            setValEmail(true)
        } else {
            window.alert("인증 실패")
        }
    }

    const onClickValName = async () => {
        const data = {
            nickname : nickname
        }
        const result = await dispatch(valNamePost(data))
        if (result.type === `${valNamePost.typePrefix}/fulfilled`) {
            window.alert("확인 성공")
            setValName(true)
        } else {
            window.alert("이미 존재하는 닉네임 입니다.")
        }
    }

    // const onChangePhone = (phone: string) => {
    //     const value = phone.replace(/-/g, '');
    //     setPhone(value)
    //
    //     if(checkPhone(value)){
    //         setErrorText("")
    //     }
    //     else{
    //         setErrorText("전화번호 형식을 다시 확인해주세요")
    //     }
    // }

    const onChangeNickname = (nickname: string) => {
        setNickname(nickname)
    }

    const onChangeProfileName = (name: string) => {
        setProfileName(name)
    }

    const onChangePwConfirm = (pw: string) => {
        setPwConfirm(pw)
    }

    const onClickLogin = async () => {
        const data = {
            userId: loginId,
            password: loginPassword
        }

        const result = await dispatch(login(data))

        if (result.type === `${login.typePrefix}/fulfilled`) {
            window.alert("로그인 성공")
            onClickClose()
            window.location.reload()
        } else {
            window.alert("로그인 실패.")
        }
    };

    const onClickRegister = async () => {
        const data = {
            userId: loginId,
            password: loginPassword,
            email: email,
            // phoneNumber: phone,
            nickname: nickname,
            profileName: profileName,
            intro: ''
        }
        const result = await dispatch(signUp(data))

        if (result.type === `${signUp.typePrefix}/fulfilled`) {
            //const result = await dispatch(loginUser(data));
            // if (result.type === `${loginUser.typePrefix}/fulfilled`) {
            //     setIsOpen(false)
            // } else {
            //     setErrorText("자동로그인 실패! 다시 로그인 해주세요");
            // }
            window.alert("회원가입 성공")
            onClickClose()
        } else {
            if(result.payload === 11){
                window.alert("이미 존재하는 아이디 입니다.")
            }
            else if(result.payload === 12){
                window.alert("이미 존재하는 닉네임 입니다.")
            }
            else if(result.payload === 13){
                window.alert("이미 존재하는 이메일 입니다.")
            }
            else if(result.payload === 14){
                window.alert("이미 존재하는 프로필 이름 입니다.")
            }
            else{
                window.alert("네트워크 오류 발생. 다시 시도해 주세요.")
            }
        }
    };
    const onClickClose = () => {
        setLoginId('');
        setLoginPassword('');
        setPwConfirm('');
        setErrorText('');
        setEmail('')
        setAuthCode('')
        // setPhone('')
        setNickname('')

        setValEmail(false)
        setValName(false)
        setDisableCodeBtn(true)
        setPending(false)
        setProfileName('')

        setIsLoginMode(true)
        dispatch(userActions.closeModal())
    }

    useEffect(() => {
        setSubmit(checkProfileName(profileName) && checkEmail(email) && checkNick(nickname) && checkID(loginId) && checkPW(pwConfirm))
        if(!isLoginMode){
            if(!checkID(loginId)){
                setErrorText("아이디 형식을 다시 확인해주세요")
                return
            }
            if(!checkPW(loginPassword)){
                setErrorText("비밀번호 형식을 다시 확인해주세요")
                return
            }
            if(pwConfirm !== loginPassword){
                setErrorText("비밀번호가 일치하지 않습니다")
                return;
            }
            if(!checkProfileName(profileName)){
                setErrorText("프로필 이름의 형식을 다시 확인해주세요")
                return;
            }
            if(!checkEmail(email)){
                setErrorText("이메일의 형식을 다시 확인해주세요")
                return;
            }
            if(!checkNick(nickname)){
                setErrorText("닉네임의 형식을 다시 확인해주세요")
                return;
            }
            setErrorText("")
        }
    },[profileName, email, nickname, loginId, loginPassword, pwConfirm])

    return (
        <Modal
            open={open}
            onClose={onClickClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Stack spacing={2} sx={ isLoginMode ? styleLog : styleReg}>
                    <TextField
                        label="아이디"
                        variant="standard"
                        helperText={!isLoginMode && "4-10자의 영문과 숫자, 일부 특수문자(., _, -)만 입력 가능합니다."}
                        value={loginId}
                        onChange={(e) => { onChangeId(e.target.value) }}
                        sx={{
                            '& label.Mui-focused': {
                                color: 'black',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'black',
                            },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'black',
                                },
                            },
                        }}
                    />
                    <FormControl
                        variant="standard"
                        sx={{
                            '& label.Mui-focused': {
                                color: 'secondary.light',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: 'secondary.light',
                            },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'secondary.light',
                                },
                            },
                        }}
                    >
                        <InputLabel>비밀번호</InputLabel>
                        <Input
                            type={showPassword ? "text" : "password"}
                            data-testid="password"
                            value={loginPassword}
                            onChange={(e) => { onChangePw(e.target.value) }}
                            onKeyPress={onKeyPress}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        data-testid="showPassword"
                                        tabIndex={-1}
                                        onClick={onClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>
                            {!isLoginMode && <>특수문자(!@#$%^&*) 영문과 숫자가 모두 들어간 8-20자의 비밀번호를 설정해주세요.</>}
                        </FormHelperText>
                    </FormControl>
                    {!isLoginMode &&
                        <>
                            <FormControl
                                variant="standard"
                                sx={{
                                    '& label.Mui-focused': {
                                        color: 'black',
                                    },
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: 'black',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black',
                                        },
                                    },
                                }}
                            >
                                <InputLabel>비밀번호 확인</InputLabel>
                                <Input
                                    type={showPasswordConfirm ? "text" : "password"}
                                    value={pwConfirm}
                                    data-testid="pwconfirm"
                                    onChange={(e) => { onChangePwConfirm(e.target.value) }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                tabIndex={-1}
                                                onClick={onClickShowPasswordConfirm}
                                            >
                                                {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Stack sx={{width: '100%', flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                                <TextField
                                    label="프로필 이름"
                                    variant="standard"
                                    helperText={!isLoginMode && "프로필 이름을 입력하세요. /mypage/@이름/ 형태로 사용되며, 글 작성 공개 시에 표시되는 이름입니다. 특수문자는 _ 만 사용 가능하며 한글/영어/숫자 2-15 자리입니다."}
                                    value={profileName}
                                    onChange={(e) => { onChangeProfileName(e.target.value) }}
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: 'black',
                                        },
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: 'black',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'black',
                                            },
                                        },
                                        width: 'calc(100% - 20px)',
                                        mr: 1
                                    }}
                                />
                                {/*<Button onClick={() => {window.alert("준비중")}} disabled={false} variant={"outlined"} sx={{ml: 'auto',maxWidth: '90px', maxHeight: '30px', minWidth: '90px', minHeight: '30px'}}>중복검사</Button>*/}
                            </Stack>
                            <Stack sx={{flexDirection: res550 ? 'row' : 'row', alignItems: 'center', alignContent: 'center'}}>
                                <TextField
                                    label="이메일"
                                    variant="standard"
                                    disabled={valEmail}
                                    helperText={!isLoginMode && "이메일을 입력해주세요."}
                                    value={email}
                                    onChange={(e) => { onChangeEmail(e.target.value) }}
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: 'black',
                                        },
                                        '& .MuiInput-underline:after': {
                                            borderBottomColor: 'black',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'black',
                                            },
                                        },
                                        width : 'calc(100% - 85px)'
                                    }}
                                />
                                <Button onClick={onClickValEmail} disabled={ valEmail || !checkEmail(email)} variant={"outlined"} sx={{ml: 'auto',maxWidth: '75px', maxHeight: '30px', minWidth: '75px', minHeight: '30px'}}>{pending ? '전송 중' : '전송'}</Button>
                            </Stack>
                            <Stack sx={{width: '100%', flexDirection: 'column', alignItems: 'center', alignContent: 'center'}}>
                                <Stack sx={{width: '100%', flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                                    <TextField
                                        label="인증번호"
                                        variant="standard"
                                        disabled={valEmail}
                                        helperText={!isLoginMode && "번호를 입력해주세요"}
                                        value={authCode}
                                        onChange={(e) => { setAuthCode(e.target.value) }}
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: 'black',
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: 'black',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            width : 'calc(100% - 85px)',
                                            mr: 1
                                        }}
                                    />
                                    <Button disabled={disableCodeBtn || valEmail} onClick={onClickValCode} variant={"outlined"} sx={{ml: 'auto',maxWidth: '75px', maxHeight: '30px', minWidth: '75px', minHeight: '30px'}}>확인</Button>
                                </Stack>
                                <Stack sx={{width: '100%', flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                                    <TextField
                                        label="닉네임"
                                        variant="standard"
                                        helperText={!isLoginMode && "닉네임을 입력해주세요. 글 및 질문 작성 시에 보여지는 닉네임 입니다. 2-15자리의 한글, 영문 대소문자, 숫자, 언더스코어(_)만 사용 가능"}
                                        value={nickname}
                                        disabled={valName}
                                        onChange={(e) => { onChangeNickname(e.target.value) }}
                                        sx={{
                                            '& label.Mui-focused': {
                                                color: 'black',
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: 'black',
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            width: 'calc(100% - 100px)',
                                            mr: 1
                                        }}
                                    />
                                    <Button onClick={onClickValName} disabled={valName || !checkNick(nickname)} variant={"outlined"} sx={{ml: 'auto',maxWidth: '90px', maxHeight: '30px', minWidth: '90px', minHeight: '30px'}}>중복검사</Button>
                                </Stack>
                            </Stack>

                        </>
                    }
                    {isLoginMode ?
                        <Button variant="text" onClick={onClickLogin}
                                sx={{
                                    bgcolor: 'white',
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    '&:hover': {
                                        backgroundColor: 'white',
                                        boxShadow: 2,
                                    },
                                    width: '150px'
                                }}
                        >
                            <Typography color='text.primary'>
                                로그인
                            </Typography>
                        </Button> :
                        <Button variant="text" onClick={onClickRegister}
                                data-testid="register"
                                disabled={(!valName || !valEmail || !submit) || (loginPassword !== pwConfirm)}
                                sx={{
                                    bgcolor: 'primary.dark',
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    '&:hover': {
                                        backgroundColor: 'black',
                                        boxShadow: 2,
                                    },
                                    '&:disabled': {
                                        backgroundColor: 'grey',
                                        boxShadow: 2,
                                    },
                                    width: '40%'
                                }}
                        >
                            <Typography color='white'>
                                회원가입
                            </Typography>
                        </Button>
                    }
                    <Stack direction="row" spacing={1} alignItems='flex-end' justifyContent='space-between'>
                        <Typography
                            color='error.main'
                            variant='body2'
                            sx={{ width: 0.6 }}
                        >
                            {errorText}
                        </Typography>
                        <Typography
                            color='text.primary'
                            variant='body2'
                            align="right"
                            onClick={onClickMode}
                            sx={{
                                width: 0.4,
                                wordBreak: 'keep-all',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'black',
                                },
                            }}
                        >
                            {isLoginMode ? "회원가입 하러가기" : "로그인 하러가기"}
                        </Typography>
                    </Stack>
                </Stack>
            </Fade>
        </Modal>
    );
}

export default LoginModal
