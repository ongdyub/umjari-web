import {Divider, Pagination, Stack, useMediaQuery, useTheme} from "@mui/material";
import {useState} from "react";
import VisitList from "./VisitList/VisitList";

const Visit = () => {

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return(
        <Stack sx={{mt: 2, width: '100%'}} justifyContent={res550 ? "center" : ''} alignItems={res550 ? "center" : ''} alignContent={res550 ? "center" : ''}>
            <Divider sx={{width: '90%', color: '#292929'}} />
            <VisitList item={1} write={true} />
            {/*item에 본인 아이디, 이미지링크 붙여놓기*/}
            {
                itemData.map((item) => (
                    <VisitList item={item} write={false} />
                ))
            }
            <Stack alignItems="center" sx={{width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "large"} count={15} page={page} onChange={handleChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
        </Stack>
    )
}

const itemData = [2,3,4,6,7,9,10,13,14,18,20,21];

export default Visit