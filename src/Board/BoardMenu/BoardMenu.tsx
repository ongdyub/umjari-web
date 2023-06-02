import {
    Collapse,
    Divider,
    List,
    ListItemButton,
    Stack, Typography,
    useMediaQuery,
} from "@mui/material";
import {useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useNavigate, useParams} from "react-router-dom";

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

const BoardMenu = () => {

    const navigate = useNavigate()
    const { boardName } = useParams();
    const res800 = useMediaQuery('(max-width:800px)')

    const [selectedIndex, setSelectedIndex] = useState<string | undefined>(boardName)
    const [open, setOpen] = useState(false)
    const menuOpen = () => {
        setOpen((!open))
    }
    const handleMiniMenu = (item : any) => {
        setSelectedIndex(item.name)
        setOpen(!open)
        navigate(`/community/${item.name.replace(/(\s*)/g,'')}`)
    }

    return(
        <Stack justifyContent="flex-start" alignItems="center" sx={{height: res800 ? '65px' : '1000px', width: res800 ? '100%' : '160px', bgcolor: '#292929', minWidth: '160px' }}>
            {res800 ?
                <List component="nav" sx={{width: '100%', justifyContent:"flex-start", alignItems:"center"}}>
                    {boardList.filter((item) => (item.name === selectedIndex)).map((item, idx) => (
                        <Stack key={idx} onClick={menuOpen} justifyContent="flex-start" alignItems="center" sx={{width: '100%'}}>
                            <Divider sx={{width: '40%', border: 'solid 0.4px white'}} />
                            <ListItemButton sx={{width: '100%', display: 'flex', justifyContent:"center", alignItems:"center"}}>
                                <Typography sx={{pt:1, pb: 1, color: 'white', width: 'auto'}}>
                                    {item.name}
                                </Typography>
                                {open ? <ExpandLess sx={{color: 'white', pl: '2'}} /> : <ExpandMore sx={{color: 'white', pl: '2'}} />}
                            </ListItemButton>
                        </Stack>
                    ))}
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {boardList.map((item, idx) => (
                            <Stack key={idx} onClick={() => handleMiniMenu(item)} justifyContent="flex-start" alignItems="center" sx={{width: '100%', bgcolor: selectedIndex === item.name ? 'primary.light' : 'primary.main'}}>
                                <Divider sx={{width: '40%', border: 'solid 0.4px white'}} />
                                <ListItemButton sx={{width: '100%', display: 'flex', justifyContent:"center", alignItems:"center"}}>
                                    <Typography sx={{pt:1, pb: 1, color: 'white', width: 'auto'}}>
                                        {item.name}
                                    </Typography>
                                </ListItemButton>
                            </Stack>
                        ))}
                    </Collapse>
                </List>
                :
                <List component="nav" sx={{width: '100%', justifyContent:"flex-start", alignItems:"center"}}>
                    {boardList.map((item, idx) => (
                        <Stack key={idx} onClick={() => handleMiniMenu(item)} justifyContent="flex-start" alignItems="center" sx={{width: '100%', bgcolor: selectedIndex === item.name ? 'primary.light' : ''}}>
                            <Divider sx={{width: '40%', border: 'solid 0.4px white'}} />
                            <ListItemButton sx={{width: '100%', display: 'flex', justifyContent:"center", alignItems:"center"}}>
                                <Typography sx={{pt:1, pb: 1, color: 'white', width: 'auto'}}>
                                    {item.name}
                                </Typography>
                            </ListItemButton>
                        </Stack>
                    ))}
                </List>
            }
        </Stack>
    )
}

export default BoardMenu