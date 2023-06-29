import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {selectUser} from "../../../store/slices/user/user";
import {useEffect, useState} from "react";
import {Button, Stack, Typography} from "@mui/material";
import DeleteConfirmModal from "../../../Modal/DeleteConfirmModal";
import {groupSetListAdd, selectGroup} from "../../../store/slices/group/group";

const GroupProgram = (props : any) => {

    const {item, edit} = props
    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector(selectUser)
    const groupState = useSelector(selectGroup)

    const [open, setOpen] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)

    const onClickDeleteMusic = () => {
        setOpen(true)
    }

    useEffect(() => {
        if(confirm){

            const musicIdList = groupState.groupInfo?.setList.map((item) => (item.id))
            const changedGroupIdList = musicIdList?.filter((element) => element !== item.id)
            const data = {
                musicIds : changedGroupIdList
            }

            if(changedGroupIdList === null || changedGroupIdList === undefined){
                window.alert("잘못된 요청입니다.")
                setOpen(false)
                setConfirm(false)
                return
            }
            else{
                dispatch(groupSetListAdd({data, token : userState.accessToken, id : id}))
                window.location.reload()
            }
            setOpen(false)
            setConfirm(false)
        }
    },[confirm])

    return(
        <Stack sx={{width: 'auto', pl:2}}>
            <Stack direction={"row"}>
                <Typography variant={"caption"} sx={{fontWeight: 700, fontSize: 16}}>{item.shortComposerEng}</Typography>
                {
                    edit ?
                        <Button color={"error"} size={"small"} onClick={onClickDeleteMusic}>삭제</Button>
                        :
                        null
                }
            </Stack>
            <Stack>
                <Typography variant={"overline"} sx={{fontWeight: 200, fontSize: 14}}>{item.nameEng}</Typography>
            </Stack>
            {
                open ?
                    <DeleteConfirmModal open={open} setOpen={setOpen} setConfirm={setConfirm} />
                    :
                    null
            }
        </Stack>
    )
}

export default GroupProgram
