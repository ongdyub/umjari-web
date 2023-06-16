import {Divider, Stack} from "@mui/material";
import GroupInfo from "./GroupInfo/GroupInfo";
import GroupBoard from "./GroupBoard/GroupBoard";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import {useEffect} from "react";
import {groupInfo, groupStateActions, selectGroup} from "../store/slices/group/group";
import {useParams} from "react-router-dom";

const Group = () => {

    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>()
    const groupSelector = useSelector(selectGroup)

    useEffect(() => {
        dispatch(groupInfo(id))
        return () => {
            dispatch(groupStateActions.resetGroupInfo());
        };
    }, [id,dispatch])

    if(groupSelector.groupInfo === null){
        if(!groupSelector.groupExist){
            return(
                <div>
                    존재하지 않는 그룹 ID 입니다.
                </div>
            )
        }
        return(
            <div>
                로딩중
            </div>
        )
    }
    else{
        return(
            <Stack sx={{height: 800}}>
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
