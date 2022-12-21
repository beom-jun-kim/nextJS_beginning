// 폴더안에 페이지가 하나만 있으면 폴더생성 X
// ex) movies/all → index.js , all.js | about → about.js

import Seo from "../components/seo";

export default function hello() {
  return (
    <div>
      <Seo title="About" />
      <h1>About!</h1>
    </div>
  );
}
