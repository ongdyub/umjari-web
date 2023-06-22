import {Button, FormControl, MenuItem, Select, Stack, TextField, useMediaQuery, useTheme} from "@mui/material";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useRef, useMemo, useState, useEffect} from "react";
import './WriteEditor.scss'
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {selectUser, userActions} from "../../store/slices/user/user";
import {editCommunity, postCommunity} from "../../store/slices/editor/editor";
import {AppDispatch} from "../../store";
import axios from "axios";
import {articleGet, selectArticle} from "../../store/slices/article/article";
import {matchBoardName} from "../../store/slices/board/board";
import { ImageResize } from "quill-image-resize-module-ts";
Quill.register("modules/ImageResize", ImageResize);

const boardList = [
    {
        name: '자유게시판',
        enum : 'FREE'
    },
    {
        name: '바이올린',
        enum : 'VIOLIN'
    },
    {
        name: '비올라',
        enum : 'VIOLA'
    },
    {
        name: '첼로',
        enum : 'CELLO'
    },
    {
        name: '베이스',
        enum : 'BASS'
    },
    {
        name: '플루트',
        enum : 'FLUTE'
    },
    {
        name: '클라리넷',
        enum : 'CLARINET'
    },
    {
        name: '오보에',
        enum : 'OBOE'
    },
    {
        name: '바순',
        enum : 'BASSOON'
    },
    {
        name: '호른',
        enum : 'HORN'
    },
    {
        name: '트럼펫',
        enum : 'TRUMPET'
    },
    {
        name: '트롬본',
        enum : 'TROMBONE'
    },
    {
        name: '튜바',
        enum : 'TUBA'
    },
    {
        name: '타악기',
        enum : 'PERCUSSION_INSTRUMENT'
    },
]

const formats = [
    'font',
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'formula',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align', 'color', 'background',
]

