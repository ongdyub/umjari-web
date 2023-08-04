import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import GroupSearchMenu from "./GroupSearchMenu/GroupSearchMenu";
import GroupSearchContents from "./GroupSearchContents/GroupSearchContents";
import GroupSide from "./GroupSide/GroupSide";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import {useSearchParams} from "react-router-dom";
import {groupSearchGet, groupStateActions, selectGroup} from "../store/slices/group/group";
import * as React from "react";
import {scrollToTop} from "../App";
import {selectUser} from "../store/slices/user/user";

const GroupSearch = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const userState = useSelector(selectUser)

    const theme = useTheme();
    const resSize = useMediaQuery(theme.breakpoints.down("md"))
    const res800 = useMediaQuery('(max-width:800px)')

    const dispatch = useDispatch<AppDispatch>()

    const groupState = useSelector(selectGroup)

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set('page',value.toString())
        setSearchParams(searchParams)
        setPage(value);
    };

    const [totalElements, setTotalElements] = useState(0)

    useEffect(() => {
        const regionParent = searchParams.get('regionParent')
        const regionChild = searchParams.get('regionChild')
        const composer = searchParams.get('composer')
        const musicName = searchParams.get('musicName')
        const name = searchParams.get('name')
        const page = searchParams.get('page')
        const inst = searchParams.get('inst')
        const tags = searchParams.get('tags')

        const params = {
            regionParent : regionParent,
            regionChild : regionChild,
            composer: composer === '' ? null : composer,
            musicName: musicName === '' ? null : musicName,
            name : name === '' ? null : name,
            instruments : inst === '' ? null : inst,
            tags : tags === '' ? null : tags,
            page : page === null || page === '' ? 1 : page,
            size: 12,
            sort : "id,ASC",
        }

        dispatch(groupSearchGet({params, token : userState.accessToken}))

        scrollToTop()

        return () => {
            dispatch(groupStateActions.resetGroupSearchList())
        }

    },[dispatch, searchParams])

    useEffect(() => {
        if(groupState.groupSearchList !== null){
            setTotalPage(groupState.groupSearchList.totalPages)
            setPage(groupState.groupSearchList.currentPage)
            setTotalElements(groupState.groupSearchList.totalElements)
        }
    },[groupState.groupSearchList])

    return(
        <Stack sx={{height: '1000px'}}>
            <Stack justifyContent="flex-start" direction={res800 ? 'column' : 'row'}>
                <GroupSearchMenu />
                {
                    res800 ?
                        null
                        :
                        <Divider orientation={"vertical"}/>
                }
                <GroupSearchContents totalElements={totalElements} page={page} totalPage={totalPage} handleChange={handleChange} />
                {
                    resSize ?
                        null
                        :
                        <Divider orientation={"vertical"}/>
                }
                <GroupSide />
            </Stack>
        </Stack>
    )
}

export default GroupSearch