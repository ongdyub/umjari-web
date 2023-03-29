import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container, Divider,
    IconButton,
    Menu,
    MenuItem, Stack,
    Toolbar,
    Tooltip,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/slices/user/user";
import { useNavigate } from "react-router"
import LoginModal from "../../Modal/LoginModal";

var w = window.innerWidth
const pages = ['홈', '커뮤니티', '단체검색하기', '중고거래 및 대여', '객원모집'];
const settings = ['마이페이지', '작성기록', '설정', '로그아웃', 'Size'];

const Header = () => {

    const theme = useTheme();
    const res450 = useMediaQuery(theme.breakpoints.down("res450"))

    const userState = useSelector(selectUser)

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const [loginOpen, setLoginOpen] = useState<boolean>(false)
    const handleLoginClose = () => {
        setLoginOpen(false)
    }

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
        else if(page === '단체검색하기'){
            navigate('/groupsearch')
        }
        else if(page === '중고거래 및 대여'){
            window.alert("준비 중 입니다.")
        }
        else if(page === '객원모집'){
            window.alert("준비 중 입니다.")
        }
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        console.log("open user")
    };
    const handleCloseUserMenu = (setting : any) => {
        setAnchorElUser(null);
        if(setting === '마이페이지'){
            // setIsLogin(!isLogin)
        }
        else if(setting === '작성기록'){

        }
        else if(setting === '설정'){

        }
        else if(setting === '로그아웃'){

        }
        else if(setting === 'Size'){
            window.alert(w)
        }
    }

    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar sx={{pr: 0,pl: res450 ? 0 : '20px', height: '60px', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center'}} >
                    {/*Desktop Display*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 300,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        / 음자리 /
                    </Typography>

                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, width: '64px' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
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
                                display: { xs: 'block', md: 'none' },
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
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 300,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            textAlign: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        / 음자리 /
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <>
                                <Button
                                    key={page}
                                    onClick={() => handleCloseNavMenu(page)}
                                    sx={{ my: 2, color: 'white', display: 'block', fontSize: '15px' }}
                                >
                                    {page}
                                </Button>
                                <Divider orientation="vertical" sx={{m: '10px',position:'relative', top: '20px', height:'10px', border: 'solid 1px white'}} />
                            </>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex' }}>
                        {
                            userState.isLogin ?
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
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
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                                :
                                res450 ?
                                    <Button variant="contained" size={"small"} sx={{left: -10, position: 'relative', border: '0.5px solid white', fontSize: 8}} onClick={() => setLoginOpen(true)}>로그인</Button>
                                    :
                                    <Button variant="contained" sx={{border: '1px solid white'}} onClick={() => setLoginOpen(true)}>로그인</Button>
                        }
                    </Box>
                </Toolbar>
            </Container>
            <LoginModal open={loginOpen} handleClose={handleLoginClose}/>
        </AppBar>
    )
}

export default Header;
