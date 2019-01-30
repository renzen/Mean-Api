import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
const router = express.Router();
var bcrypt = require('bcryptjs');


//middleware
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
    console.log('Payload subject' + payload.subject)
  }

// ADDING TO DATABASE REGISTER
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    const password = req.body.password;


    User.findOne({email: userData.email}, (err, registeredUser) => {
      if (err) return res.status(500).json({status:'Error on the server.'});

      if (registeredUser) {
        return res.status(200).json({status:'Email already exist'});
      }
      

    //user.password = bcrypt.hashSync(password, 8);
   
      user.save((error, registeredUser) => {
        if (error){
            console.log(error)
        } else {
            let payload = { subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
        console.log(password);
       // console.log(email);
    })
  })
})
// ADDING TO DATABASE REGISTER

// LOGIN POST
router.post('/login', (req, res) => { 
    let userData = req.body
   // var username = req.body.username;
    const password = req.body.password;

    User.findOne({email: userData.email}, (error, user ) => {
        
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).json({status:'Incorrect email'});
                console.log({status:'Incorrect email'})
            } else if ( user.password !== userData.password) {
                res.status(401).json({status:'Incorrect password'});
                console.log('invalid password')
            } else {
            //  bcrypt.compare(password, userData.password, function (err, result) {
                // if (result == true) {
                  let payload = { subject: user._id}
                  let token = jwt.sign(payload, 'secretKey')
                  res.status(200).send({token})
                // } else {
                //   res.status(401).send('Password not Valid')
                // }

             // })
                
                
            }
        }
    })

})

// Get All Users
router.get('/users', (req, res) => {
  //res.send('From API Route')
  User.find({}, (err, user) => {
    if (err) {
       res.send(err);
    }
     res.json(user);
  });

})

// Get User by ID
router.get('/users/:id', (req, res) => {

User.findById({ _id: req.params.id}, req.body, {new: true}, (err, user) => {
  if(err) {
    res.send(err);
  }
  res.json(user);
})

})

//
router.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })


// 
router.get('/special', verifyToken, (req, res) => {
    let specialEvents = [
        {
          "_id": "1",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(specialEvents)
})

router.get('/openweathermap', (req,res) => {
  let openweathermap = [
    {
      "message": "",
      "cod": "200",
      "city_id": 2643743,
      "calctime": 0.0875,
      "cnt": 3,
      "list": [
      {
      "main": {
      "temp": 279.946,
      "temp_min": 279.946,
      "temp_max": 279.946,
      "pressure": 1016.76,
      "sea_level": 1024.45,
      "grnd_level": 1016.76,
      "humidity": 100
      },
      "wind": {
      "speed": 4.59,
      "deg": 163.001
      },
      "clouds": {
      "all": 92
      },
      "weather": [
      {
      "id": 500,
      "main": "Rain",
      "description": "light rain",
      "icon": "10n"
      }
      ],
      "rain": {
      "3h": 2.69
      },
      "dt": 1485717216
      },
      {
      "main": {
      "temp": 282.597,
      "temp_min": 282.597,
      "temp_max": 282.597,
      "pressure": 1012.12,
      "sea_level": 1019.71,
      "grnd_level": 1012.12,
      "humidity": 98
      },
      "wind": {
      "speed": 4.04,
      "deg": 226
      },
      "clouds": {
      "all": 92
      },
      "weather": [
      {
      "id": 500,
      "main": "Rain",
      "description": "light rain",
      "icon": "10n"
      }
      ],
      "rain": {
      "3h": 0.405
      },
      "dt": 1485745061
      },
      {
      "main": {
      "temp": 279.38,
      "pressure": 1011,
      "humidity": 93,
      "temp_min": 278.15,
      "temp_max": 280.15
      },
      "wind": {
      "speed": 2.6,
      "deg": 30
      },
      "clouds": {
      "all": 90
      },
      "weather": [
      {
      "id": 701,
      "main": "Mist",
      "description": "mist",
      "icon": "50d"
      },
      {
      "id": 741,
      "main": "Fog",
      "description": "fog",
      "icon": "50d"
      }
      ],
      "dt": 1485768552
      }
      ]
      }
   ]
  res.json(openweathermap)
})


module.exports = router
