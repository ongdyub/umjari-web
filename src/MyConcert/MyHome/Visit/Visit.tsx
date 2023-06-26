import {Divider, Pagination, Stack, useMediaQuery, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import VisitList from "./VisitList/VisitList";
import {useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {getVisitList, selectVisit, visitStateActions} from "../../../store/slices/visit/visit";
import {selectUser} from "../../../store/slices/user/user";
import * as React from "react";

const Visit = () => {

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const dispatch = useDispatch<AppDispatch>()
    const [searchParams, setSearchParams] = useSearchParams();
    const {profileName} = useParams()

    const userState = useSelector(selectUser)
    const visitState = useSelector(selectVisit)

    const writeData = {
        id : 1,
        profileImg : userState.profileImage,
        userId: 0,
        authorId: {
            id: 0,
            profileName: userState.profileName,
            profileImage: "string"
        },
        content: "string",
        createdAt: "string",
        isAuthor: true
    }

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set('page',value.toString())
        setSearchParams(searchParams)
        setPage(value);
    };

    useEffect(() => {
        const param = {
            page: 1,
            size: 20,
            sort: "createdAt,DESC"
        }
        dispatch(getVisitList({profileName, token : userState.accessToken, param}))

        return () => {
            dispatch(visitStateActions.resetVisitState())
        }
    },[dispatch, profileName])

    useEffect(() => {
        setPage(visitState.currentPage)
        setTotalPage(visitState.totalPages)
    },[visitState])

    useEffect(() => {
        const param = {
            page : searchParams.get('page'),
            size : 20,
            sort : "createdAt,DESC",
        }
        dispatch(getVisitList({profileName, token : userState.accessToken, param}))
    },[searchParams])

    return(
        <Stack sx={{mt: 2, width: '100%'}} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
            <Divider sx={{width: res750 ? '100%' : '90%', color: '#292929'}} />
            <VisitList item={writeData} write={true} />
            {
                visitState.contents.map((item,idx) => (
                    <VisitList key={idx} item={item} write={false} />
                ))
            }
            <Stack alignItems="center" sx={{width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "large"} count={totalPage} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
        </Stack>
    )
}

const itemData = [2,3,4,6,7,9,10,13,14,18,20,21];

export default Visit