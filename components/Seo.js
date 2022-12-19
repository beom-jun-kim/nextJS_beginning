// Next.js에 있는 것
// 다양한 SEO 스킬들을 적용하기 위해서 서버로부터 <head>를 받을 수 있어야 한다

import Head from "next/head";

export default function Seo({ title }) {
  return (
    <Head>
      <title>{`${title}`} | Next Movies</title>
    </Head>
  );
}
