import {Box, Button, FormControl, Input, MenuItem, Modal, Select, Stack, Typography, Divider} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {concertMemberAdd, selectConcert} from "../store/slices/concert/concert";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import AddConcertMemberList from "./AddConcertMemberList";
import {useParams} from "react-router-dom";
import {AppDispatch} from "../store";
import {selectUser} from "../store/slices/user/user";

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

const AddConcertMemberModal = (props : any) => {

    const {open, setOpen} = props
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const handleClose = () => setOpen(false);

    const concertState = useSelector(selectConcert)
    const userState = useSelector(selectUser)

    const [curSetMusic, setCurSetMusic] = useState<string | number | undefined | null>(concertState.concert?.setList[0].id)

    const [userList, setUserList] = useState<Array<any>>([])
    const partList = ['Vn 1st', 'Vn 2nd', 'Va', 'Vc', 'Db', 'Fl', 'Picc', 'Ob', 'E.H', 'Cl', 'Fg', 'Hn', 'Trp', 'Trb', 'Cnt', 'Tub', 'Timp', 'Perc', 'Harp']
    const roleList = [{role : '악장', enum : 'MASTER'}, {role : '수석', enum : 'PRINCIPAL'}, {role : '부수석', enum : 'ASSISTANT_PRINCIPAL'}, {role : '단원', enum : 'MEMBER'}]
    const detailPartList = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', 'assist', 'Solo', 'off.', 'obb.', '.']

    const [disableDetail, setDisableDetail] = useState<boolean>(true)

    const [userId, setUserId] = useState<string>('')
    const [part, setPart] = useState<string>('Vn 1st')
    const [role, setRole] = useState<string>('MEMBER')
    const [detail, setDetail] = useState<string>('.')

    const handlePart = (part : string) => {
        setPart(part)
        if(part === 'Vn 1st' || part === 'Vn 2nd' || part === 'Va' || part === 'Vc' || part === 'Db'){
            setDisableDetail(true)
            setDetail('.')
        }
        else{
            setDisableDetail(false)
            setDetail('1st')
        }
    }

    const addUserList = () => {
        if(userId === ''){
            window.alert("아이디를 다시 확인해주세요.")
            return
        }

        const data = {
            userId: userId,
            part: part,
            detailPart: detail,
            role: role
        }
        userList.push(data)
        setUserId('')
    }

    const handleDeleteUserList = (idx : number) => {
        setUserList(userList.filter((item, idxList) => idxList !== idx))
    }

    const handleAddMember = async () => {
        if(userList.length < 1){
            window.alert("추가된 멤버가 없습니다.")
            return
        }
        const data = {
            participantList : userList
        }
        const result = await dispatch(concertMemberAdd({data, token : userState.accessToken, id : id, cmId : curSetMusic}))
        if(result.type === `${concertMemberAdd.typePrefix}/fulfilled`){
            const failedUserIdList = result.payload.failedUsers.map((item : any) => item.userId)

            let failedString = '['
            failedUserIdList.map((item : string) => failedString = failedString + item + ', ')
            failedString = failedString + ']'
            window.alert("추가에 실패한 유저들은 다음과 같습니다 : " + failedString)
        }
    }

    return (
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
                        <FormControl variant="standard" sx={{width: '30%'}}>
                            <Select
                                value={role}
                                sx={{fontSize: 12}}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                {roleList.map((item, idx) => (
                                    <MenuItem
                                        key={idx}
                                        value={item.enum}
                                        sx={{fontSize : 12}}
                                    >
                                        {item.role}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{mt: 1,width: '100%'}}>
                        <FormControl variant="standard" sx={{width: '35%', mr: 'auto'}}>
                            <Select
                                value={part}
                                sx={{fontSize:12}}
                                onChange={(e) => handlePart(e.target.value)}
                            >
                                {partList.map((item, idx) => (
                                    <MenuItem
                                        key={idx}
                                        value={item}
                                        sx={{fontSize : 12}}
                                    >
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{width: '25%'}}>
                            <Select
                                disabled={disableDetail}
                                value={detail}
                                sx={{fontSize:12}}
                                onChange={(e) => setDetail(e.target.value)}
                            >
                                {detailPartList.map((item, idx) => (
                                    <MenuItem
                                        key={idx}
                                        value={item}
                                        sx={{fontSize : 12}}
                                    >
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <IconButton aria-label="delete" size="small" onClick={addUserList}>
                            <AddIcon fontSize="inherit" sx={{color: 'blue'}} />
                        </IconButton>
                    </Stack>
                </Stack>
                <Divider sx={{width: '100%'}} />
                <Stack sx={{height: '67%', width: '100%', overflowY: 'scroll', '&::-webkit-scrollbar': {display: 'none'}}}>
                    {userList.map((item, idx) => (
                        <AddConcertMemberList key={idx} item={item} idx={idx} handleDeleteUserList={handleDeleteUserList} />
                    ))}
                </Stack>
                <Divider sx={{width: '100%'}} />
                <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'} sx={{mt:1}}>
                    <Typography sx={{fontSize: 8}}>현악기의 경우 세부 파트를 . 으로 설정하셔야 1st가 중복으로 출력되지 않습니다.</Typography>
                    <Button variant={'contained'} size={'small'} sx={{fontSize : 10, maxWidth: 60, minWidth: 60}} onClick={handleAddMember}>추가</Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default AddConcertMemberModal