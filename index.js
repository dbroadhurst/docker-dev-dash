#! /usr/bin/env node

const express = require('express')
const app = express()
const path = require('path')
const { execFile, spawnSync } = require('child_process')
const cors = require('cors')

let port = process.env.port || 3030

if (process.argv[2] === '-p') {
  port = process.argv[3]
}

app.use(express.static(path.join(__dirname, 'app/build')));
app.use(cors())

app.get('/ps', function (req, res) {
  const sendInfo = info => {
    let data
    // make sure objects end with ','. Docker sends back malformed JSON
    // TODD: this code will need  to be updated if the response contains nested objects
    data = info.toString().replace('}', '},')
    // create an array
    let payload = `[ ${data} ]`
    res.status(200)
    res.send(payload)
  }

  execFile('docker', ['ps', '-a', '--format', '{{json .}}'], (error, stdout, stderr) => {
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

  execFile('docker', ['logs', '--tail=\"2048\"', id], { maxBuffer: 8 * 1024 * 1024 }, (error, stdout, stderr) => {
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
