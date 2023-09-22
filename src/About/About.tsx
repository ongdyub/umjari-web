import {Stack} from "@mui/material";
import ReactQuill from "react-quill";

const About = () => {

    const contents = '<p>*베타버전</p><blockquote><strong><em>\"공연 프로그램도 그렇고, 단체가 준비하는 곡이랑 지역 기준, 모집하는 악기 종류로 검색할 수는 없을까?"</em></strong></blockquote><blockquote><strong><em>\"SNS를 하지 않는데 어디서 검색을 해야하지...?\"</em></strong></blockquote><blockquote><strong><em>\"나는 이 곡을 꼭 연주해 보고 싶은데 집 근처에서 준비중인 단체가 있을까?\"</em></strong></blockquote><blockquote><strong><em>\"동네 주변 연습실 정보를 알아보고 싶은데...\"</em></strong></blockquote><blockquote><strong><em>\"내가 여태 연주 한 곡들과 사진을 모아서 정리하고싶은데...\"</em></strong></blockquote><blockquote><strong><em>\"단원을 모집해야하는데 어디에 홍보 해야햐지...\"</em></strong></blockquote><blockquote><strong><em>\"공연을 홍보하고 싶은데 어디가 적합할까...?\"</em></strong></blockquote><p><br></p><h3>\'여러분이 필요한 모든 정보를, 한 자리에서 찾아보세요\'</h3><p><br></p><p>악기를 꽤 오래 했지만 인스타 및 페이스북 등의 SNS를 하지않아 어디서 어떤 단체가 무슨 곡을 준비하는지 전혀 알 수가 없어서 다같이 한번에 모여서 볼 수 있는 공간과 개인이 알맞게 검색할 수 있는 기능(ex) 곡, 지역, 모집악기 등 의 검색기능)을 능동적으로 계속 추가할 수 있는 공간이 있으면 좋을 것 같아서 제작하였습니다.</p><p><br></p><p>최종적으로는 전국 모든 예체능 분야의 단체가 등록되어 취미가 아닌 사람들이더라도 동네 주변에 어떤 연주회가 있는지 보다 쉽게 알고, 찾아 갈 수 있도록 하는 것이 최종 목표입니다.</p><p><br></p><h4>현재는 오케스트라를 기준으로 만들었지만, 추후 합창단, 직장인 밴드, 연극 및 전시회 등 모든 아마추어 문화예술 분야로 확장 예정입니다.</h4><p><br></p><p>단체 등록 및 연습실 / 악기사 / 단체 광고 문의 :</p><p><br></p><p>umjari@umjari.co.kr</p><p><br></p><p><br></p><p><br></p><h1>추가 예정 기능</h1><p><br></p><ul><li>객원 모집 게시판</li><li>악기 거래 게시판</li><li>앨범 사진 별 댓글 / 좋아요</li><li>태그</li><li>알림 / 채팅 / 쪽지</li><li>연주 목록에 따른 업적 ex) 차이콥 수집가, 브람스 수집가, 1달1공연, 2달1공연, 개근, 수석진n회 ...</li><li>오늘의 추천곡</li><li>연주 추천곡</li><li>기타 건의사항 반영</li></ul><p><br></p><p><br></p><p><br></p><h1>버그 제보 및 건의사항</h1><p><br></p><p><br></p><h4>umjari@umjari.co.kr or 관리자 직접 연락</h4><p><br></p><p><br></p><h3>*** UI/UX 와 안드로이드, IOS로 함께 프로젝트 진행하실 분도 연락 바랍니다 ***</h3><p><br></p><p><br></p>'
    return(
        <Stack justifyContent={'flex-start'} sx={{width: '100%', mb:5, pl:1}} alignItems={'center'}>
            <Stack alignItems="center" sx={{width:'100%'}} flexDirection={'column'}>
                <ReactQuill
                    value={contents}
                    readOnly={true}
                    theme={"bubble"}
                />
            </Stack>
        </Stack>
    )
}

export default About