//import libraries
const express = require('express');
const bodyParser = require('body-parser');
const monk = require('monk');
const nodemailer = require('nodemailer');

//create neccessary objects
const app = express();
const router = express.Router();

//you need to update wp with your own database name
const db = monk('localhost:27017/wp');

const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })


//use objects in app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
        req.db = db;
        next();
});

//CORS middleware
app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        next();
})

app.use('/', router);


//Food
// router.post('/food/many', function (req, res) {
//         req.db.collection('food').insertMany({
//                 id: req.body.id,
//                 restaurant: req.body.restaurant,
//                 address: req.body.address,
//                 itemName: req.body.itemName,
//                 price: req.body.price,
//                 imageUrl: req.body.imageUrl,
//                 feedback: []
//         },function (err, docs) {
//                 res.json(docs)
//           })
//   })

// router.delete('/food/all', function (req, res) {
//         req.db.collection('food').drop()
//   })

router.get('/food/all', function (req, res) {
        req.db.collection('food').find({}, { 'limit': 1000000 }, function (err, docs) {
                res.json(docs)
        })
})

router.get('/food/byRestaurant/:username', function (req, res) {
        req.db.collection('food').find({ user: req.params.username }, { "limit": 1000000 }, function (err, docs) {
                if (docs.length == 0) {
                        console.log('no food')
                }
                else {
                        res.json(docs)
                }
        })
})

router.post('/food/byUser', function (req, res) {
        req.db.collection('food').insert({
                id: req.body.id,
                restaurant: req.body.restaurant,
                address: req.body.address,
                itemName: req.body.itemName,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                feedback: []
        }, function (err, docs) {
                res.json(docs)
        })
})

router.get('/get/one/:_id', function (req, res) {
        req.db.collection('food').findOne({ _id: req.params._id }, function (err, docs) {
                if (err) {
                        console.log(err)
                }
                else {
                        res.json(docs)
                }
        })
})

router.delete('/delete/one/:_id', function (req, res) {
        req.db.collection('food').remove({ _id: req.params._id }, function (err, docs) {
                if (err) {
                        console.log(err)
                }
                else {
                        res.json(docs)
                }
        })
})

router.put('/update/one', function (req, res) {
        req.db.collection('food').update({ _id: req.body._id }, {
                id: req.body.id,
                restaurant: req.body.restaurant,
                address: req.body.address,
                itemName: req.body.itemName,
                price: req.body.price,
                imageUrl: req.body.imageUrl
        }, function (err, docs) {
                res.json(docs)
        })

})

router.put('/food/feedback/:_id', function (req, res) {
        console.log(req.body)
        req.db.collection('food').update({_id: req.params._id}, {$push:{feedback: req.body.content}}, function (err, docs) {
                res.json(docs)
          })
  })

//Cart
router.post('/cart/add/:_id', function (req, res) {
        req.db.collection('food').findOne({ _id: req.body._id }, function (err, docs) {
                if (err) {
                        console.log(err)
                }
                if (docs.length == 0) {
                        console.log('no listing')
                }
                else {
                        req.db.collection('cart').insert({
                                id: docs.id,
                                restaurant: docs.restaurant,
                                address: docs.address,
                                itemName: docs.itemName,
                                price: docs.price,
                                quantity: req.body.quantity,
                                totalPrice: req.body.totalPrice,
                                customerAddress: req.body.customerAddress,
                                paymentMethod: req.body.paymentMethod,
                                deliveryTime: req.body.deliveryTime
                        }, function (err, resp) {
                                console.log(err)
                        })
                }
        })
})

//Estates

router.get('/estates', function (req, res) {
        req.db.collection('estates').find({}, { "limit": 100000000 }, function (e, docs) {
                res.json(docs);
        });
});

router.get('/estates/byUser/:username', function (req, res) {
        req.db.collection('estates').find({ user: req.params.username }, { "limit": 100000000 }, function (e, docs) {
                if (docs.length == 0) {
                        console.log(null)
                }
                else {
                        res.json(docs)
                }
        })
})

router.post('/estates/byUser', function (req, res) {
        if (req.body.user) {
                req.db.collection('estates').insert({
                        id: req.body.id,
                        title: req.body.title,
                        price: req.body.price,
                        area: req.body.area,
                        bedrooms: req.body.bedrooms,
                        floors: req.body.floors,
                        direction: req.body.direction,
                        contactInfo: req.body.contactInfo,
                        address: req.body.address,
                        postDate: req.body.postDate,
                        expiredDate: req.body.expiredDate,
                        imageUrl: req.body.imageUrl,
                        project: req.body.project,
                        user: req.body.user,
                        date: date
                }, function (e, docs) { res.json(docs) })
        }
        else { res.json("Unauthorized access") }
})

router.get('/estates/:id', function (req, res) {
        req.db.collection('estates').findOne({ _id: req.params.id }, function (e, doc) {
                res.json(doc);
        })
});

router.delete('/estates/:id', function (req, res) {
        req.db.collection('estates').remove({ _id: req.params.id }, function (e, doc) {
                res.json(doc)
        })
});


