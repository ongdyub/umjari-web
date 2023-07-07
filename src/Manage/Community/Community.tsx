import {Divider, Pagination, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../store/slices/user/user";
import {selectFriend} from "../../store/slices/manage/friend/friend";
import {AppDispatch} from "../../store";
import {useEffect, useState} from "react";
import {
    communityStateActions, getMyLikedPost,
    getMyPost, getMyQnA, getMyRepliedPost,
    getMyReply,
    selectCommunity
} from "../../store/slices/manage/community/community";
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
    const handlePostChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPostPage(value)
    }
    useEffect(() => {
        dispatch(getMyPost({token : userState.accessToken, page : postPage}))
    },[postPage])
    useEffect(() => {
        if(myCommunityState.post !== null){
            setPostPage(myCommunityState.post.currentPage)
            setTotalPostPage(myCommunityState.post.totalPages)
        }
    },[myCommunityState.post])


    const [replyPage, setReplyPage] = useState(1)
    const [totalReplyPage, setTotalReplyPage] = useState(1)
    const handleReplyChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setReplyPage(value)
    }
    useEffect(() => {
        dispatch(getMyReply({token : userState.accessToken, page : replyPage}))
    },[replyPage])
    useEffect(() => {
        if(myCommunityState.reply !== null){
            setReplyPage(myCommunityState.reply.currentPage)
            setTotalReplyPage(myCommunityState.reply.totalPages)
        }
    },[myCommunityState.reply])


    const [repliedPostPage, setRepliedPostPage] = useState(1)
    const [totalRepliedPostPage, setTotalRepliedPostPage] = useState(1)
    const handleRepliedPostChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setRepliedPostPage(value)
    }
    useEffect(() => {
        dispatch(getMyRepliedPost({token : userState.accessToken, page : repliedPostPage}))
    },[repliedPostPage])
    useEffect(() => {
        if(myCommunityState.repliedPost !== null){
            setRepliedPostPage(myCommunityState.repliedPost.currentPage)
            setTotalRepliedPostPage(myCommunityState.repliedPost.totalPages)
        }
    },[myCommunityState.repliedPost])


    const [likedPostPage, setLikedPostPage] = useState(1)
    const [totalLikedPostPage, setTotalLikedPostPage] = useState(1)
    const handleLikedPostChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setRepliedPostPage(value)
    }
    useEffect(() => {
        dispatch(getMyLikedPost({token : userState.accessToken, page : likedPostPage}))
    },[likedPostPage])
    useEffect(() => {
        if(myCommunityState.likedPost !== null){
            setLikedPostPage(myCommunityState.likedPost.currentPage)
            setTotalLikedPostPage(myCommunityState.likedPost.totalPages)
        }
    },[myCommunityState.likedPost])



    const [qnaPage, setQnaPage] = useState(1)
    const [totalQnaPage, setTotalQnaPage] = useState(1)
    const handleQnaChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setQnaPage(value)
    }
    useEffect(() => {
        dispatch(getMyQnA({token : userState.accessToken, page : qnaPage}))
    },[qnaPage])
    useEffect(() => {
        if(myCommunityState.qna !== null){
            setQnaPage(myCommunityState.qna.currentPage)
            setTotalQnaPage(myCommunityState.qna.totalPages)
        }
    },[myCommunityState.qna])



    useEffect(() => {
        dispatch(getMyPost({token : userState.accessToken, page : 1}))
        dispatch(getMyReply({token : userState.accessToken, page : 1}))
        dispatch(getMyRepliedPost({token : userState.accessToken, page : 1}))
        dispatch(getMyLikedPost({token : userState.accessToken, page : 1}))
        dispatch(getMyQnA({token : userState.accessToken, page : 1}))

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
                    <Stack onClick={() => navigate(`/community/${item.board}/${item.id}`)} direction={'row'} sx={{cursor : 'pointer',mt:1,pb:1,width: '100%', borderBottom: '0.5px solid grey'}} alignItems={'center'}>
                        <Stack sx={{width: res550 ? '60%' :'70%'}}>
                            <Typography sx={{width: '100%',textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: res550 ? 10 : 12, fontWeight: 600, color: '#333'}}>{item.title}</Typography>
                        </Stack>
                        <Stack direction={'row'} sx={{width: res550 ? '40%' : '30%', textAlign: 'center'}}  justifyContent={'flex-end'} alignItems={'center'} >
                            <CommentIcon sx={{width: '7%', height: '7%'}} />
                            <Typography sx={{textAlign: 'center',ml:1,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 10}}>
                                {item.replyCount}
                            </Typography>
                            <ThumbUpAltIcon sx={{color: 'red',width: '7%', height: '7%', ml: 2}} />
                            <Typography sx={{ml:1,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 10}}>
                                {item.likeCount}
                            </Typography>
                            <Typography sx={{ml:res550 ? 1 : 5,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: res550 ? 8 : 10, fontWeight: 300, color: '#868e96', textAlign: 'center'}}>
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
            <Stack sx={{width: '90%'}} direction={'column'} justifyContent={'start'} alignItems={'center'}>
                {myCommunityState.reply?.contents.map((item) => (
                    <Stack onClick={() => navigate(`/community/${item.post.board}/${item.post.id}`)} direction={'row'} sx={{cursor : 'pointer',mt:1,pb:1,width: '100%', borderBottom: '0.5px solid grey'}} alignItems={'center'}>
                        <Stack sx={{width: res550 ? '60%' :'70%'}}>
                            <Typography sx={{width: '100%',whiteSpace: 'nowrap', overflow: 'hidden', fontSize: res550 ? 10 : 12, fontWeight: 400, color: '#333'}}>{item.content}</Typography>
                            <Typography sx={{width: '100%',whiteSpace: 'nowrap', overflow: 'hidden', fontSize: res550 ? 7 : 9, fontWeight: 800, color: '#333'}}>{item.post.title}</Typography>
                        </Stack>
                        <Stack direction={'row'} sx={{width: res550 ? '40%' : '30%', textAlign: 'center'}}  justifyContent={'flex-end'} alignItems={'center'} >
                            <Typography sx={{ml:res550 ? 1 : 5,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: res550 ? 8 : 10, fontWeight: 800, color: '#868e96', textAlign: 'center'}}>
                                {item.post.board}
                            </Typography>
                            <Typography sx={{ml:res550 ? 1 : 5,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: res550 ? 8 : 10, fontWeight: 300, color: '#868e96', textAlign: 'center'}}>
                                {item.createdAt.slice(2,10)}
                            </Typography>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Stack alignItems="center" sx={{mt:1,mb:1,width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "medium"} count={totalReplyPage} page={replyPage} onChange={handleReplyChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <Divider sx={{mt : 1, mb: 1, width: '90%'}} />






            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 25, fontWeight: 300}}>댓글단 글</Typography>
            </Stack>
            <Divider sx={{mt : 1,mb:1, width: '90%'}} />
            <Stack sx={{width: '90%'}} direction={'column'} justifyContent={'start'} alignItems={'center'}>
                {myCommunityState.repliedPost?.contents.map((item) => (
                    <Stack onClick={() => navigate(`/community/${item.board}/${item.id}`)} direction={'row'} sx={{cursor : 'pointer',mt:1,pb:1,width: '100%', borderBottom: '0.5px solid grey'}} alignItems={'center'}>
                        <Stack sx={{width: res550 ? '60%' :'70%'}}>
                            <Typography sx={{width: '100%',whiteSpace: 'nowrap', overflow: 'hidden', fontSize: res550 ? 7 : 9, fontWeight: 800, color: '#333'}}>{item.title}</Typography>
                        </Stack>
                        <Stack direction={'row'} sx={{width: res550 ? '40%' : '30%', textAlign: 'center'}}  justifyContent={'flex-end'} alignItems={'center'} >
                            <Typography sx={{ml:res550 ? 1 : 5,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: res550 ? 8 : 10, fontWeight: 800, color: '#868e96', textAlign: 'center'}}>
                                {item.board}
                            </Typography>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Stack alignItems="center" sx={{mt:1,mb:1,width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "medium"} count={totalRepliedPostPage} page={repliedPostPage} onChange={handleRepliedPostChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <Divider sx={{mt : 1, mb: 1, width: '90%'}} />



            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 25, fontWeight: 300}}>좋아요한 글</Typography>
            </Stack>
            <Divider sx={{mt : 1,mb:1, width: '90%'}} />
            <Stack sx={{width: '90%'}} direction={'column'} justifyContent={'start'} alignItems={'center'}>
                {myCommunityState.likedPost?.contents.map((item) => (
                    <Stack onClick={() => navigate(`/community/${item.board}/${item.id}`)} direction={'row'} sx={{cursor : 'pointer',mt:1,pb:1,width: '100%', borderBottom: '0.5px solid grey'}} alignItems={'center'}>
                        <Stack sx={{width: res550 ? '60%' :'70%'}}>
                            <Typography sx={{width: '100%',whiteSpace: 'nowrap', overflow: 'hidden', fontSize: res550 ? 7 : 9, fontWeight: 800, color: '#333'}}>{item.title}</Typography>
                        </Stack>
                        <Stack direction={'row'} sx={{width: res550 ? '40%' : '30%', textAlign: 'center'}}  justifyContent={'flex-end'} alignItems={'center'} >
                            <CommentIcon sx={{width: '7%', height: '7%'}} />
                            <Typography sx={{textAlign: 'center',ml:1,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 10}}>
                                {item.replyCount}
                            </Typography>
                            <ThumbUpAltIcon sx={{color: 'red',width: '7%', height: '7%', ml: 2}} />
                            <Typography sx={{ml:1,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 10}}>
                                {item.likeCount}
                            </Typography>
                            <Typography sx={{minWidth: 50,ml:res550 ? 1 : 5,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: res550 ? 8 : 10, fontWeight: 300, color: '#868e96', textAlign: 'center'}}>
                                {item.board}
                            </Typography>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Stack alignItems="center" sx={{mt:1,mb:1,width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "medium"} count={totalLikedPostPage} page={likedPostPage} onChange={handleLikedPostChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <Divider sx={{mt : 1, mb: 1, width: '90%'}} />





            <Stack direction={'row'} sx={{width: '90%'}} alignItems={'center'}>
                <Typography sx={{fontSize : 25, fontWeight: 300}}>단체 질문글</Typography>
            </Stack>
            <Divider sx={{mt : 1,mb:1, width: '90%'}} />
            <Stack sx={{width: '90%'}} direction={'column'} justifyContent={'start'} alignItems={'center'}>
                {myCommunityState.qna?.contents.map((item) => (
                    <Stack onClick={() => navigate(`/group/${item.group.id}/qna/${item.id}`)} direction={'row'} sx={{cursor : 'pointer',mt:1,pb:1,width: '100%', borderBottom: '0.5px solid grey'}} alignItems={'center'}>
                        <Stack sx={{width: res550 ? '60%' :'70%'}}>
                            <Typography sx={{width: '100%',whiteSpace: 'nowrap', overflow: 'hidden', fontSize: res550 ? 7 : 9, fontWeight: 400, color: '#333'}}>{item.group.name}</Typography>
                            <Typography sx={{width: '100%',whiteSpace: 'nowrap', overflow: 'hidden', fontSize: res550 ? 7 : 9, fontWeight: 800, color: '#333'}}>{item.title}</Typography>
                        </Stack>
                        <Stack direction={'row'} sx={{width: res550 ? '40%' : '30%', textAlign: 'center'}}  justifyContent={'flex-end'} alignItems={'center'} >
                            <CommentIcon sx={{width: '7%', height: '7%'}} />
                            <Typography sx={{textAlign: 'center',ml:1,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 10}}>
                                {item.replyCount}
                            </Typography>
                            <Typography sx={{ml:res550 ? 1 : 5,textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: res550 ? 8 : 10, fontWeight: 300, color: '#868e96', textAlign: 'center'}}>
                                {item.createdAt.slice(2,10)}
                            </Typography>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Stack alignItems="center" sx={{mt:1,mb:1,width:'100%', height: '80px'}} flexDirection={'row'} justifyContent="center" alignContent="center">
                <Pagination sx={{display: 'flex', width: '100%',justifyContent: "center", alignItems:"center",}} size={res550 ? "small" : "medium"} count={totalQnaPage} page={qnaPage} onChange={handleQnaChange} defaultPage={1} siblingCount={1} boundaryCount={1}/>
            </Stack>
            <Divider sx={{mt : 1, mb: 1, width: '90%'}} />

        </Stack>
    )
}

export default Community
