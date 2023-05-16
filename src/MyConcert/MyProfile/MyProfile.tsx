import {Box, Button, Chip, CircularProgress, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
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

const groupList = [
    {
        name: 'SNUPO',
        join: '2018.10',
        end : ''
    },
    {
        name: '56사단 군악대',
        join: '2019.10',
        end : '2021.04'
    },
    {
        name: 'SNUGO',
        join: '2022.04',
        end : ''
    },
    {
        name: '가우디움',
        join: '2022.05',
        end : '2022.10'
    },
    {
        name: 'AOU',
        join: '2022.05',
        end : '2022.10'
    },
]


const MyProfile = () => {

    const myRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | null | undefined>(null);
    const [imgLoadingOpen,  setImgLadingOpen] = useState(false)

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

        const result = await dispatch(myConcertProfileImageUpload({token : userState.accessToken, formData : formData}))

        if (result.type === `${myConcertProfileImageUpload.typePrefix}/fulfilled`) {

            const putImage = await dispatch(myConcertUserImagePut({token: userState.accessToken, image: result.payload.url}))

            if(putImage.type === `${myConcertUserImagePut.typePrefix}/fulfilled`){

                setImgLadingOpen(false)

                window.alert("프로필이 변경되었습니다.")
                dispatch(myConcertDefaultInfoGet({token : userState.accessToken, profileName : profileName}))
                dispatch(userActions.setHeaderImage({profileImage : result.payload.url}))

            } else {

                setImgLadingOpen(false)

                window.alert("프로필 변경 실패")
            }
        } else {

            setImgLadingOpen(false)

            window.alert("이미지 업로드 실패. 용량(10MB)과 네트워크를 확인해 주세요")
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
            <Stack direction={res750 ? "row" : 'column'} justifyContent={"flex-start"} sx={{width: '80%', flexWrap: res750 ? 'wrap' : '', pl: res750 ? 1 : 0, pr: res750 ? 1 : 0, pt:2 }}>
                {groupList.map((item, idx) => (
                    <Stack key={idx} justifyContent={"center"} sx={{width: res750 ? 'auto' : '100%', mb: res750 ? 1 : 3, flexWrap: res750 ? 'wrap' : '', mr: res750 ? 2 : 0, ml: res750 ? 2 : 0}} direction={"column"}>
                        {
                            res750 ?
                                <Chip label={item.name} sx={{fontSize : res500 ? 10 : 13, width: '100%', height: res500 ? 20 : 30}} />
                                :
                                <Typography sx={{fontWeight: 900, fontSize: res500 ? 8 : 17, color: '#111111'}}>{item.name}</Typography>
                        }
                        {
                            res750 ?
                                <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"} sx={{width: 'auto', mt:0.5}}>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{item.join}</Typography>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12, ml:0.5, mr: 0.5}}>~</Typography>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{item.end}</Typography>
                                </Stack>
                                :
                                <Stack direction={"row"} justifyContent={"flex-start"} sx={{width: '100%', mt:1}}>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{item.join}</Typography>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12, ml:0.5, mr: 0.5}}>~</Typography>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{item.end}</Typography>
                                </Stack>
                        }
                    </Stack>
                ))}
            </Stack>
            {
                res750 ?
                    null
                    :
                    <Divider sx={{width: '80%', mb:2}}/>
            }
        </Stack>
    )
}

export default MyProfile