import {Button, Chip, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import ReactQuill from "react-quill";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {selectUser} from "../../../store/slices/user/user";
import {
    groupIsRecruit,
    groupRecruitGet,
    groupRecruitPut,
    groupStateActions,
    selectGroup
} from "../../../store/slices/group/group";
import {AppDispatch} from "../../../store";
import ConcertInfoEdit from "../../../Concert/ConcertInfo/ConcertInfoEdit";
import ProgramInfo from "../../../Concert/ConcertDetail/DetailInfo/ProgramInfo";
import AddMusicModal from "../../../Modal/AddMusicModal";

export const instList = [
    {
        name : '바이올린',
        enum : 'VIOLIN'
    },
    {
        name : '퍼스트 바이올린',
        enum : 'FIRST_VIOLIN'
    },
    {
        name : '세컨드 바이올린',
        enum : 'SECOND_VIOLIN'
    },
    {
        name : '비올라',
        enum : 'VIOLA'
    },
    {
        name : '첼로',
        enum : 'CELLO'
    },
    {
        name : '베이스',
        enum : 'BASS'
    },
    {
        name : '플루트',
        enum : 'FLUTE'
    },
    {
        name : '피콜로',
        enum : 'PICCOLO'
    },
    {
        name : '클라리넷',
        enum : 'CLARINET'
    },
    {
        name : 'E클라리넷',
        enum : 'E_CLARINET'
    },
    {
        name : '베이스클라리넷',
        enum : 'BASS_CLARINET'
    },
    {
        name : '오보에',
        enum : 'OBOE'
    },
    {
        name : '잉글리시호른',
        enum : 'ENGLISH_HORN'
    },
    {
        name : '바순',
        enum : 'BASSOON'
    },
    {
        name : '콘트라바순',
        enum : 'CONTRABASSOON'
    },
    {
        name : '호른',
        enum : 'HORN'
    },
    {
        name : '트럼펫',
        enum : 'TRUMPET'
    },
    {
        name : '코넷',
        enum : 'CORNET'
    },
    {
        name : '트롬본',
        enum : 'TROMBONE'
    },
    {
        name : '베이스트롬본',
        enum : 'BASS_TROMBONE'
    },
    {
        name : '튜바',
        enum : 'TUBA'
    },
    {
        name : '타악기',
        enum : 'PERCUSSION_INSTRUMENT'
    },
    {
        name : '기타 악기',
        enum : 'OTHERS'
    },
]

export const getInstrumentNames = (enums : any) => {
    if(enums === null || enums === undefined){
        return []
    }
    const instrumentNames = [];

    for (let i = 0; i < instList.length; i++) {
        const instrument = instList[i];
        if (enums.includes(instrument.enum)) {
            instrumentNames.push(instrument.name);
        }
    }

    return instrumentNames;
}

const GroupRecruit = () => {

    const theme = useTheme()
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const res700 = useMediaQuery(theme.breakpoints.down("res700"))

    const userState = useSelector(selectUser)
    const groupState = useSelector(selectGroup)

    const [isAdminGroup, setIsAdminGroup] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)

    const [contents, setContents] = useState(groupState.groupRecruit === null ? '' : groupState.groupRecruit.recruitDetail === null ? '마감되었습니다.' : groupState.groupRecruit.recruit ? groupState.groupRecruit.recruitDetail : '마감되었습니다.');
    const [recruitEnumList, setRecruitEnumList] = useState<Array<any>>(groupState.groupRecruit === null ? [] : groupState.groupRecruit.recruitInstruments === null ? [] : groupState.groupRecruit.recruitInstruments)
    const [recruitList, setRecruitList] = useState<Array<any>>(groupState.groupRecruit === null ? [] : groupState.groupRecruit.recruitInstruments === null ? [] : getInstrumentNames(groupState.groupRecruit.recruitInstruments))

    const handleInstList = (item : any) => {
        if(!groupState.groupRecruit?.recruit){
            window.alert("모집중으로 먼저 상태를 변경해주세요")
            return
        }
        if(recruitList.includes(item.name)){
            setRecruitList(recruitList.filter((cur) => (cur !== item.name)))
            setRecruitEnumList(recruitEnumList.filter((cur) => (cur !== item.enum)))
        }
        else{
            setRecruitList(recruitList.concat(item.name))
            setRecruitEnumList(recruitEnumList.concat(item.enum))
        }
    }

    const handleIsRecruit = async () => {
        const result = await dispatch(groupIsRecruit({id : id, token : userState.accessToken}))
        if(result.type === `${groupIsRecruit.typePrefix}/fulfilled`){
            dispatch(groupRecruitGet({id : id, token : userState.accessToken}))
            setEdit(false)
        }
    }

    const handleEdit = async () => {
        if(contents.length > 5000){
            window.alert("최대 길이 5000을 초과하였습니다. 현재 길이는 " + contents.length + " 입니다.")
            return
        }
        const data = {
            recruitInstruments : recruitEnumList,
            recruitDetail : contents
        }
        const result = await dispatch(groupRecruitPut({id : id, token : userState.accessToken, data : data}))
        if(result.type === `${groupRecruitPut.typePrefix}/fulfilled`){
            dispatch(groupRecruitGet({id : id, token : userState.accessToken}))
            setEdit(false)
        }
    }

    // About Group SetList
    const [addMode, setAddMode] = useState<boolean>(false)
    const [setList, setSetList] = useState(false)

    useEffect(() => {
        dispatch(groupRecruitGet({id : id, token : userState.accessToken}))
        return () => {
            dispatch(groupStateActions.resetGroupRecruit())
        }
    },[dispatch, id])

    useEffect(() => {
        if(userState.isLogin){
            const userGroup = userState.career.find((userGroup) => userGroup.groupId.toString() === id)
            if(userGroup !== null && userGroup !== undefined && userGroup.memberType === 'ADMIN'){
                setIsAdminGroup(true)
            }
        }
    },[userState.career, userState.isLogin])

    useEffect(() => {
        setRecruitList(groupState.groupRecruit === null ? [] : groupState.groupRecruit.recruitInstruments === null ? [] : getInstrumentNames(groupState.groupRecruit.recruitInstruments))
        setRecruitEnumList(groupState.groupRecruit === null ? [] : groupState.groupRecruit.recruitInstruments === null ? [] : groupState.groupRecruit.recruitInstruments)
        setContents(groupState.groupRecruit === null ? '' : groupState.groupRecruit.recruitDetail === null ? '마감되었습니다.' : groupState.groupRecruit.recruit ? groupState.groupRecruit.recruitDetail : '마감되었습니다.')
    },[groupState.groupRecruit])

    if(groupState.groupRecruit === null){
        return(
            <Stack>
                로딩중...
            </Stack>
        )
    }
    else{
        return(
            <Stack justifyContent={res700 ? 'center' : 'flex-start'} alignItems={'center'} sx={{mb: 10}}>
                {/* About Group SetList */}
                <Divider sx={{width: res700 ? '90%' : '100%', mt:-1}}/>
                <Stack sx={{width : res700 ? '90%' : '100%'}}>
                    <Stack sx={{width: '100%'}} direction={'row'} justifyContent={'flex-start'}>
                        <Typography sx={{fontSize: res700 ? 25:35, fontWeight: 100, fontFamily: "Open Sans", mt: 1, mb: 1, pl:1}}>Program</Typography>
                        <Stack direction={'row'} alignItems={'center'} sx={{ml : 1,height: '100%'}}>
                            {
                                isAdminGroup ?
                                    setList ?
                                        <>
                                            <Button color={"success"} size={"small"} onClick={() => setSetList(false)}>취소</Button>
                                            <Button color={"info"} size={"small"} onClick={() => setAddMode(true)}>추가</Button>
                                        </>
                                        :
                                        <Button color={"warning"} size={"small"} onClick={() => setSetList(true)}>수정</Button>
                                    :
                                    null
                            }
                        </Stack>
                    </Stack>
                    {
                        // groupState.groupInfo?.setList
                        [].map((item, idx) => (
                            <ProgramInfo key={idx} item={item} edit={setList} />
                        ))
                    }
                </Stack>


                {/* About Recruit Inst */}
                <Divider sx={{width: res700 ? '90%' : '100%', mt:0.5}}/>
                <Stack sx={{width : res700 ? '90%' : '100%'}}>
                    <Stack sx={{width: '100%'}} direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
                        <Typography sx={{fontSize: res700 ? 20:30, fontWeight: 100, fontFamily: "Open Sans", mt: 1, mb: 1, pl:1}}>모집 악기</Typography>
                        {
                            groupState.groupRecruit.recruit ?
                                <Typography color={'info'} sx={{fontSize: res700 ? 10 : 15, fontWeight: 700, fontFamily: "Open Sans", mt: 1, mb: 1, ml:2}}>모집중</Typography>
                                :
                                <Typography color={'error'} sx={{fontSize: res700 ? 10 : 15, fontWeight: 700, fontFamily: "Open Sans", mt: 1, mb: 1, ml:2}}>마감</Typography>
                        }
                        {
                            isAdminGroup && edit ?
                                <Button onClick={handleIsRecruit} variant={"contained"} sx={{bgcolor : groupState.groupRecruit.recruit ? 'grey' : 'black' ,ml:1,maxWidth: 60, minWidth: 60,maxHeight: 30,minHeight: 30, fontSize : 9}} size={"small"} >{groupState.groupRecruit.recruit ? '마감하기' : '모집하기'}</Button>
                                :
                                null
                        }
                        <Stack direction={'row'} alignItems={'center'} sx={{ml : 1,height: '100%'}}>
                            {
                                isAdminGroup ?
                                    edit ?
                                        <>
                                            <Button color={"info"} size={"small"} onClick={handleEdit}>변경</Button>
                                            <Button color={"success"} size={"small"} onClick={() => setEdit(false)}>취소</Button>
                                        </>
                                        :
                                        <Button color={"warning"} size={"small"} onClick={() => setEdit(true)}>수정</Button>
                                    :
                                    null
                            }
                        </Stack>
                    </Stack>
                    <Stack direction={"row"} sx={{mt: res700 ? 1 : 2, pl: res700 ? 3: 0}} flexWrap={"wrap"}>
                        {
                            isAdminGroup && edit ?
                                instList.map((item, idx) => (
                                    <Chip key={idx} label={`${item.name}`} sx={{mr: 2, mb: 1, cursor:'pointer', border : recruitList.includes(item.name) ? '1px solid black' : ''}} onClick={() => handleInstList(item)}/>
                                ))
                                :
                                recruitList.map((item, idx) => (
                                    <Chip key={idx} label={`${item}`} sx={{mr: 2, mb: 1}}/>
                                ))
                        }
                    </Stack>
                </Stack>

                <Divider sx={{width: res700 ? '100%' : '90%', mt: res700 ? 1 : 2, mb: res700 ? 1: 2}}/>
                <Stack direction={'row'} justifyContent={'flex-start'} sx={{width : res700 ? '90%' : '100%'}}>
                    <Typography sx={{fontSize: res700 ? 20:30, fontWeight: 100, fontFamily: "Open Sans", mt: 1, mb: 1, pl:1}}>상세정보</Typography>
                </Stack>
                {
                    isAdminGroup && edit ?
                        <ConcertInfoEdit contents={contents} setContents={setContents} />
                        :
                        <Stack sx={{width : res700 ? '90%' : '100%', mt : 2}}>
                            <ReactQuill
                                value={groupState.groupRecruit.recruitDetail === null ? '마감되었습니다.' : groupState.groupRecruit.recruitDetail}
                                style={{paddingRight: res700 ? 0 : 20, height: 'auto'}}
                                readOnly={true}
                                theme={"bubble"}
                            />
                        </Stack>
                }
                {
                    addMode ?
                        <AddMusicModal open={addMode} setOpen={setAddMode} scope={'group'} />
                        :
                        null
                }
            </Stack>
        )
    }
}

export default GroupRecruit
