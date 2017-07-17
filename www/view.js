
document.addEventListener('DOMContentLoaded', function () {
  let containers = []

  const getContainers = () => {
    return fetch('http://localhost:3000/containers')
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject(res.statusText)
        }
      })
      .then(json => {
        return json
      })
      .catch(err => {
        console.error(err)
      })
  }

  const getLogs = (containers) => {
    return containers.map(c => {
      return fetch(`http://localhost:3000/logs/${c.id}`)
        .then(res => {
          return res.json()
        })
        .then(logs => {
          return logs
        })
        .catch(err => {
          console.log(err)
        })
    })
  }

  const getInfo = () => {
    return getContainers()
      .then(containers => {
        console.log(containers)
        let e = document.querySelector('#dashboard')
        let eStatus = document.querySelector('.status')
        if (containers.length) {
          eStatus.textContent = ''
        } else {
          eStatus.textContent = 'Waiting for Containers...'
        }
        containers.forEach(c => {
          let panel = e.querySelector(`#log-${c.id}`)
          if (!panel) {
            panel = document.createElement('div')
            panel.classList.add('panel')
            panel.id = `log-${c.id}`

            let log = document.createElement('pre')
            log.classList.add('log')

            let info = document.createElement('div')
            info.classList.add('info')
            info.innerText = `id: ${c.id} status: ${c.status}`

            panel.appendChild(log)
            panel.appendChild(info)

            e.appendChild(panel)
          }
        })

        let logs = getLogs(containers)
        return Promise.all(logs)
      })
      .then(logs => {
        logs.forEach(c => {
          if (c) {
            let e = document.querySelector(`#log-${c.id} .log`)
            let log = decodeURI(c.log)
            // don't update if text hasn't changed
            if (e && e.textContent !== log) {
              e.textContent = log
              e.scrollTop = e.scrollHeight
            }
          }
        })
      })
  }

  setTimeout(function reload() {
    getInfo()
    setTimeout(reload, 2000)
  }, 0)

})
