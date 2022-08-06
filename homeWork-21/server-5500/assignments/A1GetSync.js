import {
  addDataToHtml,
} from '../utils/utils.js'

export function getDataSync() {
  const div = this.nextElementSibling.nextElementSibling
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:3000/stores-timeout', false)
  xhr.send()
  if (xhr.status === 200) {
    addDataToHtml(JSON.parse(xhr.response), div)
  } else {
    console.log(xhr.response)
  }
}