import {Box, Card, Stack, Typography, Link, useMediaQuery, useTheme, Divider} from "@mui/material";

const AdvertisementItem = (props : any) => {

    const theme = useTheme();
    const {item} = props
    const res600 = useMediaQuery(theme.breakpoints.down("sm"))

    return(
        <Card sx={{ width: 220, height: '100%', boxShadow: 5 }}>
            <Stack direction={'row'} justifyContent={'center'} sx={{width: '100%'}}>
                <Typography sx={{ fontWeight: 400, fontSize: 13, mt: 1, mb:1 }}>{item.name}</Typography>
            </Stack>
            <Stack direction='row' justifyContent={'center'} sx={{width:'100%', height: '50%', mb:1}}>
                <Box component="img"
                    sx={{
                        display: 'block',
                        width: '100%',
                        objectFit: 'cover',
                    }}
                    onError={({ currentTarget }) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                    alt="Practice Room Image"
                    src={`${item.image}`}/>
            </Stack>
            <Stack direction={'row'} alignContent={'center'} alignItems={'center'} justifyContent={'center'} sx={{width:'100%',mb:0.5}}>
                <Typography sx={{ fontSize: 14, mr:0.5 }} color="text.secondary">{item.regionParent}</Typography>
                <Typography sx={{ fontSize: 14, mr:2}} color="text.secondary">{item.regionChild}</Typography>
                <Link href={item.site} sx={{ cursor: 'pointer', fontSize:11 }} target="_blank">사이트</Link>
            </Stack>
            <Divider sx={{width: '100%', mb:0.5}} />
            <Stack direction={'row'} alignContent={'center'} alignItems={'center'} justifyContent={'center'} sx={{ width: '100%' }}>
                <Typography sx={{ fontSize: 11, mr: 0.5 }}>연락처 :</Typography>
                <Typography sx={{ fontSize: 14}}>{item.phone}</Typography>
            </Stack>
            <Divider sx={{ width: '100%', mt: 0.5, mb:1 }} />
            <Stack direction={'row'} alignContent={'center'} alignItems={'center'} justifyContent={'center'} sx={{width: '100%', height:'auto'}}>
                {item.tags.map((tag : any) => (
                    <Typography sx={{fontSize: 11, fontWeight: 800, color: 'grey', mr:1}}>#{tag}</Typography>
                ))}
            </Stack>
        </Card>
    )
}

export default AdvertisementItem
