import {Avatar, Box, Button, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import {useNavigate, useParams} from "react-router-dom";
import {groupQnAReplyDelete} from "../../../store/slices/group/group";
import {selectUser} from "../../../store/slices/user/user";
import {useEffect, useState} from "react";
import DeleteConfirmModal from "../../../Modal/DeleteConfirmModal";


const GroupQnAComment = (props : any) => {

    const {item} = props

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>()
    const { id, qid } = useParams();
    const navigate = useNavigate()

    const userState = useSelector(selectUser)

    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)

    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    const onClickAuthor = () => {
        if(item.isAnonymous){
            window.alert("익명글입니다.")
        }
        else{
            navigate(`/myconcert/${item.authorInfo.profileName}/list`)
        }
    }

    useEffect(() => {
        if(confirm){
            dispatch(groupQnAReplyDelete({id: id, qid : qid, rid : item.id, token : userState.accessToken}))
            setDeleteOpen(false)
            window.location.reload()
        }
    },[confirm])

    return(
        <Stack sx={{width: '100%',}}>
            <Stack alignItems="center" sx={{width: '100%'}} flexDirection={"row"}>
                <Stack>
                    <Avatar sx={{width: 45, height: 45}} alt={`${process.env.PUBLIC_URL}/Logo_posit.png`}>
                        <Box
                            component="img"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                            alt="Profile Img"
                            onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                            src={`${item.isAnonymous ? `${process.env.PUBLIC_URL}/Logo_posit.png` : `${item.authorInfo.profileImage}`}`}
                        />
                    </Avatar>
                </Stack>
                <Stack alignContent={"center"} alignItems={"center"} sx={{ml: 2}}>
                    <Typography onClick={onClickAuthor} sx={{cursor : 'pointer',fontWeight: 300, fontSize: res700 ? 14 : 17}}>{item.isAnonymous ? item.nickname : item.authorInfo.profileName}</Typography>
                </Stack>
                <Stack alignItems="center" flexDirection={"row"} sx={{ml: 'auto'}}>
                    <Stack alignItems="center" flexDirection={"column"}>
                        <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>{dayjs(item.createAt).format('YYYY-MM-DD HH:mm')}</Typography>
                        <Typography variant="caption" sx={{color: 'grey', fontSize : res700 ? 7 : 12}}>{dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm')}</Typography>
                    </Stack>
                </Stack>
            </Stack>

            <Stack sx={{mt:1}}>
                <Typography sx={{width: '100%', wordBreak: 'break-word'}}>
                    {item.content}
                </Typography>
            </Stack>

            <Stack alignItems="center" sx={{width: '100%'}} flexDirection={"row"} justifyContent={"space-between"}>
                {
                    item.isAuthor === true ?
                        <Stack alignItems={"center"} sx={{ml: 'auto'}} flexDirection={"row"}>
                            {/*<Button size={"small"} color={"info"} onClick={() => window.alert("구현 예정입니다.")}>수정</Button>*/}
                            <Button size={"small"} color={"error"} onClick={() => setDeleteOpen(true)} >삭제</Button>
                        </Stack>
                        :
                        null
                }
            </Stack>
            <Divider orientation={"horizontal"} sx={{width: '100%', mt:1, mb:1}}/>
            {
                deleteOpen ?
                    <DeleteConfirmModal open={deleteOpen} setOpen={setDeleteOpen} setConfirm={setConfirm} />
                    :
                    null
            }
        </Stack>
    )
}

export default GroupQnAComment