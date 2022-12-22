// React는 우리가 원할 때 부르고 원할 때 사용하는 라이브러리
// next.js는 내가 코드를 적절한 곳에 넣어야하는(커스터 마이징) 프레임워크
// react.js component를 export하고 있는 파일을 pages 폴더안에 두면 된다
// 파일의 이름을 따서 url 이름으로 쓴다
// index.js의 경우에는 앱이 시작하는 파일

// React로 한다면
// 1. React router DOM 다운 및 설정
// 2. router 생성 , 설계
// 3. component import
// 4 router render
// => next.js로 한다면 이 모든것들이 다 되어 있다

// jsx를 쓰고 있다면 React.js를 import할 필요가 없다 (react 메서드 제외)
// Head
// next.js안에 있는 컴포넌트
// 선언시 컴포넌트 안에 들어가는 모든 것들이 우리의 html의 head 안에 보여짐

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../components/seo";

// themoviedb.org 에서 로그인 후 api 발급
// fetch() url 불러오기 : 푸터에 api 클릭 → 디벨로퍼 파란링크 클릭 → MOVIES 클릭 → get popular → /로 적혀있는 부분이 url
// url 앞부분 : Try it out 탭 → SEND REQUEST 옆

export default function Home({ results }) {
  // ()() :
  // IIFE (즉시 실행 함수 표현, Immediately Invoked Function Expression).
  // 첫번째 괄호는 익명함수를 감싸 실행 될 함수가 전역 스코프에 불필요한
  // 변수를 추가하거나, IIFE 내부안으로 다른 변수들이 접근하는 것을 막을 수 있는 방법.
  // 두번째 괄호는 즉시 실행 함수를 생상하는 괄호.
  // 이를 통해 자바스크립트 엔진은 함수를 즉시 해석해서 실행
  // useEffect(() => {
  //   (async () => {
  //     const { results } = await (
  //       await fetch(
  //         `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  //       )
  //     ).json();
  //     setMovie(results);
  //   })();
  // }, []);

  // api 숨기기 : 누군가 악의적으로 사용할 수 있다
  // 확인 방법 :
  // 개발자 도구 > Network > popular ~~ > Headers 탭 > Request URL에서 api확인가능
  // 숨기기 : rewrite

  const router = useRouter();
  const onClick = (id, title) => {
    router.push(
      {
        pathname: `/movies/${id}`,
        query: {
          title,
        },
      },
      `/movies/${id}` /* as : 브라우저에 보일 url을 마스킹한다 */
    );
  };

  return (
    <div>
      <div className="container">
        <Seo title="Home" />
        {results?.map((movie) => (
          <div
            onClick={() => onClick(movie.id, movie.original_title)}
            className="movie"
            key={movie.id}
          >
            {/* 사이트 푸터에 api 클릭 > 디벨로퍼 링크 클릭 > 좌측 바에 '이미지'클릭 */}
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <h4>
              <Link
                href={{
                  pathname: `/movies/${movie.id}`,
                  query: {
                    title: movie.original_title,
                  },
                }}
                legacyBehavior
                as={`/movies/${movie.id}`}
              >
                <a>{movie.original_title}</a>
              </Link>
            </h4>
          </div>
        ))}
        <style jsx>{`
          .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 20px;
            gap: 20px;
          }
          .movie img {
            max-width: 100%;
            border-radius: 12px;
            transition: transform 0.2s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          }
          .movie:hover img {
            transform: scale(1.05) translateY(-10px);
          }
          .movie h4 {
            font-size: 18px;
            text-align: center;
          }
        `}</style>
      </div>
    </div>
  );
}

// request 시 데이터를 fetch하고 결과를 pre-render하는 방법.
// get server side props : loading을 안하기 위해
// object를 return.
// server side를 통해 props를 page로 보낼 수 있다
// _app.js의 pageProps가 필요한 이유
// 우리가 idnex로 갈 때 next.js가 Home을 받아서 렌더하기 위해
// _app.js의 <Component/> 컴포넌트에 넣을거고 getServerSideProps()를 호출
// next.js가 밑의 코드에 작성한 props를 _app.js의 pageProps에 넣을 것이다
// 이 function은 오직 server side에서만 실행된다
// 항상 server side rendering을 하고 싶은가(데이터가 유효할 때 화면이 보여지게 되는게 좋은지) vs loading화면을 보여준 다음에 데이터를 받는게 좋은지
// next.js가 백엔드에서 받아온 props를 return해서 데이터를 반환하면 reactJS가 가져온 props를 가져와서 result array를 뽑아주는 것
//page가 유저에게 보여지기 전에 props를 받아오는 function을 만들어 보았다
// 오직 html이기 때문에 자바스크립트를 꺼도 잘보인다

// pre-Rendering : Next.js는 Client-side의 JavaScript에 의해 실행하는 것 대신 사전에 각 페이지의 HTML을 생성. 미리 HTML을 만드는 방식 쯤으로 이해해두면 된다!
export async function getServerSideProps() {
  const { results } = await (
    await fetch("http://localhost:3000/api/movies")
  ).json();
  return {
    props: {
      results,
    },
  };
}
