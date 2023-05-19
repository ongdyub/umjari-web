import {Button, Divider, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../store";
import {selectUser, userGroupTimePut} from "../../../../store/slices/user/user";
import {myconcertGroupGet} from "../../../../store/slices/myconcert/myconcert";

const MyCareerTimeEdit = (props : any) => {

    const {item} = props
    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector(selectUser)

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const checkDate = (dateString : string) => {
        if(dateString === ''){
            return true
        }
        return datePattern.test(dateString);
    };

    const [join, setJoin] = useState(item.joinedAt === null ? '' : item.joinedAt.slice(0,10))
    const [leave, setLeave] = useState(item.leavedAt === null ? '' : item.leavedAt.slice(0,10))

    const editGroupTime = async () => {
        if(!checkDate(join)){
            window.alert("가입 날짜의 형식 YYYY-MM-DD 를 확인해주세요")
            return
        }
        if(!checkDate(leave)){
            window.alert("종료 날짜의 형식 YYYY-MM-DD 를 확인해주세요")
            return
        }

        const data = {
            groupId : item.groupId,
            joinedAt : join === '' ? null : join,
            leavedAt : leave === '' ? null : leave
        }

        const result = await dispatch(userGroupTimePut({data : data, token : userState.accessToken}))

        if (result.type === `${userGroupTimePut.typePrefix}/fulfilled`) {
            dispatch(myconcertGroupGet(userState.accessToken))
            window.alert("변경 완료")
        } else {
            window.alert("네트워크 오류")
        }
    }

    return(
        <Stack sx={{width: '100%'}} justifyContent={"flex-start"}>
            <Stack justifyContent={"flex-start"} sx={{mb:2}}>
                <Typography>{item.groupName}</Typography>
            </Stack>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <TextField sx={{width: '40%'}} id="standard-basic" label="시작" variant="standard" helperText={"YYYY-MM-DD"} value={join}  onChange={(e) => setJoin(e.target.value)} />
                <TextField sx={{width: '40%'}} id="standard-basic" label="종료" variant="standard" helperText={"YYYY-MM-DD"} value={leave} onChange={(e) => setLeave(e.target.value)} />
            </Stack>
            <Stack sx={{mt:3}} direction={"row"} justifyContent={"flex-end"}>
                <Button onClick={editGroupTime} sx={{fontSize: 14}}>수정</Button>
            </Stack>
            <Divider sx={{width: '100%'}}></Divider>
        </Stack>
    )
}

export default MyCareerTimeEdit