router.put('/estates/', function (req, res) {
        if (req.body.user) {
                req.db.collection('estates').update({ _id: req.body._id }, {
                        id: req.body.id,
                        title: req.body.title,
                        price: req.body.price,
                        area: req.body.area,
                        bedrooms: req.body.bedrooms,
                        floors: req.body.floors,
                        direction: req.body.direction,
                        contactInfo: req.body.contactInfo,
                        address: req.body.address,
                        postDate: req.body.postDate,
                        expiredDate: req.body.expiredDate,
                        imageUrl: req.body.imageUrl,
                        project: req.body.project,
                        user: req.body.user,
                        date: date
                });

                req.db.collection('estates').findOne({ _id: req.body._id }, function (e, doc) {
                        res.json(doc);
                })
        }
        else {
                res.json("Unauthorized access")
        }
});

//Projects

router.get('/projects', function (req, res) {
        req.db.collection('projects').find({}, { "limit": 100000000 }, function (e, docs) {
                res.json(docs)
        })
})

router.get('/projects/byUser/:userID', function (req, res) {
        req.db.collection('projects').find({ user: req.params.userID }, { "limit": 100000000 }, function (e, docs) {
                if (docs.length == 0) {
                        console.log(null)
                }
                else {
                        res.json(docs)
                }
        })
})

router.post('/projects/byUser', function (req, res) {
        if (req.body.user) {
                req.db.collection('projects').insert({
                        id: req.body.id,
                        name: req.body.name,
                        owner: req.body.owner,
                        type: req.body.type,
                        totalArea: req.body.totalArea,
                        endYear: req.body.endYear,
                        user: req.body.user
                }, function (e, docs) { res.json(docs) })
        }
        else { res.json("Unauthorized access") }
})

router.get('/projects/:id', function (req, res) {
        req.db.collection('projects').findOne({ _id: req.params.id }, function (e, doc) {
                res.json(doc);
        })
});

router.delete('/projects/:id', function (req, res) {
        req.db.collection('projects').remove({ _id: req.params.id }, function (e, doc) {
                res.json(doc)
        })
});

router.put('/projects/', function (req, res) {
        if (req.body.user) {
                req.db.collection('projects').update({ _id: req.body._id }, {
                        id: req.body.id,
                        name: req.body.name,
                        owner: req.body.owner,
                        type: req.body.type,
                        totalArea: req.body.totalArea,
                        endYear: req.body.endYear,
                        user: req.body.user
                });

                req.db.collection('projects').findOne({ _id: req.body._id }, function (e, doc) {
                        res.json(doc);
                })
        }
        else { res.json("Unauthorized access") }
});


//Login

app.post('/register', function (req, res) {
        req.db.collection('users').find({ username: req.body.username }, function (e, docs) {
                if (docs.length === 0) {
                        req.db.collection('users').insert(req.body, function (e, docs) {
                                res.json({ "registration": "successful" })
                        })
                }
                else {
                        res.json({ "registration": "failed" })
                }
        })
})

app.post('/login', function (req, res) {
        req.db.collection('users').find({ username: req.body.username, password: req.body.password }, function (err, docs) {
                if (docs.length == 0) {
                        res.json({ "authorize": "false" })
                }
                else {
                        res.json(docs)

                }
        })
})


//Filter
app.post('/estates/filter', function (req, res) {
        req.db.collection('estates').find({
                $or: [
                        { price: { $gte: req.body.minPrice, $lte: req.body.maxPrice } },
                        { area: { $gte: req.body.minArea, $lte: req.body.maxArea } },
                        { bedrooms: { $gte: req.body.minBedrooms, $lte: req.body.maxBedrooms } },
                        { floors: { $gte: req.body.minFloors, $lte: req.body.maxFloors } },
                ]
        }, function (e, docs) {
                res.json(docs)
        })
})

//Mail
app.post('/sendorder', function (req, res) {
        console.log(req.body)
        const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                        type: 'OAuth2',
                        user: 'noreply.hcmiu.lamour@gmail.com',
                        clientId: '630895124779-r8nl67nf7sksde6j0defqr43bkfs4snn.apps.googleusercontent.com',
                        clientSecret: '7P-omKP5DB00OxZuVquep4E5',
                        refreshToken: '1/QFyEqRIq4-9voMcKVL4hO3N0oDfZ7UYlG0gUhm6x3Ew',
                },
        });


        var mailOptions = {
                from: 'noreply.hcmiu.lamour@gmail.com <noreply.hcmiu.lamour@gmail.com>',
                to: req.body.email,
                subject: 'Do not reply',
                text: 'Here is your order: ' + '\n' + '\n'

                        + 'Order ID: ' + req.body.id + '\n'
                        + 'Restaurant: ' + req.body.restaurant + '\n'
                        + 'Address: ' + req.body.address + '\n'
                        + 'Your Address: ' + req.body.customerAddress + '\n'
                        + 'Contact number: ' + req.body.customerPhoneNumber + '\n'
                        + 'Quantity ordered: ' + req.body.quantity + '\n'
                        + 'Subtotal: ' + req.body.totalPrice + '\n'
                        + 'Payment Method: ' + req.body.paymentMethod + '\n'
        };
        transporter.sendMail(mailOptions).then(() => { res.json({ "Hello": "World" }) })

})


app.get('/', (req, res) => res.send(` 
<!DOCTYPE html>
<html>
  <head>
    <title>service</title>
  </head>

  <body>
    <h1>backend {ubuntu}</h1>
  </body>
</html>`
));
app.listen(3000, () => console.log('Listening on port 3000'));