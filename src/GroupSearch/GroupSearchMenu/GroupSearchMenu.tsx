import {
    Box, Button, Chip,
    Collapse,
    Divider,
    FormControl, InputLabel,
    List,
    ListItemButton, MenuItem, OutlinedInput,
    Select,
    Stack, TextField, Theme,
    Typography,
    useMediaQuery, useTheme
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const region1 = ['서울시', '경기북부', '경기남부', '인천']
const region2 = ['관악구', '서초구', '강동구', '노원구']
const composer = ['차이코프스키', '드보르작', '브람스', '시벨리우스', '말러', 'H. Berlioz']
const song = ['No. 1', 'No. 2','No. 3','No. 4','No. 5','No. 6', 'Fantastique Fantastique Fantastique Fantastique Fantastique Fantastique Fantastique Fantastique Fantastique Fantastique Fantastique Fantastique']
const inst = [
    {
        name: '바이올린',
        ID: 0
    },
    {
        name: '비올라',
        ID: 1
    },
    {
        name: '첼로',
        ID: 2
    },
    {
        name: '베이스',
        ID: 3
    },
    {
        name: '플루트',
        ID: 4
    },
    {
        name: '클라리넷',
        ID: 5
    },
    {
        name: '오보에',
        ID: 6
    },
    {
        name: '바순',
        ID: 7
    },
    {
        name: '호른',
        ID: 8
    },
    {
        name: '트럼펫',
        ID: 9
    },
    {
        name: '트롬본',
        ID: 10
    },
    {
        name: '튜바',
        ID: 11
    },
    {
        name: '타악기',
        ID: 13
    },

]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const GroupSearchMenu = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    const res800 = useMediaQuery('(max-width:800px)')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [open, setOpen] = useState(false)
    const menuOpen = () => {
        setOpen((!open))
    }
    const handleMiniMenu = (item : any) => {
        setSelectedIndex(item.ID)
        setOpen(!open)
        navigate(`/community/${item.name.replace(/(\s*)/g,'')}`)
    }
    const [age, setAge] = useState('');

    const handleChange = (e : any) => {
        setAge(e.target.value as string);
    };

    const [instList, setInstList] = useState<string[]>([]);

    const handleInst = (event: any) => {
        const {
            target: { value },
        } = event;
        setInstList(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    function getStyles(name: string, personName: readonly string[], theme: Theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{height: res800 ? 'auto' : '1000px', width: res800 ? '100%' : '300px', minWidth: '300px' }}>
            {res800 ?
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
                        <Stack justifyContent="flex-start" alignItems="center" sx={{width: '100%'}}>
                            <Divider sx={{width: '90%', mt:1}} />
                            <Typography sx={{width: 'auto', mt: 1, mb:-2, fontWeight: 300, fontSize: 25}}>
                                단체명
                            </Typography>
                            <Stack sx={{width: '100%'}} justifyContent={"center"} alignItems={"center"}>
                                <TextField
                                    id="standard-search"
                                    label="텍스트로 검색하기"
                                    type="search"
                                    variant="standard"
                                    sx={{width: '90%', mt:2}}
                                />
                            </Stack>
                            <Divider sx={{width: '90%', mt:3}}/>
                            <Typography sx={{width: 'auto', mt: 1, mb: 2, fontWeight: 300, fontSize: 25}}>
                                지역
                            </Typography>
                            <Stack flexDirection={"row"} sx={{width: '100%'}} justifyContent={"space-around"}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="지역 1"
                                    defaultValue="서울시"
                                    variant="standard"
                                    sx={{width: '40%'}}
                                >
                                    {region1.map((option) => (
                                        <MenuItem key={option} value={option} >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="지역 2"
                                    defaultValue="서울시"
                                    variant="standard"
                                    sx={{width: '40%'}}
                                >
                                    {region2.map((option) => (
                                        <MenuItem key={option} value={option} >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <Divider sx={{width: '90%', mt: 3}} />
                            <Typography sx={{width: 'auto', mt: 1, mb: 2, fontWeight: 300, fontSize: 25}}>
                                연주곡
                            </Typography>
                            <Stack sx={{width: '100%'}} justifyContent={"center"} alignItems={"center"}>
                                <Stack flexDirection={"row"} sx={{width: '100%'}} justifyContent={"space-around"}>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label="작곡가"
                                        defaultValue="말러"
                                        variant="standard"
                                        sx={{width: '40%'}}
                                    >
                                        {composer.map((option) => (
                                            <MenuItem key={option} value={option} >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label="곡명"
                                        defaultValue="No. 1"
                                        variant="standard"
                                        sx={{width: '40%'}}
                                    >
                                        {song.map((option) => (
                                            <MenuItem key={option} value={option} >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>
                                <TextField
                                    id="standard-search"
                                    label="텍스트로 검색하기"
                                    type="search"
                                    variant="standard"
                                    sx={{width: '90%', mt:2}}
                                />
                            </Stack>
                            <Divider sx={{width: '90%', mt: 3}} />
                            <Typography sx={{width: 'auto', mt: 1, mb: 2, fontWeight: 300, fontSize: 25}}>
                                모집 악기
                            </Typography>
                            <Stack sx={{width: '100%'}} justifyContent={"center"} alignItems={"center"}>
                                <FormControl sx={{width: '90%', mt: 1}}>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        variant={"standard"}
                                        multiple
                                        value={instList}
                                        onChange={handleInst}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {inst.map((name) => (
                                            <MenuItem
                                                key={name.ID}
                                                value={name.name}
                                                style={getStyles(name.name, instList, theme)}
                                            >
                                                {name.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Divider sx={{width: '90%', mt: 3, mb:3}} />
                            <Stack sx={{width: '100%'}} alignItems={"center"}>
                                <Button variant="contained" sx={{bgcolor: '#292929', color: 'white', width: '50%'}}>검색하기</Button>
                            </Stack>
                        </Stack>
                    </Collapse>
                </List>
                :
                <List component="nav" sx={{width: '100%', justifyContent:"flex-start", alignItems:"center"}}>
                    <Stack justifyContent="flex-start" alignItems="center" sx={{width: '100%'}}>
                        <Divider sx={{width: '90%', mt:1}} />
                        <Typography sx={{width: 'auto', mt: 1, mb:-2, fontWeight: 300, fontSize: 25}}>
                            단체명
                        </Typography>
                        <Stack sx={{width: '100%'}} justifyContent={"center"} alignItems={"center"}>
                            <TextField
                                id="standard-search"
                                label="텍스트로 검색하기"
                                type="search"
                                variant="standard"
                                sx={{width: '90%', mt:2}}
                            />
                        </Stack>
                        <Divider sx={{width: '90%', mt:3}}/>
                        <Typography sx={{width: 'auto', mt: 1, mb: 2, fontWeight: 300, fontSize: 25}}>
                            지역
                        </Typography>
                        <Stack flexDirection={"row"} sx={{width: '100%'}} justifyContent={"space-around"}>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="지역 1"
                                defaultValue="서울시"
                                variant="standard"
                                sx={{width: '40%'}}
                            >
                                {region1.map((option) => (
                                    <MenuItem key={option} value={option} >
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="지역 2"
                                defaultValue="서울시"
                                variant="standard"
                                sx={{width: '40%'}}
                            >
                                {region2.map((option) => (
                                    <MenuItem key={option} value={option} >
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack>
                        <Divider sx={{width: '90%', mt: 3}} />
                        <Typography sx={{width: 'auto', mt: 1, mb: 2, fontWeight: 300, fontSize: 25}}>
                            연주곡
                        </Typography>
                        <Stack sx={{width: '100%'}} justifyContent={"center"} alignItems={"center"}>
                            <Stack flexDirection={"row"} sx={{width: '100%'}} justifyContent={"space-around"}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="작곡가"
                                    defaultValue="말러"
                                    variant="standard"
                                    sx={{width: '40%'}}
                                >
                                    {composer.map((option) => (
                                        <MenuItem key={option} value={option} >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="곡명"
                                    defaultValue="No. 1"
                                    variant="standard"
                                    sx={{width: '40%'}}
                                >
                                    {song.map((option) => (
                                        <MenuItem key={option} value={option} >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <TextField
                                id="standard-search"
                                label="텍스트로 검색하기"
                                type="search"
                                variant="standard"
                                sx={{width: '90%', mt:2}}
                            />
                        </Stack>
                        <Divider sx={{width: '90%', mt: 3}} />
                        <Typography sx={{width: 'auto', mt: 1, mb: 2, fontWeight: 300, fontSize: 25}}>
                            모집 악기
                        </Typography>
                        <Stack sx={{width: '100%'}} justifyContent={"center"} alignItems={"center"}>
                            <FormControl sx={{width: '90%', mt: 1}}>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    variant={"standard"}
                                    multiple
                                    value={instList}
                                    onChange={handleInst}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {inst.map((name) => (
                                        <MenuItem
                                            key={name.ID}
                                            value={name.name}
                                            style={getStyles(name.name, instList, theme)}
                                        >
                                            {name.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Divider sx={{width: '90%', mt: 3, mb:3}} />
                        <Stack sx={{width: '100%'}} alignItems={"center"}>
                            <Button variant="contained" sx={{bgcolor: '#292929', color: 'white', width: '50%'}}>검색하기</Button>
                        </Stack>
                    </Stack>
                </List>
            }
        </Stack>
    )
}

export default GroupSearchMenu