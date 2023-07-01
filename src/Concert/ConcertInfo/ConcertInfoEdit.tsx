import {Stack, useMediaQuery} from "@mui/material";
import {useSelector} from "react-redux";
import {useMemo, useRef} from "react";
import axios from "axios";
import {selectUser} from "../../store/slices/user/user";
import ReactQuill, { Quill } from 'react-quill';
import React from 'react'
import { ImageResize } from "quill-image-resize-module-ts";
Quill.register("modules/ImageResize", ImageResize);

const formats = [
    'font',
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'formula',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align', 'color', 'background',
]

const ConcertInfoEdit = (props : any) => {

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
                    window.alert("이미지 삽입 실패. 이미지 크기를(10MB) 확인해주세요")
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
            },
            ImageResize: {
                parchment: Quill.import("parchment"),
                modules: ["Resize", "DisplaySize"],
            },
        }
    },[])

    const {contents, setContents} = props
    const QuillRef = useRef<ReactQuill>();

    const userState = useSelector(selectUser)

    const res600 = useMediaQuery('(max-width:600px)')



    return(
        <Stack sx={{width : res600 ? '95%' : '100%', mb: 10}}>
            <ReactQuill
                ref={(element) => {
                    if (element !== null) {
                        QuillRef.current = element;
                    }
                }}
                className={"quill"}
                style={{paddingRight: res600 ? 0 : 20, height: '500px' }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={contents}
                onChange={(e) => setContents(e)}
            />
        </Stack>
    )
}

export default ConcertInfoEdit
