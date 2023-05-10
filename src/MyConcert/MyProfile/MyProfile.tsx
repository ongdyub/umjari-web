import {Box, Chip, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
const groupList = [
    {
        name: 'SNUPO',
        join: '2018.10',
        end : ''
    },
    {
        name: '56사단 군악대',
        join: '2019.10',
        end : '2021.04'
    },
    {
        name: 'SNUGO',
        join: '2022.04',
        end : ''
    },
    {
        name: '가우디움',
        join: '2022.05',
        end : '2022.10'
    },
]


const MyProfile = () => {

    const profile_img = "secure.gravatar.com/avatar/217b46f9ae197e33b88883b0e38f0fa4?s=150&d=identicon"
    const theme = useTheme();
    const res500 = useMediaQuery(theme.breakpoints.down("res500"))
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))

    return(
        <Stack direction={res750 ? "row" : 'column'} sx={{width: res750 ? '100%' : 200, height: '100%'}} justifyContent={"flex-start"} alignItems={"center"}>
            <Stack sx={{mt: 1, mb: 1, pr: res750 ? 2 : '', pl: res750 ? 2 : '', width: '50%'}} justifyContent={"center"} alignItems={"center"}>
                <Box
                    component="img"
                    sx={{
                        display: 'block',
                        width: res750 ? '80%' : 133,
                        height: res750 ? '80%' : 133,
                        borderRadius: '30%',
                        objectFit: 'cover',
                        boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 4px 0px',
                        mt: res500 ? 0 : 2
                    }}
                    alt="Profile Img"
                    onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                    src={"프로필이미지 자리"}
                />
                <Typography sx={{fontWeight: 300, fontSize: res700 ? 20 : 25, mt:2}}>{"umjari"}</Typography>
            </Stack>
            {
                res750 ?
                    <Divider orientation={"vertical"} />
                    :
                    <Divider sx={{width: '80%', mb:2}}/>
            }
            <Stack direction={res750 ? "row" : 'column'} justifyContent={"flex-start"} sx={{width: '80%', flexWrap: res750 ? 'wrap' : '', pl: res750 ? 1 : 0, pr: res750 ? 1 : 0, pt:2 }}>
                {groupList.map((item) => (
                    <Stack justifyContent={"flex-start"} sx={{width: res750 ? '80%' : '100%', mb: res750 ? 1 : 3, flexWrap: res750 ? 'wrap' : '', mr: res750 ? 2 : 0, ml: res750 ? 2 : 0}} direction={res750 ? "row" : "column"}>
                        {
                            res750 ?
                                <Chip label={item.name} sx={{fontSize : res500 ? 10 : 13, width: 100, height: res500 ? 20 : 30}} />
                                :
                                <Typography sx={{fontWeight: 900, fontSize: res500 ? 8 : 17, color: '#111111'}}>{item.name}</Typography>
                        }
                        {
                            res750 ?
                                <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"} sx={{width: '60%', pl:2, mt:0.5}}>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{item.join}</Typography>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12, ml:0.5, mr: 0.5}}>~</Typography>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{item.end}</Typography>
                                </Stack>
                                :
                                <Stack direction={"row"} justifyContent={"flex-start"} sx={{width: '100%', mt:1}}>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{item.join}</Typography>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12, ml:0.5, mr: 0.5}}>~</Typography>
                                    <Typography sx={{fontWeight: 100, fontSize: res500 ? 10 : 12}}>{item.end}</Typography>
                                </Stack>
                        }
                    </Stack>
                ))}
            </Stack>
            {
                res750 ?
                    null
                    :
                    <Divider sx={{width: '80%', mb:2}}/>
            }
        </Stack>
    )
}

export default MyProfile