import {Button, Divider, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import DeleteConfirmModal from "../../../Modal/DeleteConfirmModal";
import {useDispatch, useSelector} from "react-redux";
import {concertSetListDelete, selectConcert} from "../../../store/slices/concert/concert";
import {AppDispatch} from "../../../store";
import {selectUser} from "../../../store/slices/user/user";
import {useParams} from "react-router-dom";


const ProgramInfo = (props : any) => {

    const {item, edit} = props
    const { id } = useParams();

    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector(selectUser)
    const concertState = useSelector(selectConcert)

    const [open, setOpen] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)

    const onClickDeleteMusic = () => {
        setOpen(true)
    }

    useEffect(() => {
        if(confirm){

            const musicIdList = concertState.concert?.setList.map((item) => (item.musicInfo.id))
            const changedMusicIdList = musicIdList?.filter((element) => element !== item.musicInfo.id)
            const data = {
                musicIds : changedMusicIdList
            }

            if(changedMusicIdList === null || changedMusicIdList === undefined){
                window.alert("잘못된 요청입니다.")
                setOpen(false)
                setConfirm(false)
                return
            }
            else{
                dispatch(concertSetListDelete({data, token : userState.accessToken, id : id}))
            }
            setOpen(false)
            setConfirm(false)
        }
    },[confirm])

    return (
        <Stack sx={{width: 'auto'}}>
            <Stack direction={"row"}>
                <Typography variant={"caption"} sx={{fontWeight: 700, fontSize: 16}}>{item.musicInfo.shortComposerEng}</Typography>
                {
                    edit ?
                        <Button color={"error"} size={"small"} onClick={onClickDeleteMusic}>삭제</Button>
                        :
                        null
                }
            </Stack>
            <Stack>
                <Typography variant={"caption"} sx={{fontWeight: 100, fontSize: 16, mt:1, mb:1}}>{item.musicInfo.nameEng}</Typography>
            </Stack>
            <Divider sx={{width: '100%', mb:1}} />
            {
                open ?
                    <DeleteConfirmModal open={open} setOpen={setOpen} setConfirm={setConfirm} />
                    :
                    null
            }
        </Stack>
    );
}

export default ProgramInfo