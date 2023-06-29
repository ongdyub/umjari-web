import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Stack, styled,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../store";
import {deleteVisit, editVisit, getVisitList, postVisit} from "../../../../store/slices/visit/visit";
import {selectUser} from "../../../../store/slices/user/user";
import {selectMyConcert} from "../../../../store/slices/myconcert/myconcert";
import {useNavigate, useParams} from "react-router-dom";
import DeleteConfirmModal from "../../../../Modal/DeleteConfirmModal";
import ProfileImageModal from "../../../../Modal/ProfileImageModal";

const VisitList = (props : any) => {

    const {item, write} = props

    const {profileName} = useParams()
    const navigate = useNavigate()

    const userState = useSelector(selectUser)
    const myConcertState = useSelector(selectMyConcert)

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const dispatch = useDispatch<AppDispatch>()

    const [openProfile, setOpenProfile] = useState(false)

    const [text, setText] = useState('')
    const [hide, setHide] = useState(false)

    const [edit, setEdit] = useState(false)
    const [editText, setEditText] = useState('')

    const [open, setOpen] = useState(false)
    const [confirm, setConfirm] = useState(false)

    const handlePostVisit = async () => {
        if(write){
            if(text === '' || text.length < 1){
                window.alert("본문을 입력해주세요.")
                return
            }
            if(text.length > 500){
                window.alert("500자 초과")
                return
            }
            const data = {
                content : text,
                private : hide
            }
            const result = await dispatch(postVisit({id : myConcertState.myDefaultInfo?.id, token : userState.accessToken, data}))
            if(result.type === `${postVisit.typePrefix}/fulfilled`){
                const param = {
                    page: 1,
                    size: 20,
                    sort: "createdAt,DESC"
                }
                dispatch(getVisitList({profileName, token : userState.accessToken, param}))
                setText('')
            }
        }
        else{
            return
        }
    }

    const handleEditVisit = async () => {
        if(edit){
            if(editText === '' || editText.length < 1){
                window.alert("본문을 입력해주세요.")
                return
            }
            if(editText.length > 500){
                window.alert("500자 초과")
                return
            }
            const data = {
                content : editText,
                private : hide
            }
            const result = await dispatch(editVisit({id : item.id, token : userState.accessToken, data}))
            if(result.type === `${editVisit.typePrefix}/fulfilled`){
                const param = {
                    page: 1,
                    size: 20,
                    sort: "createdAt,DESC"
                }
                dispatch(getVisitList({profileName, token : userState.accessToken, param}))
                setText('')
                setEdit(false)
            }
        }
        else{
            return
        }
    }

    useEffect(() => {
        if(confirm){
            dispatch(deleteVisit({id:item.id, token: userState.accessToken}))
            window.location.reload()
            setOpen(false)
        }
    },[confirm])

    return(
        <Stack  sx={{width: '100%', mt:1,ml:res550 ? 0 : -3}} justifyContent={res550 ? "center" : 'center'} alignItems={res550 ? "center" : 'center'} alignContent={res550 ? "center" : 'center'}>
            <Divider sx={{width: '90%', mb: res550 ? 0.5 : 0}} />
            <Stack direction={"row"} sx={{width: '90%'}}>
                <Stack direction={"row"} alignContent={"center"} alignItems={"center"}>
                    <Typography sx={{ml: res550 ? 0 : 2, fontWeight:800, fontSize: res550 ? 10 : 13}}>
                        No. {write ? '#' : item.id}
                    </Typography>
                    <Typography onClick={() => navigate(`/myconcert/${item.authorId.profileName}/visit`)} sx={{cursor : 'pointer',fontSize:res550 ? 12 : 14,ml: 2}}>
                        {item.authorId.profileName}
                    </Typography>
                    <Typography sx={{ml: 2, color:'grey',fontSize: res550 ? 7 : 10, fontWeight:300}}>
                        {write ? '' : item.createdAt.slice(2,10) + " " + item.createdAt.slice(11,16)}
                    </Typography>
                </Stack>
                <Stack sx={{marginLeft: 'auto'}} direction={"row"}>
                    <ButtonGroup>
                        {
                            (!write && item.isAuthor) ?
                                <>
                                    {
                                        edit ?
                                            <Button onClick={() => setEdit(false)} sx={{fontSize:10, color: 'grey'}} variant={"text"} >취소</Button>
                                            :
                                            <Button onClick={() => setEdit(true)} sx={{fontSize:10, color: 'green'}} variant={"text"} >수정</Button>
                                    }
                                </>
                                :
                                null
                        }
                        {
                            myConcertState.myDefaultInfo?.isSelfProfile || item.isAuthor ?
                                <Button onClick={() => setOpen(true)} sx={{fontSize:10, color: 'red'}} variant={"text"} >삭제</Button>
                                :
                                null
                        }
                        {
                            write || edit ?
                                hide ?
                                    <Button onClick={() => setHide(false)} sx={{fontSize:10, color: 'red'}} variant={"text"}>비공개</Button>
                                    :
                                    <Button onClick={() => setHide(true)} sx={{fontSize:10, color: 'blue'}} variant={"text"}>공개</Button>
                                :
                                null
                        }
                    </ButtonGroup>
                </Stack>
            </Stack>
            <Divider sx={{width: '90%',mt: res550 ? 0.5 : 0}} />

            <Stack direction={"row"} sx={{width: '90%', mt:1}}>
                <Stack sx={{width: res750 ? 'auto' : 'auto'}}>
                    <Box
                        component="img"
                        sx={{
                            cursor: 'pointer',
                            display: 'block',
                            width: res750 ? 73 : 133,
                            height: res750 ? 73 : 133,
                            borderRadius: '20%',
                            objectFit: 'cover',
                            boxShadow: 'rgb(0 0 0 / 6%) 0px 0px 4px 0px'
                        }}
                        onClick={() => setOpenProfile(true)}
                        onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                        alt="Profile Img"
                        src={write ? item.profileImg : item.authorId.profileImage}
                    />
                </Stack>
                {
                    write ?
                        <Stack sx={{pl:3, width: '100%'}}>
                            <TextField
                                rows={5}
                                multiline
                                placeholder="최대 500자의 방명록을 입력해 주세요.&#13;&#10;비공개 상태는 서로 친구 상태만 가능하며 익명이 아닌, 방명록 주인만 볼 수 있는 상태입니다."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                variant="standard"
                                inputProps={{
                                    style: {
                                        fontSize: 12, // adjust the font size here
                                    },
                                }}
                            />
                            <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                                <Button onClick={handlePostVisit} sx={{fontSize: 12}} size={"small"}>작성하기</Button>
                            </Stack>
                        </Stack>
                        :
                        edit ?
                            <Stack sx={{pl:3, width: '100%'}}>
                                <TextField
                                    inputProps={{
                                        style: {
                                            fontSize: 12, // adjust the font size here
                                        },
                                    }}
                                    placeholder="공개 / 비공개 상태를 작성 전 한번 더 확인해주세요.&#13;&#10;최대 500자의 방명록을 입력해 주세요.&#13;&#10;비공개 설정은 서로 친구 상태만 가능합니다,"
                                    multiline
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    rows={5}
                                    variant={"standard"}
                                />
                                <Stack sx={{width: '100%'}} flexDirection={'row-reverse'}>
                                    <Button onClick={handleEditVisit} sx={{fontSize: 11}} size={"small"}>수정하기</Button>
                                </Stack>
                            </Stack>
                            :
                            <Stack sx={{mt:0.5,fontSize : res550 ? 12 : 15,whiteSpace: 'pre-line',wordBreak: 'break-word', pl:2}}>
                                {item.content.slice(0,500)}
                            </Stack>
                }
            </Stack>
            {
                open ?
                    <DeleteConfirmModal open={open} setOpen={setOpen} setConfirm={setConfirm} />
                    :
                    null
            }
            {
                openProfile ?
                    <ProfileImageModal open={openProfile} setOpen={setOpenProfile} src={item.authorId.profileImage} />
                    :
                    null
            }
        </Stack>
    )
}

export default VisitList