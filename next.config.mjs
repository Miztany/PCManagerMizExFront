/** @type {import('next').NextConfig} */
import nextPWA from 'next-pwa';

const nextConfig = {
 // 全ての API routes にマッチ
 async headers() {
    return [
      {
        // 対象APIのパスパターン
        // 今回は src/app/api/ 配下にAPIを作っているので下記のようにする
        source: "/:path*",
        headers: [
          {
            // CORSを許可するオリジン
            key: "Access-Control-Allow-Origin",
            // すべてのオリジンを許可するなら * (アスタリスク)
            // ただセキュリティ的にはよろしくないので注意
            value: "*",
          },
          {
            // 許可するメソッド
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,POST",
          },
          {
            // 許可するリクエストヘッダ
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
    ];
  },
	
};

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

export default withPWA({
  ...nextConfig,
  reactStrictMode: true,
})
