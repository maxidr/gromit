## References

+ [ramda](http://ramdajs.com/0.19.1/docs)
+ [tape](https://github.com/substack/tape)
+ [mithril](http://mithril.js.org/mithril.html)


Username: maxidr@gromit.io
Password: gromit+io

## Deploy

```
npm run build 
node deployer.js
```


## API

### Subscription

GET /users/plans
    Response example: [{
        "paymentGateway": "paypal",
        "paymentGatewayId": "P-13T72597FG0421030A6VJ4PI",
        "name": "Gromit Bronze",
        "description": "Gromit Bronze monthly Subscription",
        "amount": "9.99",
        "currency": "USD",
        "period": "month",
        "usageLimit": 1000000,
        "type": "bronze"
      }, ....
    ]

GET /users/current/subcription
    + 200
    + 404 Not found - When the user not have any plan yet

POST /users/current/subscription
    body: { planId: string, paymentGateway: 'paypal' | 'custom' }
    + status 409 when already had been suspended

POST /users/current/subcription/suspend
POST /users/current/subcription/resume
POST /users/current/subcription/cancel
GET /users/current/subcription/history