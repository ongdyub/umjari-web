import {Divider, Stack, Typography} from "@mui/material";


const ProgramInfo = (props : any) => {

    const {item} = props

    return (
        <Stack sx={{width: 'auto'}}>
            <Stack>
                <Typography variant={"caption"} sx={{fontWeight: 700, fontSize: 16}}>{item.musicInfo.shortComposerEng}</Typography>
            </Stack>
            <Stack>
                <Typography variant={"overline"} sx={{fontWeight: 200, fontSize: 14}}>{item.musicInfo.nameEng}</Typography>
            </Stack>
            <Divider sx={{width: '100%', mb:1}} />
        </Stack>
    );
}

export default ProgramInfo