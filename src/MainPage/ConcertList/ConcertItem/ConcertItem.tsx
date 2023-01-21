import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Collapse, Divider,
    Grid, IconButton, Stack,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import './ConcertItem.scss'
import {useState} from "react";

const ConcertItem = (props: any) => {

    const { img } = props

    const theme = useTheme();

    const [openDetail, setOpenDetail] = useState(false)

    const onClickDetail = () => {
        setOpenDetail(!openDetail)
    }

    return(
        <Card className="concert-item" sx={{height: '285px', bgcolor: 'rgba(236,236,236,0.5)' }}>
            <CardActionArea onClick={onClickDetail} sx={{width: '210px'}}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image={img}
                    sx={{objectFit: 'fill', height: '290px',width: '210px'}}
                />
            </CardActionArea>
            <Divider orientation="vertical"  />
            {
                useMediaQuery(theme.breakpoints.down("md")) ?
                    <Collapse orientation="horizontal" in={openDetail} timeout="auto" unmountOnExit>
                        <CardContent onClick={onClickDetail} sx={{width: '200px', pl: '20px', paddingTop: '-120px',}}>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                날짜
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                2022-01-01
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                시간
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                19:30
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                러닝타임
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                110분
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                참여중인 친구
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                11명
                            </Typography>
                        </CardContent>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{pl: '10px',width: '100%'}}>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon sx={{width: '20px', height: '20px'}} />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon sx={{width: '20px', height: '20px'}} />
                            </IconButton>
                        </Stack>
                    </Collapse>
                    :
                    <Collapse orientation="horizontal" in={openDetail} timeout="auto" unmountOnExit>
                        <CardContent onClick={onClickDetail} sx={{width: '200px', pl: '20px', paddingTop: '-120px',}}>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                날짜
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                2022-01-01
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                시간
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                19:30
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                러닝타임
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                110분
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                참여중인 친구
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                11명
                            </Typography>
                        </CardContent>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{pl: '10px',width: '100%'}}>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon sx={{width: '20px', height: '20px'}} />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon sx={{width: '20px', height: '20px'}} />
                            </IconButton>
                        </Stack>
                    </Collapse>
            }

        </Card>

    )
}

export default ConcertItem
