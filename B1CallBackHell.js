import { addDataToHtml } from '../utils/utils.js'

export function getDataCallBack() {
  console.log('Request is sending now')
  const div = $('#callBackDiv')
  div.html('')

  const storesObj = {}

  $.get('http://localhost:3000/stores')
    .done(function (stores) {
      console.log('stores')
      console.log(stores)
      for (const store of stores) {
        $.ajaxSetup({
          contentType: 'application/json; charset=UTF-8',
        })
        $.post(
          'http://localhost:3000/bulk-departments',
          JSON.stringify(store.departments)
        )
          .done(function (departments) {
            console.log('departments')
            console.log(departments)
            for (const num in departments) {
              store.departments[num] = departments[num]
              $.ajaxSetup({
                contentType: 'application/json; charset=UTF-8',
              })

              $.post(
                'http://localhost:3000/bulk-products',
                JSON.stringify(departments[num].products)
              )
                .done(function (products) {
                  console.log('products')
                  console.log(products)
                  for (const key in products) {
                    departments[num].products[key] = products[key].name
                    // addStoreToHtml(store, departments, div)
                  }
                })
                .fail(function (err) {
                  console.log(err)
                  console.log(err.status)
                })
            }
          })
          .fail(function (err) {
            console.log(err)
            console.log(err.status)
          })
          console.log(store)
      }
    })
    .fail(function (err) {
      console.log(err)
      console.log(err.status)
    })
    console.log(storesObj);
}

function addStoreToHtml(store, element) {
  const 
  element.append( `<h2>${store.name}</h2>`
      `<ol>${store.departments}
        <li>trew</li>
    </ol>`  
  )
}
