const express = require('express')
const app = express()
const path = require('path')
const { execFile } = require('child_process')
const cors = require('cors')
const port = process.env.port || 3030

app.use(express.static(path.join(__dirname, 'app/build')));
app.use(cors())

app.get('/containers', function (req, res) {
  const format = `
  { 
    \"id\": \"{{.ID}}\",
    \"name\": \"{{.Names}}\",
    \"createdAt\": \"{{.CreatedAt}}\",
    \"status\": \"{{.Status}}\",
    \"image\": \"{{.Image}}\",
    \"runningfor\": \"{{.RunningFor}}\"
  },`

  const sendInfo = info => {
    // remove last comman in json string
    let data = info.toString().slice(0, -2)
    // create an array
    let payload = `[ ${data} ]`
    res.status(200)
    res.send(payload)
  }

  execFile('docker', ['ps', '-a', '--format', format], (error, stdout, stderr) => {
    if (error) {
      res.status(500)
      res.send([{ 'log': 'error' }])
    } else if (stdout) {
      sendInfo(stdout)
    } else {
      sendInfo(stderr)
    }
  })
})

app.get('/logs/:id', function (req, res) {
  const id = req.params.id

  const sendInfo = info => {
    let data = encodeURI(info)
    let payload = `
      {
        \"id\": \"${id}\",
        \"log\": \"${data}\"
      }
    `
    res.status(200)
    res.send(payload)
  }

  execFile('docker', ['logs', '--tail=\"2048\"', id], { maxBuffer: 512 * 1024 }, (error, stdout, stderr) => {
    if (stdout) {
      sendInfo(stdout)
    } else {
      sendInfo(stderr)
    }
  })
})

app.listen(port, function () {
  console.log(`docker-dev-dash listening on port ${port}!`)
})
