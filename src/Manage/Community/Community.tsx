import {Divider, Pagination, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../store/slices/user/user";
import {selectFriend} from "../../store/slices/manage/friend/friend";
import {AppDispatch} from "../../store";
import {useEffect, useState} from "react";
import {communityStateActions, getMyPost, selectCommunity} from "../../store/slices/manage/community/community";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const Community = () => {

    const theme = useTheme();
    const res550 = useMediaQuery(theme.breakpoints.down("res550"))

    const {profileName} = useParams()

    const navigate = useNavigate()

    const userState = useSelector(selectUser)
    const myCommunityState = useSelector(selectCommunity)

    const dispatch = useDispatch<AppDispatch>()

    const [postPage, setPostPage] = useState(1)
    const [totalPostPage, setTotalPostPage] = useState(1)
    const handlePostChange = () => {

    }

    useEffect(() => {
        dispatch(getMyPost({token : userState.accessToken}))

        return () => {
            dispatch(communityStateActions.resetMyCommunityState())
        }
    },[])


    return(
        <Stack sx={{width: '100%'}} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 20, fontWeight: 300}}>작성글</Typography>
            </Stack>
            <Divider sx={{mt : 1,mb:1, width: '90%'}} />
            <Stack sx={{width: '90%'}} direction={'column'} justifyContent={'start'} alignItems={'center'}>
                {myCommunityState.post?.contents.map((item) => (
                    <Stack direction={'row'} sx={{mt:1,pb:1,width: '100%', borderBottom: '0.5px solid grey'}} alignItems={'center'}>
                        <Stack sx={{width: res550 ? '60%' :'70%'}}>
                            <Typography sx={{width: '100%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: res550 ? 10 : 12, fontWeight: 600, color: '#333'}}>{item.title}</Typography>
                        </Stack>
                        <Stack direction={'row'} sx={{width: res550 ? '40%' : '30%', textAlign: 'center'}}  justifyContent={'flex-end'} alignItems={'center'} >
                            <CommentIcon sx={{width: '7%', height: '7%'}} />
                            <Typography sx={{textAlign: 'center',ml:1,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 10}}>
                                {item.replyCount}
                            </Typography>
                            <ThumbUpAltIcon sx={{color: 'red',width: '7%', height: '7%', ml: 4}} />
                            <Typography sx={{ml:1,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 10}}>
                                {item.likeCount}
                            </Typography>
                            <Typography sx={{ml:res550 ? 1 : 5,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 10, fontWeight: 'bold', color: '#868e96', textAlign: 'center'}}>
                                {item.createdAt.slice(2,10)}
                            </Typography>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Stack alignItems="center" sx={{mt:1,mb:1,width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "medium"} count={totalPostPage} page={postPage} onChange={handlePostChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <Divider sx={{mt : 1, mb: 1, width: '90%'}} />





            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 25, fontWeight: 300}}>작성댓글</Typography>
            </Stack>
            <Divider sx={{mt : 1,mb:1, width: '90%'}} />
            <Stack>
                contents
            </Stack>
            <Stack alignItems="center" sx={{mt:1,mb:1,width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "large"} count={totalPostPage} page={postPage} onChange={handlePostChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <Divider sx={{mt : 1, mb: 1, width: '90%'}} />






            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 25, fontWeight: 300}}>댓글단 글</Typography>
            </Stack>
            <Divider sx={{mt : 1,mb:1, width: '90%'}} />
            <Stack>
                contents
            </Stack>
            <Stack alignItems="center" sx={{mt:1,mb:1,width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "large"} count={totalPostPage} page={postPage} onChange={handlePostChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <Divider sx={{mt : 1, mb: 1, width: '90%'}} />



            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 25, fontWeight: 300}}>좋아요한 글</Typography>
            </Stack>
            <Divider sx={{mt : 1,mb:1, width: '90%'}} />
            <Stack>
                contents
            </Stack>
            <Stack alignItems="center" sx={{mt:1,mb:1,width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "large"} count={totalPostPage} page={postPage} onChange={handlePostChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <Divider sx={{mt : 1, mb: 1, width: '90%'}} />





            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 25, fontWeight: 300}}>단체 질문글</Typography>
            </Stack>
            <Divider sx={{mt : 1,mb:1, width: '90%'}} />
            <Stack>
                contents
            </Stack>
            <Stack alignItems="center" sx={{mt:1,mb:1,width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "large"} count={totalPostPage} page={postPage} onChange={handlePostChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <Divider sx={{mt : 1, mb: 1, width: '90%'}} />




        </Stack>
    )
}

export default Community
