import { Request, Response } from 'express'
import { middleware as connDatabase } from '../middlewares/connectionDatabase.middleware'
import { middleware as errorHandler } from '../middlewares/errorHandler.middleware'
import { router as userRouter } from './users/users.router'
import { router as authRouter } from './auth.routes'
import * as express from 'express'
import cors from 'cors'
// import cors from 'cors'

/**
 * The function `routerApi` sets up the routing for various endpoints in an Express application,
 * including authentication, user, project, and contact routes.
 * @param {any} app - The `app` parameter is an instance of the Express application. It is used to
 * define the routes and middleware for the API.
 */
export function routerApi(app: any) {
    //console.log(`\n function routerApi\n`)
    app.use(function (_req: Request, res: Response, next: Function) {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, x-access-token, Origin, Content-Type, Accept',
        )
        next()
    })
    addGeneralMiddlewares(app)
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use(errorHandler)
}

function addGeneralMiddlewares(app: any) {
    console.log('\n corsOptionsDelegate: \n', corsOptionsDelegate)

    app.use(cors(corsOptionsDelegate))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(connDatabase)
    // app.use(requestTime)
    // app.use(errorHandler)
}

/**
 * @function 
 * @author 
 * @date 
 */
let allowlist = [
    'https://staging.d2p6im1qsqqlhl.amplifyapp.com',
    'staging.d2p6im1qsqqlhl.amplifyapp.com',
    'http://localhost:3700',
]

/**
 * The function `corsOptionsDelegate` determines whether to enable or disable CORS based on the
 * requested origin.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, query parameters, and body. In this case, the code is using
 * `req.header('origin')` to retrieve the value of the `origin` header from the request.
 * @param callback - The `callback` parameter is a function that is called with two arguments: `error`
 * and `options`. The `error` argument is used to pass any error that occurred during the processing of
 * the CORS options. The `options` argument is an object that specifies the CORS options for the
 * request.
 */
function corsOptionsDelegate(req, callback) {
    let corsOptions
    console.log('header origin: \n', req.header('origin'))

    if (allowlist.indexOf(req.header('origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}
