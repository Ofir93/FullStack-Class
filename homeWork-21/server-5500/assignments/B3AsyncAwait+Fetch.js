import { getDataToHTML } from '../utils/utils.js'

export async function asyncAwaitFetchData() {
  console.log('Request is sending now')
  const div = $('#AsyncAwaitFetchDiv')
  div.html('')

  const storesArr = []

  try {
    const stores = await generateFetch(
        'GET',
         'http://localhost:3000/stores')
    const storesJson = await stores.json()
    const promises = []
    for (const store of storesJson) {
      storesArr.push(store)
      promises.push(
        generateFetch(
          'POST',
          'http://localhost:3000/bulk-departments',
          store.departments
        )
      )
    }
    const departments = await Promise.allSettled(promises)
    const departmentsJson = await jsonAll(departments)
    promises.splice(0, promises.length)

    for (const key in departmentsJson) {
      if (departmentsJson[key].status === 'fulfilled') {
        const department = departmentsJson[key].value
        storesArr[key].departments = department
        // console.log(department);
        for (const key in department) {
          // console.log(department[key])
          promises.push(
            generateFetch(
              'POST',
              'http://localhost:3000/bulk-products',
              department[key].products
            )
          )
        }
      } else {
        console.log(departmentsJson[key].status)
        console.log(departmentsJson[key].reason)
      }
    }
    const products = await Promise.allSettled(promises)
    const productsJson = await jsonAll(products)
    let s = 0
    let i = 0
    for (const key in productsJson) {
      if (productsJson[key].status === 'fulfilled') {
        const product = productsJson[key].value
        storesArr[s].departments[i].products = product
        if(i == storesArr[s].departments.length - 1) {
          i = 0
          s++
        } else {
          i++
        }
    } else {
        console.log(productsJson[key].status)
        console.log(productsJson[key].reason)
      }
    }
    console.log(storesArr);
    getDataToHTML(storesArr, div)

  } catch (error) {
    console.log(error)
  }
}

async function jsonAll(responses) {
  const promises = []
  for (const response of responses) {
    if (response.status === 'fulfilled') {
      promises.push(response.value.json())
    } else {
      console.error(response.status)
      console.error(response.reason)
    }
  }
  return await Promise.allSettled(promises)
}

async function generateFetch(method, url, data = null) {
  const fetchObj = {
    method,
  }

  if (method === 'POST') {
    fetchObj.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    }
    if (data) {
      fetchObj.body = JSON.stringify(data)
    }
  }

  return await fetch(url, fetchObj)
}
