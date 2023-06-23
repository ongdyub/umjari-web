import {
    Button,
    CircularProgress,
    Divider,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar, MenuItem, Pagination, Select, SelectChangeEvent,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {useEffect, useState} from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import GalleryModal from "../../../../Modal/GalleryModal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../../store";
import {selectUser} from "../../../../store/slices/user/user";
import {
    deleteAlbum,
    galleryStateActions,
    photoListGet,
    postPhoto,
    selectGallery
} from "../../../../store/slices/gallery/gallery";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import * as React from "react";
import {
    myConcertProfileImageUpload,
} from "../../../../store/slices/myconcert/myconcert";
import Backdrop from "@mui/material/Backdrop";
import DeleteConfirmModal from "../../../../Modal/DeleteConfirmModal";
import AddAlbumModal from "../../../../Modal/AddAlbumModal";

const PhotoGallery = () => {

    const {profileName,albumId} = useParams()
    const theme = useTheme();
    const navigate = useNavigate()
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const dispatch = useDispatch<AppDispatch>()
    const userState = useSelector(selectUser)
    const galleryState = useSelector(selectGallery)
    const [searchParams, setSearchParams] = useSearchParams();
    const sort = ['시간']
    const direction = ['오름차순', '내림차순']

    const [sortRule, setSortRule] = useState('시간')
    const [sortDirection, setSortDirection] = useState('내림차순')

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)

    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
    const [confirm, setConfirm] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)

    const [imgLoadingOpen,  setImgLadingOpen] = useState(false)

    const handleRuleChange = (event: SelectChangeEvent) => {
        setSortRule(event.target.value);
    };
    const handleDirectionChange = (event: SelectChangeEvent) => {
        setSortDirection(event.target.value);
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set('page',value.toString())
        setSearchParams(searchParams)
        setPage(value);
    };

    const [open, setOpen] = useState(false)
    const [imgId, setImgId] = useState(0)

    const handleImgOpen = (id: any) => {
        setOpen(true)
        setImgId(id)
    }
    const handleImgClose = () => {
        setOpen(false)
        setImgId(0)
    }

    const handleUploadPhoto = async (e: any) => {

        const imageToken = []
        let failedCount = 0

        if(e.target.files.length < 1){
            window.alert("선택된 사진이 없습니다.")
            return
        }
        if(e.target.files.length > 10){
            window.alert("10장 이하의 사진만 선택 가능합니다.")
            return
        }

        setImgLadingOpen(true)

        for(let i = 0; i < e.target.files.length; i++){
            const formData = new FormData()
            formData.append('image', e.target.files[i])
            const result = await dispatch(myConcertProfileImageUpload({token: userState.accessToken, formData: formData}))

            if (result.type === `${myConcertProfileImageUpload.typePrefix}/fulfilled`) {
                imageToken.push(result.payload.token)
            } else {
                failedCount += 1
            }
        }

        const data = {
            tokenList : imageToken
        }

        const result = await dispatch(postPhoto({albumId, token : userState.accessToken, data}))
        if(result.type === `${postPhoto.typePrefix}/fulfilled`){
            setImgLadingOpen(false)
            const param = {
                page : 1,
                size : 10,
                sort : "createdAt,DESC",
            }
            dispatch(photoListGet({albumId, token: userState.accessToken, param}))
            window.alert(failedCount + " 개의 이미지가 업로드에 실패했습니다.")
        }
        else{
            window.alert("새로고침 후 다시 시도해주세요.")
        }

    }

    useEffect(() => {
        const param = {
            page : 1,
            size : 10,
            sort : "createdAt,DESC",
        }
        dispatch(photoListGet({albumId, token: userState.accessToken, param}))
        return () => {
            dispatch(galleryStateActions.resetGallery())
        }
    },[dispatch, albumId])

    useEffect(() => {
        if(confirm){
            dispatch(deleteAlbum({albumId, token : userState.accessToken}))
            navigate(`/myconcert/${profileName}/gallery`)
        }
    },[confirm])

    if(galleryState.photo === null){
        return(
            <Stack>
                로딩중...
            </Stack>
        )
    }
    return(
        <Stack sx={{mt: 2, width: '100%'}} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={imgLoadingOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Divider sx={{width: res750 ? '100%' : '90%', color: '#292929'}} />
            <Stack sx={{mt: 2}} direction={"row"} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
                <Stack direction={"row"}>
                    <Stack sx={{width: 50, mr: 1}} >
                        <Select
                            value={sortRule}
                            onChange={handleRuleChange}
                            variant="standard"
                            sx={{fontSize: 11}}
                        >
                            {sort.map((option) => (
                                <MenuItem sx={{fontSize: 11, maxHeight: 30,minHeight: 30}} key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                    <Stack sx={{width: 70}}>
                        <Select
                            value={sortDirection}
                            onChange={handleDirectionChange}
                            variant="standard"
                            sx={{fontSize: 11}}
                        >
                            {direction.map((option) => (
                                <MenuItem sx={{fontSize: 11, maxHeight: 30,minHeight: 30}} key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                    {
                        galleryState.photo.isAuthor ?
                            <Stack sx={{ml:1}}>
                                <IconButton component="label" size={'small'}>
                                    <input hidden accept="image/*" multiple type="file" onChange={handleUploadPhoto} />
                                    <AddAPhotoIcon />
                                </IconButton>
                            </Stack>
                            :
                            null
                    }
                    {
                        galleryState.photo.isAuthor ?
                            <Stack sx={{ml:1}} direction={'row'}>
                                <Button sx={{fontSize:7}} color={'error'} onClick={() => setDeleteOpen(true)}>앨범삭제</Button>
                                <Button sx={{fontSize:7}} color={'info'} onClick={() => setEdit(true)}>제목변경</Button>
                            </Stack>
                            :
                            null
                    }
                </Stack>
            </Stack>
            <Stack sx={{width: '95%'}}>
                <ImageList variant="masonry" cols={3} gap={res750 ? 4 : 8}>
                    {galleryState.photo.photoPage.contents.map((item, idx) => (
                        <ImageListItem key={idx} sx={{cursor: 'pointer'}} onClick={() => handleImgOpen(item)}>
                            <img
                                src={item.url}
                                alt="갤러리 사진입니다."
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{height: res750 ? '30%' : 'auto'}}
                                title={'title'}
                                //시리즈 모음집 이름
                                subtitle={'subtitle'}
                                //개별 사진 title
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item}`}
                                    >
                                        <FavoriteIcon sx={{width: 15, height: 15}} />
                                        <Typography sx={{fontSize: 13, ml:0.5, mr:1}}>
                                            0
                                        </Typography>
                                        <CommentIcon sx={{width: 15, height: 15}} />
                                        <Typography sx={{fontSize: 13, ml:0.5}}>
                                            0
                                        </Typography>
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                <GalleryModal open={open} handleClose={handleImgClose} imgId={imgId}/>
            </Stack>
            <Stack alignItems="center" sx={{width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res750 ? "small" : "large"} count={totalPage} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            {
                deleteOpen ?
                    <DeleteConfirmModal open={deleteOpen} setOpen={setDeleteOpen} setConfirm={setConfirm} />
                    :
                    null
            }
            {
                edit ?
                    <AddAlbumModal open={edit} setOpen={setEdit} mode={'edit'} />
                    :
                    null
            }
        </Stack>
    )
}

export default PhotoGallery
