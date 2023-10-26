import 'reflect-metadata'
import express from 'express'
import { routerApi } from './config/router/router'
import serverless from 'serverless-http'

const app = express()

routerApi(app)

console.log(`\nLambda Capstone aplication app,handler`)

module.exports.handler = serverless(app)
