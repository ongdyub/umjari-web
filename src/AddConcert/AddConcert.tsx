import {
    Box,
    Button,
    CircularProgress, Divider, FormControl, Input, InputLabel, MenuItem, Select,
    SelectChangeEvent,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {useNavigate} from "react-router";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import {concertPost, selectConcert} from "../store/slices/concert/concert";
import {selectUser} from "../store/slices/user/user";
import {useEffect, useState} from "react";
import {myConcertProfileImageUpload} from "../store/slices/myconcert/myconcert";
import {region_child, region_parents} from "../Concert/ConcertInfo/ConcertInfo";
import Backdrop from "@mui/material/Backdrop";
import * as React from "react";
import {groupInfo, groupStateActions, selectGroup} from "../store/slices/group/group";

const AddConcert = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const theme = useTheme();

    const dispatch = useDispatch<AppDispatch>();

    const concertState = useSelector(selectConcert)
    const groupSelector = useSelector(selectGroup)
    const userState = useSelector(selectUser)

    const res600 = useMediaQuery(theme.breakpoints.down("sm"))

    const [loading, setLoading] = useState(false)

    const [isAdminGroup, setIsAdminGroup] = useState(false)

    const [title, setTitle] = useState<string>('')
    const [posterImg, setPosterImg] = useState<string>('https://umjari-image-bucket.s3.ap-northeast-2.amazonaws.com/images/32/25c55d6f-aee6-484f-903a-9f633af3559d.png')
    const [parent, setParent] = useState<any>(0);
    const [child, setChild] = useState<any>(0);
    const [regionDetail, setRegionDetail] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [conductor, setConductor] = useState<string>('')

    const datePattern = /^[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
    const checkDate = (dateString : string) => {
        if(dateString === ''){
            return true
        }
        return datePattern.test(dateString);
    };
    const timePattern = /^\d{2}:\d{2}:\d{2}$/;
    const checkTime = (dateString : string) => {
        if(dateString === ''){
            return true
        }
        return timePattern.test(dateString);
    };

    const handleParentChange = (event: SelectChangeEvent) => {
        setParent(event.target.value);
        setChild(0)
    };
    const handleChildChange = (event: SelectChangeEvent) => {
        setChild(event.target.value);
    };

    const handleFile = async (e : any) => {

        setLoading(true)

        const formData = new FormData()
        formData.append('image', e.target.files[0])

        const result = await dispatch(myConcertProfileImageUpload({token: userState.accessToken, formData: formData}))

        if (result.type === `${myConcertProfileImageUpload.typePrefix}/fulfilled`) {
            setPosterImg(result.payload.url)
            setLoading(false)
        } else {
            setLoading(false)
            window.alert("이미지 업로드 실패. 용량(50MB)과 네트워크를 확인해 주세요")
        }
    }

    const handleAddConcert = async () => {
        setTitle(title.trim())
        if(title === '' || title.length < 1){
            window.alert("제목을 입력하세요")
            return
        }
        setRegionDetail(regionDetail.trim())
        if(regionDetail === '' || regionDetail.length < 1){
            window.alert("장소를 입력하세요.")
            return
        }
        if(!checkDate(date) || date === '' || date.length < 1){
            window.alert("날짜 형식을 확인해주세요.")
            return
        }
        if(!checkTime(time) || time === '' || time.length < 1){
            window.alert("시간 형식을 확인해주세요.")
            return
        }
        setConductor(conductor.trim())
        if(conductor === '' || conductor.length < 1){
            window.alert("지휘자를 입력하세요. 없는 경우에는 . 을 입력해 주세요.")
            return
        }

        const data = {
            title : title,
            subtitle : '.',
            conductor : conductor,
            host : '',
            support : '',
            qna : '',
            concertInfo : '.',
            posterImg : posterImg,
            concertDate : date + " " + time,
            concertRunningTime : 100,
            fee : 0,
            regionParent : region_parents[parent],
            regionChild : region_child[parent][child],
            regionDetail : regionDetail,
            musicIds : [],
            solist : ''
        }

        const result = await dispatch(concertPost({data, token : userState.accessToken, id : id}))

        if(result.type == `${concertPost.typePrefix}/fulfilled`){
            navigate(`/concert/${result.payload.id}/info`)
        }
        else{
            return
        }
    }

    useEffect(() => {
        if(userState.isLogin){
            const userGroup = userState.career.find((userGroup) => userGroup.groupId.toString() === id)
            if(userGroup !== null && userGroup !== undefined && userGroup.memberType === 'ADMIN'){
                setIsAdminGroup(true)
            }
            dispatch(groupInfo(id))
        }
        return () => {
            dispatch(groupStateActions.resetGroupInfo());
        };
    },[userState.career, concertState.concert, userState.isLogin])

    useEffect(() => {
        if(groupSelector.groupInfo !== null){
            setPosterImg(groupSelector.groupInfo.logo)
        }
    },[groupSelector.groupInfo])

    if(isAdminGroup){
        return(
            <Stack sx={{mb:10}}>
                <Stack direction={res600 ? "column" : 'row'} sx={{width: '100%', mt: 2}} justifyContent={"flex-start"} alignItems={"center"}>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Stack sx={{maxWidth: 340, width: '95%', mb:1}} justifyContent={"center"} alignItems={"center"}>
                        <Box
                            component="img"
                            sx={{
                                display: 'block',
                                maxWidth: 340,
                                width: '100%',
                                objectFit: 'contain',
                                pl: res600 ? 0 : 2,
                            }}
                            onError={({currentTarget}) => currentTarget.src = `https://umjari-image-bucket.s3.ap-northeast-2.amazonaws.com/images/32/25c55d6f-aee6-484f-903a-9f633af3559d.png`}
                            alt="Concert Image"
                            src={posterImg}
                        />
                        <Button component="label" sx={{mt: 1, pb: -1, maxWidth : 120, minWidth: 120, maxHeight : 40, minHeight: 40}}>
                            <Typography sx={{fontSize: 10, borderBottom: '1px solid black'}} >공연 포스터 올리기</Typography>
                            <input hidden accept="image/*" multiple type="file" onChange={handleFile} />
                        </Button>
                    </Stack>
                    <Stack justifyContent={"flex-start"} sx={{height: '100%', width: '100%', pl: 5, mb:1}}>
                        {
                            res600 ?
                                <Divider sx={{width: '90%', mt: 3, mb: 1}} />
                                :
                                null
                        }
                        <Stack sx={{width: '100%', mt: 1, mb:1}}>
                            <FormControl variant="standard" sx={{width: '90%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">제목을 입력하세요</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                            <FormControl sx={{width: '35%'}}>
                                <Select
                                    value={parent}
                                    onChange={handleParentChange}
                                    displayEmpty
                                    sx={{height: '35px'}}
                                    variant={"standard"}
                                >
                                    {region_parents.map((item, idx) => (
                                        <MenuItem key={idx} value={idx}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{width: '35%', ml : '10%'}}>
                                <Select
                                    value={child}
                                    onChange={handleChildChange}
                                    displayEmpty
                                    sx={{height: '35px'}}
                                    variant={"standard"}
                                >
                                    {region_child[parent].map((item, idx) => (
                                        <MenuItem key={idx} value={idx}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                            <FormControl variant="standard" sx={{width: '90%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">장소를 입력하세요</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={regionDetail}
                                    onChange={(e) => setRegionDetail(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                            <FormControl variant="standard" sx={{width: '40%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">날짜. YYYY-MM-DD 형식입니다.</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </FormControl>
                            <FormControl variant="standard" sx={{ml: '10%', width: '40%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">시간. HH:MM:SS 형식입니다.</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                            <FormControl variant="standard" sx={{width: '40%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">지휘자를 입력하세요. 없는 경우 . 를 입력하세요</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={conductor}
                                    onChange={(e) => setConductor(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction={"row"} sx={{mt:1.5, width: '90%'}} alignItems={"end"} justifyContent={'flex-end'} alignContent={"center"}>
                            <Button size={"small"} variant={'outlined'} sx={{ml : 1,maxWidth: 80, minWidth: 80, fontSize: 11}} onClick={() => navigate(`/group/${id}/recruit`)} >취소</Button>
                            <Button size={"small"} variant={'contained'} sx={{ml : 1,maxWidth: 80, minWidth: 80, fontSize: 11}} onClick={handleAddConcert} >등록</Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={"column"} justifyContent={'center'} alignItems={'center'} sx={{mt: 2, left: '50%'}}>
                    <Typography variant={'h6'} sx={{width: '90%', mt:1}}>부제, 연주곡과 연주자 파트별 추가 및 구체적인 사항(협연자, 러닝타임, 가격, 후원 등)은 콘서트 등록이 완료된 뒤, 콘서트 페이지에서 진행해주시면 됩니다.</Typography>
                    <Typography variant={'subtitle2'} color={'error'} sx={{width: '90%', mt:1}}>비정상적인 요청을 반복적으로 수행시 해당 단체 및 계정에 대한 제제가 있습니다.</Typography>
                    <Typography variant='body1' color={'grey'} sx={{width: '90%', mt:1}}>별도의 포스터 이미지를 업로드 하지 않으면 단체 이미지나 기본 이미지로 설정이 되며, 콘서트 페이지에서 추후 변경이 가능합니다.</Typography>
                </Stack>
            </Stack>
        )
    }
    else{
        return(
            <Stack>
                그룹 관리자가 아닙니다.
            </Stack>
        )
    }

}

export default AddConcert