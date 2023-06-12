import {Button, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import ReactQuill from "react-quill";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {selectUser} from "../../../store/slices/user/user";
import {selectConcert} from "../../../store/slices/concert/concert";
import ProgramInfo from "./ProgramInfo";
import 'react-quill/dist/quill.snow.css'
import ConcertInfoEdit from "../../ConcertInfo/ConcertInfoEdit";

const DetailInfo = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();
    const QuillRef = useRef<ReactQuill>();

    const userState = useSelector(selectUser)
    const concertState = useSelector(selectConcert)
    const res1100 = useMediaQuery('(max-width:1099px)')
    const res800 = useMediaQuery('(max-width:800px)')
    const res600 = useMediaQuery('(max-width:600px)')
    const resMd = useMediaQuery(theme.breakpoints.down("md"))

    const [editMode, setEditMode] = useState(false)

    const [isAdminGroup, setIsAdminGroup] = useState(false)

    const handleEdit = () => {
        setEditMode(false)
    }

    useEffect(() => {
        if(userState.isLogin){
            const userGroup = userState.career.find((userGroup) => userGroup.groupId === concertState.concert?.groupId)

            if(userGroup !== null && userGroup !== undefined && userGroup.memberType === 'ADMIN'){
                setIsAdminGroup(true)
            }
        }
    },[userState.career, concertState.concert])

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
                    <ConcertInfoEdit />
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