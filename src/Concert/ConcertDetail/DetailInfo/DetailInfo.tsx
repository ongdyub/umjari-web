import {Button, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import ReactQuill from "react-quill";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {dummyActions, selectDummy} from "../../../store/slices/dummy/dummy";
import {useState} from "react";

const modules = {
    toolbar: {
        container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
            [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
            ['image', 'video'],
            ['clean']
        ],
    },
}

const formats = [
    'font',
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'formula',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align', 'color', 'background',
]

const DetailInfo = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dummySelector = useSelector(selectDummy)
    const res1100 = useMediaQuery('(max-width:1099px)')
    const res800 = useMediaQuery('(max-width:800px)')
    const res600 = useMediaQuery('(max-width:600px)')
    const resMd = useMediaQuery(theme.breakpoints.down("md"))

    const [mode, setMode] = useState(true)
    const [contents, setContents] = useState('');

    const handleEdit = () => {
        dispatch(dummyActions.setWrite(contents))
        navigate('/concert/3/info')
    }
    return(
        <Stack justifyContent={"flex-start"}>
            <Divider sx={{width: '90%', mt:-1}} />
            <Stack sx={{width: 'calc(100% - 24px)', mt:1}}>
                <ReactQuill
                    value={dummySelector.write}
                    readOnly={true}
                    theme={"bubble"}
                />
                <ReactQuill
                    className={"quill"}
                    style={{width: '95%', marginBottom: '60px', height: '500px' }}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={contents}
                    onChange={(e) => setContents(e)}
                />
            </Stack>
            <Divider sx={{width: '90%'}} />
            <Stack direction={"row"} sx={{mt:1, mb:10}}>
                <Button variant={"outlined"} onClick={handleEdit}>수정하기</Button>
            </Stack>
        </Stack>
    )
}

export default DetailInfo