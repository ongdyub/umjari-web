import {Box, Button, Chip, Divider, FormControl, Input, MenuItem, Modal, Select, Stack, Typography} from "@mui/material"
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {concertMemberDelete, selectConcert} from "../store/slices/concert/concert";
import {selectUser} from "../store/slices/user/user";
import {useParams} from "react-router-dom";
import {AppDispatch} from "../store";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const style = {
    position: 'absolute' as 'absolute',
    top: '47%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    height: '88%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 3,
    pb: 3,
};

const DeleteConcertMemberModal = (props : any) => {

    const {open, setOpen} = props

    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const concertState = useSelector(selectConcert)
    const userState = useSelector(selectUser)

    const [curSetMusic, setCurSetMusic] = useState<string | number | undefined | null>(concertState.concert?.setList[0].id)
    const [userList, setUserList] = useState<Array<any>>([])
    const [userId, setUserId] = useState<string>('')

    const handleClose = () => {
        setOpen(false)
    }
    const addUserList = () => {
        if(userId === ''){
            window.alert("아이디를 다시 확인해주세요.")
            return
        }
        userList.push(userId)
        setUserId('')
    }
    const deleteUserList = (idx : number) => {
        setUserList(userList.filter((item, idxList) => idxList !== idx))
    }
    const handleDeleteMember = async () => {
        if(userList.length < 1){
            window.alert("삭제할 멤버가 없습니다.")
            return
        }
        const data = {
            userIds : userList
        }
        const result = await dispatch(concertMemberDelete({data, token : userState.accessToken, id : id, cmId : curSetMusic}))
        if(result.type === `${concertMemberDelete.typePrefix}/fulfilled`){
            console.log(result.meta.arg.data.userIds)
            setUserList(result.meta.arg.data.userIds)
        }
    }

    useEffect(() => {

    },[curSetMusic])
    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack>
                    <Typography>프로그램 선택</Typography>
                </Stack>
                <Stack justifyContent={'flex-end'} alignItems={'center'} direction={"row"} sx={{width: '100%'}}>
                    <FormControl variant="standard" sx={{width: '100%', mr: 'auto'}}>
                        <Select
                            value={curSetMusic}
                            sx={{pr:3}}
                            onChange={(e) => setCurSetMusic(e.target.value)}
                        >
                            {concertState.concert?.setList.map((item, idx) => (
                                <MenuItem
                                    key={idx}
                                    value={item.id.toString()}
                                    sx={{fontSize : 13}}
                                >
                                    <Stack>
                                        <Typography sx={{fontSize : 10, fontWeight: 600}}>
                                            {item.musicInfo.shortComposerEng}
                                        </Typography>
                                        <Typography sx={{fontSize : 13, fontWeight: 300}}>
                                            {item.musicInfo.nameEng}
                                        </Typography>
                                    </Stack>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Divider sx={{width: '100%'}} />
                <Stack alignItems={'center'} sx={{width: '100%', mt:1, p:0.5}}>
                    <Stack direction={'row'} alignItems={'flex-end'} justifyContent={'space-between'} sx={{width: '100%'}}>
                        <Stack sx={{width: '60%'}}>
                            <Input
                                placeholder={"유저의 ID를 입력하세요"}
                                sx={{fontSize: 12, pt: 0.5}}
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </Stack>
                        <IconButton aria-label="delete" size="small" onClick={addUserList}>
                            <AddIcon fontSize="inherit" sx={{color: 'blue'}} />
                        </IconButton>
                    </Stack>
                </Stack>
                <Divider sx={{width: '100%'}} />
                <Stack sx={{height: '70%', width: '100%', overflowY: 'scroll', '&::-webkit-scrollbar': {display: 'none'}}}>
                    {userList.map((item : string, idx) => (
                        <Stack key={idx} alignItems={'center'} sx={{width: '100%', borderBottom: '0.2px solid grey', mt:1, pb:1}}>
                            <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'} sx={{width: '100%'}}>
                                <Chip size={"small"} label={item} sx={{mr:1, mt:0.5, mb:0.5}} />
                                <IconButton aria-label="delete" size="small" onClick={() => deleteUserList(idx)}>
                                    <RemoveIcon fontSize="inherit" sx={{color: 'red'}} />
                                </IconButton>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
                <Divider sx={{width: '100%'}} />
                <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'} sx={{mt:1}}>
                    <Button variant={'contained'} size={'small'} sx={{fontSize : 10, maxWidth: 60, minWidth: 60}} color={"error"} onClick={handleDeleteMember}>삭제</Button>
                </Stack>
            </Box>

        </Modal>
    )
}

export default DeleteConcertMemberModal