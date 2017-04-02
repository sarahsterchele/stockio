import {browserHistory} from 'react-router';

{/* Intrinio constants*/}
const username = "17440ee7fe0d7aeb1962fb3a18df9607";
const password = "bd8d650b82b0f07cf98d893a9fde0bb7";
var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
var url = "https://api.intrinio.com/news?identifier=";
    
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    response.json().then((body) => {
        if (body.redirect) {
            browserHistory.push(body.redirect);
        }
    });
}

function parseJSON(response) {
    if (response) { return response.json(); }
}


const Client = module.exports = {


    getUser: function(callback) {
        return fetch('/api/users/current', {
            accept: 'application/json',
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
    getPortfolios: function(callback) {
        return fetch('/api/portfolios', {
            accept: 'application/json',
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
    getStocks: function(portfolioId, callback) {
        return fetch(`/api/portfolios/${portfolioId}/stocks`, {
            accept: 'application/json',
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
    addStock: function(portfolioId, stockSymbol, callback) {
        fetch(`/api/portfolios/${portfolioId}/stocks`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify({
                symbol: stockSymbol
            })
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
    getMembers: function(portfolioId, callback) {
        return fetch(`/api/portfolios/${portfolioId}/users`, {
            accept: 'application/json',
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
// NEWS
    getNews: function(symbol, callback) {
      return fetch(url + symbol,{
        headers: {
            "Authorization": auth
        },
          accept: 'application/json',
      }).then(checkStatus)
        .then(parseJSON)
        .then(callback);
    },
    
// ACCOUNT
    logout: function(callback) {
        return fetch('/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    },
    
    currentUser: function(callback) {
        return fetch('/api/users/current', {
            credentials: 'include'
        }).then(checkStatus)
          .then(parseJSON)
          .then(callback);
    }
}

export default Client;
