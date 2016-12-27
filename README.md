## References

+ [ramda](http://ramdajs.com/0.19.1/docs)
+ [tape](https://github.com/substack/tape)
+ [mithril](http://mithril.js.org/mithril.html)


Username: maxidr@gromit.io
Password: gromit+io

## local development

```
npm start
```

To use another port:
```
npm start -- --port 9090
```

To change the endpoint of the API type the following in the browser console
```
localStorage['gromit.serverUrl'] = 'http://localhost:8080'
```


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

GET /users/current/subscription
    + 200
    + 404 Not found - When the user not have any plan yet

POST /users/current/subscription
    body: { planId: string, paymentGateway: 'paypal' | 'custom' }
    + status 409 when already had been suspended

POST /users/current/subscription/suspend
POST /users/current/subscription/resume
POST /users/current/subscription/cancel
GET /users/current/subscription/history

### Enable local account

account: marcelo.marmol@gmail.com
```
curl http://localhost:8080/users/signUp?c=3B4C210F4CF27344F6AFB1F811BEC44FEC3067314A4C1CBC04748F15C376AA7A022CB66AAA8E738D7DADBB90D96C06B7E75DB31DC84E6B1F5E032D7E65A46C54&sa=D&sntz=1&usg=AFQjCNFcp9owZnZ0Ve0UxxpOk4iZ3K0YUw
```

