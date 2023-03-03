/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  images: {
    domains: ['adamswim-dmlarry.s3.us-west-1.amazonaws.com']
  }
}
export default config
