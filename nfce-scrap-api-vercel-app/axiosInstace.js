import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar, Cookie } from 'tough-cookie';

const getAxiosInstace = (url) => {
  const jar = new CookieJar()
  let targetUrl = new URL(url)
  
  const axiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
    },
    jar
  })

  wrapper(axiosInstance)

  axiosInstance.defaults.maxRedirects = 0
  // axiosInstance.defaults.proxy = {
  //   host: '10.0.0.109',
  //   port: '8080',
  //   protocol: 'http'
  // }
  axiosInstance.defaults.withCredentials = true
  axiosInstance.defaults.baseURL = targetUrl.origin

  axiosInstance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response && [301, 302].includes(error.response.status)) {
        const redirectUrl = error.response.headers.location;

        if(axiosInstance.defaults.headers['Cookie'] instanceof Array) {
          error.response.headers['set-cookie'].forEach(c => {
            jar.setCookie(
              Cookie.parse(c), 
              error.response.config.url
            )
          })
        }
        
        return axiosInstance.get(redirectUrl);
      }

      return Promise.reject(error);
    }
  )

  return axiosInstance
}

export default getAxiosInstace