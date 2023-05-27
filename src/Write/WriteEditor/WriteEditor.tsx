import {Button, FormControl, MenuItem, Select, Stack, TextField, useMediaQuery, useTheme} from "@mui/material";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useState} from "react";
import './WriteEditor.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useDispatch, useSelector} from "react-redux";
import {dummyActions, selectDummy} from "../../store/slices/dummy/dummy";
import {useNavigate} from "react-router-dom";
import {selectUser, userActions} from "../../store/slices/user/user";
import {EditorWrite, postCommunity} from "../../store/slices/editor/editor";
import {AppDispatch} from "../../store";

const boardList = [
    {
        name: '전체게시판',
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
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const dummySelector = useSelector(selectDummy)
    const userState = useSelector(selectUser)


    const res1100 = useMediaQuery('(max-width:1099px)')
    const res750 = useMediaQuery(theme.breakpoints.down("res750"))
    const res600 = useMediaQuery('(max-width:600px)')
    const resMd = useMediaQuery(theme.breakpoints.down("md"))

    const [contents, setContents] = useState('');
    const [title, setTitle] = useState('')
    const [board, setBoard] = useState<string>('전체게시판')
    const [hide, setHide] = useState(false)



    const handleSubmit = () => {
        if(!userState.isLogin){
            dispatch(userActions.openModal())
            return
        }
        if(title === ''){
            window.alert('제목을 입력해주세요.')
            return
        }
        if(title.length > 50){
            window.alert('제목을 50자 이하로 입력해 주세요')
            return
        }
        if(contents === ''){
            window.alert('본문을 입력해주세요.')
        }
        if(contents.length > 5000){
            window.alert('본문 내용이 너무 깁니다.')
            return
        }
        const data = {
            title : title,
            content : contents,
            isAnonymous : hide
        }
        const result = dispatch(postCommunity({data , token : userState.accessToken, inst_name : 'VIOLIN'}))
        console.log(result)
    }



    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{mb: 5, width: res750 ? '100%' : resMd ? 'calc(100% - 205px)' : 'calc(100% - 325px)'}}>
            <Stack justifyContent={res750 ? "center" : "space-around"} direction={"column"} sx={{width: '90%', mb: 1, mt: 1}}>
                <TextField sx={{width: res750 ? '100%' : '100%'}} label="제목을 입력해주세요" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Stack justifyContent={'flex-end'} alignItems={'center'} direction={"row"} sx={{width: '100%', mt: 2}}>
                    <FormControl variant="standard" sx={{width: '50%', mr: 'auto'}}>
                        <Select
                            value={board}
                            onChange={(e) => setBoard(e.target.value)}
                            defaultValue={"전체게시판"}
                        >
                            {boardList.map((item, idx) => (
                                <MenuItem
                                    key={idx}
                                    value={item.name}
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {
                        hide ?
                            <Button variant={"contained"} sx={{bgcolor: 'red', color: 'white', maxWidth: 70, minWidth: 70, maxHeight: 30, minHeight: 30}} onClick={() => setHide(false)}>비공개</Button>
                            :
                            <Button variant={"contained"} sx={{bgcolor: 'green', color: 'white', maxWidth: 70, minWidth: 70, maxHeight: 30, minHeight: 30}} onClick={() => setHide(true)}>공개</Button>
                    }
                    <Button variant="outlined" onClick={handleSubmit} sx={{ml: 1, maxWidth: 60, minWidth: 60, maxHeight: 30, minHeight: 30}}>작성</Button>
                </Stack>
            </Stack>
            <ReactQuill
                className={"quill"}
                style={{width: '90%', marginTop: 1, height: '500px' }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={contents}
                onChange={(e) => setContents(e)}
            />
        </Stack>
    )
}
export default WriteEditor