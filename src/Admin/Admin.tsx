import {Button, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import {selectUser} from "../store/slices/user/user";
import {addGroup, addAdmin} from "../store/slices/group/group";

const Admin = () => {

    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector(selectUser)

    const [name, setName] = useState('')
    const [id, setId] = useState('')

    const submitGroup = () => {
        const data = {
            name : name,
            logo : 'https://umjari-image-bucket.s3.ap-northeast-2.amazonaws.com/images/32/25c55d6f-aee6-484f-903a-9f633af3559d.png',
            practiceTime : '.',
            audition : true,
            membershipFee : 0,
            monthlyFee : 0,
            regionParent: "서울시",
            regionChild : "서초구",
            regionDetail: '.',
            homepage : '',
            detailIntro: ''
        }
        dispatch(addGroup({token : userState.accessToken, data : data}))
    }

    const addAdminGroupBtn = () => {
        dispatch(addAdmin({token : userState.accessToken, data : {userIds : ['umjari_admin']}, id : id}))
    }


    return(
        <Stack>
            <TextField sx={{ml: 2, width: '90%', mt:3}} value={name} onChange={(e) => setName(e.target.value)}></TextField>
            <Button onClick={submitGroup}>단체등록</Button>
            <TextField sx={{ml: 2, width: '90%', mt:3}} value={id} onChange={(e) => setId(e.target.value)}></TextField>
            <Button onClick={addAdminGroupBtn}>관리자 등록</Button>
        </Stack>
    )
}

export default Admin