// 무조건 _app.js 이 이름이어야한다 => NextJS는 about이 랜더링되기 전에, 먼저 app을 본다
// 커스터마이즈 파일
// 컴포넌트의 설계도 역할 => NextJS가 모든 페이지를 렌더링할 수 있게 하는.
// 글로벌 css를 주기위한
// 페이지가 어떻게 있어야하는지. 어떤 컴포넌트가 어떤 페이지에 있어야만하는지

// app.js
// 1. 페이지 변경 간에 레이아웃 유지
// 2. 페이지 탐색 시 state 유지
// 3. componentDidCatch를 사용한 Custom 에러 처리
// 4. 페이지에 추가 데이터 삽입
// 5. Global CSS 추가

import Layout from "../components/Layout";
import "../styles/globals.css"; /* app.js에서만  import가능 */

// about 페이지를 렌더링 하려고 할 때 NextJS는 about컴포넌트를 가져다가
// Component 프롭으로서 _app.js파일 내의 이 App 함수에 전달
// 첫번째 인자(Component)에 렌더링 하길 원하는 페이지를 넣을거다

// fragment를 넣는다면 공통 컴포넌트를 넣을 수 있다 (NavBar)
// 모든 페이지는 여기에 렌더링된다 (NavBar 밑에)
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}