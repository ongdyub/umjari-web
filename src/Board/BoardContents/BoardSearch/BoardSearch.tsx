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
    useMediaQuery, useTheme
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, userActions} from "../../../store/slices/user/user";
import {AppDispatch} from "../../../store";
import {matchBoardEnum} from "../../../store/slices/board/board";

const boardList = [
    {
        name: '전체게시판',
        enum : 'ALL'
    },
    {
        name: '자유게시판',
        enum : 'FREE'
    },
    {
        name: '바이올린',
        enum : 'VIOLIN'
    },
    {
        name: '비올라',
        enum : 'VIOLA'
    },
    {
        name: '첼로',
        enum : 'CELLO'
    },
    {
        name: '베이스',
        enum : 'BASS'
    },
    {
        name: '플루트',
        enum : 'FLUTE'
    },
    {
        name: '클라리넷',
        enum : 'CLARINET'
    },
    {
        name: '오보에',
        enum : 'OBOE'
    },
    {
        name: '바순',
        enum : 'BASSOON'
    },
    {
        name: '호른',
        enum : 'HORN'
    },
    {
        name: '트럼펫',
        enum : 'TRUMPET'
    },
    {
        name: '트롬본',
        enum : 'TROMBONE'
    },
    {
        name: '튜바',
        enum : 'TUBA'
    },
    {
        name: '타악기',
        enum : 'PERCUSSION_INSTRUMENT'
    },
]

const BoardSearch = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const userState = useSelector(selectUser)
    const res800 = useMediaQuery(theme.breakpoints.down('res800'))

    const searchList = ['전체','제목', '내용', '작성자', '댓글내용', '댓글작성자']
    const [searchWord, setSearchWord] = useState('')
    const [boardName, setBoardName] = useState('ALL');
    const [searchRange, setSearchRange] = useState('전체')

    const handleWrite = () => {
        if(!userState.isLogin){
            dispatch(userActions.openModal())
            return
        }
        navigate('/write')
    }

    const handleSearch = () => {
        searchParams.set('text',searchWord)
        searchParams.set('board',boardName)
        searchParams.set('range',searchRange)
        const boardKor = matchBoardEnum(boardName)
        navigate(`/community/${boardKor?.name}`)
        setSearchParams(searchParams)
    }

    if (res800){
        return(
            <Stack alignItems="center" sx={{width:'100%', height: 'auto', mt: 1, mb: 1}} flexDirection={'column'} justifyContent="space-around">
                <Stack sx={{width: '95%'}} alignItems="center" direction={'row'} justifyContent="space-between">
                    <Stack justifyContent="flex-end" sx={{height: 50, width: '27%'}}>
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

                    <Stack justifyContent="flex-end" sx={{height: 50, width: '22%'}}>
                        <FormControl variant="standard" sx={{width: '100%'}}>
                            <Select
                                value={boardName}
                                onChange={(e) => setBoardName(e.target.value)}
                                sx={{fontSize: 11}}
                            >
                                {boardList.map((item,idx) => (
                                    <MenuItem
                                        key={idx}
                                        value={item.enum}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack justifyContent="flex-end" sx={{height: 50, width: '22%'}}>
                        <FormControl variant="standard" sx={{width: '100%'}}>
                            <Select
                                value={searchRange}
                                onChange={(e) => setSearchRange(e.target.value)}
                                sx={{fontSize: 11}}
                            >
                                {searchList.map((name, idx) => (
                                    <MenuItem
                                        key={idx}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack justifyContent="flex-end" sx={{height: 50, width: '17%'}}>
                        <Button sx={{fontSize: 11, maxWidth:'100%', minWidth:'100%', maxHeight: 28, minHeight:28}} variant={"outlined"} onClick={handleSearch}>검색</Button>
                    </Stack>
                </Stack>
                <Stack sx={{width: '95%'}} alignItems="center" direction={'row'}>
                    {/*<Stack justifyContent="flex-end" sx={{height: 50, width: '70%'}}>*/}
                    {/*    <ButtonGroup onClick={() => window.alert("준비중입니다.")} variant="text" aria-label="text button group">*/}
                    {/*        <Button sx={{fontSize: 12}}>인기글</Button>*/}
                    {/*        <Button sx={{fontSize: 12}}>댓글</Button>*/}
                    {/*        <Button sx={{fontSize: 12}}>조회</Button>*/}
                    {/*        <Button sx={{fontSize: 12}}>추천</Button>*/}
                    {/*    </ButtonGroup>*/}
                    {/*</Stack>*/}

                    <Stack justifyContent="flex-end" sx={{height: 50, width: '17%', ml: 'auto'}}>
                        <Button sx={{fontSize: 11, maxWidth:'100%', minWidth:'100%', maxHeight: 28, minHeight:28}} variant={"outlined"} onClick={handleWrite}>작성</Button>
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
                                value={boardName}
                                onChange={(e) => setBoardName(e.target.value)}
                                sx={{fontSize: 14}}
                            >
                                {boardList.map((item, idx) => (
                                    <MenuItem
                                        key={idx}
                                        value={item.enum}
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
                                value={searchRange}
                                onChange={(e) => setSearchRange(e.target.value)}
                                sx={{fontSize: 14}}
                            >
                                {searchList.map((name,idx) => (
                                    <MenuItem
                                        key={idx}
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack justifyContent="flex-end" sx={{height: 50, width: '10%'}}>
                        <Button sx={{fontSize: 11, maxWidth:'100%', minWidth:'100%', maxHeight: 28, minHeight:28}} variant={"outlined"} onClick={handleSearch}>검색</Button>
                    </Stack>
                </Stack>
                <Stack sx={{width: '95%'}} alignItems="center" direction={'row'}>
                    {/*<Stack justifyContent="flex-end" sx={{height: 50, width: '35%', ml: '4%'}}>*/}
                    {/*    <ButtonGroup onClick={() => window.alert("준비중입니다.")} variant="text" aria-label="text button group">*/}
                    {/*        <Button sx={{fontSize: 12}}>인기글</Button>*/}
                    {/*        <Button sx={{fontSize: 12}}>댓글</Button>*/}
                    {/*        <Button sx={{fontSize: 12}}>조회</Button>*/}
                    {/*        <Button sx={{fontSize: 12}}>추천</Button>*/}
                    {/*    </ButtonGroup>*/}
                    {/*</Stack>*/}

                    <Stack justifyContent="flex-end" sx={{height: 50, width: '10%', ml: 'auto', mr: '2.5%'}}>
                        <Button sx={{fontSize: 11, maxWidth:'100%', minWidth:'100%', maxHeight: 28, minHeight:28}} variant={"outlined"} onClick={handleWrite}>작성</Button>
                    </Stack>
                </Stack>
            </Stack>
        );
    }
}

export default BoardSearch