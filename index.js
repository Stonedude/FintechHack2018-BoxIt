var app = require('express')();
var http = require('http').Server(app);
var request = require('request');
 
var getBearer = {
    url: 'https://developer-api.sparebank1.no/oauth/token',
    headers: {
      'User-Agent': 'request',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
    body: 'grant_type=client_credentials&client_id=266d0ef9-a639-4fbf-8dfe-b7c432fad350&client_secret=b894a535-5982-460e-bc9c-fd1c974e0233'
};

var getAccounts = token => {return {
    url: 'https://developer-api.sparebank1.no/open/personal/banking/accounts/all',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Cache-Control': 'no-cache',
    },
}};

var makeTransaction = (token, accountNumber) => {return {
    url: 'https://developer-api.sparebank1.no/personal/banking/payment/domestic/init',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({
        "fromAccountNumber": accountNumber,
        "toAccountNumber": "18000168013",
        "amount": "100.00",
        "message": "This should be optional",
        "dueDate": "2018-10-04"
        })
}};
var confirmTransaction = (token, ref) => {return {
    url: 'https://developer-api.sparebank1.no/personal/banking/payment/domestic/confirm',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({
        "signingReference": ref
    })
}};


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/next', function(req, res){
  res.sendFile(__dirname + '/next.html');
});


http.listen(8080, function(){
  console.log('listening on *:8080');
});


new Promise(res => 
request.post(getBearer, (err, response, body) => {
    var info = JSON.parse(body);
    console.log(body)
    let access_token = info.access_token;
    res(access_token);
})).then(token => new Promise(res => 
request.get(getAccounts(token), (err, response, body) => {
    let info = JSON.parse(body)
    console.log(body);
    res({token, accounts: info.accounts})
}))).then(({token, accounts}) => new Promise(res => 
request.post(makeTransaction(token, accounts[0].accountNumber.value), (err, response, body) => {
    console.log(body);
    res({token, data: JSON.parse(body)});
}))).then(({token, data}) => new Promise(res => 
request.post(confirmTransaction(token, data.signingReference), (err, response, body) => {
    console.log(body);
})))
