import { addDataToHtml } from '../utils/utils.js'

export function getDataCallBack() {
  console.log('Request is sending now')
  const div = $('#callBackDiv')
  div.html('')
  const depart = []
  $.get('http://localhost:3000/stores')
    .done(function (stores) {
      for (const store of stores) {
        $.ajaxSetup({
          contentType: 'application/json; charset=UTF-8',
        })
        $.post(
          'http://localhost:3000/bulk-departments',
          JSON.stringify(store.departments)
        )
          .done(function (departments) {
            store.departments = departments
            for (const num in departments) {
              depart.push(departments[num].name)
              $.ajaxSetup({
                contentType: 'application/json; charset=UTF-8',
              })

              $.post(
                'http://localhost:3000/bulk-products',
                JSON.stringify(departments[num].products)
              )
            
                .done(function (products) {
                  for (const key in products) {
                    departments[num].products[key] = products[key].name
                    const dep = store.departments
                    getDataToHTML(store, div) 
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
      }
      
      console.log(stores);
      // vanillaDataToHtml(stores, div)
      // div.append(`<li>${stores.name}<li/>`)
      // getDataToHTML(stores, depart, div)
    })
    .fail(function (err) {
      console.log(err)
      console.log(err.status)
    })
  }

  let rami = false
  let IKEA = false
  let ZolStock = false

  //function getDataToHTML(data, depart, location) {
  function getDataToHTML(store, location) {
    const div = document.createElement('div')
    // const rami = document.getElementById('Rami Levi')
    // const rami = $('#Rami Levi')
    if(!rami){
      rami = true
      const h2 = document.createElement('h2')
      h2.innerHTML = store.name
      h2.id = store.name
      const departments = store.departments
      for(let i = 0; i < departments.length; i++){
        
      }
      div.appendChild(h2)
    }
      

      // const h2 = div.append(`<h2 id="${store.name}">${store.name}</h2>`)
      
    // console.log(`data`);
    // console.log(data);
    // for (let i = 0; i < data.length; i++) {
    //   const h2 = document.createElement('h2')
    //   h2.innerHTML = data[i].name
    //   console.log(depart)
    //   const departments = data[i].departments
    //   console.log(departments);
    //   for(const department of departments){
    //     const ol = document.createElement('ol')
    //     ol.innerHTML = department.name
    //     h2.append(ol)
    //   }
    //   div.append(h2)
    // }
    location.append(div)
  }