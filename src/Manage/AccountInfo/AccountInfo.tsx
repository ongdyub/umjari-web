import {
    Button,
    CircularProgress,
    Divider,
    FormControl,
    MenuItem,
    Select, SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import Backdrop from "@mui/material/Backdrop";
import {changePw, myInfoGet, myNamePut, selectUser} from "../../store/slices/user/user";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {region_child, region_parents} from "../../MainPage/ConcertList/ConcertFilter/ConcertFilter";
import {useParams} from "react-router-dom";
import {checkAxios} from "../../App";

const AccountInfo = () => {

    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector(selectUser)
    const {profileName} = useParams()

    const [oldPw, setOldPw] = useState<string>('')
    const [newPw, setNewPw] = useState<string>('')

    const [pending, setPending] = useState<boolean>(false)

    const [parent, setParent] = useState<any>(0);
    const [child, setChild] = useState<any>(0);

    const handleParentChange = (event: SelectChangeEvent) => {
        setParent(event.target.value);
        setChild(0)
    };
    const handleChildChange = (event: SelectChangeEvent) => {
        setChild(event.target.value);
    };

    const onClickSetRegion = async () => {
        const data = {
            nickname: userState.nickname,
            profileName: profileName,
            intro: userState.intro,
            regionParent: region_parents[parent],
            regionChild: region_child[parent][child]
        }
        const result = await dispatch(myNamePut({token : userState.accessToken, data : data}))
        if(checkAxios(result.type, myNamePut.typePrefix)){
            window.alert("변경 완료")
            dispatch(myInfoGet({token : userState.accessToken, profileName : profileName}))
        }
    }
    const onClickResetRegion = async () => {
        const data = {
            nickname: userState.nickname,
            profileName: profileName,
            intro: userState.intro
        }
        const result = await dispatch(myNamePut({token : userState.accessToken, data : data}))
        if(checkAxios(result.type, myNamePut.typePrefix)){
            window.alert("변경 완료")
            dispatch(myInfoGet({token : userState.accessToken, profileName : profileName}))
        }
    }

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

    useEffect(() => {
        if(userState.accessToken !== null && profileName !== null && profileName !== undefined){
            dispatch(myInfoGet({token : userState.accessToken, profileName : profileName}))
        }
        else{
            window.alert("먼저 로그인 해주세요.")
        }
    },[profileName])

    useEffect(() => {

        const parentR = userState.regionParent === null ? '' : userState.regionParent

        if(region_parents.indexOf(parentR) > -1){
            setParent(region_parents.indexOf(parentR))
        }
        else{
            setParent(0)
        }
    },[userState.regionParent])

    useEffect(() => {

        const childR = userState.regionChild === null ? '' : userState.regionChild

        if(region_child[parent].indexOf(childR) > -1){
            setChild(region_child[parent].indexOf(childR))
        }
        else{
            setChild(0)
        }
    },[userState.regionChild, parent])

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
            <Divider sx={{mt : 1,mb:2, width: '90%'}} />
            <Stack sx={{width:'90%', mb:2}} direction={'row'} alignItems={'end'} alignContent={'end'}>
                <Stack sx={{width: '50%'}} direction={'row'} alignItems={'end'} alignContent={'end'}>
                    <Typography sx={{fontSize: 12, width: '215', mr: 3}}>지역 1</Typography>
                    <FormControl sx={{width: '50%', maxWidth: 150}}>
                        <Select
                            value={parent}
                            onChange={handleParentChange}
                            displayEmpty
                            sx={{height: '20px', fontSize:11}}
                            variant={"standard"}
                        >
                            {region_parents.map((item, idx) => (
                                <MenuItem key={idx} value={idx} sx={{fontSize:11}}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack sx={{width: '50%'}} direction={'row'} alignItems={'end'} alignContent={'end'}>
                    <Typography sx={{fontSize: 12, width: '215', mr: 3}}>지역 2</Typography>
                    <FormControl sx={{width: '50%', maxWidth: 150}}>
                        <Select
                            value={child}
                            onChange={handleChildChange}
                            displayEmpty
                            sx={{height: '20px', fontSize: 11}}
                            variant={"standard"}
                        >
                            {region_child[parent].map((item, idx) => (
                                <MenuItem key={idx} value={idx} sx={{fontSize:11}}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
            <Stack sx={{width: '90%'}} direction={'row'}>
                <Typography variant={'body2'} sx={{fontSize : 11}}>추천 단체를 선정할때 필요한 정보이고 설정이 필수는 아니며, 타인에게 공개되지 않습니다.</Typography>
            </Stack>
            <Stack sx={{width: '90%', mt:2}} direction={'row'}>
                <Button onClick={onClickSetRegion} variant={'outlined'} sx={{maxWidth: 60, fontSize : 11, mr:2}}>등록</Button>
                <Button onClick={onClickResetRegion} variant={'outlined'} sx={{maxWidth: 60, fontSize : 11}}>초기화</Button>
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