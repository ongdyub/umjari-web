import {
    Button,
    Fade,
    Modal,
    Stack, TextField,
    Typography,
} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    myNamePut,
    selectUser,
    userActions,
    valNamePost
} from "../store/slices/user/user";
import {AppDispatch} from "../store";

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
    [theme.breakpoints.down(800)]: {
        width: 0.8,
    },
});

const NameChangeModal = (props : any) => {

    const {open, close} = props

    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser)

    const [profileName, setProfileName] = useState('')
    const [nickname, setNickname] = useState('')
    const [errorText, setErrorText] = useState('')
    const [valName, setValName] = useState<boolean>(false)
    const [submit, setSubmit] = useState<boolean>(false)

    const handleClose = () => {
        setProfileName('')
        setNickname('')
        setErrorText('')
        setValName(false)
        setSubmit(false)
        close(false)
    }

    const checkProfileName = (asValue : string) => {
        if(asValue === ''){
            return true
        }
        const regExp = /^[가-힣a-zA-Z0-9_-]{2,15}$/
        const regAdmin : RegExp = /^(?!.*관리자)(?!.*음자리)(?!.*admin)(?!.*umjari).*$/i
        return regExp.test(asValue) && regAdmin.test(asValue)
    }
    const checkNick = (asValue: string) => {
        if(asValue === ''){
            return true
        }
        const regExp = /^[a-zA-Z0-9가-힣_]{2,15}$/;
        const regAdmin : RegExp = /^(?!.*관리자)(?!.*음자리)(?!.*admin)(?!.*umjari).*$/i
        return regExp.test(asValue) && regAdmin.test(asValue)
    }

    const onChangeNickname = (nickname: string) => {
        setNickname(nickname)
    }

    const onChangeProfileName = (name: string) => {
        setProfileName(name)
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

    const onClickPutName = async () => {

        const data = {
            nickname: nickname,
            profileName: profileName,
            intro: userState.intro
        }

        if(nickname === '' && userState.nickname !== null){
            data.nickname = userState.nickname
        }
        if(profileName === '' && userState.profileName !== null){
            data.profileName = userState.profileName
        }

        if(nickname === '' && profileName === ''){
            window.alert("변경 사항이 없습니다.")
            return
        }

        if(nickname !== '' && !valName){
            window.alert("닉네임 중복인증을 진행해 주세요")
            return
        }

        const result = await dispatch(myNamePut({token : userState.accessToken, data}))

        if (result.type === `${myNamePut.typePrefix}/fulfilled`) {
            dispatch(userActions.setMyName({profileName : data.profileName, nickname : data.nickname}))
            window.alert("변경 완료")
            handleClose()
        } else {
            if(result.payload === 12){
                window.alert("이미 존재하는 닉네임 입니다.")
            }
            else if(result.payload === 14){
                window.alert("이미 존재하는 프로필 이름 입니다.")
            }
            else if(result.payload === 3041){
                window.alert("닉네임 변경 후 1달 이상 지나지 않아서 변경이 불가능 합니다.")
            }
            else{
                window.alert("네트워크 오류 발생. 다시 시도해 주세요.")
            }
        }
    };

    useEffect(() => {
        setSubmit(checkProfileName(profileName) && checkNick(nickname))

        if(!checkProfileName(profileName)){
            setErrorText("프로필 이름의 형식을 다시 확인해주세요")
            return;
        }
        if(!checkNick(nickname)){
            setErrorText("닉네임의 형식을 다시 확인해주세요")
            return;
        }
        setErrorText("")

    },[profileName, nickname])

    return(
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Stack spacing={2} sx={styleLog}>

                            <Stack sx={{width: '100%', flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                                <TextField
                                    label="프로필 이름"
                                    variant="standard"
                                    helperText={"프로필 이름을 입력하세요. /mypage/@이름/ 형태로 사용되며, 글 작성 공개 시에 표시되는 이름입니다. 특수문자는 _ 만 사용 가능하며 한글/영어/숫자 2-15 자리입니다."}
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
                            <Stack sx={{width: '100%', flexDirection: 'column', alignItems: 'center', alignContent: 'center'}}>
                                <Stack sx={{width: '100%', flexDirection: 'row', alignItems: 'center', alignContent: 'center'}}>
                                    <TextField
                                        label={`현재 닉네임 : ${userState.nickname}`}
                                        variant="standard"
                                        helperText={"닉네임을 입력해주세요. 1달의 변경 제한 기간이 존재하니 신중히 변경해 주세요. 글 및 질문 작성 시에 보여지는 닉네임 입니다. 2-15자리의 한글, 영문 대소문자, 숫자, 언더스코어(_)만 사용 가능"}
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
                    <Stack direction="row" spacing={1} alignItems='flex-end' justifyContent='space-between'>
                        <Typography
                            color='error.main'
                            variant='body2'
                            sx={{ width: 0.6 }}
                        >
                            {errorText}
                        </Typography>
                    </Stack>
                    <Button variant="text" onClick={onClickPutName}
                            data-testid="register"
                            disabled={(!submit)}
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
                            변경하기
                        </Typography>
                    </Button>
                </Stack>
            </Fade>
        </Modal>
    )
}

export default NameChangeModal