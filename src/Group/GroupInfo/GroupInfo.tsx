import {
    Box,
    Button, Chip, CircularProgress,
    Divider,
    FormControl,
    Input,
    InputLabel,
    Link, MenuItem, Select, SelectChangeEvent,
    Stack, TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../store/slices/user/user";
import {useNavigate, useParams} from "react-router-dom";
import * as React from "react";
import {region_child, region_parents} from "../../Concert/ConcertInfo/ConcertInfo";
import {myConcertProfileImageUpload} from "../../store/slices/myconcert/myconcert";
import Backdrop from "@mui/material/Backdrop";
import {AppDispatch} from "../../store";
import {groupInfo, groupInfoPut} from "../../store/slices/group/group";

const GroupInfo = (props : any) => {

    const {groupData} = props

    const theme = useTheme();
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    const [loading, setLoading] = useState(false)

    const userState = useSelector(selectUser)

    const [isAdminGroup, setIsAdminGroup] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)

    const [logo, setLogo] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [practiceTime, setPracticeTime] = useState<string>('')
    const [audition, setAudition] = useState<boolean>(false)
    const [membershipFee, setMembershipFee] = useState<string>('')
    const [monthlyFee, setMonthlyFee] = useState<string>('')
    const [parent, setParent] = useState<any>(0);
    const [child, setChild] = useState<any>(0);
    const [regionDetail, setRegionDetail] = useState<string>('')
    const [homepage, setHomepage] = useState<string>('')
    const [detailIntro, setDetailIntro] = useState<string>('')
    const [tagItem, setTagItem] = useState<string>('')

    const handleLinkClick = (event : any) => {
        if (groupData.homepage === "" || groupData.homepage === null) {
            event.preventDefault();
            alert("홈페이지가 존재하지 않습니다.");
        }
    }

    const handleFile = async (e : any) => {

        setLoading(true)

        const formData = new FormData()
        formData.append('image', e.target.files[0])

        const result = await dispatch(myConcertProfileImageUpload({token: userState.accessToken, formData: formData}))

        if (result.type === `${myConcertProfileImageUpload.typePrefix}/fulfilled`) {
            setLogo(result.payload.url)
            setLoading(false)
        } else {
            setLoading(false)
            window.alert("이미지 업로드 실패. 용량(50MB)과 네트워크를 확인해 주세요")
        }
    }

    const handleParentChange = (event: SelectChangeEvent) => {
        setParent(event.target.value);
        setChild(0)
    };
    const handleChildChange = (event: SelectChangeEvent) => {
        setChild(event.target.value);
    };

    const handleEditApply = async () => {
        setName(name.trim())
        if(name === '' || name.length < 1){
            window.alert("이름을 입력하세요")
            return
        }
        setPracticeTime(practiceTime.trim())
        if(practiceTime === '' || practiceTime.length < 1){
            window.alert("연습 시간을 입력하세요")
            return
        }
        if(parseInt(membershipFee) < 0 || !Number.isInteger(parseFloat(membershipFee))){
            window.alert("연주회비는 0 이상의 정수여야합니다.")
            return
        }
        if(parseInt(monthlyFee) < 0 || !Number.isInteger(parseFloat(monthlyFee))){
            window.alert("월회비는 0 이상의 정수여야합니다.")
            return
        }
        setRegionDetail(regionDetail.trim())
        if(regionDetail === '' || regionDetail.length < 1){
            window.alert("장소를 입력하세요.")
            return
        }

        const tagRegex = /,+/g;
        const tagString = tagItem.replace(tagRegex, ',');
        const tagList = tagString.split(',')
        if(tagList.length > 10){
            window.alert("최대 10개의 태그만 만들 수 있습니다.")
            return
        }
        if(tagList.some(str => str.length >= 11)){
            window.alert("한 태그는 최대 10자까지 가능합니다.")
            return
        }

        const data = {
            name : name,
            logo : logo,
            practiceTime : practiceTime,
            audition : audition,
            membershipFee : membershipFee,
            monthlyFee : monthlyFee,
            regionParent : region_parents[parent],
            regionChild : region_child[parent][child],
            regionDetail : regionDetail,
            homepage : homepage,
            detailIntro : detailIntro,
            tags : tagList
        }

        const result = await dispatch(groupInfoPut({data, token : userState.accessToken, id : id}))

        if(result.type === `${groupInfoPut.typePrefix}/fulfilled`){
            dispatch(groupInfo(id))
            setEditMode(false)
        }

    }

    useEffect(() => {
        if(userState.isLogin){
            const userGroup = userState.career.find((userGroup) => userGroup.groupId.toString() === id)
            setName(groupData.name)
            setLogo(groupData.logo)
            setPracticeTime(groupData.practiceTime)
            setAudition(groupData.audition)
            setMembershipFee(groupData.membershipFee)
            setMonthlyFee(groupData.monthlyFee)
            const regionList = groupData.region.split(" ")
            if(region_parents.indexOf(regionList[0]) > -1){
                setParent(region_parents.indexOf(regionList[0]))
            }
            if(region_child[parent].indexOf(regionList[1]) > -1){
                setChild(region_child[parent].indexOf(regionList[1]))
            }
            setRegionDetail(groupData.regionDetail)
            setHomepage(groupData.homepage)
            setDetailIntro(groupData.detailIntro)
            setTagItem(groupData.tags.join(','))

            if(userGroup !== null && userGroup !== undefined && userGroup.memberType === 'ADMIN'){
                setIsAdminGroup(true)
            }
        }
    },[userState.career, userState.isLogin])

    return(
        <Stack direction={res700 ? "column" : "row"} sx={{mt: res700 ? 1 : 2, mb:res700 ? 0.5 : 2}} >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stack direction={res700 ? "row" : "column"} sx={{pl: res700 ? 0 : 6, pr: res700 ? 0 : 6, mb: res700 ? 1 : 2}} alignContent={"center"} alignItems={"center"}>
                <Stack direction={"row"} alignContent={"center"} alignItems={"center"} sx={{width: res700 ? 'calc(100% - 100px)' : 'auto'}}>
                    {
                        isAdminGroup && editMode ?
                            <FormControl variant="standard" sx={{ml:'10%',width: '70%'}}>
                                <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">단체명을 입력하세요</InputLabel>
                                <Input
                                    id="standard-adornment-amount"
                                    sx={{fontSize: 12, pt: 0.5}}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                            :
                            <Typography align={"center"} sx={{fontSize: res700 ? 24 : 30,fontFamily: "Open Sans",fontWeight: 100, wordWrap: "break-word", width: res700 ? '100%' : 150, pl: res700 ? 2 : 0}}>{groupData.name}</Typography>
                    }
                </Stack>
                <Box
                    component="img"
                    sx={{
                        display: 'block',
                        width: res700 ? 50 : 200,
                        ml: res700 ? 'auto' : 0,
                        mr: res700 ? 5 : 0,
                        mt: res700 ? 0 : 2,
                        objectFit: 'contain',
                        // border: '0.5px solid black'
                    }}
                    onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                    alt="Image description"
                    src={editMode ? logo :`${groupData.logo}`}
                />
                {
                    isAdminGroup && editMode ?
                        <Button component="label" sx={{mt: 1, pb: -1, maxWidth : 80, minWidth: 80, maxHeight : 30, minHeight: 30}}>
                            <Typography sx={{fontSize: 10, borderBottom: '1px solid black'}} >사진 올리기</Typography>
                            <input hidden accept="image/*" multiple type="file" onChange={handleFile} />
                        </Button>
                        :
                        null
                }
            </Stack>

            {
                res700 ?
                    <Divider orientation={"horizontal"} />
                    :
                    <Divider orientation={"vertical"} />
            }

            <Stack sx={{pl:3, pt: 2, width: '100%'}}>
                <Stack sx={{width: '100%'}} direction={isAdminGroup && editMode ? "column" : "row"} alignContent={"center"} alignItems={"center"}>
                    {
                        isAdminGroup && editMode ?
                            <Stack direction={"row"} sx={{width: '100%',mt: -1, mb:1}} alignItems={"center"} alignContent={"center"}>
                                <FormControl sx={{width: '40%'}}>
                                    <Select
                                        value={parent}
                                        onChange={handleParentChange}
                                        displayEmpty
                                        sx={{height: '35px', fontSize:13}}
                                        variant={"standard"}
                                    >
                                        {region_parents.map((item, idx) => (
                                            <MenuItem key={idx} value={idx}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{width: '40%', ml: '5%'}}>
                                    <Select
                                        value={child}
                                        onChange={handleChildChange}
                                        displayEmpty
                                        sx={{height: '35px', fontSize: 13}}
                                        variant={"standard"}
                                    >
                                        {region_child[parent].map((item, idx) => (
                                            <MenuItem key={idx} value={idx}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                            :
                            <>
                                <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>연습 장소</Typography>
                                <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                            </>
                    }
                    {
                        isAdminGroup && editMode ?
                            null
                            :
                            <Typography sx={{ml:1.5, mr:1.5}}>{groupData.region} {groupData.regionDetail}</Typography>
                    }
                </Stack>
                {
                    isAdminGroup && editMode ?
                        <>
                            <Stack direction={"row"} alignItems={"center"} alignContent={"center"}>
                                <FormControl variant="standard" sx={{width: '90%'}}>
                                    <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">연습 장소를 입력하세요</InputLabel>
                                    <Input
                                        id="standard-adornment-amount"
                                        sx={{fontSize: 12, pt: 0.5}}
                                        value={regionDetail}
                                        onChange={(e) => setRegionDetail(e.target.value)}
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction={"row"} alignItems={"center"} alignContent={"center"}>
                                <FormControl variant="standard" sx={{width: '90%'}}>
                                    <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">연습시간을 입력하세요</InputLabel>
                                    <Input
                                        id="standard-adornment-amount"
                                        sx={{fontSize: 12, pt: 0.5}}
                                        value={practiceTime}
                                        onChange={(e) => setPracticeTime(e.target.value)}
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <FormControl variant="standard" sx={{width: '40%'}}>
                                    <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">연주회비를 입력하세요.</InputLabel>
                                    <Input
                                        type={'number'}
                                        id="standard-adornment-amount"
                                        sx={{fontSize: 12, pt: 0.5}}
                                        value={membershipFee}
                                        onChange={(e) => setMembershipFee(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="standard" sx={{ml: '10%', width: '40%'}}>
                                    <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">월회비를 입력하세요.</InputLabel>
                                    <Input
                                        id="standard-adornment-amount"
                                        type={'number'}
                                        sx={{fontSize: 12, pt: 0.5}}
                                        value={monthlyFee}
                                        onChange={(e) => setMonthlyFee(e.target.value)}
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <FormControl variant="standard" sx={{width: '40%'}}>
                                    <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">홈페이지를 입력하세요.</InputLabel>
                                    <Input
                                        id="standard-adornment-amount"
                                        sx={{fontSize: 12, pt: 0.5}}
                                        placeholder={"http://, https://, www. 를 반드시 붙여주세요"}
                                        value={homepage}
                                        onChange={(e) => setHomepage(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl variant="standard" sx={{ml: '10%', width: '40%', pt:1}}>
                                    <Button onClick={() => setAudition(!audition)} variant={audition ? "contained" : "outlined"} sx={{maxWidth: '100%'}}>
                                        오디션 : {audition ? '있음' : '없음'}
                                    </Button>
                                </FormControl>
                            </Stack>
                            <Stack direction={"row"} sx={{mt:1.5}} alignItems={"center"} alignContent={"center"}>
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="상세 소개를 입력하세요."
                                    multiline
                                    maxRows={4}
                                    variant="standard"
                                    value={detailIntro}
                                    onChange={(e) => setDetailIntro(e.target.value)}
                                    sx={{width: '90%', fontSize:11}}
                                />
                            </Stack>
                            <Stack sx={{mt:1}} direction={"row"} alignItems={"center"} alignContent={"center"}>
                                <FormControl variant="standard" sx={{width: '90%'}}>
                                    <InputLabel sx={{fontSize : 11, pt: 1}} htmlFor="standard-adornment-amount">한 태그당 최대 10자, 최대 10개 등록 가능하며 쉼표로 구분해서 입력해주세요.</InputLabel>
                                    <Input
                                        id="standard-adornment-amount"
                                        sx={{fontSize: 12, pt: 0.5}}
                                        value={tagItem}
                                        onChange={(e) => setTagItem(e.target.value)}
                                    />
                                </FormControl>
                            </Stack>
                        </>
                        :
                        <>
                            <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>연습 시간</Typography>
                                <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                                <Typography sx={{ml:1.5, mr:1.5}}>{groupData.practiceTime}</Typography>
                            </Stack>

                            <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>오디션</Typography>
                                <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                                <Typography sx={{ml:1.5, mr:1.5}}>{groupData.audition ? '있음' : '없음'}</Typography>
                            </Stack>

                            <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>연주회비</Typography>
                                <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                                <Typography sx={{ml:1.5, mr:1.5}}>{groupData.membershipFee}</Typography>
                            </Stack>

                            <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>월회비</Typography>
                                <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                                <Typography sx={{ml:1.5, mr:1.5}}>{groupData.monthlyFee}</Typography>
                            </Stack>

                            <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>홈페이지</Typography>
                                <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                                <Link href={groupData.homepage.startsWith("https://") || groupData.homepage.startsWith("http://") ? groupData.homepage : "https://" + groupData.homepage} target="_blank" rel="noopener" sx={{ ml: 1.5 }} onClick={handleLinkClick}>
                                    {(groupData.homepage === "" || groupData.homepage === null) ? '홈페이지 없음' : '홈페이지 바로가기'}
                                </Link>
                            </Stack>

                            <Stack sx={{mt: 2}} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>상세 소개</Typography>
                                <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                                <Typography sx={{ml:1.5, mr:1.5, pr:1}}>{groupData.detailIntro}</Typography>
                            </Stack>

                            {
                                groupData.tags.length < 1 ?
                                    null
                                    :
                                    (
                                        <Stack sx={{ mt: 2 }} direction={"row"} alignContent={"center"} alignItems={"center"}>
                                            <Typography sx={{fontSize: 17, fontWeight: 900, minWidth: 70}}>태그</Typography>
                                            <Divider orientation={"vertical"} sx={{height: '70%', ml:1, mr:1}} />
                                            <Stack direction={'row'} sx={{width: 'calc(100% - 90px)'}} flexWrap={'wrap'}>
                                                {
                                                    groupData.tags.map((item : string, idx : number) => (
                                                        <Chip sx={{mr : 1, mb:1}} key={idx} label={`#${item}`} />
                                                    ))
                                                }
                                            </Stack>

                                        </Stack>
                                    )
                            }
                        </>
                }
                <Stack direction={"row"} sx={{mt:2, width: '100%', pr: 5}} alignItems={"end"} justifyContent={'flex-end'} alignContent={"center"}>
                    {
                        isAdminGroup ?
                            editMode ?
                                <>
                                    <Button size={"small"} sx={{maxWidth: 45, minWidth: 45, fontSize: 11}} variant={'contained'} color={'info'} onClick={handleEditApply}>적용</Button>
                                    <Button size={"small"} variant={'contained'} color={'success'} sx={{ml : 1,maxWidth: 45, minWidth: 45, fontSize: 11}} onClick={() => setEditMode(false)} >취소</Button>
                                </>
                                :
                                <>
                                    <Button size={"small"} sx={{maxWidth: 45, minWidth: 45, fontSize: 11}} variant={'contained'} color={'warning'} onClick={() => setEditMode(true)} >수정</Button>
                                    <Button size={"small"} variant={'contained'} color={"secondary"} sx={{ml : 1,maxWidth: 80, minWidth: 80, fontSize: 11}} onClick={() => navigate(`/add/${id}`)} >공연추가</Button>
                                </>
                            :
                            null
                    }
                </Stack>
            </Stack>
        </Stack>
    )
}

export default GroupInfo