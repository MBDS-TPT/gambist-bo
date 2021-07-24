module.exports = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/matches',
            permanent: true,
          },
        ]
      },
}