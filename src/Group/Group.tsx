import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import GroupInfo from "./GroupInfo/GroupInfo";
import GroupBoard from "./GroupBoard/GroupBoard";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import {useEffect} from "react";
import {concertStateActions, dashboardList, selectConcert} from "../store/slices/concert/concert";
import {groupInfo, groupStateActions, selectGroup} from "../store/slices/group/group";
import {useParams} from "react-router-dom";

const Group = () => {

    const theme = useTheme()
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>()
    const groupSelector = useSelector(selectGroup)

    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    useEffect(() => {
        dispatch(groupInfo(id))
        return () => {
            dispatch(groupStateActions.resetGroupInfo());
        };
    }, [id,dispatch])

    if(groupSelector.groupInfo === null){
        return(
            <div>
                로딩중
            </div>
        )
    }
    else{
        return(
            <Stack sx={{height: 1000}}>
                <Stack>
                    <GroupInfo groupData={groupSelector.groupInfo} />
                    <Divider orientation={"horizontal"} sx={{mt:1, mb:1, width: '100%'}}/>
                    <GroupBoard />
                </Stack>
            </Stack>
        )
    }
}

export default Group
