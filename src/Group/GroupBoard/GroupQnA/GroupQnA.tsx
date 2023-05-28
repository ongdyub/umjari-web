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
import {groupQnAListGet, groupStateActions, selectGroup} from "../../../store/slices/group/group";
import {useParams} from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import {selectUser, userActions} from "../../../store/slices/user/user";

const GroupQnA = () => {

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams();
    const groupState = useSelector(selectGroup)
    const userState = useSelector(selectUser)
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    const [searchParams, setSearchParams] = useSearchParams();

    const [searchWord, setSearchWord] = useState<string>('')
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)

    const [writeOpen, setWriteOpen] = useState<boolean>(false)
    const handleWriteClose = () => {
        setWriteOpen(false)
    }

    const onClickWrite = () => {
        if(userState.isLogin){
            setWriteOpen(true)
        }
        else{
            dispatch(userActions.openModal())
        }
    }

    const handleSearchWord = (text : string) => {
        setSearchWord(text)
    }

    const onClickTextSearch = () => {
        searchParams.set('text', searchWord)
        searchParams.set('page', '1')

        const text = searchParams.get('text')

        setSearchParams(searchParams)

        const param = {
            text : text === null ? '' : text.toString(),
            page : 1,
            sort : 'createAt,DESC',
        }
        setPage(1)
        dispatch(groupQnAListGet({id, param}))
    }

    const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set('text', searchWord)
        searchParams.set('page', value.toString())

        const text = searchParams.get('text')
        const page = searchParams.get('page')

        setSearchParams(searchParams)

        const param = {
            text : text === null ? '' : text.toString(),
            page : page === null ? '1' : page.toString(),
            sort : 'createAt,DESC',
        }
        dispatch(groupQnAListGet({id, param}))
        setPage(value);
    };

    useEffect(() => {

        const text = searchParams.get('text')
        const page = searchParams.get('page')

        const param = {
            text : text === null || '' ? '' : text.toString(),
            page : page === null || '' ? 1 : parseInt(page),
            sort : 'createAt,DESC',
        }
        if(text !== null){
            setSearchWord(text)
        }

        dispatch(groupQnAListGet({id, param}))

        return () => {
            dispatch(groupStateActions.resetGroupQnA)
        }

    },[dispatch, id, searchParams, writeOpen])

    useEffect(() => {
        if (groupState.groupQnAList !== null) {
            setTotalPage(groupState.groupQnAList.totalPages)
            setPage(groupState.groupQnAList.currentPage)
        }

        return () => {
            dispatch(groupStateActions.resetGroupQnA)
        }

    }, [groupState.groupQnAList])

    return(
        <Stack sx={{mb:10}}>
            <Divider sx={{width: res700 ? '100%' : '90%', mt: -1}}/>
            <Stack direction={res700 ? "column" : 'row'} alignItems={res700 ? "center" : ''} justifyContent={res700 ? "center" : ''} sx={{mb: 3, mt: 1}}>
                <FormControl variant="standard" sx={{mt : res700 ? 1 : 1,width: res700 ? '80%' : 350}}>
                    <InputLabel htmlFor="standard-adornment-amount">검색어를 입력하세요</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        sx={{fontSize: 13, pt: 0.5}}
                        value={searchWord}
                        onChange={(e) => handleSearchWord(e.target.value)}
                        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
                    />
                </FormControl>

                <Stack direction={"row"}>
                    <Button variant={"outlined"} sx={{ml: 2, mt: res700 ? 2: 1.5, fontSize : res700 ? 11 : 14}} onClick={onClickTextSearch}>검색하기</Button>
                    <Button variant={"contained"} sx={{ml: 2, mt: res700 ? 2: 1.5, fontSize : res700 ? 11 : 14}} onClick={onClickWrite}>작성하기</Button>
                </Stack>

            </Stack>

            <Divider sx={{width: '100%', mt: res700 ? -1 : 0, mb: -1}} />

            <Stack sx={{pr: 3, pt: 3, width: '100%', pl: res700 ? 3 : 0}}>
                <Grid container columns={14}>
                    {
                        groupState.groupQnAList?.contents.map((item) => (
                            <Grid key={item.id} sx={{pr:2, pl: 2, mb: 2}} item res300={14} res500={14} res800={7} lg={7} alignItems={"center"} alignContent={"center"}>
                                <QnAItem item={item} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Stack>

            <Stack alignItems="center" sx={{width:'100%'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '80%',justifyContent: "center", alignItems:"center"}} size={res700 ? "small" : "large"} count={totalPage} page={page} onChange={handlePage} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <GroupQnAWriteModal open={writeOpen} handleClose={handleWriteClose}/>
        </Stack>
    )
}

export default GroupQnA
