import {
    Button,
    Divider,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel, Pagination,
    Stack,
    useMediaQuery,
    useTheme
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectDummy} from "../../../store/slices/dummy/dummy";
import QnAItem from "./QnAItem";
import LoginModal from "../../../Modal/LoginModal";
import GroupQnAWriteModal from "../../../Modal/GroupQnAWriteModal";
import {AppDispatch} from "../../../store";
import {groupQnAListGet, selectGroup} from "../../../store/slices/group/group";
import {useParams} from "react-router-dom";

const GroupQnA = () => {

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams();
    const dummySelector = useSelector(selectDummy)
    const groupState = useSelector(selectGroup)
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))
    const [searchWord, setSearchWord] = useState('')
    const [page, setPage] = useState(1);

    const [loginOpen, setLoginOpen] = useState<boolean>(false)
    const handleLoginClose = () => {
        setLoginOpen(false)
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const onClickQnA = () => {
        window.alert("click")
    }

    useEffect(() => {
        dispatch(groupQnAListGet(id))
    },[])

    return(
        <Stack sx={{mb:10}}>
            <Stack direction={res700 ? "column" : "row"} alignItems={res700 ? "center" : ''} sx={{mb: 3}}>
                <FormControl variant="standard" sx={{width: res700 ? '80%' : 350}}>
                    <InputLabel htmlFor="standard-adornment-amount">검색어를 입력하세요</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        sx={{fontSize: 13, pt: 0.5}}
                        value={searchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                    />
                </FormControl>

                <Stack direction={"row"}>
                    <Button variant={"outlined"} sx={{ml: 2, mt: res700 ? 2: 0}}>검색하기</Button>
                    <Button variant={"contained"} sx={{ml: 2, mt: res700 ? 2: 0}} onClick={() => setLoginOpen(true)}>작성하기</Button>
                </Stack>

            </Stack>

            <Divider sx={{width: '100%'}} />




            <Stack sx={{pr: 3, pt: 3, width: '100%', pl: res700 ? 3 : 0}}>
                <Grid container columns={14}>
                    {
                        groupState.groupQnAList?.contents.map((item) => (
                            <Grid sx={{pr:2, pl: 2, mb: 3}} item res300={14} res500={14} res800={7} lg={7} alignItems={"center"} alignContent={"center"}>
                                <QnAItem onClick={() => onClickQnA} key={item} img={item} title={item.title} comment={item.replyCount} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Stack>

            <Stack alignItems="center" sx={{width:'100%', height: '120px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '80%',justifyContent: "center", alignItems:"center"}} size="large" count={15} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <GroupQnAWriteModal open={loginOpen} handleClose={handleLoginClose}/>
        </Stack>
    )
}

export default GroupQnA
