import {
    Avatar,
    Backdrop,
    Box, Button,
    CardMedia, Checkbox,
    Divider,
    Fade, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, Link,
    Modal,
    Stack, TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import {useState} from "react";
import Comment from "../Common/Comment/Comment";
import {useDispatch, useSelector} from "react-redux";
import {selectDummy} from "../store/slices/dummy/dummy";
import GalleryComment from "../Common/GalleryComment/GalleryComment";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {selectUser, testPingPong} from "../store/slices/user/user";
import {AppDispatch} from "../store";

const style = (theme: any) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'secondary.light',
    boxShadow: 24,
    p: 3,
    overflow: 'scroll',
    [theme.breakpoints.down('850')]: {
        width: 0.8,
    },
});

const LoginModal = (props : any) => {

    const {open, handleClose} = props;

    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser);

    const [loginId, setLoginId] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [pwConfirm, setPwConfirm] = useState<string>("")
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [errorText, setErrorText] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const onClickMode = () => {
        setLoginId('');
        setLoginPassword('');
        setPwConfirm('');
        setErrorText('');
        setIsLoginMode(!isLoginMode);
    }

    const checkID = (asValue: string) => {
        const regExp = /^(?=.*[a-zA-Z])[a-zA-Z0-9_.]{4,20}$/;
        return regExp.test(asValue);
    }

    const checkPW = (asValue: string) => {
        const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/
        return regExp.test(asValue);
    }

    const onKeyPress = (e: { key: string; }) => {
        if (e.key == 'Enter') {
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

        if (checkID(id) || isLoginMode) {
            setErrorText("")
        } else {
            setErrorText("아이디의 형식을 다시 확인해주세요")
        }
    }

    const onChangePw = (pw: string) => {
        setLoginPassword(pw)

        if (checkPW(pw) || isLoginMode) {
            setErrorText("")
        } else {
            setErrorText("비밀번호의 형식을 다시 확인해주세요")
        }
    }

    const onChangePwConfirm = (pw: string) => {
        setPwConfirm(pw)

        if (loginPassword === pw) {
            setErrorText("")
        } else {
            setErrorText("비밀번호가 일치하지 않습니다.")
        }
    }

    const onClickLogin = () => {
        window.alert("로그인 버튼 클릭!")
    };

    const onClickRegister = async () => {
        const result = await dispatch(testPingPong())
        console.log(result)

        if(!checkID(loginId) || !checkPW(loginPassword) || loginPassword !== pwConfirm){
            console.log("올바르지 않은 형식입니다")
            return;
        }
    };
    const onClickClose = () => {
        setLoginId('');
        setLoginPassword('');
        setPwConfirm('');
        handleClose(false)
    }

    return (
        <Modal
            open={open}
            onClose={onClickClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Stack spacing={2} sx={style}>
                    <TextField
                        label="아이디"
                        variant="standard"
                        helperText={!isLoginMode && "4-10자의 영문과 숫자, 일부 특수문자(., _, -)만 입력 가능합니다."}
                        value={loginId}
                        onChange={(e) => { onChangeId(e.target.value) }}
                        onKeyPress={onKeyPress}
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
                                onKeyPress={onKeyPress}
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
                                disabled={!checkID(loginId) || !checkPW(loginPassword) || loginPassword !== pwConfirm}
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
                                'word-break': 'keep-all',
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
