
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const OAUTH_CONSUMER_KEY = process.env.OAUTH_CONSUMER_KEY;
const OAUTH_CONSUMER_SECRET = process.env.OAUTH_CONSUMER_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const TOKEN_SECRET = process.env.TOKEN_SECRET;


// let data = '{\n    "text": "asdasdasdddsdsdsd!!"\n}';






async function tweet(entry) {

  let data = `{"text":"${entry}"}`;

  console.log(data)


  function generateOAuthHeader(method, url, data) {

  
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = crypto.randomBytes(16).toString('hex');
  
    const oauthParams = {
      oauth_consumer_key: OAUTH_CONSUMER_KEY,
      oauth_nonce: nonce,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: timestamp,
      oauth_token: ACCESS_TOKEN,
      oauth_version: '1.0',
    };
  
    const paramsString = Object.keys(oauthParams)
      .sort()
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(oauthParams[key])}`)
      .join('&');
  
    const baseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(paramsString)}`;
    const signingKey = `${encodeURIComponent(OAUTH_CONSUMER_SECRET)}&${encodeURIComponent(TOKEN_SECRET)}`;
    const oauthSignature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');
  
    const authorizationHeader = `OAuth oauth_consumer_key="${encodeURIComponent(OAUTH_CONSUMER_KEY)}", oauth_nonce="${encodeURIComponent(nonce)}", oauth_signature="${encodeURIComponent(oauthSignature)}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${encodeURIComponent(timestamp)}", oauth_token="${encodeURIComponent(ACCESS_TOKEN)}", oauth_version="1.0"`;
  
    return authorizationHeader;
  }
  
  const url = 'https://api.twitter.com/2/tweets';

  // console.log("entry", entry, "data", data)
  
  let config = {
    method: 'post',
    url: url,
    headers: {
      Authorization: generateOAuthHeader('POST', url, data),
      'Content-Type': 'application/json',
    },
    data: data,
  };

  



  axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

}




module.exports = tweet