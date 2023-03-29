import {
    AppBar,
    Avatar,
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
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/slices/user/user";
import { useNavigate } from "react-router"

var w = window.innerWidth
const pages = ['홈', '커뮤니티', '단체검색하기', '중고거래 및 대여', '객원모집'];
const settings = ['프로필', '마이페이지', '설정', '로그아웃', 'Size'];

const Header = () => {

    const theme = useTheme();
    const res400 = useMediaQuery(theme.breakpoints.down("res400"))

    const userState = useSelector(selectUser)

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
        console.log("open nav")
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
        console.log("close nav")
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
        console.log("open user")
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        console.log("close user")
    };
    const handleUserMenuClick = (setting : any) => {
        if(setting === '로그아웃'){
            // setIsLogin(!isLogin)
        }
        if(setting === 'Size'){
            console.log(w)
            window.alert(w)
        }
        console.log("1")
        // console.log(isLogin)
    }

    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar sx={{pl: res400 ? 0 : '20px', height: '60px'}} >
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

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                        href=""
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 300,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
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

                    <Box sx={{ flexGrow: 0 }}>
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
                                <MenuItem key={setting} onClick={() => handleUserMenuClick(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;
