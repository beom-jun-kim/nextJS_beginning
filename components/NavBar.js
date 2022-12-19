// a태그는 느려지게한다 (이동시 전체 페이지 새로고침)
// ESLint : 코드를 분석해 문법적인 오류나 안티패턴을 찾아주고 일관된 코드 스타일을 유지하여 개발자가 쉽게 읽도록 코드를 만들어준다
// useRouter : NextJS에 있는 것.

// style jsx css 자동완성기능 vscode-styled-components 익스텐션 설치
// Link에 legacyBehavior를 넣으면 a태그 사용가능. 스타일도 입힐 수 있다!
// 출처 : https://nextjs.org/docs/api-reference/next/link

import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <img src="/vercel.svg" /> {/* public 디렉토리 안. / + 파일명을 그대로 */}
      <div>
        <Link href="/" legacyBehavior>
          <a className={router.pathname === "/" ? "active" : ""}>Home</a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className={router.pathname === "/about" ? "active" : ""}>About</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          margin-top: 10px;
          font-size: 18px;
          font-weight: 600;
          padding: 0 0 5px;
          color: gray;
        }
        nav div {
          display: flex;
          gap: 10px;
        }

        .active {
          border-bottom: 3px solid #000;
          color: #000 !important;
        }
      `}</style>
    </nav>
  );
}

// export default function NavBar(){
//     const router = useRouter();
//     return (
//         <nav>
//             <Link href="/"  className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}>Home</Link> {/* 변수 */}
//             <Link href="/about" className={[ styles.link , router.pathname === "/about" ? styles.active : "",].join(" ")}>About</Link> {/* 배열 */}
//             {/* {join : 한 배열을 다른 한 문자열로 바꾼다} */}
//         </nav>
//     )
// }
