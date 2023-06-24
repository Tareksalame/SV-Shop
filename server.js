const express = require('express');
const app = express();
const bp = require('body-parser');
const db = require('mongoose');

app.use(express.static('pages'));
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
db.connect('mongodb+srv://tareqsalame:Ilovesimba11@tarek.tskgvib.mongodb.net/svshop');

const usersSchema = db.Schema({
    fullName: String,
    email: String,
    password: String
})
const usersModel = db.model('usersCollection', usersSchema);
const productsSchema = db.Schema({
    productName: String,
    productPrice: Number
});
const productsModel = db.model('productsCollection', productsSchema);
const ordersSchema = db.Schema({
    buyerName: String,
    products: Object,
    productsTotalPrice: Number
});
const ordersModel = db.model('ordersCollection',ordersSchema);

app.get('/ok',  async(req,res)=>{

    let pro = await productsModel.insertMany
    ({
    productName: 'Go Pro 8',
    productPrice: 3600
    })
console.log(pro)
res.send('ok');
})

app.get('/deleteProducts', async(req,res)=>
{
    await productsModel.deleteMany()
})

app.get('/',(req,res)=>
{
    res.sendFile(__dirname + '/pages/index.html')
})
app.get('/signup',(req,res)=>
{
    res.sendFile(__dirname + '/pages/signup.html')
})
app.get('/products',async (req,res)=>
{
    let products = await productsModel.find()
    res.json(products);
})
// app.get('/deleteall', async(req,res)=>
// {
//     await ordersModel.deleteMany({})
//     res.send('deleted')
// })

function middle(req,res,next)
{
    if(req.query.admin == 'true')
    {
        next();
    }
    else
    {
        res.send('error');
    }}
    
    app.post('/', async(req,res)=>
    {
        let email = req.body.email
        let password = req.body.password
        let result = await usersModel.findOne({
            email: email,
            password: password
        })
        res.json(result);
    })
    app.post('/home', async(req,res)=>
    {
        let fullName = req.body.fullName;
        let email = req.body.email;
        let password = req.body.password;
        
        let check = await usersModel.findOne({
            email:email
        })
        console.log(check);
        
        if(check == null)
        {
            usersModel.insertMany({
                fullName:fullName,
                email:email,
                password:password
            })
            res.sendFile(__dirname + '/pages/index.html')
        }
        else
        {
            res.sendFile(__dirname + '/pages/signup.html')
        }
    })
    app.post('/done', async(req,res)=>
    {
        let buyerName = req.body.buyerName;
        let products = req.body.products;
        let productsTotalPrice = req.body.productsTotalPrice;
        let inserting = await ordersModel.insertMany({
            buyerName: buyerName,
            products: products,
            productsTotalPrice: productsTotalPrice
        })
        res.json(inserting)
    })
    
    
    app.use(middle);
    
    app.get('/all',async(req,res)=>
    {
        let orders = await ordersModel.find()
        res.json(orders);
    })
    




app.listen(process.env.PORT || 200, () => console.log('Server running on port', process.env.PORT || 200));
