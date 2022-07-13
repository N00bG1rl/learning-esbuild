import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'

export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
    const app = express()

    const packagePath = require.resolve('local-client/build/index.html')
    app.use(express.static(path.dirname(packagePath)))// path.dirname(packagePath)
    //..node_modules/local-client/build

    /*  if (useProxy) {
         app.use(createProxyMiddleware({
             target: 'http://localhost:3000',
             ws: true,
             logLevel: 'silent'
         }))
     } else {
     } */

    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve).on('error', reject)
    })
}