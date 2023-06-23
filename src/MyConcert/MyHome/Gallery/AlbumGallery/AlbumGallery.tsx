import {
    Divider,
    Grid,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    Stack,
    useMediaQuery,
    useTheme
} from "@mui/material";
import AlbumItem from "../AlbumItem/AlbumItem";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Card from "@mui/material/Card";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {albumListGet, galleryStateActions, selectGallery} from "../../../../store/slices/gallery/gallery";
import {useParams, useSearchParams} from "react-router-dom";
import {AppDispatch} from "../../../../store";
import {selectUser} from "../../../../store/slices/user/user";
import AddAlbumModal from "../../../../Modal/AddAlbumModal";

const AlbumGallery = () => {

    const galleryState = useSelector(selectGallery)
    const userState = useSelector(selectUser)

    const [searchParams, setSearchParams] = useSearchParams();

    const theme = useTheme();
    const {profileName} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const sort = ['시간']
    const direction = ['오름차순', '내림차순']

    const [sortRule, setSortRule] = useState('시간')
    const [sortDirection, setSortDirection] = useState('내림차순')
    const [open, setOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)

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

    useEffect(() => {
        const param = {
            page : 1,
            size : 10,
            sort : "createdAt,DESC",
        }
        dispatch(albumListGet({profileName : profileName, token : userState.accessToken, param : param}))
        return () => {
            dispatch(galleryStateActions.resetGallery())
        }
    },[dispatch, profileName])

    useEffect(() => {
        if(galleryState.album !== null){
            setPage(galleryState.album.albumPage.currentPage)
            setTotalPage(galleryState.album.albumPage.totalPages)
        }
    },[galleryState.album])

    useEffect(() => {
        const param = {
            page : searchParams.get('page'),
            size : 10,
            sort : "createdAt,DESC",
        }
        dispatch(albumListGet({profileName : profileName, token : userState.accessToken, param : param}))
    },[searchParams])

    useEffect(() => {
        if(sortDirection === '내림차순'){
            dispatch(galleryStateActions.descGallery())
        }
        if(sortDirection === '오름차순'){
            dispatch(galleryStateActions.ascGallery())
        }
    },[sortDirection])


    if(galleryState.album === null || galleryState.album === undefined){
        return(
            <Stack>
                로딩중...
            </Stack>
        )
    }
    return(
        <Stack sx={{mt: 2, width: '100%'}} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
            <Divider sx={{width: res750 ? '100%' : '90%', color: '#292929'}} />
            <Stack sx={{mt: 2}} direction={"row"} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
                <Stack direction={"row"}>
                    <Stack sx={{width: 80, mr: 3}} >
                        <Select
                            value={sortRule}
                            onChange={handleRuleChange}
                            variant="standard"
                            sx={{fontSize: 13}}
                        >
                            {sort.map((option) => (
                                <MenuItem sx={{fontSize: 13, maxHeight: 30,minHeight: 30}} key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                    <Stack sx={{width: 80}}>
                        <Select
                            value={sortDirection}
                            onChange={handleDirectionChange}
                            variant="standard"
                            sx={{fontSize: 13}}
                        >
                            {direction.map((option) => (
                                <MenuItem sx={{fontSize: 13, maxHeight: 30,minHeight: 30}} key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                </Stack>
            </Stack>
            <Stack sx={{mt: 2, width: '100%', mb: 5}} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
                <Grid justifyContent={"flex-start"} flexWrap={"wrap"} container spacing={1} columns={21} sx={{pr: res750 ? 2 : 5, pl: res750 ? 2: 0}}>
                    {
                        galleryState.album.isAuthor && page === 1 ?
                            <Grid item xs={10.5} res550={7} res750={10.5} md={7} lg={7} sx={{mb: 3}} alignItems={'center'}>
                                <Card onClick={() => setOpen(true)} sx={{cursor:'pointer', maxWidth: 345, boxShadow: 8 }}>
                                    <Stack sx={{width: '100%', mt: 0.7, mb: 0.5}} justifyContent={"center"} alignContent={"center"} alignItems={"center"}>
                                        <Typography sx={{fontSize: 12, fontWeight: 400}}>
                                            앨범 추가
                                        </Typography>
                                    </Stack>
                                    <Divider sx={{width: '100%', mb:0.3}} />
                                    <Stack sx={{height: '80px', width: '100%'}} justifyContent={'center'} alignContent={'center'} alignItems={'center'} direction={'row'}>
                                        <AddAPhotoIcon sx={{width: 'auto', height:'50px'}} />
                                    </Stack>
                                    <Stack sx={{width: '100%', mb:1}} direction={"row"} justifyContent={"flex-start"} alignItems={"center"} alignContent={"center"}>
                                        <PhotoLibraryIcon sx={{ml: 1, width: 15, height: 15}} />
                                        <Typography sx={{fontSize : 12, ml: 1, mr: 0.5}}>
                                            0
                                        </Typography>
                                        <Typography sx={{color: 'grey', fontSize: 8, fontWeight: 500, marginLeft: 'auto', pr:1}}>
                                            created At ...
                                        </Typography>
                                    </Stack>
                                </Card>
                            </Grid>
                            :
                            null
                    }
                    {
                        galleryState.album.isAuthor && open  ?
                            <AddAlbumModal open={open} setOpen={setOpen} />
                            :
                            null
                    }
                    {
                        galleryState.album.albumPage.contents.map((item, idx) => (
                            <Grid key={idx} item xs={10.5} res550={7} res750={10.5} md={7} lg={7} sx={{mb: 3}} alignItems={'center'}>
                                <AlbumItem item={item} />
                            </Grid>
                        ))
                    }
                </Grid>
                <Stack alignItems="center" sx={{width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                    <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res750 ? "small" : "large"} count={totalPage} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default AlbumGallery
