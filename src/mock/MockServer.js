let express = require('express')
let Mock = require('mockjs')
let moment = require('moment')
let app = express()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use('/mainpage/data', function(req, res) {
  res.json(
    Mock.mock({
      'data|8': [
        {
          'title|4-12': '',
          'value|1-100.2-2': 0,
          'id|+1': 1,
        },
      ],
    })
  )
})

app.use('/mainpage/chart/totalUser', function(req, res) {
  const dates = [
    moment().subtract(7, 'days'),
    moment().subtract(6, 'days'),
    moment().subtract(5, 'days'),
    moment().subtract(4, 'days'),
    moment().subtract(3, 'days'),
    moment().subtract(2, 'days'),
    moment().subtract(1, 'days'),
  ]
  const xData = dates.map(d => d.format('MM / DD'))
  let countData = dates.map(_ => {
    return Math.floor(Math.random() * Math.floor(10000) * 1)
  })
  for (let i = 0; i < countData.length; i++) {
    if (i > 0) {
      countData[i] += countData[i - 1]
      if (countData[i] < 0) {
        countData[i] = 0
      }
    }
  }
  const rateData = countData.map((d, i) => {
    if (i === 0) {
      return 0
    } else {
      return ((countData[i] - countData[i - 1]) / countData[i - 1]).toFixed(2)
    }
  })

  res.json(
    Mock.mock({
      xAxis: {
        data: xData,
      },
      yAxis: [
        {
          name: 'Count',
          min: Math.min(countData),
          max: Math.max(countData),
        },
        {
          name: 'Increase Rate',
          min: Math.min(rateData),
          max: Math.max(rateData),
        },
      ],
      series: [
        {
          name: 'Count',
          type: 'bar',
          data: countData,
        },
        {
          name: 'Increase Rate',
          type: 'line',
          data: rateData,
          yAxisIndex: 1,
        },
      ],
    })
  )
})

app.listen('8090', '0.0.0.0', () => {
  console.log('listening 8090')
})
