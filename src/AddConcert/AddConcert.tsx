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

const AddConcert = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const theme = useTheme();

    const dispatch = useDispatch<AppDispatch>();

    const concertState = useSelector(selectConcert)
    const userState = useSelector(selectUser)

    const res600 = useMediaQuery(theme.breakpoints.down("sm"))

    const [loading, setLoading] = useState(false)

    const [isAdminGroup, setIsAdminGroup] = useState(false)

    const [title, setTitle] = useState<string>('')
    const [subTitle, setSubTitle] = useState<string>('')
    const [posterImg, setPosterImg] = useState<string>('https://umjari-image-bucket.s3.ap-northeast-2.amazonaws.com/images/N_ongdyub/d85f613d-f56b-4e1c-9191-cf65eda10913.png')
    const [parent, setParent] = useState<any>(0);
    const [child, setChild] = useState<any>(0);
    const [regionDetail, setRegionDetail] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [conductor, setConductor] = useState<string>('')
    const [fee, setFee] = useState<string>('')
    const [concertRunningTime, setConcertRunningTime] = useState<string>('')
    const [host, setHost] = useState<string>('')
    const [support, setSupport] = useState<string>('')
    const [qna, setQna] = useState<string>('')

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
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
        setSubTitle(subTitle.trim())
        if(subTitle === '' || subTitle.length < 1){
            window.alert("부제를 입력하세요.")
            return
        }
        setConductor(conductor.trim())
        if(conductor === '' || conductor.length < 1){
            window.alert("지휘자를 입력하세요. 없는 경우에는 . 을 입력해 주세요.")
            return
        }
        setRegionDetail(regionDetail.trim())
        if(regionDetail === '' || regionDetail.length < 1){
            window.alert("장소를 입력하세요.")
            return
        }
        if(!checkDate(date)){
            window.alert("날짜 형식을 확인해주세요.")
            return
        }
        if(!checkTime(time)){
            window.alert("시간 형식을 확인해주세요.")
            return
        }
        if(fee === ''|| fee.length < 1){
            window.alert("가격을 입력해주세요.")
            return
        }
        if(parseInt(fee) < 0 || !Number.isInteger(parseFloat(fee))){
            window.alert("가격은 0 이상의 정수여야합니다.")
            return
        }
        if(concertRunningTime === ''|| concertRunningTime.length < 1){
            window.alert("러닝타임을 입력해주세요.")
            return
        }
        if(parseInt(concertRunningTime) <= 0 || !Number.isInteger(parseFloat(concertRunningTime))){
            window.alert("러닝타임은 0보다 큰 정수여야합니다.")
            return
        }

        const data = {
            title : title,
            subtitle : subTitle,
            conductor : conductor,
            host : host,
            support : support,
            qna : qna,
            concertInfo : '.',
            posterImg : posterImg,
            concertDate : date + " " + time,
            concertRunningTime : concertRunningTime,
            fee : fee,
            regionParent : region_parents[parent],
            regionChild : region_child[parent][child],
            regionDetail : regionDetail,
            musicIds : []
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
        }
    },[userState.career, concertState.concert, userState.isLogin])

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
                            alt="The house from the offer."
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
                            <FormControl variant="standard" sx={{width: '90%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">부제를 입력하세요</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={subTitle}
                                    onChange={(e) => setSubTitle(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        <Divider sx={{width: '90%'}} />
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
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">지휘자를 입력하세요</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={conductor}
                                    onChange={(e) => setConductor(e.target.value)}
                                />
                            </FormControl>
                            <FormControl variant="standard" sx={{ml: '10%', width: '40%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">가격을 입력하세요</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    type={"number"}
                                    value={fee}
                                    onChange={(e) => setFee(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                            <FormControl variant="standard" sx={{width: '40%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">러닝타임을 입력하세요</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    type={"number"}
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={concertRunningTime}
                                    onChange={(e) => setConcertRunningTime(e.target.value)}
                                />
                            </FormControl>
                            <FormControl variant="standard" sx={{ml: '10%', width: '40%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">주최자를 입력하세요</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={host}
                                    onChange={(e) => setHost(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction={"row"} sx={{mt:1.5, mb: 1}} alignItems={"center"} alignContent={"center"}>
                            <FormControl variant="standard" sx={{width: '40%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">후원을 입력하세요</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={support}
                                    onChange={(e) => setSupport(e.target.value)}
                                />
                            </FormControl>
                            <FormControl variant="standard" sx={{ml: '10%', width: '40%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">문의를 입력하세요</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={qna}
                                    onChange={(e) => setQna(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction={"row"} sx={{mt:1.5, width: '100%', pr: 5}} alignItems={"end"} justifyContent={'flex-end'} alignContent={"center"}>
                            <Button size={"small"} variant={'outlined'} sx={{ml : 1,maxWidth: 80, minWidth: 80, fontSize: 11}} onClick={() => navigate(`/group/${id}/recruit`)} >취소</Button>
                            <Button size={"small"} variant={'contained'} sx={{ml : 1,maxWidth: 80, minWidth: 80, fontSize: 11}} onClick={handleAddConcert} >등록</Button>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction={"column"} justifyContent={'center'} alignItems={'center'} sx={{mt: 2, left: '50%'}}>
                    <Typography variant={'h6'} sx={{width: '90%', mt:1}}>곡과 연주자 설정은 콘서트 등록이 완료된 뒤, 콘서트 페이지에서 진행해주시면 됩니다.</Typography>
                    <Typography variant={'subtitle2'} color={'error'} sx={{width: '90%', mt:1}}>비정상적인 요청을 반복적으로 수행시 해당 단체 및 계정에 대한 제제가 있습니다.</Typography>
                    <Typography variant='body1' color={'grey'} sx={{width: '90%', mt:1}}>별도의 포스터 이미지를 업로드 하지 않으면 기본 이미지로 설정이 되며, 콘서트 페이지에서 추후 변경이 가능합니다.</Typography>
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