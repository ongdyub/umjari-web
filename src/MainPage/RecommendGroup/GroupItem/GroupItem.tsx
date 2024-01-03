import {Card, CardMedia, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {GroupProgram} from "../../../store/slices/group/group";

const GroupItem = (props : any) => {

    const {item} = props

    const navigate = useNavigate()

    return(
        <Card onClick={() => navigate(`/group/${item.id}/list`)} sx={{height: 100,cursor: 'pointer', justifyContent:"flex-start", alignItems:"center" ,display: 'flex', width: '100%', flexDirection: 'row', pl:'2%', pr:'2%'}}>
            <CardMedia
                component="img"
                sx={{ width: 50, height: 50, objectFit: 'contain'}}
                alt="Group Logo"
                onError={({currentTarget}) => currentTarget.src = `${process.env.PUBLIC_URL}/Logo_posit.png`}
                src={item.logo}
            />
            <Stack sx={{textAlign: 'center',justifyContent: "flex-start", alignItems: "center", alignContent: 'center', ml: 0.5, mr:1, width: 135}}>
                <Typography sx={{fontSize:11, mb:0.5}}>
                    {item.name}
                </Typography>
                <Typography sx={{fontSize: 10}} color="text.secondary">
                    {item.region}
                </Typography>
                {/*<Typography variant="subtitle2" color="text.secondary" sx={{textOverflow: 'ellipsis',whiteSpace: 'nowrap'}} component="div">*/}
                {/*    {friend}명이 참여중입니다.*/}
                {/*</Typography>*/}
            </Stack>
            {
                item.setList.length < 1 ?
                    <Stack direction={'row'} sx={{alignItems:'center', maxHeight: 100, minHeight:100, overflow: 'hidden'}}>
                        <Typography color={'blue'} sx={{fontSize: 10, fontWeight: 400}}>연주곡 미정</Typography>
                    </Stack>
                    :
                    <Stack justifyContent={'center'} sx={{width: 'calc(100% - 120px)', minHeight: 100, overflow: 'hidden'}}>
                        {
                            item.setList.map((item : GroupProgram, idx : number) => (
                                <Stack sx={{mb:0.5}} key={idx} direction={"row"} justifyContent="flex-start" alignItems={'center'}>
                                    <Typography sx={{width: 80,mr: 1, fontWeight: 600, fontSize: 10, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                        {item.shortComposerEng}
                                    </Typography>
                                    <Typography sx={{ width: 'calc(100% - 90px)',fontSize: 12, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                        {item.shortNameEng}
                                    </Typography>
                                </Stack>
                            ))
                        }
                    </Stack>
            }
        </Card>
    )
}

export default GroupItem