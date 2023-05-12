/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
    ignoredRouteFiles: ['**/.*'],
    appDirectory: 'src',
    assetsBuildDirectory: 'public/dist',
    serverBuildPath: 'dist/index.js',
    publicPath: '/dist/',
    serverModuleFormat: 'cjs',
    future: {
        v2_errorBoundary: true,
        v2_meta: true,
        v2_normalizeFormMethod: true,
        v2_routeConvention: true,
    },
}
