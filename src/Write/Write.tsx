import React, { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Divider, Stack, useMediaQuery} from "@mui/material";
import WriteSide from "./WriteSide/WriteSide";
import WriteEditor from "./WriteEditor/WriteEditor";

const Write = () => {

    const res800 = useMediaQuery('(max-width:800px)')
    return (
        <Stack sx={{height: 1000}}>
            <Stack justifyContent="flex-start" direction={res800 ? 'column' : 'row'}>
                <WriteEditor />
                <Divider orientation={"vertical"}/>
                <WriteSide />
            </Stack>
        </Stack>
    );
};

export default Write