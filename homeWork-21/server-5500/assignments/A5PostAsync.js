import {
    addDataToHtml,
    newStores
  } from '../utils/utils.js'
  
  export function postDataAsync() {
    const div = this.nextElementSibling.nextElementSibling
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:3000/stores-timeout')
    xhr.setRequestHeader('content-type', 'application/json; charset=UTF-8')
    xhr.onload = function () {
    if (xhr.status === 200) {
      addDataToHtml(JSON.parse(xhr.response), div)
    } else {
      console.log(xhr.response)
    }
    }
    xhr.send(JSON.stringify(newStores))
  }