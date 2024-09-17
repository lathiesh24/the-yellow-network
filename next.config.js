module.exports = {
  env: {
    PUBLIC_BASE_URL_LOCAL : process.env.NEXT_PUBLIC_BASE_URL_LOCAL,
    PUBLIC_NIFO_BASE_URL_PROD : process.env.NIFO_BASE_URL_PROD,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "media.licdn.com",
      "encrypted-tbn0.gstatic.com",
      "www.wofsummit.com",
      "lh3.googleusercontent.com",
    ],
  },
};
