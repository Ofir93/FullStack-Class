//test counter
let counter = 1
function testLogger() {
  const counterDisplay = document.getElementById('testCounter')
  counterDisplay.innerHTML = `Test is handled now! ${counter}`
  counter++
}

function resetCounter() {
    counter = 1
    document.getElementById('testCounter').innerHTML = ''
}

//reset div
function resetDiv() {
    this.nextElementSibling.innerHTML = ''
}

//add data to html
function addDataToHtml(data, div) {
    div.innerHTML = ''
    for (const store of data) {
      const p = document.createElement('p')
      p.innerHTML = `Store Name: <b>${store.name}</b>, ID: <b>${store.id}</b>, Departments: <b>${store.departments}</b>`
      div.appendChild(p)
    }
  }

  //new stores
  const newStores = [
    {
      "name": "Tsarhania",
      "departments": [1, 7]
    },
    {
      "name": "Sapapa",
      "departments": [2, 6]
    },
    {
      "name": "Nizzan Ha'Leitsan",
      "departments": [8]
    }
  ]

  function getDataToHTML(data, location) {
    const div = document.createElement('div')
    for (const store of data) {
      const sto = document.createElement('h2')
      sto.innerHTML = store.name
      sto.style.backgroundColor = 'green'
      const departmentArr = store.departments
      for (const department of departmentArr) {
        const dep = document.createElement('ol')
        dep.innerHTML = department.name
        dep.style.backgroundColor = 'yellow'
        const productsArr = department.products
        for (const product of productsArr) {
          const prod = document.createElement('li')
          prod.innerHTML = product.name
          prod.style.backgroundColor = 'aquamarine'
          dep.append(prod)
        }
        sto.append(dep)
      }
      div.append(sto)
    }
    location.append(div)
  }
  

  export { testLogger, resetCounter, resetDiv, addDataToHtml, newStores, getDataToHTML }