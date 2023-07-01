import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import WriteSide from "./WriteSide/WriteSide";
import WriteEditor from "./WriteEditor/WriteEditor";

const Write = (props : any) => {

    const {mode} = props
    const theme = useTheme()
    const res750 = useMediaQuery(theme.breakpoints.down('res750'))
    return (
        <Stack sx={{height: 600, mb: 15}}>
            <Stack justifyContent="flex-start" direction={res750 ? 'column' : 'row'}>
                <WriteEditor mode={mode} />
                {
                    res750 ?
                        null
                        :
                        <Divider orientation={"vertical"}/>
                }
                <WriteSide />
            </Stack>
            <Stack direction={'row'} justifyContent={'center'} sx={{mt: 2,width: '100%'}} alignItems={'center'}>
                단체 등록 및 연습실 / 악기사 / 단체 광고 문의
            </Stack>
            <Stack direction={'row'} justifyContent={'center'} sx={{mt: 2,width: '100%'}} alignItems={'center'}>
                umjari.master@gmail.com
            </Stack>
        </Stack>
    );
};

export default Write