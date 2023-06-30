import {Box, Card, CardMedia, Chip, Divider, Stack, Typography, useTheme} from "@mui/material";
import {groupFrom, songForm} from "../../../store/slices/dummy/dummy";
import {GroupProgram} from "../../../store/slices/group/group";
import {getInstrumentNames} from "../../../Group/GroupBoard/GroupRecruit/GroupRecruit";

const GroupSearchItem = (props : any) => {

    const {item} = props

    return(
        <Card sx={{ display: 'flex', height: 400, width: '100%', flexDirection: 'column' }}>
            <Stack sx={{minHeight: 70}} direction={"row"} alignItems={'center'}>
                <CardMedia
                    component="img"
                    sx={{ height:50, width: 50, padding: '7px 7px 7px 7px', objectFit: 'fill'}}
                    alt="Profile Img"
                    onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                    src={item.logo}
                />
                <Stack direction={"column"} justifyContent={"space-evenly"} sx={{ml: 1}} >
                    <Typography sx={{fontSize: 15, fontWeight:800}}>{item.name}</Typography>
                    <Stack direction={"row"}>
                        <Typography sx={{fontSize: 11, fontWeight:600, color: '#606060'}}>{item.region}</Typography>
                        <Divider orientation={"vertical"} sx={{height: '80%', ml:1, mr:1}}/>
                        {/*<Typography sx={{fontSize: 11, fontWeight:600, color: '#606060'}}>0 명 참여중</Typography>*/}
                    </Stack>
                </Stack>
            </Stack>
            <Divider />
            <Stack sx={{pl: 2, mt: 1, maxHeight: 140, minHeight:140, overflow: 'hidden'}}>
                {
                    item.setList.length < 1 ?
                        <Stack direction={"row"} sx={{width:'100%', ml:-1}} gap={1} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
                            <Typography color={'blue'} sx={{fontSize:11, fontWeight: 400}}>연주곡 미정</Typography>
                        </Stack>
                        :
                        null
                }
                {
                    item.setList.map((item : GroupProgram, idx : number) => (
                        <Stack key={idx} direction={"column"} justifyContent="flex-start" sx={{}}>
                            <Typography variant="caption"  display="block" gutterBottom sx={{fontWeight: 600, fontSize: 10, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                {item.shortComposerEng}
                            </Typography>
                            <Typography variant="overline"  display="block" gutterBottom sx={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', mt:-1}}>
                                {item.nameEng}
                            </Typography>
                        </Stack>
                    ))
                }
            </Stack>
            <Divider />
            <Stack direction={"row"} sx={{mt: 2, width:'100%'}} gap={1} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
                {
                    item.recruit ?
                        null
                        :
                        <Typography color={'red'} sx={{fontSize:11, fontWeight:400}}>모집 마감</Typography>
                }
                {
                    getInstrumentNames(item.recruitInstruments).map((item: string) => (
                        <Chip label={`${item}`} />
                    ))
                }
            </Stack>
        </Card>
    )
}

export default GroupSearchItem