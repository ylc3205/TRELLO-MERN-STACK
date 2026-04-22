/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  // Enable req.body json data
  app.use(express.json())

  // Use API v1
  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  if(env.BUILD_MODE === 'production') {
  app.listen(process.env.PORT, () => {
      console.log(`3. Production: Hi Vinh, Back-end Server is running successfully at Port: ${process.env.PORT}`)
    })
  } else {
    //local dev
    // app.listen(env.APP_HOST, env.APP_PORT, () => {
  //   console.log(`3. Hi ${env.AUTHOR}, running successfully at Host: ${env.APP_HOST} and Port: ${env.APP_PORT}`)
  // })
  app.listen(Number(env.LOCAL_DEV_APP_PORT), env.LOCAL_DEV_APP_HOST, () => {
    console.log(`3. LOCAL DEV: Running successfully at Host: ${env.LOCAL_DEV_PP_HOST} and Port: ${env.LOCAL_DEV_APP_PORT}`)
  })
  }

  

  exitHook(() => {
    console.log('4. Disconnecting...')
    CLOSE_DB()
    console.log('5. Disconnected')
  })
}

// Chỉ khi kết nối db thành công mới start server backend
(async () => {
  try {
    console.log('1. Connecting...')
    await CONNECT_DB()
    console.log('2. Connected')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// Chỉ khi kết nối db thành công mới start server backend
// console.log('1. Connecting...')
// CONNECT_DB()
//   .then(() => console.log('2. Connected'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })