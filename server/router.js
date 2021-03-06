const express = require('express')
const router = express.Router()
const well = require('./models/well')

router.get('/', (req, res) => {
  res.json({kakka: true})
})

router.get('/range', (req, res) => {
  const start = req.param('start') || Date.now() - 24 * 60 * 60 * 1000
  const end = req.param('end') || Date.now()
  const offset = parseInt(req.param('offset')) || 0
  const limit = parseInt(req.param('limit')) || 100

  well.range(req.param('startAt'), req.param('endAt'), req.param('offset'), req.param('limit')).then((response) => {
    res.status(200)
        .json(response)
  })
})

router.get('/latest', (req, res) => {
  well.latest().then((result) => {
    res.status(200)
          .json(result)
  })
})

router.get('/status', (req, res) => {
  well.status().then((result) => {
    res.status(200)
          .json(result)
  })
})

router.get('/day', (req, res) => {
  well.day(req.param('startAt')).then((result) => {
    res.status(200)
      .json(result)
  })
})

router.get('/month', (req, res) => {
  well.month(req.param('startAt')).then((result) => {
    res.status(200)
        .json(result)
  })
})

module.exports = router
