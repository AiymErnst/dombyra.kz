/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xzfllkdpvqzteddigqhx.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      // старые адреса режимов без префикса → язык по умолчанию
      { source: '/tuner',   destination: '/ru/tuner',   permanent: true },
      { source: '/learn',   destination: '/ru/learn',   permanent: true },
      { source: '/karaoke', destination: '/ru/karaoke', permanent: true },
      // ЗДЕСЬ добавить адреса, унаследованные от Tilda.
      // Список берётся из Search Console, Вебмастера и sitemap.xml Tilda —
      // карту сайта сохраните ДО отключения, потом она пропадёт.
      // { source: '/page12345678.html', destination: '/ru/tuner', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // микрофон нужен и странице, и вложенному тренажёру
          { key: 'Permissions-Policy', value: 'microphone=(self)' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/app/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },
};
export default nextConfig;