const WriteEditor = (props : any) => {
    const {mode} = props
    const QuillRef = useRef<ReactQuill>();
    const userState = useSelector(selectUser)

    const imageHandler = () => {
        const input = document.createElement("input");
        const formData = new FormData();
        let url = "";

        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
            const file = input.files;
            if (file !== null) {
                formData.append("image", file[0]);

                // 저의 경우 파일 이미지를 서버에 저장했기 때문에
                // 백엔드 개발자분과 통신을 통해 이미지를 저장하고 불러왔습니다.
                try {
                    const res = await axios.post(`/api/v1/image/`,formData,{
                        headers: {
                            Authorization: `Bearer  ${userState.accessToken}`,
                        },
                    })

                    // 백엔드 개발자 분이 통신 성공시에 보내주는 이미지 url을 변수에 담는다.
                    url = res.data.url;

                    // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드
                    // 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
                    const range = QuillRef.current?.getEditor().getSelection()?.index;
                    if (range !== null && range !== undefined) {
                        let quill = QuillRef.current?.getEditor();

                        quill?.setSelection(range, 1);

                        quill?.clipboard.dangerouslyPasteHTML(
                            range,
                            `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
                        );
                    }

                    return { ...res, success: true };
                } catch (error) {
                    window.alert("이미지 삽입 실패")
                    const err : any = error
                    return { ...err.response, success: false };
                }
            }
        };
    }

    const modules = useMemo(() => {
        return {
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
                handlers: {
                    image: imageHandler,
                },
                ImageResize: {
                    parchment: Quill.import("parchment"),
                    modules: ["Resize", "DisplaySize"],
                },
            },
        }
    },[])

    const theme = useTheme()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const articleState = useSelector(selectArticle)

    const res750 = useMediaQuery(theme.breakpoints.down("res750"))
    const resMd = useMediaQuery(theme.breakpoints.down("md"))

    const [contents, setContents] = useState('');
    const [title, setTitle] = useState('')
    const [board, setBoard] = useState<string>('FREE')
    const [hide, setHide] = useState(false)

    const {boardName, id} = useParams()

    const handleSubmit = async () => {

        if(!userState.isLogin){
            dispatch(userActions.openModal())
            return
        }
        if(title === ''){
            window.alert('제목을 입력해주세요.')
            return
        }
        if(board === ''){
            window.alert('게시판을 선택하세요.')
            return
        }
        if(title.length > 50){
            window.alert('제목을 50자 이하로 입력해 주세요')
            return
        }
        if(contents === '' || contents === '<p><br></p>'){
            window.alert('본문을 입력해주세요.')
            return
        }
        if(contents.length > 10000){
            window.alert('본문 내용이 너무 깁니다.')
            return
        }
        const data = {
            title : title,
            content : contents,
            isAnonymous : true
        }
        if(mode === 'edit'){
            const result = await dispatch(editCommunity({data , token : userState.accessToken, inst_name : board, id : id}))
            if (result.type === `${editCommunity.typePrefix}/fulfilled`) {
                navigate(`/community/${matchBoardName(board)?.name}/${id}`)
            }
            else {
                window.alert("오류 발생. 다시 시도해주세요")
            }
        }
        else{
            const result = await dispatch(postCommunity({data , token : userState.accessToken, inst_name : board}))
            if (result.type === `${postCommunity.typePrefix}/fulfilled`) {
                navigate(`/community/전체게시판`)
            }
            else {
                window.alert("오류 발생. 다시 시도해주세요")
            }
        }
    }

    useEffect(() => {
        if(mode === 'edit'){
            dispatch(articleGet({boardType : boardName, id : id, token : userState.accessToken}))
            setTitle(articleState.title)
            setContents(articleState.content)
            const match = matchBoardName(articleState.board)
            if(match !== undefined){
                setBoard(match.enum)
            }
        }
    },[])

    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{mb: 5, width: res750 ? '100%' : resMd ? 'calc(100% - 205px)' : 'calc(100% - 325px)'}}>
            <Stack justifyContent={res750 ? "center" : "space-around"} direction={"column"} sx={{width: '90%', mb: 1, mt: 1}}>
                <TextField sx={{width: res750 ? '100%' : '100%'}} label="제목을 입력해주세요" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Stack justifyContent={'flex-end'} alignItems={'center'} direction={"row"} sx={{width: '100%', mt: 2}}>
                    <FormControl variant="standard" sx={{width: '50%', mr: 'auto'}}>
                        <Select
                            disabled={mode === 'edit'}
                            value={board}
                            onChange={(e) => setBoard(e.target.value)}
                        >
                            {boardList.map((item, idx) => (
                                <MenuItem
                                    key={idx}
                                    value={item.enum}
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/*{*/}
                    {/*    hide ?*/}
                    {/*        <Button variant={"contained"} sx={{bgcolor: 'red', color: 'white', maxWidth: 70, minWidth: 70, maxHeight: 30, minHeight: 30}} onClick={() => setHide(false)}>비공개</Button>*/}
                    {/*        :*/}
                    {/*        <Button variant={"contained"} sx={{bgcolor: 'green', color: 'white', maxWidth: 70, minWidth: 70, maxHeight: 30, minHeight: 30}} onClick={() => setHide(true)}>공개</Button>*/}
                    {/*}*/}
                    <Button variant="outlined" onClick={handleSubmit} sx={{ml: 1, maxWidth: 60, minWidth: 60, maxHeight: 30, minHeight: 30}}>작성</Button>
                </Stack>
            </Stack>
            <ReactQuill
                ref={(element) => {
                    if (element !== null) {
                        QuillRef.current = element;
                    }
                }}
                className={"quill"}
                style={{width: '90%', marginTop: 1, height: '500px' }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={contents}
                placeholder={"작성 완료후 수정할 때에는 게시판 이동이 불가하므로 게시판을 다시한번 확인해주세요"}
                onChange={(e) => setContents(e)}
            />
        </Stack>
    )
}
export default WriteEditor