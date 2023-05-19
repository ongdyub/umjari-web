import {Button, FormControl, MenuItem, Select, Stack, TextField, useMediaQuery, useTheme} from "@mui/material";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useState} from "react";
import './WriteEditor.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useDispatch, useSelector} from "react-redux";
import {dummyActions, selectDummy} from "../../store/slices/dummy/dummy";
import {useNavigate} from "react-router-dom";

const boardList = [
    {
        name: '전체 게시판',
        ID: 12
    },
    {
        name: '바이올린',
        ID: 0
    },
    {
        name: '비올라',
        ID: 1
    },
    {
        name: '첼로',
        ID: 2
    },
    {
        name: '베이스',
        ID: 3
    },
    {
        name: '플루트',
        ID: 4
    },
    {
        name: '클라리넷',
        ID: 5
    },
    {
        name: '오보에',
        ID: 6
    },
    {
        name: '바순',
        ID: 7
    },
    {
        name: '호른',
        ID: 8
    },
    {
        name: '트럼펫',
        ID: 9
    },
    {
        name: '트롬본',
        ID: 10
    },
    {
        name: '튜바',
        ID: 11
    },
    {
        name: '타악기',
        ID: 13
    },

]
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

const WriteEditor = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dummySelector = useSelector(selectDummy)
    const res1100 = useMediaQuery('(max-width:1099px)')
    const res800 = useMediaQuery('(max-width:800px)')
    const res600 = useMediaQuery('(max-width:600px)')
    const resMd = useMediaQuery(theme.breakpoints.down("md"))

    const [contents, setContents] = useState('');
    const [title, setTitle] = useState('')
    const [board, setBoard] = useState('')



    const handleSubmit = () => {
        dispatch(dummyActions.setWrite(contents))
        navigate('/community/전체/2')
    }

    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{width: res800 ? '100%' : resMd ? 'calc(100% - 205px)' : 'calc(100% - 325px)'}}>
            <Stack justifyContent="space-around" direction={ res600 ? "column" : "row"} sx={{width: '95%', mb: 1, mt: 1}}>
                <TextField sx={{width: res600 ? '100%' : '70%'}} id="standard-basic" label="제목을 입력해주세요" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Stack justifyContent="flex-end" sx={{width: res600 ? '100%' : '25%', mt: res600 ? 2 : ''}}>
                    <FormControl variant="standard" sx={{width: '100%'}}>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={board}
                            onChange={(e) => setBoard(e.target.value)}
                            label="Board"
                        >
                            {boardList.map((item) => (
                                <MenuItem
                                    key={item.ID}
                                    value={item.name}
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
            <ReactQuill
                className={"quill"}
                style={{width: '95%', marginBottom: '60px', height: '500px' }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={contents}
                onChange={(e) => setContents(e)}
            />
            <Stack justifyContent="flex-start" sx={{mt: res1100? 5 : 0}}>
                <Button variant="outlined" onClick={handleSubmit}>작성하기</Button>
            </Stack>
        </Stack>
    )
}
export default WriteEditor