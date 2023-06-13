import {Button, Divider, Stack, Typography, useMediaQuery} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {selectUser} from "../../../store/slices/user/user";
import {concertInfoPut, selectConcert} from "../../../store/slices/concert/concert";
import ProgramInfo from "./ProgramInfo";
import 'react-quill/dist/quill.snow.css'
import ConcertInfoEdit from "../../ConcertInfo/ConcertInfoEdit";
import {AppDispatch} from "../../../store";
import ReactQuill from 'react-quill';

const DetailInfo = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams();

    const userState = useSelector(selectUser)
    const concertState = useSelector(selectConcert)
    const res600 = useMediaQuery('(max-width:600px)')

    const [editMode, setEditMode] = useState(false)
    const [contents, setContents] = useState<string>(concertState.concert === null ? '' : concertState.concert.concertInfo);

    const [isAdminGroup, setIsAdminGroup] = useState(false)

    const handleEdit = async () => {
        const data = {
            concertInfo : contents
        }

        if(contents === '' || contents === '<p><br></p>'){
            window.alert('본문을 입력해주세요.')
            return
        }
        if(contents.length > 10000){
            window.alert('본문 내용이 너무 깁니다.')
            return
        }
        const result = await dispatch(concertInfoPut({data : data, token : userState.accessToken, id : id}))

        if(result.type === `${concertInfoPut.typePrefix}/fulfilled`){
            setEditMode(false)
        }
        else{
            return
        }
    }

    useEffect(() => {
        if(userState.isLogin){
            const userGroup = userState.career.find((userGroup) => userGroup.groupId === concertState.concert?.groupId)

            if(userGroup !== null && userGroup !== undefined && userGroup.memberType === 'ADMIN'){
                setIsAdminGroup(true)
            }
        }
    },[userState.career, concertState.concert, userState.isLogin])

    return(
        <Stack justifyContent={res600 ? 'center' : 'flex-start'} alignItems={'center'} sx={{mb: 10}}>
            <Divider sx={{width: res600 ? '90%' : '100%', mt:-1}} />
            <Stack sx={{width : res600 ? '90%' : '100%'}}>
                <Typography sx={{fontSize: 35, fontWeight: 100, fontFamily: "Open Sans", mt: 0.5, mb: 1}}>Program</Typography>
                {
                    concertState.concert?.setList.map((item) => (
                        <ProgramInfo key={item.id} item={item} />
                    ))
                }
            </Stack>
            <Stack direction={'row'} justifyContent={'flex-start'} sx={{width : res600 ? '90%' : '100%'}}>
                <Typography sx={{fontSize: 35, fontWeight: 100, fontFamily: "Open Sans", mt: 0.5, mb: 1}}>Info</Typography>
                <Stack direction={'row'} alignItems={'center'} sx={{ml : 1,height: '100%'}}>
                    {
                        isAdminGroup ?
                            editMode ?
                                <Button color={"info"} size={"small"} onClick={handleEdit}>작성</Button>
                                :
                                <Button color={"warning"} size={"small"} onClick={() => setEditMode(true)}>수정</Button>
                            :
                            null
                    }
                </Stack>
            </Stack>
            {
                editMode ?
                    <ConcertInfoEdit contents={contents} setContents={setContents} />
                    :
                    <Stack sx={{width : res600 ? '90%' : '100%', mt : -1.5}}>
                        <ReactQuill
                            value={concertState.concert === null ? '' :  concertState.concert.concertInfo}
                            style={{paddingRight: res600 ? 0 : 20, height: 'auto' }}
                            readOnly={true}
                            theme={"bubble"}
                        />
                    </Stack>
            }
        </Stack>
    )
}

export default DetailInfo