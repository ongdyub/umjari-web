import {
    AppBar,
    Avatar, Badge,
    Box,
    Button,
    Container, Divider,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {myInfoGet, selectUser, userActions, userGroupGet} from "../../store/slices/user/user";
import { useNavigate } from "react-router"
import LoginModal from "../../Modal/LoginModal";
import {AppDispatch} from "../../store";
import React from 'react'
import NameChangeModal from "../../Modal/NameChangeModal";
import {useSearchParams} from "react-router-dom";
import {selectFriend} from "../../store/slices/manage/friend/friend";

const pages = ['홈', '커뮤니티', '단체검색', '장터', '사이트 소개', '단체 등록'];
const settings = ['마이페이지', '닉네임 변경' , '내정보 관리', '로그아웃'];

const Header = () => {

    const curWidth = window.innerWidth
    const theme = useTheme();
    const res450 = useMediaQuery(theme.breakpoints.down("res450"))

    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser)

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [nameModalOpen, setNameModalOpen] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = (page : string) => {
        setAnchorElNav(null);
        if(page === 'close'){
        }
        else if(page === '홈'){
            navigate('/')
        }
        else if(page === '커뮤니티'){
            navigate('/community/전체게시판')
        }
        else if(page === '단체검색'){
            navigate('/groupsearch')
        }
        else if(page === '장터'){
            window.alert("준비 중 입니다.")
        }
        else if(page === '객원모집'){
            window.alert("준비 중 입니다.")
        }
        else if(page === '사이트 소개'){
            navigate('/about')
        }
        else if(page === '단체 등록'){
            window.open('https://forms.gle/cZTuP6pXAQSAebnZ9', '_blank')
        }
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = (setting : any) => {
        setAnchorElUser(null);
        if(setting === '마이페이지'){
            navigate(`/myconcert/${userState.profileName}/selfintro`)
        }
        else if(setting === '내정보 관리'){
            navigate(`/manage/${userState.profileName}/account`)
        }
        else if(setting === '로그아웃'){
            dispatch(userActions.logoutUser())
            navigate(`/`)
            window.location.reload()
        }
        // else if(setting === 'Size'){
        //     window.alert(`현재 기기의 가로는 ${curWidth} 입니다.`)
        // }
        else if(setting === '닉네임 변경'){
            setNameModalOpen(true)
        }
    }

    const onClickLogo = () => {
        if(window.location.pathname === '/'){
            setSearchParams('')
            window.location.reload()
        }
        else{
            setSearchParams('')
            navigate('/')
        }
    }

    useEffect(() => {
        if(userState.accessToken !== null && userState.profileName !== null){
            const fetchToken = async () => {
                if(userState.accessToken !== null && userState.profileName !== null){
                    const result = await dispatch(myInfoGet({token : userState.accessToken, profileName : userState.profileName}))
                    if (result.payload.isSelfProfile) {
                        dispatch(userGroupGet(userState.accessToken))
                        dispatch(userActions.setRefresh())
                    }
                    else{
                        window.alert("로그인 유효기간 만료")
                        dispatch(userActions.logoutUser())
                        return
                    }
                }
            }
            fetchToken().then(() => {})
            dispatch(myInfoGet({token : userState.accessToken, profileName : userState.profileName}))
        }

    }, [userState.accessToken, userState.profileName, dispatch])

    const [reqNum, setReqNum] = useState(0)
    const friendState = useSelector(selectFriend)
    useEffect(() => {
        if(friendState.requestFriend !== null){
            setReqNum(friendState.requestFriend.totalElements)
        }
    },[friendState.requestFriend])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar sx={{
                    pr: 0,
                    pl: res450 ? 0 : '20px',
                    height: res450 ? '20px' : '60px',
                    justifyContent: 'space-around',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>
                    {/*Desktop Display*/}
                    <Box
                        component="img"
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            width: 100,
                            objectFit: 'contain',
                            cursor: 'pointer'
                            // border: '0.5px solid black'
                        }}
                        alt="Image description"
                        src={`${process.env.PUBLIC_URL}/img/logo_KOR/Logo_KOR_trans_white.png`}
                        onClick={onClickLogo}
                    />

                    <Box sx={{display: {md: 'none'}, width: '48px', pr: 0, mr: 0}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={() => handleCloseNavMenu('close')}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/*Mobile Display*/}
                    <Box
                        component="img"
                        sx={{
                            display: {md: 'none'},
                            width: 100,
                            objectFit: 'contain',
                            cursor: 'pointer'
                            // border: '0.5px solid black'
                        }}
                        alt="Image description"
                        src={`${process.env.PUBLIC_URL}/img/logo_KOR/Logo_KOR_trans_white.png`}
                        onClick={onClickLogo}
                    />
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <React.Fragment key={page}>
                                <Button
                                    key={page}
                                    onClick={() => handleCloseNavMenu(page)}
                                    sx={{my: 2, color: 'white', display: 'block', fontSize: '15px'}}
                                >
                                    {page}
                                </Button>
                                <Divider orientation="vertical" sx={{
                                    m: '10px',
                                    position: 'relative',
                                    top: '20px',
                                    height: '10px',
                                    border: 'solid 1px white'
                                }}/>
                            </React.Fragment>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0, display: 'flex'}}>
                        {
                            userState.isLogin ?
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <Avatar alt={''} sx={{border : reqNum > 0 ? `1.5px solid red` : ''}} src={`${userState.profileImage}`}/>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{mt: '45px'}}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                                <Typography textAlign="center">{setting}</Typography>
                                                {
                                                    setting === '내정보 관리' && reqNum > 0 ?
                                                        <Typography color={'red'} sx={{fontSize: 15, fontWeight: 15}}>*</Typography>
                                                        :
                                                        null
                                                }
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                                :
                                res450 ?
                                    <Button variant="contained" size={"small"}
                                            sx={{position: 'relative', border: '0.5px solid white', fontSize: 12}}
                                            onClick={() => dispatch(userActions.openModal())}>로그인</Button>
                                    :
                                    <Button variant="contained" sx={{position: 'relative', border: '1px solid white'}}
                                            onClick={() => dispatch(userActions.openModal())}>로그인</Button>
                        }
                    </Box>
                </Toolbar>
            </Container>
            <LoginModal open={userState.isModalOpen}/>
            <NameChangeModal open={nameModalOpen} close={setNameModalOpen} />
        </AppBar>
    );
}

export default Header;
