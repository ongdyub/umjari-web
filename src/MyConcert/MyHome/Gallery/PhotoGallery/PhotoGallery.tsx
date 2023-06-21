import {
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
import {useState} from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import GalleryModal from "../../../../Modal/GalleryModal";

const PhotoGallery = () => {

    const theme = useTheme();
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    const sort = ['시간','좋아요']
    const direction = ['오름차순', '내림차순']

    const [sortRule, setSortRule] = useState('시간')
    const [sortDirection, setSortDirection] = useState('오름차순')

    const handleRuleChange = (event: SelectChangeEvent) => {
        setSortRule(event.target.value);
    };
    const handleDirectionChange = (event: SelectChangeEvent) => {
        setSortDirection(event.target.value);
    };

    const [open, setOpen] = useState(false)
    const [imgId, setImgId] = useState(0)

    const [page, setPage] = useState(1);

    const handleImgOpen = (id: any) => {
        setOpen(true)
        setImgId(id)
    }
    const handleImgClose = () => {
        setOpen(false)
        setImgId(0)
    }
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

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
            <Stack sx={{width: '95%'}}>
                <ImageList variant="masonry" cols={3} gap={res750 ? 4 : 8}>
                    {itemData.map((item) => (
                        <ImageListItem key={item} sx={{cursor: 'pointer'}} onClick={() => handleImgOpen(item)}>
                            <img
                                src={`/img/${item}.jpg`}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{height: res750 ? '30%' : 'auto'}}
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
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res750 ? "small" : "large"} count={15} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
        </Stack>
    )
}

export default PhotoGallery

const itemData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
