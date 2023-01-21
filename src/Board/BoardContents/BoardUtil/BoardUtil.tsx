import {Pagination, Stack, useMediaQuery} from "@mui/material";
import {useState} from "react";

const BoardUtil = () => {

    const res800 = useMediaQuery('(max-width:800px)')
    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return(
        <Stack alignItems="center" sx={{width:'100%', height: '120px', bgcolor: 'pink'}} flexDirection={'row'} justifyContent="center" alignContent="center">
            <Pagination sx={{display: 'flex', width: '80%',justifyContent: "center", alignItems:"center"}} size="small" count={15} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
        </Stack>
    )
}

export default BoardUtil