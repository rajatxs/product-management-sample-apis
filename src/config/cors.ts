import cors from 'cors'

export default cors({
   origin: '*',
   allowedHeaders: ['Authorization', 'Content-Type', 'X-Request-Id', 'X-Request-Timestamp'],
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})
