
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
        let html = ''
        containers.forEach(c => {
          let panel = document.querySelector(`#log-${c.id}`)
          // panel is already in the DOM
          if (!panel) {
            html += `
            <div id=log-${c.id} class="panel" tabindex="1">
              <pre class="log">No Logs</pre>
              <div class="info">id: ${c.id} name: ${c.name}</div>
            </div>
            `
          }
        })
        let node = document.querySelector('#dashboard')
        if (html) {
          node.innerHTML = html
        }

        let logs = getLogs(containers)
        return Promise.all(logs)
      })
      .then(logs => {
        logs.forEach(c => {
          if (c) {
            let node = document.querySelector(`#log-${c.id} .log`)
            let log = decodeURI(c.log)
            // don't update if text hasn't changed
            if (node.textContent !== log) {
              node.textContent = log
              node.scrollTop = node.scrollHeight
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
