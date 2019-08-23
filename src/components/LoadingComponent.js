import React from 'react'
import { Spin } from 'antd'

function LoadingComponent() {
  return (
    <>
      <div className="loading">
        <Spin tip="Loading..." size="large" />
      </div>
      <style jsx>{`
        .loading {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}

export default LoadingComponent
