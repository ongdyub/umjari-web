import {Divider, Stack, Typography} from "@mui/material";

const SelfIntro = () => {

    const careerList = [
        {
            date: '2018.09.01',
            place: '서울대학교 문화관 대강당',
            group: 'SNUPO',
            concert: '53회 정기연주회',
            program: [
                {
                    composer: 'J.Brahms',
                    song: 'Academic Festival Overture, OP. 80',
                    part: 'Vn 2nd'
                },
                {
                    composer: 'P. I. Tchaikovsky',
                    song: 'Excerpts from Swan Lake, Op. 20',
                    part: 'Vn 2nd'
                },
                {
                    composer: 'J.Brahms',
                    song: 'Symphony No. 2 in D Major, Op. 73',
                    part: 'Vn 2nd'
                },
            ]
        },
        {
            date: '2019.03.02',
            place: '서울대학교 문화관 대강당',
            group: 'SNUPO',
            concert: '54회 정기연주회',
            program: [
                {
                    composer: 'C. M. v. Weber',
                    song: 'Der Freischütz Overture, Op. 77',
                    part: 'Trp 2nd'
                },
                {
                    composer: 'A. Dvořák',
                    song: 'Cello Concerto in b minor, Op. 104',
                    part: 'Trp 2nd'
                },
                {
                    composer: 'J. Sibelius',
                    song: 'Symphony No. 2 in D Major, Op. 43',
                    part: 'Vn 2nd'
                },
            ]
        },
        {
            date: '2019.09.01',
            group: 'SNUPO',
            place: '서울대학교 문화관 대강당',
            concert: '55회 정기연주회',
            program: [
                {
                    composer: 'A. Dvořák',
                    song: 'Othello Overture, Op. 77',
                    part: 'Trp 2nd'
                },
                {
                    composer: 'P. I. Tchaikovsky',
                    song: 'The Sleeping Beauty (suite), Op. 66a',
                    part: 'Trp 1st'
                },
                {
                    composer: 'J. Sibelius',
                    song: 'Symphony No. 1 in e minor, Op. 39',
                    part: 'Trp 1st'
                },
            ]
        },
        {
            date: '2022.10.15',
            group: '가우디움',
            place: '인천 아트센터',
            concert: '창단 10주년 기념 연주회',
            program: [
                {
                    composer: 'G. Mahler',
                    song: 'Lieder eines fahrenden Gesellen',
                    part: 'Vn 2nd'
                },
                {
                    composer: 'G. Mahler',
                    song: 'Symphony No. 5 in c# minor',
                    part: 'Vn 2nd'
                },
            ]
        },
        {
            date: '2023.03.02',
            group: 'SNUPO',
            place: '서울대학교 문화관 대강강',
            concert: '60회 정기연주회',
            program: [
                {
                    composer: 'J. Strauss II',
                    song: 'Kaiser-Walzer, Op. 437',
                    part: 'Vn 1st'
                },
                {
                    composer: 'A. Borodin',
                    song: 'Symphony No. 2 in b minor',
                    part: 'Vn 1st'
                },
                {
                    composer: 'H. Berlioz',
                    song: 'Symphonie fantastique, H. 48',
                    part: 'Trb III'
                },
            ]
        },
    ]
    return(
        <Stack sx={{mt: 2}}>
            <Divider sx={{width: '90%', color: '#292929'}} />
            <Stack sx={{mt: 2}}>
                {careerList.map((item) => (
                    <Stack>
                        <Stack direction={"row"}>
                            <Typography>{item.group}</Typography>
                            <Typography>{item.concert}</Typography>
                        </Stack>
                        <Stack direction={"row"}>
                            <Typography>{item.place}</Typography>
                            <Typography>{item.date}</Typography>
                        </Stack>
                        <Stack>
                            {item.program.map((item) => (
                                <Stack>
                                    <Typography>{item.composer}</Typography>
                                    <Typography>{item.song}</Typography>
                                    <Typography>{item.part}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    )
}

export default SelfIntro