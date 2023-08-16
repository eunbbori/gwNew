/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  //reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
      },
      {
        protocol: 'http',
        hostname: '192.168.0.201',
        pathname: '/employees/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.0.203',
        pathname: '/employees/**',
      },
    ],
  },
  // serverOptions: {
  //   secure: process.env.NODE_ENV === 'production',
  // },
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value:
  //             process.env.NODE_ENV === 'production'
  //               ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://192.168.0.204:8080/graphql; upgrade-insecure-requests;"
  //               : '', // 개발 환경에서는 CSP 설정을 비활성화
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;

// module.exports = {
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.(graphql|gql)$/,
//       exclude: /node_modules/,
//       loader: 'graphql-tag/loader',
//     });
//     return config;
//   },
// };
