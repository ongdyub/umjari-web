import React from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Divider, Stack, useMediaQuery, useTheme} from "@mui/material";
import WriteSide from "./WriteSide/WriteSide";
import WriteEditor from "./WriteEditor/WriteEditor";
import Banner from "../Banner/Banner";

const Write = (props : any) => {

    const {mode} = props
    const theme = useTheme()
    const res750 = useMediaQuery(theme.breakpoints.down('res750'))
    return (
        <Stack sx={{height: 600, mb: 15}}>
            <Stack justifyContent="flex-start" sx={{mb : 5}} direction={res750 ? 'column' : 'row'}>
                <WriteEditor mode={mode} />
                {
                    res750 ?
                        null
                        :
                        <Divider orientation={"vertical"}/>
                }
                <WriteSide />
            </Stack>
            <Banner />
        </Stack>
    );
};

export default Write