function deleteTodo(id) {
  fetch(`http://localhost:3002/todos/` + id, {
    method: 'DELETE',
  }).then(() => {
    let parentElement = document.getElementById('mainArea')
    let element = document.getElementById(String(id))
    parentElement.removeChild(element)
    element.classList.remove('todo')

    console.log(`deleted id ${id}`)
  })
}
function getData() {
  fetch('http://localhost:3002/todos', {
    method: 'GET',
  }).then((response) => {
    // console.log(response)
    response.json().then((data) => {
      console.log(data)
      let parentElement = document.getElementById('mainArea')
      // parentElement.innerHTML = JSON.stringify(data)
      for (let i = 0; i < data.length; i++) {
        let childElement = document.createElement('div')
        childElement.id = data[i].id
        childElement.classList.add('todo')

        let grandChildElement1 = document.createElement('span')
        grandChildElement1.innerHTML = data[i].title

        let grandChildElement2 = document.createElement('span')
        grandChildElement2.innerHTML = data[i].description

        let grandChildElement3 = document.createElement('button')
        grandChildElement3.innerHTML = 'delete'
        grandChildElement3.setAttribute(
          'onclick',
          'deleteTodo(' + data[i].id + ')'
        )

        childElement.appendChild(grandChildElement1)
        childElement.appendChild(grandChildElement2)
        childElement.appendChild(grandChildElement3)

        parentElement.appendChild(childElement)
      }
    })
  })
}
getData()

const parsedResponse = (data) => {
  location.reload()
  console.log(data)
  let parentElement = document.getElementById('mainArea')
  let childElement = document.createElement('div')
  childElement.id = data.id
  // console.log(data.id)

  let grandChildElement1 = document.createElement('span')
  grandChildElement1.textContent = `Title: ${data.title}`

  let grandChildElement2 = document.createElement('span')
  grandChildElement2.innerHTML = data.description

  let grandChildElement3 = document.createElement('button')
  grandChildElement3.innerHTML = 'delete'

  childElement.appendChild(grandChildElement1)
  childElement.appendChild(grandChildElement2)
  childElement.appendChild(grandChildElement3)

  parentElement.appendChild(childElement)
}
function callback(resp) {
  console.log(resp.json())
  resp.json().then(parsedResponse)
}

function onPress() {
  let title = document.getElementById('title').value
  let description = document.getElementById('description').value
  fetch('http://localhost:3002/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      description: description,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(callback)
}
