import {Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import AdvertisementItem from "./AdvertisementItem";

const roomData = [
    {
        name : '뮤지컬 팝스 오케스트라',
        image : 'https://mupops.com/images/place/2.jpg',
        phone : '010-3753-0700',
        regionParent: '서울시',
        regionChild: '관악구',
        site: 'https://mupops.com/',
        tags : ['오케스트라','악기대여']
    },
    {
        name : '우리누리 아트홀',
        image : 'https://modo-phinf.pstatic.net/20221213_15/1670910931654NF0U7_JPEG/mosaj6SD2Q.jpeg?type=w720',
        phone : '02-588-8654',
        regionParent: '서울시',
        regionChild: '관악구',
        site: 'https://woorinuriart.modoo.at/?link=9sq1fk1u',
        tags : ['오케스트라', '공연']
    },
    {
        name : '메종데쟈',
        image : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMjRfMTY1%2FMDAxNjk4MTA3MTI5MDQ3.tUQi733EGDAREtvDjZPe6u0xOhSE4oq-2CN7W4v6Cvgg.06c6iIvT7mWzVGBNtHbyOHofDPlJ4MdEQ4yVsjJkeXMg.JPEG.seoulstring%2FIMG_7522.JPG&type=sc960_832',
        phone : '010-2828-2500',
        regionParent: '서울시',
        regionChild: '서초구',
        site: 'https://www.instagram.com/maison_des_arts_seoul/',
        tags : ['오케스트라']
    },
    {
        name : 'BM뮤직',
        image : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMDNfMjIy%2FMDAxNjQ2Mjc4MTA3NTUy.W9Bhr1O8hwChrVXMcqOrtSwCpZz6TJ7zTfHqtlfqzSsg.NlG0PsR33_P1S4fRnCY7viSMfAhRxtUWsEgDmZFC1nQg.JPEG.bm-music%2FKakaoTalk_20210415_110749985.jpg&type=sc960_832',
        phone : '010-7177-1571',
        regionParent: '서울시',
        regionChild: '동작구',
        site: 'https://blog.naver.com/bm-music',
        tags : ['개인연습']
    }
]

const Advertisement = () => {

    const theme = useTheme();

    return(
        <Stack sx={{width: '100%', height: 330, mb: 5}}>
            <Stack direction="column" justifyContent="flex-start" alignItems="center" sx={{widht:'100%'}}>
                <Typography sx={{fontWeight: 300, fontSize: 22}} mt={1} >추천 연습실</Typography>
            </Stack>
            <Stack direction="row" sx={{pl:1, height: '370px', overflowX: 'scroll','&::-webkit-scrollbar': {display: 'none'}}}>
                {roomData.map((item) => (
                    <Grid sx={{mt:1, ml:1, mr:1, mb:1}}>
                        <AdvertisementItem item={item} />
                    </Grid>
                ))}
            </Stack>
        </Stack>
    )
}

export default Advertisement
