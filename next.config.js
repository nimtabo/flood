// const withPlugins = require('next-compose-plugins')
// const withImages = require('next-images')

// const nextConfig = {
module.exports = {
    env: {
        API_ROOT: process.env.API_ROOT,
        googleApiKey: process.env.googleApiKey,
    },
    images: {
        domains: ['https://cdn.worldweatheronline.com','http://cdn.worldweatheronline.com', 'cdn.worldweatheronline.com',"https://res.cloudinary.com"],
        loader: 'akamai',
        path: '',
        formats: ['image/webp',"image/avif"],
    },
}

// module.exports = withPlugins([[withImages]], nextConfig)