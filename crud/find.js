require('../connection')

const Product = require('../models/Productos')

async function main(){
    const products = await Product.find()
    console.log(products)
}

main()