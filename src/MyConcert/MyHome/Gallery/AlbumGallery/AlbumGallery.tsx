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
import {useState} from "react";

const AlbumGallery = () => {

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

    const [page, setPage] = useState(1);
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
            <Stack sx={{mt: 2, width: '100%', mb: 5}} justifyContent={res750 ? "center" : ''} alignItems={res750 ? "center" : ''} alignContent={res750 ? "center" : ''}>
                <Grid justifyContent={"space-between"} flexWrap={"wrap"} container spacing={1} columns={22} sx={{pr: res750 ? 2 : 5, pl: res750 ? 2: 0}}>
                    {
                        itemData.map((item) => (
                            <Grid item res300={10.5} res750={10.5} md={7} lg={7} sx={{mb: 3}} direction={'row'} alignItems={'center'}>
                                <AlbumItem img={item} />
                            </Grid>
                        ))
                    }
                </Grid>
                <Stack alignItems="center" sx={{width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                    <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res750 ? "small" : "large"} count={15} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default AlbumGallery

const itemData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];