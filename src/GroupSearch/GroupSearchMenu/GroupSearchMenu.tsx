import {
    Box, Button, Chip,
    Collapse,
    Divider,
    FormControl,
    List,
    ListItemButton, MenuItem,
    Select, SelectChangeEvent,
    Stack, TextField, Theme,
    Typography,
    useMediaQuery, useTheme
} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {region_child, region_parents} from "../../MainPage/ConcertList/ConcertFilter/ConcertFilter";
import {getInstrumentEnums, getInstrumentNames, instList} from "../../Group/GroupBoard/GroupRecruit/GroupRecruit";

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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
        fontSize : 12
    };
}

const GroupSearchMenu = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const theme = useTheme()
    const res800 = useMediaQuery('(max-width:800px)')

    const [open, setOpen] = useState(false)
    const menuOpen = () => {
        setOpen((!open))
    }

    const [instruments, setInstruments] = useState<string[]>([]);
    const handleInst = (event: any) => {
        const {
            target: { value },
        } = event;
        setInstruments(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [parent, setParent] = useState<any>(0);
    const [child, setChild] = useState<any>(0);
    const [composer, setComposer] = useState('')
    const [musicName, setMusicName] = useState('')
    const [name, setName] = useState('')

    const handleParentChange = (event: SelectChangeEvent) => {
        setParent(event.target.value);
        setChild(0)
    };
    const handleChildChange = (event: SelectChangeEvent) => {
        setChild(event.target.value);
    };

    const handleSearchBtn = () => {

        const instEnums = getInstrumentEnums(instruments)
        searchParams.set('regionParent',region_parents[parent].toString())
        searchParams.set('regionChild',region_child[parent][child].toString())
        searchParams.set('composer',composer)
        searchParams.set('musicName',musicName)
        searchParams.set('name',name)
        searchParams.set('page','1')
        searchParams.set('inst',instEnums.join(','))

        setSearchParams(searchParams)
    }

    const handleResetFilter = () => {
        setParent(0)
        setChild(0)
        setComposer('')
        setMusicName('')
        setName('')
        setInstruments([])
    }

    useEffect(() => {
        const list = searchParams.get('inst')?.split(',')
        if(list !== null && list !== undefined){
            if(list[0] === ''){
                setInstruments([])
            }
            else{
                setInstruments(getInstrumentNames(list))
            }
        }
        else{
            setInstruments([])
        }

        const parent = searchParams.get('regionParent')
        if(parent !== null && parent !== undefined){
            setParent(region_parents.findIndex((item) => item === parent))
        }
        else{
            setParent(0)
        }

        const parentIdx = region_parents.findIndex((item) => item === parent)
        const child = searchParams.get('regionChild')
        if(child !== null && child !== undefined){
            setChild(region_child[parentIdx].findIndex((item) => item === child))
        }
        else{
            setChild(0)
        }

        const composer = searchParams.get('composer')
        if(composer !== null && composer !== undefined){
            setComposer(composer)
        }
        else{
            setComposer('')
        }
        const musicName = searchParams.get('musicName')
        if(musicName !== null && musicName !== undefined){
            setMusicName(musicName)
        }
        else{
            setMusicName('')
        }
        const name = searchParams.get('name')
        if(name !== null && name !== undefined){
            setName(name)
        }
        else{
            setName('')
        }
    },[])

    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{width: res800 ? '100%' : '250px', minWidth: '250px' }}>
            {res800 ?
                <List component="nav" sx={{width: '100%', justifyContent:"flex-start", alignItems:"center"}}>
                    <Stack onClick={menuOpen} justifyContent="flex-start" alignItems="center" sx={{width: '100%', mt: -1}}>
                        <Divider sx={{width: '40%', border: 'solid 0.4px white'}} />
                        <ListItemButton sx={{width: '100%', display: 'flex', justifyContent:"center", alignItems:"center"}}>
                            <Typography sx={{width: 'auto', fontSize: 13}}>
                                {open ? '필터 접기' : '필터 펼치기'}
                            </Typography>
                            {open ? <ExpandLess sx={{pl: '2'}} /> : <ExpandMore sx={{pl: '2'}} />}
                        </ListItemButton>
                    </Stack>
                    <Divider orientation={"horizontal"}/>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Stack justifyContent="flex-start" alignItems="center" sx={{width: '100%', mt:1}}>
                            <Stack direction={'row'} sx={{width:'100%', mb:1}} alignItems={'center'} justifyContent={'center'}>
                                <Typography sx={{width: '50%', fontWeight: 300, fontSize: 15, textAlign: 'center'}}>
                                    지역
                                </Typography>
                                <Typography sx={{width: '50%', fontWeight: 300, fontSize: 15, textAlign: 'center'}}>
                                    곡검색
                                </Typography>
                            </Stack>

                            <Stack direction={'row'} sx={{width:'100%', mb:1}} alignItems={'flex-end'} justifyContent={'space-around'}>
                                <FormControl sx={{width: '35%'}}>
                                    <Select
                                        value={parent}
                                        onChange={handleParentChange}
                                        displayEmpty
                                        sx={{height: '26px', fontSize : 13}}
                                        variant={"standard"}
                                    >
                                        {region_parents.map((item, idx) => (
                                            <MenuItem key={idx} value={idx} sx={{fontSize:13}}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="standard-search"
                                    type="search"
                                    variant="standard"
                                    placeholder={"작곡가를 입력하세요"}
                                    inputProps={{
                                        style: {
                                            fontSize: 12, // adjust the font size here
                                        },
                                    }}
                                    value={composer}
                                    onChange={(e) => setComposer(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchBtn();
                                        }
                                    }}
                                    sx={{width: '35%', fontSize: 12}}
                                />
                            </Stack>

                            <Stack direction={'row'} sx={{width:'100%'}} alignItems={'flex-end'} justifyContent={'space-around'}>
                                <FormControl sx={{width: '35%'}}>
                                    <Select
                                        value={child}
                                        onChange={handleChildChange}
                                        displayEmpty
                                        sx={{height: '26px', fontSize : 13}}
                                        variant={"standard"}
                                    >
                                        {region_child[parent].map((item, idx) => (
                                            <MenuItem key={idx} value={idx} sx={{fontSize: 13}}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="standard-search"
                                    type="search"
                                    variant="standard"
                                    placeholder={"곡이름을 입력하세요"}
                                    inputProps={{
                                        style: {
                                            fontSize: 12, // adjust the font size here
                                        },
                                    }}
                                    value={musicName}
                                    onChange={(e) => setMusicName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchBtn();
                                        }
                                    }}
                                    sx={{width: '35%', ontSize: 12}}
                                />
                            </Stack>

                            <Divider sx={{width: '90%', mt:1.5}} />

                            <Stack direction={'row'} sx={{width:'100%'}} alignItems={'center'} justifyContent={'center'}>
                                <Typography sx={{width: '100%', mt: 1.5, fontWeight: 300, fontSize: 15, textAlign:' center'}}>
                                    모집 악기
                                </Typography>
                            </Stack>

                            <Stack sx={{width: '100%'}} justifyContent={"center"} alignItems={"center"}>
                                <FormControl sx={{width: '70%'}}>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        variant={"standard"}
                                        multiple
                                        value={instruments}
                                        onChange={handleInst}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, fontSize:12 }}>
                                                {selected.map((value, idx) => (
                                                    <Chip sx={{fontSize: 12}} key={idx} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {instList.map((item, idx) => (
                                            <MenuItem
                                                key={idx}
                                                value={item.name}
                                                style={getStyles(item.name, instruments, theme)}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Divider sx={{width: '90%', mt:1.5}} />

                            <Stack direction={'row'} sx={{width:'100%'}} alignItems={'center'} justifyContent={'center'}>
                                <Typography sx={{width: '100%', mt: 1.5, fontWeight: 300, fontSize: 15, textAlign:' center'}}>
                                    단체명
                                </Typography>
                            </Stack>

                            <Stack direction={'row'} sx={{width:'100%'}} alignItems={'flex-end'} justifyContent={'space-around'}>
                                <TextField
                                    id="standard-search"
                                    type="search"
                                    variant="standard"
                                    placeholder={"작곡가를 입력하세요"}
                                    inputProps={{
                                        style: {
                                            fontSize: 12, // adjust the font size here
                                        },
                                    }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchBtn();
                                        }
                                    }}
                                    sx={{width: '70%', fontSize: 12}}
                                />
                            </Stack>

                            <Divider sx={{width: '90%', mt:1.5, mb: 1.5}} />

                            <Stack sx={{width: '100%'}} direction={'row'} justifyContent={'space-around'} alignItems={"center"}>
                                <Button variant="outlined" sx={{bgcolor: 'white', color: '#292929', maxWidth: 75, minWidth: 75, maxHeight: 32, minHeight: 32, fontSize: 11}} onClick={handleResetFilter}>초기화</Button>
                                <Button variant="contained" sx={{bgcolor: '#292929', color: 'white', maxWidth: 75, minWidth: 75, maxHeight: 32, minHeight: 32, fontSize: 11}} onClick={handleSearchBtn}>검색하기</Button>
                            </Stack>

                            <Divider sx={{width: '100%', mt:1.5}} />
                        </Stack>
                    </Collapse>
                </List>
                :
                <List component="nav" sx={{width: '100%', justifyContent:"flex-start", alignItems:"center"}}>
                    <Stack justifyContent="flex-start" alignItems="center" sx={{width: '100%', mt:1}}>
                        <Stack direction={'row'} sx={{width:'100%'}} alignItems={'center'} justifyContent={'center'}>
                            <Typography sx={{width: '50%', fontWeight: 300, fontSize: 15, textAlign: 'center'}}>
                                지역
                            </Typography>
                            <Typography sx={{width: '50%', fontWeight: 300, fontSize: 15, textAlign: 'center'}}>
                                곡검색
                            </Typography>
                        </Stack>

                        <Stack direction={'row'} sx={{width:'100%'}} alignItems={'flex-end'} justifyContent={'space-around'}>
                            <FormControl sx={{width: '40%'}}>
                                <Select
                                    value={parent}
                                    onChange={handleParentChange}
                                    displayEmpty
                                    sx={{height: '30px', fontSize : 11}}
                                    variant={"standard"}
                                >
                                    {region_parents.map((item, idx) => (
                                        <MenuItem key={idx} value={idx} sx={{fontSize:11}}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                        handleSearchBtn();
                                    }
                                }}
                                sx={{width: '40%', fontSize: 10}}
                            />
                        </Stack>

                        <Stack direction={'row'} sx={{width:'100%'}} alignItems={'flex-end'} justifyContent={'space-around'}>
                            <FormControl sx={{width: '40%'}}>
                                <Select
                                    value={child}
                                    onChange={handleChildChange}
                                    displayEmpty
                                    sx={{height: '30px', fontSize : 11}}
                                    variant={"standard"}
                                >
                                    {region_child[parent].map((item, idx) => (
                                        <MenuItem key={idx} value={idx} sx={{fontSize: 11}}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                        handleSearchBtn();
                                    }
                                }}
                                sx={{width: '40%', ontSize: 10}}
                            />
                        </Stack>

                        <Divider sx={{width: '90%', mt:1.5}} />

                        <Stack direction={'row'} sx={{width:'100%'}} alignItems={'center'} justifyContent={'center'}>
                            <Typography sx={{width: '100%', mt: 1.5, fontWeight: 300, fontSize: 15, textAlign:' center'}}>
                                모집 악기
                            </Typography>
                        </Stack>

                        <Stack sx={{width: '100%'}} justifyContent={"center"} alignItems={"center"}>
                            <FormControl sx={{width: '80%'}}>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    variant={"standard"}
                                    multiple
                                    value={instruments}
                                    onChange={handleInst}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, fontSize:12 }}>
                                            {selected.map((value, idx) => (
                                                <Chip sx={{fontSize: 11}} key={idx} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {instList.map((item, idx) => (
                                        <MenuItem
                                            key={idx}
                                            value={item.name}
                                            style={getStyles(item.name, instruments, theme)}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>

                        <Divider sx={{width: '90%', mt:1.5}} />

                        <Stack direction={'row'} sx={{width:'100%'}} alignItems={'center'} justifyContent={'center'}>
                            <Typography sx={{width: '100%', mt: 1.5, fontWeight: 300, fontSize: 15, textAlign:' center'}}>
                                단체명
                            </Typography>
                        </Stack>

                        <Stack direction={'row'} sx={{width:'100%'}} alignItems={'flex-end'} justifyContent={'space-around'}>
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearchBtn();
                                    }
                                }}
                                sx={{width: '80%', fontSize: 10}}
                            />
                        </Stack>

                        <Divider sx={{width: '90%', mt:1.5, mb: 1.5}} />

                        <Stack sx={{width: '100%'}} direction={'row'} justifyContent={'space-around'} alignItems={"center"}>
                            <Button variant="outlined" sx={{bgcolor: 'white', color: '#292929', maxWidth: 75, minWidth: 75, maxHeight: 32, minHeight: 32, fontSize: 11}} onClick={handleResetFilter}>초기화</Button>
                            <Button variant="contained" sx={{bgcolor: '#292929', color: 'white', maxWidth: 75, minWidth: 75, maxHeight: 32, minHeight: 32, fontSize: 11}} onClick={handleSearchBtn}>검색하기</Button>
                        </Stack>
                    </Stack>
                </List>
            }
        </Stack>
    )
}

export default GroupSearchMenu