import { getDataSync } from './assignments/A1GetSync.js'
import { getDataAsync } from './assignments/A2GetAsync.js'
import { getDataAjax } from './assignments/A3GetAjax.js'
import { postDataSync } from './assignments/A4PostSync.js'
import { postDataAsync } from './assignments/A5PostAsync.js'
import { postDataAjax } from './assignments/A6PostAjax.js'
import { getDataCallBack } from './assignments/B1CallBackHell.js'
import { promisDataAjax } from './assignments/B2Promises+Ajax.js'
import { asyncAwaitFetchData } from './assignments/B3AsyncAwait+Fetch.js'
import {
  testLogger,
  resetCounter,
  resetDiv,
} from './utils/utils.js'

////A1 Get Sync////
//buttons+listners
document.querySelector('#test').addEventListener('click', testLogger)
document.querySelector('#resetCounter').addEventListener('click', resetCounter)
document.querySelector('#getSync').addEventListener('click', getDataSync)
document.querySelector('#getSyncReset').addEventListener('click', resetDiv)

////A2 Get Async////
document.querySelector('#getAsync').addEventListener('click', getDataAsync)
document.querySelector('#getAsyncReset').addEventListener('click', resetDiv)

////A3 Get Ajax////
$('#getAjax').on('click', getDataAjax)
$('#getAjaxReset').on('click', resetDiv)

////A4 Post Sync////
document.querySelector('#postSync').addEventListener('click', postDataSync)
document.querySelector('#postSyncReset').addEventListener('click', resetDiv)

////A5 Post Async////
document.querySelector('#postAsync').addEventListener('click', postDataAsync)
document.querySelector('#postAsyncReset').addEventListener('click', resetDiv)

////A3 Get Ajax////
$('#postAjax').on('click', postDataAjax)
$('#postAjaxReset').on('click', resetDiv)

//////////////////////////////////////////////////////////////

////B1 Call Back Hell////
$('#callBack').on('click', getDataCallBack)
$('#callBackReset').on('click', resetDiv)

////B2 Promises + Ajax////
$('#promiseAjax').on('click', promisDataAjax)
$('#promiseAjaxReset').on('click', resetDiv)

////B3 Async Await + fetch////
$('#AsyncAwaitFetch').on('click', asyncAwaitFetchData)
$('#AsyncAwaitFetchReset').on('click', resetDiv)
