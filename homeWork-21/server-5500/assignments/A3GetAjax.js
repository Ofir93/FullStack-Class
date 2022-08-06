import { addDataToHtml } from '../utils/utils.js'

export function getDataAjax() {
$.get('http://localhost:3000/stores-timeout')
    .done(function (data) {
        const div = $('#getAjaxDiv')[0]
        addDataToHtml(data, div)
    })
    .fail(function (err) {
      console.log(err)
      console.log(err.status)
    })
}
