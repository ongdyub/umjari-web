import {
    Button, Collapse, Divider,
    FormControl,
    List, ListItemButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import {useState} from "react";
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {koKR} from "@mui/x-date-pickers/locales";
import ko from 'dayjs/locale/ko';
import {useSearchParams} from "react-router-dom";

export const region_parents = ["전체","서울시","부산시","대구시","인천시","광주시","대전시","울산시","세종시","경기도","강원도", "충청북도", "충청남도", "경상북도", "경상남도", "전라북도", "전라남도", "제주도"]
export const region_child = [
    ["전체"],
    ["전체", "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
    ["전체", "강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
    ["전체", "군위군","중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"],
    ["전체", "강화군", "계양구", "남동구","동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"],

    ["전체", "광산구", "남구", "동구", "북구", "서구"],
    ["전체", "대덕구", "동구", "서구", "유성구", "중구"],
    ["전체", "남구", "동구", "북구", "울주군", "중구"],
    ["전체", "가람동", "고운동", "금남면", "나성동", "다정동", "대평동", "도담동", "보람동", "부강면", "새롬동", "소담동", "소정면", "아름동", "어진동", "연동면", "연서면", "장군면", "전동면", "전의면", "조치원읍", "한솔동"],

    ["전체", '가평시', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평시', '여주시', '연천시', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'],
    ["전체", "강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"],
    ["전체", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "증평군", "진천군", "청주시", "충주시"],
    ["전체", "계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군", "아산시", "예산군", "천안시", "청양군", "태안군", "홍성군"],
    ["전체", "경산시", "경주시", "고령군", "구미시", "김천시", "문경시", "봉화군", "상주시", "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시"],
    ["전체", "거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "창녕군", "창원시", "통영시", "하동군", "함안군", "함양군", "합천군"],
    ["전체", "고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시", "임실군", "장수군", "전주시", "정읍시", "진안군"],
    ["전체", "강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"],
    ["전체", "서귀포시", "제주시"]
]

const ConcertFilter = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const theme = useTheme();
    const res800 = useMediaQuery(theme.breakpoints.down("res800"))

    const [parent, setParent] = useState<any>(0);
    const [child, setChild] = useState<any>(0);

    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs())
    const [endDate, setEndDate] = useState<Dayjs | null>( null)

    const [searchText, setSearchText] = useState<string>("")
    const [composer, setComposer] = useState('')
    const [musicName, setMusicName] = useState('')

    const [open, setOpen] = useState(false)

    const menuOpen = () => {
        setOpen((!open))
    }
    const resetDate = () => {
        setStartDate(null)
        setEndDate(null)
    }

    const handleParentChange = (event: SelectChangeEvent) => {
        setParent(event.target.value);
        setChild(0)
    };
    const handleChildChange = (event: SelectChangeEvent) => {
        setChild(event.target.value);
    };

    const handleSearchButton = async () => {
        if(startDate?.isAfter(endDate)){
            window.alert("날짜 순서를 다시 설정해주세요")
            return
        }

        searchParams.set('regionParent',region_parents[parent].toString())
        searchParams.set('regionChild',region_child[parent][child].toString())
        if(startDate !== null){
            searchParams.set('startDate', startDate.format('YYYY-MM-DD'))
        }
        else{
            searchParams.set('startDate', '')
        }
        if(endDate !== null){
            searchParams.set('endDate', endDate.format('YYYY-MM-DD'))
        }
        else{
            searchParams.set('endDate', '')
        }
        searchParams.set('composer',composer)
        searchParams.set('musicName',musicName)
        searchParams.set('text',searchText)
        searchParams.set('page','1')

        setSearchParams(searchParams)

    }

    return (
        <Stack direction={'row'}
               justifyContent={res800 ? "flex-start" : "space-around"}
               alignItems="center"
               sx={{height: res800 ? 'auto' : '95px', width: '100%', pl: res800 ? 0 : 5, pr: res800 ? 0 : 5}}
        >
            {
                res800 ?
                    <List component="nav" sx={{width: '100%', justifyContent:"flex-start", alignItems:"center"}}>
                        <Stack onClick={menuOpen} justifyContent="flex-start" alignItems="center" sx={{width: '100%', mt: -1,}}>
                            <Divider sx={{width: '40%', border: 'solid 0.4px white'}} />
                            <ListItemButton sx={{width: '100%', display: 'flex', justifyContent:"center", alignItems:"center"}}>
                                <Typography sx={{width: 'auto', fontSize : 13}}>
                                    {open ? '필터 접기' : '필터 펼치기'}
                                </Typography>
                                {open ? <ExpandLess sx={{pl: '2'}} /> : <ExpandMore sx={{pl: '2'}} />}
                            </ListItemButton>
                        </Stack>
                        <Divider orientation={"horizontal"} sx={{mt: -0.5}}/>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Stack justifyContent="flex-start" alignItems="center" sx={{width: '100%', mt:1, mb: 1}} direction={"column"}>

                                <Stack direction={'row'} sx={{width: '100%'}} alignItems={'center'}>
                                    <Stack direction={'row'} sx={{width: '33%', textAlign: 'center'}} justifyContent={'center'} alignItems={'center'}>
                                        <Typography sx={{width: '100%', fontWeight: 400, fontSize: 11}}>지역</Typography>
                                    </Stack>
                                    <Stack direction={'row'} sx={{width: '33%', textAlign: 'center'}} justifyContent={'center'} alignItems={'center'}>
                                        <Typography sx={{width: '100%', fontWeight: 400, fontSize: 11}}>날짜</Typography>
                                    </Stack>
                                    <Stack direction={'row'} sx={{width: '33%', textAlign: 'center'}} justifyContent={'center'} alignItems={'center'}>
                                        <Typography sx={{width: '100%', fontWeight: 400, fontSize: 11}}>텍스트</Typography>
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'} sx={{width: '100%'}} alignItems={'center'}>
                                    <Stack direction={'row'} sx={{width: '33%'}} justifyContent={'center'} alignItems={'center'}>
                                        <FormControl sx={{width: '80%'}}>
                                            <Select
                                                value={parent}
                                                onChange={handleParentChange}
                                                displayEmpty
                                                sx={{height: '30px', fontSize:11}}
                                                variant={"standard"}
                                            >
                                                {region_parents.map((item, idx) => (
                                                    <MenuItem key={idx} value={idx} sx={{fontSize:11}}>{item}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                    <Stack direction={'row'} sx={{width: '33%'}} justifyContent={'center'} alignItems={'center'}>
                                        <FormControl sx={{width: '70%'}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{width: '100%'}} adapterLocale={ko} localeText={koKR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                                <DatePicker
                                                    inputFormat={'YYYY-MM-DD'}
                                                    views={['year', 'month', 'day']}
                                                    value={startDate}
                                                    onChange={(newValue) => setStartDate(newValue)}
                                                    InputProps={{
                                                        style: {
                                                            marginTop: 4,
                                                            height: "22px",
                                                            width: "100%",
                                                            fontSize: 10,
                                                        },
                                                    }}
                                                    renderInput={(params: any) => (
                                                        <TextField {...params } />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Stack>
                                    <Stack direction={'row'} sx={{width: '33%'}} justifyContent={'center'} alignItems={'center'}>
                                        <TextField
                                            inputProps={{
                                                style: {
                                                    fontSize: 10, // adjust the font size here
                                                },
                                            }}
                                            type="search"
                                            variant="standard"
                                            placeholder={"작곡가를 입력하세요."}
                                            value={composer}
                                            onChange={(e) => setComposer(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearchButton().then(() => {});
                                                }
                                            }}
                                            sx={{width: '90%', fontSize:10}}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'} sx={{width: '100%'}} alignItems={'center'}>
                                    <Stack direction={'row'} sx={{width: '33%'}} justifyContent={'center'} alignItems={'center'}>
                                        <FormControl sx={{width: '80%'}}>
                                            <Select
                                                value={child}
                                                onChange={handleChildChange}
                                                displayEmpty
                                                sx={{height: '30px', fontSize: 11}}
                                                variant={"standard"}
                                            >
                                                {region_child[parent].map((item, idx) => (
                                                    <MenuItem key={idx} value={idx} sx={{fontSize:11}}>{item}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                    <Stack direction={'row'} sx={{width: '33%'}} justifyContent={'center'} alignItems={'center'}>
                                        <FormControl sx={{width: '70%'}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{width: '100%'}} adapterLocale={ko} localeText={koKR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                                <DatePicker
                                                    inputFormat={'YYYY-MM-DD'}
                                                    views={['year', 'month', 'day']}
                                                    value={endDate}
                                                    onChange={(newValue) => setEndDate(newValue)}
                                                    InputProps={{
                                                        style: {
                                                            marginTop: 4,
                                                            height: "22px",
                                                            width: "100%",
                                                            fontSize: 10,
                                                        },

                                                    }}
                                                    renderInput={(params: any) => (
                                                        <TextField {...params } />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Stack>
                                    <Stack direction={'row'} sx={{width: '33%'}} justifyContent={'center'} alignItems={'center'}>
                                        <TextField
                                            inputProps={{
                                                style: {
                                                    fontSize: 10, // adjust the font size here
                                                },
                                            }}
                                            id="standard-search"
                                            type="search"
                                            variant="standard"
                                            placeholder={"곡이름을 입력하세요."}
                                            value={musicName}
                                            onChange={(e) => setMusicName(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearchButton().then(() => {});
                                                }
                                            }}
                                            sx={{width: '90%', fontSize:10}}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{width: '100%', mt:1.5}}>
                                    <Stack direction={'row'} alignItems={'center'} sx={{width: '33%'}} justifyContent={'flex-end'}>
                                        <Button variant="contained" size={"small"} sx={{bgcolor: '#292929', color: 'white', width: '10%', fontSize : 10, maxHeight: 25, minHeight: 25, maxWidth: 70, minWidth: 70, mr:'10%'}} onClick={resetDate}>날짜 초기화</Button>
                                        <Button variant="contained" size={"small"} sx={{bgcolor: '#292929', color: 'white', width: '10%', fontSize : 10, maxHeight: 25, minHeight: 25, maxWidth: 70, minWidth: 70, mr:'5%'}} onClick={handleSearchButton}>검색하기</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Collapse>
                    </List>
                    :
                    <Stack direction={'column'} justifyContent={'center'} alignItems="center" sx={{height:'85px', width: '100%', pl: 1, pr: 1}}>
                        <Stack direction={'row'} alignItems={'center'} sx={{width: '100%', mt:0.5, mb:1}} justifyContent={"flex-start"} >
                            <Typography sx={{fontSize: 10, mr : 2}}>지역 1</Typography>
                            <FormControl sx={{width: '15%', mr : 5}}>
                                <Select
                                    value={parent}
                                    onChange={handleParentChange}
                                    displayEmpty
                                    sx={{height: '35px', fontSize : 12}}
                                    variant={"standard"}
                                >
                                    {region_parents.map((item, idx) => (
                                        <MenuItem key={idx} value={idx} sx={{fontSize:12}}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Typography sx={{fontSize: 10, mr:2}}>시작</Typography>
                            <FormControl sx={{width: '20%', mr:5}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} sx={{width: '100%'}} adapterLocale={ko} localeText={koKR.components.MuiLocalizationProvider.defaultProps.localeText}>
                                    <DatePicker
                                        inputFormat={'YYYY-MM-DD'}
                                        views={['year', 'month', 'day']}
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                        InputProps={{
                                            style: {
                                                marginTop: 4,
                                                height: "30px",
                                                width: "100%",
                                                fontSize: "small",
                                                border: 'none',
                                                outline: 'none'
                                            },
                                        }}
                                        renderInput={(params: any) => (
                                            <TextField {...params } />
                                        )}
                                    />
                                </LocalizationProvider>
                            </FormControl>

                            <Typography sx={{fontSize: 10, mr:2}}>작곡가</Typography>
                            <TextField
                                id="standard-search"
                                type="search"
                                variant="standard"
                                placeholder={"작곡가를 입력하세요"}
                                inputProps={{
                                    style: {
                                        fontSize: 10, // adjust the font size here
                                    },
                                }}
                                value={composer}
                                onChange={(e) => setComposer(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearchButton().then(() => {});
                                    }
                                }}
                                sx={{width: '20%',mr:5, fontSize: 10}}
                            />
                            <Button variant="contained" size={"small"} sx={{bgcolor: '#292929', color: 'white', width: '10%', fontSize : 10, maxHeight: 25, minHeight: 25, maxWidth: 70, minWidth: 70}} onClick={resetDate}>날짜 초기화</Button>
                        </Stack>

                        <Stack direction={'row'} alignItems={'center'} sx={{width: '100%', mb:1}} justifyContent={"flex-start"} >
                            <Typography sx={{fontSize: 10, mr:2}}>지역 2</Typography>
                            <FormControl sx={{width: '15%', mr:5}}>
                                <Select
                                    value={child}
                                    onChange={handleChildChange}
                                    displayEmpty
                                    sx={{height: '35px', fontSize : 12}}
                                    variant={"standard"}
                                >
                                    {region_child[parent].map((item, idx) => (
                                        <MenuItem key={idx} value={idx} sx={{fontSize: 12}}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Typography sx={{fontSize: 10, mr:2}}>종료</Typography>
                            <FormControl sx={{width: '20%', mr:5}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ko} localeText={koKR.components.MuiLocalizationProvider.defaultProps.localeText} sx={{width: '100%'}}>
                                    <DatePicker
                                        inputFormat={'YYYY-MM-DD'}
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                        InputProps={{
                                            style: {
                                                marginTop: 4,
                                                height: "30px",
                                                width: "100%",
                                                fontSize: "small",
                                                border: 'none',
                                                outline: 'none'
                                            },

                                        }}
                                        renderInput={(params: any) => (
                                            <TextField {...params } />
                                        )}
                                    />
                                </LocalizationProvider>
                            </FormControl>

                            <Typography sx={{fontSize: 10, mr:2}}>곡이름</Typography>
                            <TextField
                                id="standard-search"
                                type="search"
                                variant="standard"
                                placeholder={"곡이름을 입력하세요"}
                                inputProps={{
                                    style: {
                                        fontSize: 10, // adjust the font size here
                                    },
                                }}
                                value={musicName}
                                onChange={(e) => setMusicName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearchButton().then(() => {});
                                    }
                                }}
                                sx={{width: '20%', mr:5, fontSize: 10}}
                            />

                            <Button variant="contained" size={"small"} sx={{bgcolor: '#292929', color: 'white', width: '10%', fontSize : 10, maxHeight: 25, minHeight: 25, maxWidth: 70, minWidth: 70}} onClick={handleSearchButton}>검색하기</Button>

                        </Stack>
                    </Stack>
            }

        </Stack>
    );
}

export default ConcertFilter
