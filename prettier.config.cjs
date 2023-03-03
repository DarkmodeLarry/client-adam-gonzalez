/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindConfig: '/styles/tailwind.config.cjs'
}
