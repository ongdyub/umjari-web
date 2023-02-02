import {Box, Divider, Stack, Typography} from "@mui/material";
import { Image } from 'mui-image'

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

    return(
        <Stack sx={{width: 300, height: '100%'}} justifyContent={"flex-start"} alignItems={"center"}>
            <Stack sx={{mt: 5, mb: 1}} justifyContent={"center"} alignItems={"center"}>
                <Box
                    component="img"
                    sx={{
                        display: 'block',
                        width: 200,
                        height: 200,
                        borderRadius: '30%',
                        objectFit: 'cover',
                        boxShadow: 'rgb(0 0 0 / 6%) 0px 0px 4px 0px'
                    }}
                    alt="The house from the offer."
                    src={"https://secure.gravatar.com/avatar/217b46f9ae197e33b88883b0e38f0fa4?s=150&d=identicon"}
                />
                <Typography sx={{fontWeight: 300, fontSize: 25, mt:3}}>정병민</Typography>
            </Stack>
            <Divider sx={{width: '80%', mb:2}}/>
            <Stack justifyContent={"flex-start"} sx={{width: '80%'}}>
                {groupList.map((item) => (
                    <Stack justifyContent={"flex-start"} sx={{width: '100%', mb:3}}>
                        <Typography sx={{fontWeight: 900, fontSize: 17}}>{item.name}</Typography>
                        <Stack direction={"row"} justifyContent={"flex-start"} sx={{width: '100%', mt:1}}>
                            <Typography sx={{fontWeight: 100, fontSize: 15}}>{item.join}</Typography>
                            <Typography sx={{fontWeight: 100, fontSize: 15, ml:0.5, mr: 0.5}}>~</Typography>
                            <Typography sx={{fontWeight: 100, fontSize: 15}}>{item.end}</Typography>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Divider sx={{width: '80%', mb:2}}/>
        </Stack>
    )
}

export default MyProfile