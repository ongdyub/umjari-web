import {
    Box,
    Button, CircularProgress,
    Divider, FormControl,
    Input,
    InputLabel, MenuItem, Select, SelectChangeEvent,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {concert, concertDetailPut, selectConcert} from "../../store/slices/concert/concert";
import {selectUser} from "../../store/slices/user/user";
import * as React from "react";
import {
    myConcertProfileImageUpload,
} from "../../store/slices/myconcert/myconcert";
import Backdrop from "@mui/material/Backdrop";

const fontTitle = {
    fontSize: 16,
    fontWeight: 600,
    width: '20%',
    minWidth: 93,
}
const fontInfo = {
    fontWeight: 300,
    fontSize: 20,
    pr:2
}

const region_parents = ["서울시","경기도", "수원시", "부산시",]
const region_child = [
    ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
    ['가평시', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평시', '여주시', '연천시', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'],
    ["권선구", "영통구", "장안구", "팔달구"],
    ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"]
]

const ConcertInfo = (props : any) => {

    const {concertData} = props
    const navigate = useNavigate();
    const { id } = useParams();
    const theme = useTheme();

    const dispatch = useDispatch<AppDispatch>();

    const concertState = useSelector(selectConcert)
    const userState = useSelector(selectUser)

    const res600 = useMediaQuery(theme.breakpoints.down("sm"))

    const [loading, setLoading] = useState(false)

    const [isAdminGroup, setIsAdminGroup] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [title, setTitle] = useState<string>('')
    const [subTitle, setSubTitle] = useState<string>('')
    const [posterImg, setPosterImg] = useState<string>(concertData.posterTmg)
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

    const onClickGoGroup = () => {
        navigate(`/group/${concertData.groupId}/recruit`)
    }

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

    const handleEditApply = async () => {
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
        if(concertRunningTime === ''|| concertRunningTime.length < 1){
            window.alert("가격을 입력해주세요.")
            return
        }

        const data = {
            title : title,
            subtitle : subTitle,
            conductor : conductor,
            host : host,
            support : support,
            qna : qna,
            concertInfo : concertData.concertInfo,
            posterImg : posterImg,
            concertDate : date + " " + time,
            concertRunningTime : concertRunningTime,
            fee : fee,
            regionParent : region_parents[parent],
            regionChild : region_child[parent][child],
            regionDetail : regionDetail
        }

        const result = await dispatch(concertDetailPut({data, token : userState.accessToken, id : id}))

        if(result.type == `${concertDetailPut.typePrefix}/fulfilled`){
            dispatch(concert(id))
            setEditMode(false)
        }
    }

    useEffect(() => {
        if(userState.isLogin){
            const userGroup = userState.career.find((userGroup) => userGroup.groupId === concertState.concert?.groupId)
            setPosterImg(concertData.posterImg)
            setTitle(concertData.title)
            setSubTitle(concertData.subtitle)
            setRegionDetail(concertData.regionDetail)
            setDate(concertData.concertDate)
            setTime(concertData.concertTime)
            setConductor(concertData.conductor)
            setFee(concertData.fee)
            setConcertRunningTime(concertData.concertRunningTime)
            setHost(concertData.host)
            setSupport(concertData.support)
            setQna(concertData.qna)
            const regionList = concertData.region.split(" ")
            if(region_parents.indexOf(regionList[0]) > -1){
                setParent(region_parents.indexOf(regionList[0]))
            }
            if(region_child[parent].indexOf(regionList[1]) > -1){
                setChild(region_child[parent].indexOf(regionList[1]))
            }
            if(userGroup !== null && userGroup !== undefined && userGroup.memberType === 'ADMIN'){
                setIsAdminGroup(true)
            }
        }
    },[userState.career, concertState.concert, userState.isLogin])

    return(
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
                    src={editMode ? posterImg : concertData.posterImg}
                />
                    {
                        editMode ?
                            <Button component="label" sx={{mt: 1, pb: -1, maxWidth : 80, minWidth: 80, maxHeight : 30, minHeight: 30}}>
                                <Typography sx={{fontSize: 10, borderBottom: '1px solid black'}} >사진 올리기</Typography>
                                <input hidden accept="image/*" multiple type="file" onChange={handleFile} />
                            </Button>
                            :
                            null
                    }
            </Stack>
            <Stack justifyContent={"flex-start"} sx={{height: '100%', width: '100%', pl: 5, mb:1}}>
                {
                    res600 ?
                        <Divider sx={{width: '90%', mt: 3, mb: 1}} />
                        :
                        null
                }
                <Stack sx={{width: '100%', mt: 1, mb:1}}>
                    {
                        editMode ?
                            <>
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
                            </>
                            :
                            <>
                                <Typography variant={"h3"} sx={{fontSize: 40, fontWeight: 1300, pr: 3}}>{concertData.title}</Typography>
                                <Typography sx={{fontSize: 30, fontWeight: 300, mt: 1, pr: 3}}>{concertData.subtitle}</Typography>
                            </>
                    }
                </Stack>
                <Divider sx={{width: '90%'}} />
                {
                    editMode ?
                        <>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <FormControl sx={{width: '35%'}}>
                                    <Select
                                        defaultValue={concertData.regionParent}
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
                        </>
                        :
                        <>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <Typography sx={fontTitle}>장소</Typography>
                                <Typography sx={fontInfo}>{concertData.regionDetail}</Typography>
                            </Stack>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <Typography sx={fontTitle}>날짜</Typography>
                                <Typography>{concertData.concertDate}</Typography>
                            </Stack>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <Typography sx={fontTitle}>시간</Typography>
                                <Typography>{concertData.concertTime.substring(0, 5)}</Typography>
                            </Stack>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <Typography sx={fontTitle}>지휘자</Typography>
                                <Typography>{concertData.conductor}</Typography>
                            </Stack>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <Typography sx={fontTitle}>가격</Typography>
                                <Typography>{concertData.fee === 0 ? '전석 무료' : concertData.fee}</Typography>
                            </Stack>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <Typography sx={fontTitle}>러닝타임</Typography>
                                <Typography>{concertData.concertRunningTime}분</Typography>
                            </Stack>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <Typography sx={fontTitle}>주최</Typography>
                                <Typography>{concertData.host}</Typography>
                            </Stack>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <Typography sx={fontTitle}>후원</Typography>
                                <Typography>{concertData.support}</Typography>
                            </Stack>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <Typography variant={"subtitle2"} sx={fontTitle}>문의</Typography>
                                <Typography>{concertData.qna}</Typography>
                            </Stack>
                        </>
                }
                <Stack direction={"row"} sx={{mt:1.5, width: '100%', pr: 5}} alignItems={"end"} justifyContent={'flex-end'} alignContent={"center"}>
                    {
                        isAdminGroup ?
                            editMode ?
                                <>
                                    <Button size={"small"} variant={'contained'} color={'info'} onClick={handleEditApply} >적용</Button>
                                    <Button size={"small"} variant={'contained'} color={'success'} sx={{ml : 1}} onClick={() => setEditMode(false)} >취소</Button>
                                </>
                                :
                                <Button size={"small"} variant={'contained'} color={'warning'} onClick={() => setEditMode(true)} >수정</Button>
                            :
                            null
                    }
                    <Button onClick={onClickGoGroup} sx={{ml: 1}} size={"small"} variant="contained">단체 보기</Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ConcertInfo