import express from 'express'
import { sessionMiddleware } from './session-middleware.mjs'
import { Handlers as SentryHandlers } from '@sentry/node'

const PORT = 8123
const app = express()

app.use(SentryHandlers.requestHandler())

app.get('/', sessionMiddleware, (req, res) => {
  // Trigger session save
  req.session.foo = 'bar';

  res.status(200).send('Hello World!')
})

// Not needed to reproduce.
// app.use(SentryHandlers.errorHandler())

app.use((error, req, res, next) => {
  console.error('THIS ERROR HANDLER SHOULD NOT RUN!')

  res.send('FAIL')
})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
