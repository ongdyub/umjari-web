import {Divider, MenuItem, Stack, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";

const SelfIntro = () => {

    const theme = useTheme();
    const selfList = [
        {
            composer: 'J. Brahms',
            part: 'Vn 2nd',
            title: 'Academic Festival Overture, Op. 80',
            role: '',
            group: 'SNUPO'
        },
        {
            composer: 'J. Brahms',
            part: 'Vn 2nd',
            title: 'Symphony No. 2 in D Major, Op. 73',
            role: '',
            group: 'SNUPO'
        },
        {
            composer: 'J. Brahms',
            part: 'Vn 1st',
            title: 'Symphony No. 4 in e minor, Op. 98',
            role: '',
            group: 'SNUPO'
        },
        {
            composer: 'J. Brahms',
            part: 'Vn 1st',
            title: 'Academic Festival Overture, Op. 80',
            role: '',
            group: 'SNUPO'
        },
        {
            composer: 'P. I. Tchaikovsky',
            part: 'Vn 2nd',
            title: 'Excerpts from Swan Lake, Op. 20',
            role: '',
            group: 'SNUPO'
        },
        {
            composer: 'P. I. Tchaikovsky',
            part: 'Trp 1st',
            title: 'The Sleeping Beauty (suite), Op. 66a',
            role: '',
            group: 'SNUPO'
        },
        {
            composer: 'P. I. Tchaikovsky',
            part: 'Vn 1st',
            title: 'Symphony No.5 in e minor, Op.64',
            role: '',
            group: 'SNUPO'
        },
        {
            composer: 'P. I. Tchaikovsky',
            part: 'Trp 3rd',
            title: 'Symphony No.5 in e minor, Op.64',
            role: '',
            group: 'SNUPO'
        },
        {
            composer: 'J. Sibelius',
            part: 'Trp 1st',
            title: 'Symphony No. 1 in e minor, Op. 39',
            role: '',
            group: 'SNUPO'
        },
        {
            composer: 'J. Sibelius',
            part: 'Vn 2nd',
            title: 'Symphony No. 2 in D Major, Op. 43',
            role: '',
            group: 'SNUPO'
        },
    ]
    const sort = ['작곡가', '곡명', '파트', '단체']
    const direction = ['오름차순', '내립차순']
    const res1000 = useMediaQuery(theme.breakpoints.down("res1000"))

    return(
        <Stack sx={{mt: 2}}>
            <Divider sx={{width: '90%', color: '#292929'}} />
            <Stack sx={{mt: 2}} direction={"row"}>
                <Stack sx={{width: 110, mr: 5}} >
                    <TextField
                        select
                        defaultValue="작곡가"
                        helperText="정렬기준"
                        variant="standard"
                    >
                        {sort.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Stack sx={{width: 110}}>
                    <TextField
                        select
                        defaultValue="오름차순"
                        helperText="정렬기준"
                        variant="standard"
                    >
                        {direction.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
            </Stack>
            <Stack sx={{mt: 1, mb: 10}}>
                {selfList.map((item) => (
                    <Stack sx={{mt:3, mb:1}}>
                        {
                            res1000 ?
                                <Stack justifyContent={"flex-start"}>
                                    <Stack direction={'row'} justifyContent={"flex-start"} alignItems={"center"} alignContent={"center"} sx={{width: '100%'}}>
                                        <Stack justifyContent={"flex-start"} sx={{width: '35%'}}>
                                            <Typography variant={"caption"} sx={{fontWeight: 900, fontSize: 15}}>{item.composer}</Typography>
                                        </Stack>
                                        <Stack justifyContent={"flex-start"} sx={{width: '20%'}}>
                                            <Typography variant={"subtitle2"}>{item.part}</Typography>
                                        </Stack>
                                        <Stack justifyContent={"flex-start"} sx={{width: '20%'}}>
                                            <Typography variant={"caption"} sx={{fontWeight: 300, fontSize: 12}}>{item.group}</Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack justifyContent={"flex-start"} sx={{}}>
                                        <Typography variant={"overline"} sx={{fontWeight: 200, fontSize: 16}}>{item.title}</Typography>
                                    </Stack>
                                </Stack>
                                :
                                <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"}>
                                    <Stack sx={{width: '22%'}}>
                                        <Typography variant={"caption"} sx={{fontWeight: 900, fontSize: 15}}>{item.composer}</Typography>
                                    </Stack>
                                    <Stack sx={{width: '50%'}}>
                                        <Typography variant={"overline"} sx={{fontWeight: 200, fontSize: 16}}>{item.title}</Typography>
                                    </Stack>
                                    <Stack sx={{width: '10%'}}>
                                        <Typography variant={"subtitle2"}>{item.part}</Typography>
                                    </Stack>
                                    <Stack sx={{width: '10%'}}>
                                        <Typography variant={"caption"}>{item.group}</Typography>
                                    </Stack>
                                </Stack>
                        }
                        <Divider sx={{width: '90%', mt:1}} />
                    </Stack>
                ))}
            </Stack>
        </Stack>
    )
}

export default SelfIntro