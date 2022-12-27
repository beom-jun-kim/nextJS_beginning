// url에 변수가 있음을 어떻게 알려주는가 파일명을 대괄호안에 넣는다 es) [id].js
// /movies/121212 같은 형태로 나올 것임
// 컴포넌트 내부에서 router를 사용하면 router는 프론트에서만 실행이 된다

import Seo from "../../components/seo";

// catch-all URL
export default function Detail({ params }) {

  // incognito 모드로 접속시 에러 : 해당 페이지가 백엔드에서 pre-render 되기 때문 || [] 이렇게 빈배열을 준다
  const [title] = params || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

// Next.js가 SSR context를 제공한다
// 유저에게 절대로 로딩단계를 보여주고 싶지 않고 seo에 최적화되게 만들고 싶다면 SSR을 써라
// api로 데이터를 fetch하기 위함이 아니라 조금 더 빠르게 데이터를 가져오기 위해
export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
