import {
    Button,
    ButtonGroup,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField, Theme, useMediaQuery, useTheme
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, userActions} from "../../../store/slices/user/user";
import {AppDispatch} from "../../../store";

const boardList = [
    {
        name: '전체 게시판',
        ID: 12
    },
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

const BoardSearch = () => {

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const userState = useSelector(selectUser)
    const res800 = useMediaQuery(theme.breakpoints.down('res800'))

    const searchList = ['제목', '내용', '작성자', '댓글 내용', '댓글 작성자']
    const [searchWord, setSearchWord] = useState('')
    const [personName, setPersonName] = useState<string[]>([]);

    const handleChange = (e: any) => {
        const {
            target: { value },
        } = e;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleWrite = () => {
        if(!userState.isLogin){
            dispatch(userActions.openModal())
            return
        }
        navigate('/write')
    }

    if (res800){
        return(
            <Stack alignItems="center" sx={{width:'100%', height: '140px', mt: -2}} flexDirection={'column'}>
                <Stack alignItems="center" sx={{width:'100%', height: '100px'}} flexDirection={'row'} justifyContent="space-around">
                    <Stack justifyContent="flex-end" sx={{height: 50, ml:3}}>
                        <FormControl variant="standard" sx={{width: 150}}>
                            <InputLabel htmlFor="standard-adornment-amount">검색어를 입력하세요</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                sx={{fontSize: 13, pt: 0.5}}
                                value={searchWord}
                                onChange={(e) => setSearchWord(e.target.value)}
                                startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                            />
                        </FormControl>
                    </Stack>
                    <Stack justifyContent="flex-end" sx={{height: 50, minWidth: 175}}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button sx={{fontSize: 10}}>인기글</Button>
                            <Button sx={{fontSize: 10}}>댓글</Button>
                            <Button sx={{fontSize: 10}}>조회</Button>
                            <Button sx={{fontSize: 10}}>추천</Button>
                        </ButtonGroup>
                    </Stack>
                    <Stack justifyContent="flex-end" sx={{height: 50, minWidth: 60}}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button sx={{fontSize: 12, fontWeight: 1800}} variant={"outlined"} onClick={handleWrite}>글쓰기</Button>
                        </ButtonGroup>
                    </Stack>
                </Stack>

                <Stack alignItems="center" sx={{width:'100%', height: '50px', mt: -5}} flexDirection={'row'}>
                    <Stack justifyContent="flex-end" sx={{height: 50, ml: 6}}>
                        <FormControl variant="standard" sx={{width: 100}}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={personName}
                                onChange={handleChange}
                                label="Age"
                                sx={{fontSize: 11}}
                            >
                                {boardList.map((item) => (
                                    <MenuItem
                                        key={item.ID}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack justifyContent="flex-end" sx={{height: 50, ml: 5}}>
                        <FormControl variant="standard" sx={{width: 100}}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={personName}
                                onChange={handleChange}
                                label="Age"
                                sx={{fontSize: 11}}
                            >
                                {searchList.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
            </Stack>
        )
    }
    else{
        return (
            <Stack alignItems="center" sx={{width:'100%', height: 'auto', mt: 2, mb: 2}} flexDirection={'column'} justifyContent="space-around">
                <Stack sx={{width: '95%'}} alignItems="center" direction={'row'} justifyContent="space-around">
                    <Stack justifyContent="flex-end" sx={{height: 50, pl:3, width: '35%'}}>
                        <FormControl variant="standard" sx={{width: '100%'}}>
                            <InputLabel htmlFor="standard-adornment-amount">검색어를 입력하세요</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                sx={{fontSize: 13, pt: 0.5}}
                                value={searchWord}
                                onChange={(e) => setSearchWord(e.target.value)}
                                startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                            />
                        </FormControl>
                    </Stack>

                    <Stack justifyContent="flex-end" sx={{height: 50, width: '17%'}}>
                        <FormControl variant="standard" sx={{width: '100%'}}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={personName}
                                onChange={handleChange}
                                label="Age"
                                sx={{fontSize: 14}}
                            >
                                {boardList.map((item) => (
                                    <MenuItem
                                        key={item.ID}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack justifyContent="flex-end" sx={{height: 50, width: '17%'}}>
                        <FormControl variant="standard" sx={{width: '100%'}}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={personName}
                                onChange={handleChange}
                                label="Age"
                                sx={{fontSize: 14}}
                            >
                                {searchList.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack justifyContent="flex-end" sx={{height: 50, width: '10%'}}>
                        <Button sx={{fontSize: 11, maxWidth:'100%', minWidth:'100%', maxHeight: 28, minHeight:28}} variant={"outlined"} onClick={() => window.alert("준비중입니다.")}>검색</Button>
                    </Stack>
                </Stack>
                <Stack sx={{width: '95%'}} alignItems="center" direction={'row'}>
                    <Stack justifyContent="flex-end" sx={{height: 50, width: '35%', ml: '4%'}}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button sx={{fontSize: 12}}>인기글</Button>
                            <Button sx={{fontSize: 12}}>댓글</Button>
                            <Button sx={{fontSize: 12}}>조회</Button>
                            <Button sx={{fontSize: 12}}>추천</Button>
                        </ButtonGroup>
                    </Stack>

                    <Stack justifyContent="flex-end" sx={{height: 50, width: '10%', ml: 'auto', mr: '2.5%'}}>
                        <Button sx={{fontSize: 11, maxWidth:'100%', minWidth:'100%', maxHeight: 28, minHeight:28}} variant={"outlined"} onClick={handleWrite}>작성</Button>
                    </Stack>
                </Stack>
            </Stack>
        );
    }
}

export default BoardSearch