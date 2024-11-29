import Fastify from 'fastify'
import Cors from '@fastify/cors'

import CheerioScrapper from './CheerioScrapper.js'
import getAxiosInstace from './axiosInstace.js'

const PORT = 3001
const server = Fastify()

server.register(Cors, {
  origin: '*',
  methods: ['POST', 'GET'],
})

server.get('/debug', (req, res) => {
  res.send({status: 'up'})
})

server.post('/', async (req, res) => {
  try {
    let { qrUrl } = req.body
    const axiosInstance = getAxiosInstace(qrUrl)

    let response = await axiosInstance.get(qrUrl)

    CheerioScrapper.loadPage(response.data)
    
    let result = CheerioScrapper.getData() 
    
    res.status(200).send(result)
  }
  catch (ex) {
    console.log(ex.message)
    res.status(403).send({error: ex.message})
  }
})

try {
  server.listen({ port: PORT })
  console.log(`[server] server is running on ${PORT}`)
} catch (err) {
  console.log(err)
  process.exit(1)
}