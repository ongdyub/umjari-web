import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Collapse,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import './ConcertItem.scss'
import {useState} from "react";
import {useNavigate} from "react-router";

const ConcertItem = (props: any) => {

    const { item } = props

    const theme = useTheme();
    const navigate = useNavigate();

    const [openDetail, setOpenDetail] = useState(false)

    const onClickDetail = () => {
        setOpenDetail(!openDetail)
    }

    const onClickGoConcert = () => {
        navigate(`/concert/${item.id}/info`)
    }

    const copyConcertLink = () => {
        const textarea = document.createElement("textarea")

        document.body.appendChild(textarea)
        textarea.value = window.document.location.href + `concert/${item.id}/info`
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
        window.alert("링크가 복사되었습니다.")
    }

    return(
        <Card className="concert-item" sx={{height: '347.72px',boxShadow: 5 }}>
            <CardActionArea disableRipple onClick={onClickDetail} sx={{width: '247px'}}>
                <CardMedia
                    component="img"
                    alt="Concert Poster"
                    image={item.posterImg}
                    onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                    sx={{objectFit: 'contain', height: 'auto', width: '100%'}}
                />
            </CardActionArea>
            {
                useMediaQuery(theme.breakpoints.down("md")) ?
                    <Collapse orientation="horizontal" in={openDetail} timeout="auto" unmountOnExit sx={{position: 'relative'}}>
                        <CardContent onClick={onClickDetail} sx={{ml: '5px',width: '210px', height: '301.72px'}}>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                날짜
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                {item.concertDate}
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                시간
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                {item.concertTime.slice(0,5)}
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                러닝타임
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                {item.concertRunningTime}
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                참여중인 친구
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {item.friendCount === null ? '로그인이 필요합니다.' : item.friendCount}
                            </Typography>
                        </CardContent>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{pl: '10px',width: '100%'}}>
                            {/*<IconButton aria-label="add to favorites">*/}
                            {/*    <FavoriteIcon sx={{width: '20px', height: '20px'}} />*/}
                            {/*</IconButton>*/}
                            <IconButton onClick={copyConcertLink} aria-label="share">
                                <ShareIcon sx={{width: '20px', height: '20px'}} />
                            </IconButton>
                            <Button onClick={onClickGoConcert} size="medium" sx={{ml: '5px'}}>
                                자세히 보기
                            </Button>
                        </Stack>
                    </Collapse>
                    :
                    <Collapse orientation="horizontal" in={openDetail} timeout="auto" unmountOnExit sx={{position: 'relative'}}>
                        <CardContent onClick={onClickDetail} sx={{ml: '5px',width: '210px', height: '301.72px'}}>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                날짜
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                {item.concertDate}
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                시간
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                {item.concertTime.slice(0,5)}
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>
                                러닝타임
                            </Typography>
                            <Typography sx={{fontWeight: 'bold', fontSize: '15px'}} variant="h6" gutterBottom>
                                {item.concertRunningTime}
                            </Typography>
                            {/*<Typography sx={{fontWeight: 'bold', fontSize: '12px'}} color="text.secondary" variant="subtitle2" gutterBottom>*/}
                            {/*    참여중인 친구*/}
                            {/*</Typography>*/}
                            {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
                            {/*    0명*/}
                            {/*</Typography>*/}
                        </CardContent>
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{pl: '10px',width: '100%'}}>
                            {/*<IconButton aria-label="add to favorites">*/}
                            {/*    <FavoriteIcon sx={{width: '20px', height: '20px'}} />*/}
                            {/*</IconButton>*/}
                            <IconButton onClick={copyConcertLink} aria-label="share">
                                <ShareIcon sx={{width: '20px', height: '20px'}} />
                            </IconButton>
                            <Button onClick={onClickGoConcert} size="medium" sx={{ml: '5px'}}>
                                자세히 보기
                            </Button>
                        </Stack>
                    </Collapse>
            }

        </Card>

    )
}

export default ConcertItem
