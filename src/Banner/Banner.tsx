import {Link, Stack} from "@mui/material";

const Banner = () => {

    return(
        <Stack sx={{mt: 5, pb:-3}}>
            <Stack direction={'row'} justifyContent={'center'} sx={{mt: 2,width: '100%'}} alignItems={'center'}>
                간편 단체 등록 <Link sx={{ml: 2}} href={'https://forms.gle/cZTuP6pXAQSAebnZ9'} target={'_blank'}>여기로</Link>
            </Stack>
            <Stack direction={'row'} justifyContent={'center'} sx={{mt: 1,width: '100%'}} alignItems={'center'}>
                여러 사람들이 함께 정보를 공유하고, 검색할 수 있도록 단체를 등록해주세요!!!
            </Stack>
            <Stack direction={'row'} justifyContent={'center'} sx={{fontSize: 12, fontWeight: 700,mt: 2,width: '100%', mb:4}} alignItems={'center'}>
                연습실 / 악기사 / 단체 광고 및 기타 문의 : umjari@umjari.co.kr
            </Stack>
        </Stack>
    )
}

export default Banner