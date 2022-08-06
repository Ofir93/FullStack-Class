const express = require('express')
const cors = require('cors')
const fs = require('fs').promises

const app = express()
app.use(cors())
app.use(express.json())

app.get('/stores', async function (req, res) {
  try {
    const stores = await fs.readFile('./db/stores.json')
    const response = JSON.parse(stores)
    console.log('stores')
    console.log(response)
    res.json(response)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

app.post('/bulk-departments', async function (req, res) {
  try {
    const departmentsFilter = req.body
    const departments = JSON.parse(await fs.readFile('./db/departments.json'))
    const response = departments.filter((department) => departmentsFilter.includes(department.id))
    console.log('bulk-departments')
    console.log(response)
    res.json(response)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

app.post('/bulk-products', async function (req, res) {
  try {
    const productsFilter = req.body
    const products = JSON.parse(await fs.readFile('./db/products.json'))
    const response = products.filter((product) => productsFilter.includes(product.id))
    console.log('bulk-products')
    console.log(response)
    res.json(response)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})


app.get('/stores-timeout', async function (req, res) {
  // return res.status(500).send()
  try {
    console.log('arrived')
    const stores = await fs.readFile('./db/stores.json')
    setTimeout(function () {
      console.log('callback invoked')
      res.json(JSON.parse(stores))
    }, 5000)
    console.log('after subscription to setTimeout')
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

app.post('/stores-timeout', async function (req, res) {
  // return res.status(400).send()
  try {
    console.log('arrived')
    const newStores = req.body
    const stores = JSON.parse(await fs.readFile('./db/stores.json'))
    console.log(stores)
    for (const newStore of newStores) {
      const store = { id: stores.length + 1, ...newStore }
      stores.push(store)
    }
    //comment it to avoid live server be refreshed
    // await fs.writeFile('./db/stores.json', JSON.stringify(stores), 'utf8')
    setTimeout(function () {
      console.log('callback invoked')
      console.log(stores)
      res.json(stores)
    }, 5000)
    console.log('after subscription to setTimeout')
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})
