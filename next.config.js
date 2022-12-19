/** @type {import('next').NextConfig} */

const API_KEY = "570df7fe24c3555acd8d165491c55ad1";

const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,

  // redirect : 한페이지에서 다른 페이지로 이동가능 / 아예 다른 url로 이동 가능
  async redirects() {
    return [{

      // *를 붙이는 이유는 뒤에 계속 더 무엇인가 오더라도 그대로 붙게 하기위해(url)
      source:"/old-blog/:path*", /* 만약유저가 contact로 이동한다면 */
      destination:"/new-sexy-blog/:path*", /* 유저를 form이라는 destination에 보낸다 */
      permanent:false, /* redirection이 permanent(양구적)인지 아닌지에 따라서 브라우저나 검색엔진이 이 정보를 기억하는지 여부가 결정된다 */
    }];
  },
  
  // rewrite : 유저를 redirect 시키기는 하지만 url은 변하지 않는다
  // api주소가 한글이 들어가는경우 encodeURI()로 변경
  async rewrites(){
    return [
      {
        source:"/api/movies",
        destination:`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,

      },
      // {
      //  redirect를 더 쓰고 싶다면 여기에
      // }
    ]
  }
};

module.exports = nextConfig;
