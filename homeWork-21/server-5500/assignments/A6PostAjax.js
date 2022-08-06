import { addDataToHtml, newStores } from '../utils/utils.js'

export function postDataAjax() {
  $.ajaxSetup({
    contentType: 'application/json; charset=UTF-8',
  })

  $.post('http://localhost:3000/stores-timeout', JSON.stringify(newStores))
    .done(function (data) {
        const div = $('#postAjaxDiv')[0]
      addDataToHtml(data, div)
    })
    .fail(function (err) {
      console.log(err)
      console.log(err.status)
    })
}
