
export function getDataCallBack() {
  console.log('Request is sending now')
  const div = $('#callBackDiv')
  div.html('')

  $.get('http://localhost:3000/stores')
    .done(function (stores) {
      for (const i in stores) {
        const h2 = document.createElement('h2')
        h2.innerHTML = stores[i].name
        h2.style.backgroundColor = 'green'
        $.ajaxSetup({
          contentType: 'application/json; charset=UTF-8',
        })
        $.post(
          'http://localhost:3000/bulk-departments',
          JSON.stringify(stores[i].departments)
        )
          .done(function (departments) {
            stores[i].departments = departments
            for (const num in departments) {
              const ol = document.createElement('ol')
              ol.innerHTML = departments[num].name
              ol.style.backgroundColor = 'yellow'
              $.ajaxSetup({
                contentType: 'application/json; charset=UTF-8',
              })

              $.post(
                'http://localhost:3000/bulk-products',
                JSON.stringify(departments[num].products)
              )

                .done(function (products) {
                  for (const key in products) {
                    const li = document.createElement('li')
                    li.innerHTML = products[key].name
                    li.style.backgroundColor = 'aquamarine'
                    ol.appendChild(li)
                    departments[num].products[key] = products[key]
                  }
                })
                .fail(function (err) {
                  console.log(err)
                  console.log(err.status)
                })
              h2.appendChild(ol)
            }
          })
          .fail(function (err) {
            console.log(err)
            console.log(err.status)
          })
        div.append(h2)
      }
      console.log(stores)
    })
    .fail(function (err) {
      console.log(err)
      console.log(err.status)
    })
}

