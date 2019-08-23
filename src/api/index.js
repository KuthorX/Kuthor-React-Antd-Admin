import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://10.10.85.77:8090/',
  timeout: 5000,
})

export async function getMainPageData() {
  try {
    const code = 0
    const data = (await instance.get('/mainpage/data')).data.data
    return {
      data,
      code,
    }
  } catch (error) {
    const code = -1
    return {
      error,
      code,
    }
  }
}

export async function getMainPageTotalUserData() {
  try {
    const code = 0
    const data = (await instance.get('/mainpage/chart/totalUser')).data
    return {
      data,
      code,
    }
  } catch (error) {
    const code = -1
    return {
      error,
      code,
    }
  }
}

