const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const path = require('path')
app.use(cors())
app.use(express.json())



const logs = (req, res, next) => {
    console.log(req.method, req.url);
    // fs.writeFileSync('logs/logs.txt', `req method ${req.method}/n req.url ${req.url}`, 'utf8')
    const logDir = path.join(__dirname, 'logs')
    console.log(logDir);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir)
    }
    const logFile = path.join(logDir, 'logs.txt')
    fs.appendFileSync(logFile, `req method: ${req.method} , req url: ${req.url} \n`, 'utf8')
    const readfile=fs.readFileSync('logs/logs.txt','utf8',)
    res.status(200).json({
        res:readfile,
        message:"log added"
    })

    // next()
}
app.use('/logs', logs)
const PORT = 5001
app.listen(PORT, () => console.log(`server listening ${PORT}`))