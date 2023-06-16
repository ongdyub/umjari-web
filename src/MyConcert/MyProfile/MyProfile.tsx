import {Box, Button, CircularProgress, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {
    myConcertDefaultInfoGet,
    myConcertProfileImageUpload,
    myConcertUserImagePut,
    selectMyConcert
} from "../../store/slices/myconcert/myconcert";
import {useEffect, useRef, useState} from "react";
import {selectUser, userActions} from "../../store/slices/user/user";
import MyCareer from "./MyCareer/MyCareer";
import GroupDateEditModal from "../../Modal/GroupDateEditModal";

const MyProfile = () => {

    const myRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | null | undefined>(null);
    const [imgLoadingOpen,  setImgLadingOpen] = useState(false)
    const [openGroupEdit, setOpenGroupEdit] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const width = myRef.current?.offsetWidth;
            setHeight(width);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 초기 렌더링 시 한번 호출

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();

    const myConcertState = useSelector(selectMyConcert)
    const userState = useSelector(selectUser)
    const {profileName} = useParams()
    const res500 = useMediaQuery(theme.breakpoints.down("res500"))
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const handleFile = async (e : any) => {

        setImgLadingOpen(true)

        const formData = new FormData()
        formData.append('image', e.target.files[0])

        const result = await dispatch(myConcertProfileImageUpload({token: userState.accessToken, formData: formData}))

        if (result.type === `${myConcertProfileImageUpload.typePrefix}/fulfilled`) {

            const putImage = await dispatch(myConcertUserImagePut({
                token: userState.accessToken,
                image: result.payload.url
            }))

            if (putImage.type === `${myConcertUserImagePut.typePrefix}/fulfilled`) {

                setImgLadingOpen(false)

                window.alert("프로필이 변경되었습니다.")
                dispatch(myConcertDefaultInfoGet({token: userState.accessToken, profileName: profileName}))
                dispatch(userActions.setHeaderImage({profileImage: result.payload.url}))

            } else {

                setImgLadingOpen(false)

                window.alert("프로필 변경 실패")
            }
        } else {

            setImgLadingOpen(false)

            window.alert("이미지 업로드 실패. 용량(50MB)과 네트워크를 확인해 주세요")
        }
    }

    return(
        <Stack direction={res750 ? "row" : 'column'} sx={{width: res750 ? '100%' : 200, height: '100%'}} justifyContent={"flex-start"} alignItems={"center"}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={imgLoadingOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Stack sx={{mt: 1, mb: 1, pr: res750 ? 2 : '', pl: res750 ? 2 : '', width: '50%'}} justifyContent={"center"} alignItems={"center"}>
                <Box
                    component="img"
                    ref={myRef}
                    sx={{
                        display: 'block',
                        width: res750 ? '80%' : 133,
                        height: res750 ? `${height}px` : 133,
                        borderRadius: '20%',
                        objectPosition: 'center',
                        objectFit: 'cover',
                        boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 4px 0px',
                        mt: res500 ? 2 : 2
                    }}
                    alt="Profile Img"
                    onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                    src={`${myConcertState.myDefaultInfo?.profileImage}`}
                />
                <Typography sx={{fontWeight: 100, fontSize: res700 ? 15 : 17, mt:2, wordBreak: 'break-word'}}>{profileName}</Typography>
                {
                    myConcertState.myDefaultInfo?.isSelfProfile ?
                        <Button component="label" sx={{mt: 1, pb: -1, maxWidth : 80, minWidth: 80, maxHeight : 30, minHeight: 30}}>
                            <Typography sx={{fontSize: 10, borderBottom: '1px solid black'}} >사진 올리기</Typography>
                            <input hidden accept="image/*" multiple type="file" onChange={handleFile} />
                        </Button>
                        :
                        null
                }
            </Stack>
            {
                res750 ?
                    <Divider orientation={"vertical"} />
                    :
                    <Divider sx={{width: '80%', mb:2}}/>
            }
            <Stack direction={res750 ? "row" : 'column'} justifyContent={"flex-start"} sx={{position: 'relative', width: '80%',height: '100%', flexWrap: res750 ? 'wrap' : '', pl: res750 ? 1 : 0, pr: res750 ? 1 : 0, pt:2 }}>
                {
                    myConcertState.myDefaultInfo?.isSelfProfile ?
                        myConcertState.myDefaultInfo.career.length === 0 || false ?
                            null
                            :
                            <Button onClick={() => setOpenGroupEdit(true)} sx={{cursor: 'pointer', maxWidth: 45, minWidth: 45, maxHeight: 22, minHeight: 22, fontSize : 10, position: 'absolute',bottom: 0, right: 5}} disableRipple>수정</Button>
                        :
                        null
                }
                {
                    myConcertState.myDefaultInfo?.career.length === 0 || false ?
                        <Typography>속한 그룹이 없습니다.</Typography>
                        :
                        myConcertState.myDefaultInfo?.career.map((item) => (
                            <MyCareer key={item.groupId} idx={item.groupId} groupId={item.groupId} groupName={item.groupName} joinedAt={item.joinedAt} leavedAt={item.leavedAt}  />
                        ))
                }
            </Stack>
            {
                res750 ?
                    null
                    :
                    <Divider sx={{width: '80%', mb:2}}/>
            }
            <GroupDateEditModal open={openGroupEdit} close={setOpenGroupEdit} />
        </Stack>
    )
}

export default MyProfile