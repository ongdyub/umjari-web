import {Button, Card, CardActions, CardMedia, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import GroupConcertList from "./GroupConcertList/GroupConcertList";

const careerList = [
    {
        date: '2023.03.02',
        place: '서울대학교 문화관 대강당',
        group: 'SNUPO',
        concert: '제 60회 정기연주회',
        img: '/img/poster.jpeg',
        program: [
            {
                composer: 'J.Strauss II',
                song: 'Kaiser-Walzer, Op. 437',
                part: 'Vn 1st'
            },
            {
                composer: 'A.Borodin',
                song: 'Symphony No. 2 in b minor',
                part: 'Vn 1st'
            },
            {
                composer: 'H.Berlioz',
                song: 'Symphonie Fantastique, H. 48',
                part: 'Trb 3rd'
            },
        ]
    },
    {
        date: '2018.09.01',
        place: '서울대학교 문화관 대강당',
        group: 'SNUPO',
        concert: '53회 정기연주회',
        img: 'https://www.snupo.org/files/attach/images/157797/872/028/001/%E1%84%8E%E1%85%AC%E1%84%8C%E1%85%A9%E1%86%BC.jpg',
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
        img: 'https://www.snupo.org/files/attach/images/157797/304/062/001/KakaoTalk_20190403_111324077.png',
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
        img: 'https://www.snupo.org/files/attach/images/157797/514/111/001/55.jpg',
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
        date: '2021.09.27',
        group: 'SNUPO',
        place: '유니버셜아트센터 대극장',
        concert: '57회 정기연주회',
        img: 'https://www.snupo.org/files/attach/images/157797/193/123/001/SNUPO57%ED%8F%AC%EC%8A%A4%ED%84%B0%EC%95%95%EC%B6%95.jpg',
        program: [
            {
                composer: 'J. Strauss II',
                song: 'Overture to Die Fledermaus',
                part: 'Trp 1st'
            },
            {
                composer: 'S. Rachmaninoff',
                song: 'Piano Concerto No.2 in C Minor, op. 18',
                part: 'Trp 2nd'
            },
            {
                composer: 'J. Brahms',
                song: 'Symphony No.4 in E Minor, op. 98',
                part: 'Vn 1st'
            },
        ]
    },
    {
        date: '2022.03.02',
        group: 'SNUPO',
        place: '서울대학교 문화관 대강당',
        concert: '58회 정기연주회',
        img: 'https://www.snupo.org/files/attach/images/157797/537/137/001/8697fc06-3b79-48d3-af93-d47be8d65871.pdf-0001.png',
        program: [
            {
                composer: 'C. Saint-Saëns',
                song: 'Danse Macabre, Op. 40',
                part: 'Vn 1st'
            },
            {
                composer: 'F. Mendelssohn',
                song: 'Violin Concerto in E minor, Op. 64',
                part: 'Vn 1st'
            },
            {
                composer: 'G. Mahler',
                song: 'Symphony No.1 in D major "Titan"',
                part: 'Trp 3rd'
            },
        ]
    },
    {
        date: '2022.09.01',
        group: 'SNUPO',
        place: '서울대학교 문화관 대강당',
        concert: '59회 정기연주회',
        img: 'https://www.snupo.org/files/attach/images/157797/561/154/001/59%ED%9A%8C%20%ED%8F%AC%EC%8A%A4%ED%84%B0.png',
        program: [
            {
                composer: 'J. Brahms',
                song: 'Academic Festival Overture, Op.80',
                part: 'Vn 1st'
            },
            {
                composer: 'É. Lalo',
                song: 'Symphonie Espagnole, Op.21',
                part: 'Vn 1st'
            },
            {
                composer: 'P. I. Tchaikovsky',
                song: 'Symphony No.5 in E minor, Op.64',
                part: 'Trb 3rd'
            },
        ]
    },
    {
        date: '2022.10.15',
        group: '가우디움',
        place: '인천 아트센터',
        concert: '창단 10주년 기념 연주회',
        img: 'https://modo-phinf.pstatic.net/20220929_263/1664462069809sDOej_PNG/mosa1YMLrv.png?type=w720',
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
]

const GroupConcert = () => {

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    return(
        <Stack justifyContent={"flex-start"}>
            <Divider sx={{width: res550 ? '100%' : '90%', mt: -1}}/>
            <Stack sx={{mt: 2, width: '100%'}} justifyContent={res550 ? "center" : ''} alignItems={res550 ? "center" : ''} alignContent={res550 ? "center" : ''}>
                {
                    res550 ?
                        careerList.map((item) => (
                            <GroupConcertList item={item} />
                        ))
                        :
                        careerList.map((item) => (
                            <Card sx={{ display: 'flex', mb: 2, width: '90%', height: 290}}>
                                <Stack sx={{height: '100%'}}>
                                    <CardMedia
                                        component="img"
                                        sx={{ objectFit: 'fill', height: '100%', minWidth: 206 }}
                                        image={item.img}
                                        alt="Live from space album cover"
                                    />
                                </Stack>

                                <Stack sx={{flexDirection: 'column', ml: 4, pt: 2, width: 'calc(100% - 250px)'}}>
                                    {item.program.map((item) => (
                                        <Stack sx={{width: '100%'}}>
                                            <Stack direction={"row"} alignContent={"center"} alignItems={"center"}>
                                                <Typography variant="caption"  display="block" gutterBottom sx={{fontWeight: 600, fontSize: 12, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                                    {item.composer}
                                                </Typography>
                                                <Divider orientation={"vertical"} sx={{ml:2, mr: 2, height: '50%'}} />
                                                {/*<Typography variant="caption"  display="block" gutterBottom sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 12, fontWeight: 300}}>*/}
                                                {/*    [ {item.part} ]*/}
                                                {/*</Typography>*/}
                                                {/*<Divider orientation={"vertical"} sx={{ml:2, mr: 2, height: '50%'}} />*/}
                                            </Stack>
                                            <Stack direction={"row"} alignContent={"center"} alignItems={"center"} sx={{width: '100%'}}>
                                                <Typography variant="overline"  display="block" gutterBottom sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: 15, color: 'grey'}}>
                                                    {item.song}
                                                </Typography>
                                            </Stack>
                                            <Divider sx={{mt:-1, mb:1}} />
                                        </Stack>
                                    ))}
                                    <Stack>
                                        <CardActions>
                                            <Button size="small" sx={{ml: -2}}>후기 쓰러가기</Button>
                                        </CardActions>
                                    </Stack>
                                </Stack>
                                <Stack justifyContent={"flex-end"} sx={{marginLeft: 'auto', position: 'relative', bottom:10, right: 25, minWidth: 145}}>
                                    <Stack justifyContent={"flex-end"}  direction={"row"}>
                                        <Typography variant={"caption"} sx={{color: 'grey'}}>{item.date}</Typography>
                                    </Stack>
                                    <Stack justifyContent={"flex-end"} direction={"row"}>
                                        <Typography variant={"caption"} sx={{color: 'grey'}}>{item.place}</Typography>
                                    </Stack>
                                    <Stack sx={{}} justifyContent={"flex-end"} alignContent={"center"} alignItems={"center"} direction={"row"}>
                                        <Typography variant={"caption"} sx={{color: 'grey', whiteSpace: 'nowrap'}}>{item.group}</Typography>
                                        <Divider orientation={"vertical"} sx={{height: '50%', mr:1, ml:1}} />
                                        <Typography variant={"caption"} sx={{color: 'grey', whiteSpace: 'nowrap'}}>{item.concert}</Typography>
                                    </Stack>
                                </Stack>
                            </Card>
                        ))
                }
            </Stack>
        </Stack>
    )
}

export default GroupConcert
