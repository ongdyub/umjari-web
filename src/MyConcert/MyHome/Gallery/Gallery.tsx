import {
    Divider,
    FormControlLabel,
    FormGroup, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar,
    MenuItem, Pagination,
    Stack,
    Switch,
    TextField, Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {useState} from "react";
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import GalleryModal from "../../../Modal/GalleryModal";
import GalleryAlbum from "./GalleryAlbum/GalleryAlbum";

const Gallery = () => {

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))
    const res600 = useMediaQuery(theme.breakpoints.down("md"))

    const sort = ['시간','좋아요']
    const picNum = [10,15,20]
    const direction = ['오름차순', '내림차순']
    const [all, setAll] = useState(false)

    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false)
    const [imgId, setImgId] = useState(0)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const handleImgOpen = (id: any) => {
        setOpen(true)
        setImgId(id)
    }
    const handleImgClose = () => {
        setOpen(false)
        setImgId(0)
    }

    return(
        <Stack sx={{mt: 2, width: '100%'}} justifyContent={res550 ? "center" : ''} alignItems={res550 ? "center" : ''} alignContent={res550 ? "center" : ''}>
            <Divider sx={{width: '90%', color: '#292929'}} />
            <Stack sx={{mt: 2}} direction={"row"} justifyContent={res550 ? "center" : ''} alignItems={res550 ? "center" : ''} alignContent={res550 ? "center" : ''}>
                <Stack direction={res550 ? "column" : "row"}>
                    <Stack sx={{width: 110, mr: 5}} >
                        <TextField
                            select
                            defaultValue="시간"
                            helperText="정렬기준"
                            variant="standard"
                        >
                            {sort.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                    <Stack sx={{width: 110, mr: 5}}>
                        <TextField
                            select
                            defaultValue="오름차순"
                            helperText="정렬기준"
                            variant="standard"
                        >
                            {direction.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </Stack>
                <Stack direction={res550 ? "column" : "row"}>
                    <Stack sx={{width: 110, mt: res550 ? -2.8 : 0}} >
                        <TextField
                            select
                            defaultValue={10}
                            helperText="1페이지당 사진수"
                            variant="standard"
                        >
                            {picNum.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                    <FormGroup sx={{pt:1}}>
                        <FormControlLabel control={<Switch
                            checked={all}
                            onChange={() => setAll(!all)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            size={"small"}
                            sx={{ml: 4}}
                        />} label="전체보기" />
                    </FormGroup>
                </Stack>
            </Stack>

            {
                all ?
                    <>
                        <Stack sx={{width: '95%'}}>
                            <ImageList variant="masonry" cols={3} gap={res550 ? 4 : 8}>
                                {itemData.map((item) => (
                                    <ImageListItem key={item} sx={{cursor: 'pointer'}} onClick={() => handleImgOpen(item)}>
                                        <img
                                            src={`/img/${item}.jpg`}
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            sx={{height: res550 ? '30%' : 'auto'}}
                                            title={item}
                                            //시리즈 모음집 이름
                                            subtitle={item}
                                            //개별 사진 title
                                            actionIcon={
                                                <IconButton
                                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                    aria-label={`info about ${item}`}
                                                >
                                                    <FavoriteIcon sx={{width: 15, height: 15}} />
                                                    <Typography sx={{fontSize: 13, ml:0.5, mr:1}}>
                                                        123
                                                    </Typography>
                                                    <CommentIcon sx={{width: 15, height: 15}} />
                                                    <Typography sx={{fontSize: 13, ml:0.5}}>
                                                        51
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
                            <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "large"} count={15} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
                        </Stack>
                    </>
                    :
                    <>
                        <Grid justifyContent={"space-between"} flexWrap={"wrap"} container spacing={1} columns={22} sx={{pt: res550 ? 3 : 5, pr: res550 ? 2 : 5, pl: res550 ? 2: 0}}>
                            {
                                itemData.map((item) => (
                                    <Grid item res300={10.5} res550={10.5} md={7} lg={7} sx={{mb: 4}}>
                                        <GalleryAlbum img={item} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Stack alignItems="center" sx={{width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                            <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "large"} count={15} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
                        </Stack>
                    </>
            }

        </Stack>
    )
}

export default Gallery

const itemData = [2,3,4,6,7,8,9,10,11,12,13,14,16,18,19,20,21];