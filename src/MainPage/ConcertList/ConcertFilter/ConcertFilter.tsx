import {
    Box,
    Button, Chip, Collapse, Divider,
    FormControl, FormHelperText,
    InputLabel, List, ListItemButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import {useState} from "react";
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const region_parents = ["서울시", "수원시", "부산시",]
const region_child = [
    ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
    ["권선구", "영통구", "장안구", "팔달구"],
    ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"]
]

const result = region_parents.flatMap((parent, index) =>
    region_child[index].map((child) => ({
        id: index * region_child[0].length + region_child[index].indexOf(child),
        region_parent: parent,
        region_child: child,
    }))
);

const ConcertFilter = () => {

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))
    const res800 = useMediaQuery(theme.breakpoints.down("res800"))
    const [age, setAge] = useState('');
    const [value, setValue] = useState<Dayjs | null>(null);
    const [open, setOpen] = useState(false)

    const menuOpen = () => {
        setOpen((!open))
    }

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <Stack direction={'row'}
               justifyContent={res800 ? "flex-start" : "space-around"}
               alignItems="center"
               sx={{height: res800 ? 'auto' : '80px', width: '100%', pl: res800 ? 0 : 5, pr: res800 ? 0 : 5}}
        >
            {
                res800 ?
                    <List component="nav" sx={{width: '100%', justifyContent:"flex-start", alignItems:"center"}}>
                        <Stack onClick={menuOpen} justifyContent="flex-start" alignItems="center" sx={{width: '100%', mt: -1}}>
                            <Divider sx={{width: '40%', border: 'solid 0.4px white'}} />
                            <ListItemButton sx={{width: '100%', display: 'flex', justifyContent:"center", alignItems:"center"}}>
                                <Typography sx={{width: 'auto'}}>
                                    {open ? '필터 접기' : '필터 펼치기'}
                                </Typography>
                                {open ? <ExpandLess sx={{pl: '2'}} /> : <ExpandMore sx={{pl: '2'}} />}
                            </ListItemButton>
                        </Stack>
                        <Divider orientation={"horizontal"}/>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Stack justifyContent="flex-start" alignItems="center" sx={{width: '100%', mt:1, mb: 1}} direction={res550 ? "column" : "row"}>
                                {
                                    res550 ?
                                        <Typography sx={{width: 'auto', mt: 1, fontWeight: 300, fontSize: 25}}>
                                            지역
                                        </Typography>
                                        :
                                        null
                                }
                                <Stack justifyContent="space-around" alignItems="center" sx={{width: res550 ? "100%" : '50%'}} direction={"row"}>
                                    <FormControl sx={{width: '35%'}}>
                                        <Select
                                            value={age}
                                            onChange={handleChange}
                                            displayEmpty
                                            sx={{height: '35px'}}
                                            variant={"standard"}
                                        >
                                            <MenuItem value="">
                                                <em>지역 1</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{width: '35%'}}>
                                        <Select
                                            value={age}
                                            onChange={handleChange}
                                            displayEmpty
                                            sx={{height: '35px'}}
                                            variant={"standard"}
                                        >
                                            <MenuItem value="">
                                                <em>지역 2</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                                {
                                    res550 ?
                                        <>
                                            <Divider sx={{width: '90%', mt:3}}/>
                                            <Typography sx={{width: 'auto', mt: 1, fontWeight: 300, fontSize: 25}}>
                                                날짜
                                            </Typography>
                                        </>
                                        :
                                        null
                                }
                                <Stack justifyContent="space-around" alignContent="center" alignItems="center" sx={{width: res550 ? "100%" : '50%'}} direction={"row"}>
                                    <FormControl sx={{width: '35%'}}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{width: '100%'}}>
                                            <DatePicker
                                                value={value}
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                                InputProps={{
                                                    style: {
                                                        marginTop: res550 ? 0 : 5,
                                                        height: "30px",
                                                        width: "100%",
                                                        fontSize: "small",
                                                    },

                                                }}
                                                renderInput={(params: any) => (
                                                    <TextField {...params } />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>

                                    <FormControl sx={{width: '35%'}}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} sx={{width: '100%'}}>
                                            <DatePicker
                                                value={value}
                                                onChange={(newValue) => {
                                                    setValue(newValue);
                                                }}
                                                InputProps={{
                                                    style: {
                                                        marginTop: res550 ? 0 : 5,
                                                        height: "30px",
                                                        width: "100%",
                                                        fontSize: "small",
                                                    },

                                                }}
                                                renderInput={(params: any) => (
                                                    <TextField {...params } />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Stack>

                            </Stack>

                            <Stack justifyContent="flex-start" alignItems="center" sx={{width: '100%', mt:1, mb: 1}} direction={res550 ? "column" : "row"}>
                                {
                                    res550 ?
                                        <>
                                            <Divider sx={{width: '90%', mt:3}}/>
                                            <Typography sx={{width: 'auto', mt: 1, fontWeight: 300, fontSize: 25}}>
                                                텍스트
                                            </Typography>
                                        </>
                                        :
                                        null
                                }
                                <Stack justifyContent="space-around" alignItems="center" sx={{width: res550 ? "100%" : '50%'}} direction={"row"}>
                                    <TextField
                                        id="standard-search"
                                        label="텍스트로 검색하기"
                                        type="search"
                                        variant="standard"
                                        sx={{width: '90%'}}
                                    />
                                </Stack>
                                {
                                    res550 ?
                                        null
                                        :
                                        <Stack sx={{width: '50%', mt: 2}} alignItems={"center"}>
                                            <Button variant="contained" sx={{bgcolor: '#292929', color: 'white', width: '90%'}}>검색하기</Button>
                                        </Stack>
                                }
                            </Stack>

                            {
                                res550 ?
                                    <Stack sx={{width: '100%'}} alignItems={"center"}>
                                        <Button variant="contained" sx={{bgcolor: '#292929', color: 'white', width: '40%'}}>검색하기</Button>
                                    </Stack>
                                    :
                                    null
                            }
                        </Collapse>
                    </List>
                    :
                    <>
                        <FormControl sx={{width: '15%'}}>
                            <Select
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                sx={{height: '35px'}}
                                variant={"standard"}
                            >
                                <MenuItem value="">
                                    <em>지역 1</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{width: '15%'}}>
                            <Select
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                sx={{height: '35px'}}
                                variant={"standard"}
                            >
                                <MenuItem value="">
                                    <em>지역 1</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{width: '15%'}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{width: '100%'}}>
                                <DatePicker
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    InputProps={{
                                        style: {
                                            marginTop: res550 ? 0 : 5,
                                            height: "30px",
                                            width: "100%",
                                            fontSize: "small",
                                        },

                                    }}
                                    renderInput={(params: any) => (
                                        <TextField {...params } />
                                    )}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl sx={{width: '15%'}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{width: '100%'}}>
                                <DatePicker
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    InputProps={{
                                        style: {
                                            marginTop: res550 ? 0 : 5,
                                            height: "30px",
                                            width: "100%",
                                            fontSize: "small",
                                        },

                                    }}
                                    renderInput={(params: any) => (
                                        <TextField {...params } />
                                    )}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <TextField
                            id="standard-search"
                            type="search"
                            variant="standard"
                            placeholder={"검색어를 입력하세요"}
                            sx={{width: '20%'}}
                        />
                        <Button variant="contained" size={"small"} sx={{bgcolor: '#292929', color: 'white', width: '10%', mt:0.5}}>검색하기</Button>

                    </>
            }

        </Stack>
    );
}

export default ConcertFilter
