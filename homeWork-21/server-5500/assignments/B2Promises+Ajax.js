import { getDataToHTML } from '../utils/utils.js'

export function promisDataAjax() {
  console.log('Request is sending now')
  const div = $('#promiseAjaxDiv')
  div.html('')

  const stores = []

  promisifyAjax('GET', 'http://localhost:3000/stores')
    .then(function (response) {
      const promises = []

      for (const store of response) {
        stores.push(store)
        promises.push(
          promisifyAjax(
            'POST',
            'http://localhost:3000/bulk-departments',
            store.departments
          )
        )
      }
      return Promise.allSettled(promises)
    })
    .then(function (responseArr) {
      const promises = []
      for (const i in responseArr) {
        if (responseArr[i].status === 'fulfilled') {
          const department = responseArr[i].value
          stores[i].departments = department
          for (const key in department) {
            promises.push(
              promisifyAjax(
                'POST',
                'http://localhost:3000/bulk-products',
                department[key].products
              )
            )
          }
        } else {
          console.log(responseArr[key].status)
          console.log(responseArr[key].reason)
        }
      }
      return Promise.allSettled(promises)
    })
    .then(function (responseArr) {
      let s = 0
      let i = 0
      for (const key in responseArr) {
        if (responseArr[key].status === 'fulfilled') {
          const product = responseArr[key].value
          stores[s].departments[i].products = product
          if(i == stores[s].departments.length - 1) {
            i = 0
            s++
          } else {
            i++
          }

        } else {
          console.log(responseArr[key].status)
          console.log(responseArr[key].reason)
        }
      }
      console.log(stores)
      getDataToHTML(stores, div)
    })
    .catch(function (error) {
      console.log('error')
      console.log(error)
    })
}

function promisifyAjax(type, url, data = null) {
  return new Promise(function (resolve, reject) {
    const ajaxObj = {
      type,
      url,
      success: function (data) {
        resolve(data)
      },
      error: function (error) {
        reject(error)
      },
    }

    if (type === 'POST') {
      ajaxObj.contentType = 'application/json; charset=utf-8'
      if (data) {
        ajaxObj.data = JSON.stringify(data)
      }
    }

    $.ajax(ajaxObj)
  })
}

