// url에 변수가 있음을 어떻게 알려주는가 파일명을 대괄호안에 넣는다 es) [id].js
// /movies/121212 같은 형태로 나올 것임

import { useRouter } from "next/router";

export default function Detail(){
    const router = useRouter();
    console.log(router);
    return "detail";
}