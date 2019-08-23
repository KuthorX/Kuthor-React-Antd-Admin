import React, { useState, useEffect } from 'react'
import { Statistic, Card, Row, Col, Icon } from 'antd'
import { getMainPageData, getMainPageTotalUserData } from 'api'
import { message } from 'antd'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

const HomePage = props => {
  const [data, setData] = useState([
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
    { loading: true },
  ])
  const [userTotalData, setUserTotalData] = useState({
    series: [
      {
        name: 'Count',
        type: 'bar',
      },
      {
        name: 'Increase Rate',
        type: 'line',
      },
    ],
    xAxis: {
      data: [],
    },
    yAxis: [
      {
        name: 'Count',
      },
      {
        name: 'Increase Rate',
      },
    ],
  })
  let userTotalDataFinal = {
    title: {
      text: 'Total User',
      left: '50%',
      right: '50%',
      textAlign: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    grid: {
      top: '80px',
    },
    legend: {
      top: '30px',
    },
  }
  userTotalDataFinal = { ...userTotalDataFinal, ...userTotalData }
  
  useEffect(() => {
    async function t() {
      let result = await getMainPageData()
      if (result.code === 0) {
        setData(result.data)
        message.success('Got data')
      } else {
        message.error('Get data fail')
      }

      result = await getMainPageTotalUserData()
      if (result.code === 0) {
        setUserTotalData(result.data)
        message.success('Got data')
      } else {
        message.error('Get data fail')
      }
    }
    t()
  }, [])

  const colViews = data.map(d => {
    if (d.loading) {
      return (
        <Col span={6} key={d.id}>
          <Card>
            <Statistic
              title={'Loading...'}
              value={'Loading...'}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      )
    } else {
      return (
        <Col span={6} key={d.id}>
          <Card>
            <Statistic
              title={d.title}
              value={d.value}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<Icon type="arrow-up" />}
              suffix="%"
            />
          </Card>
        </Col>
      )
    }
  })

  const chartView = (
    <ReactEchartsCore
      style={{ height: '450px' }}
      echarts={echarts}
      option={userTotalDataFinal}
      notMerge={true}
      lazyUpdate={true}
      theme={'theme'}
    />
  )

  return (
    <>
      <div className="HomePage">
        <Row gutter={0}>{colViews}</Row>
        <div className="chart-wrapper">{chartView}</div>
      </div>
      <style jsx>{`
        .HomePage {
        }
        .chart-wrapper {
          margin: 20px 0;
        }
      `}</style>
    </>
  )
}

export default HomePage
