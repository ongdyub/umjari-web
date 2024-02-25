import {Button, Divider, Pagination, Stack, useMediaQuery, useTheme, Grid} from "@mui/material";
import {useState, useEffect} from "react";
import VisitList from "../../../MyConcert/MyHome/Visit/VisitList/VisitList";
import ConstructionIcon from "@mui/icons-material/Construction";
import AddConcertCommentModal from "./AddConcertCommentModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { useParams } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { concertCommentGet, concertStateActions, selectConcert } from "../../../store/slices/concert/concert";
import { selectUser, userActions } from "../../../store/slices/user/user";
import ConcertCommentItem from "./ConcertCommentItem";

const ConcertComment = () => {
    const theme = useTheme()
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const res600 = useMediaQuery(theme.breakpoints.down("sm"))
    const concertState = useSelector(selectConcert)
    const userState = useSelector(selectUser)
    const dispatch = useDispatch<AppDispatch>()

    const [open, setOpen] = useState(false)

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)

    const handleModalClose = () => {
        setOpen(false)
    }

    const onClickWrite = () => {
        if (userState.isLogin) {
            setOpen(true)
        }
        else {
            dispatch(userActions.openModal())
        }
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set('page', value.toString())

        const page = searchParams.get('page')

        setSearchParams(searchParams)

        const param = {
            page: page === null ? '1' : page.toString(),
            // sort: 'createAt,DESC',
        }
        dispatch(concertCommentGet({ id, param, token:userState.accessToken }))
        setPage(value);
    };

    useEffect(() => {

        const page = searchParams.get('page')

        const param = {
            page: page === null || '' ? 1 : parseInt(page),
            // sort: 'createAt,DESC',
        }

        dispatch(concertCommentGet({ id, param, token:userState.accessToken }))

        return () => {
            dispatch(concertStateActions.resetConcertComment)
        }

    }, [dispatch, id, searchParams, open])

    useEffect(() => {
        if (concertState.concertComment !== null) {
            setTotalPage(concertState.concertComment.totalPages)
            setPage(concertState.concertComment.currentPage)
        }

        return () => {
            dispatch(concertStateActions.resetConcertComment)
        }

    }, [concertState.concertComment])

    return(
        <Stack justifyContent={res600 ? 'center' : 'flex-start'} alignItems={'center'} sx={{width: res600 ? '100%' : 'calc(100% - 25px)', mb: 10}}>
            <Divider sx={{ width: res600 ? '90%' : '100%', mt: -1 }} />
            <Stack sx={{pt: 3, width: '100%'}}>
                <Grid container columns={14}>
                    {
                        concertState.concertComment?.contents.map((item) => (
                            <Grid key={item.simpleUserDto.id} sx={{ pr: 2, pl: 2, mb: 2 }} item res300={14} res500={14} res800={7} lg={7} alignItems={"center"} alignContent={"center"}>
                                <ConcertCommentItem item={item} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Stack>
            <Stack alignItems="center" sx={{ width: '100%' }} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{ display: 'flex', width: '80%', justifyContent: "center", alignItems: "center" }} size={res600 ? "small" : "large"} count={totalPage} page={page} onChange={handlePage} defaultPage={1} siblingCount={1} boundaryCount={1} />
            </Stack>
            <Stack sx={{ mt: 1, width: res600 ? '90%' : '100%' }} direction={'row'}>
                <Button onClick={onClickWrite} size={"small"} variant="contained">작성하기</Button>
            </Stack>
            {
                open ?
                    <AddConcertCommentModal open={open} handleClose={handleModalClose} mode={'post'} />
                :
                null
            }
        </Stack>
    )
}

export default ConcertComment