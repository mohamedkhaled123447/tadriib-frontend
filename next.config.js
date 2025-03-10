/** @type {import('next').NextConfig} */
const TerserPlugin = require("terser-webpack-plugin");

const withPWA = require("next-pwa")({
  dest: "public",
});
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  
 
  webpack: (config, {  }) => {

    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };
    config.optimization.minimizer = [new TerserPlugin({
            terserOptions: {
                compress: {
                    unused: true,
                }
            }
        })]
    config.plugins.push(
    new NodePolyfillPlugin(), 
    
    );

    return config;
  } 
})

module.exports = nextConfig;
