
const axios = require('axios');
const crypto = require('crypto');

// let data = '{\n    "text": "asdasdasdddsdsdsd!!"\n}';


const oauth_consumer_key = "b4PYzmRd3jK2VWPewixlXL8YB";
const oauth_consumer_secret = "rVCp5mSdS5pXWoKJ1qFO5EIx5XgB9diu26BOkMRZElFAjtT90V";
const access_token = "1728663095155757056-Dl5qjLChHyuhg5dm6amrxp2dNvDYyH";
const token_secret = "kVhlkXu1wbCUe1aZjLu4z1nARK3STk2fSMR71Q4lm0XSb";





async function tweet(entry) {

  let data = `{"text":"${entry}"}`;

  console.log(data)


  function generateOAuthHeader(method, url, data) {

  
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = crypto.randomBytes(16).toString('hex');
  
    const oauthParams = {
      oauth_consumer_key: oauth_consumer_key,
      oauth_nonce: nonce,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: timestamp,
      oauth_token: access_token,
      oauth_version: '1.0',
    };
  
    const paramsString = Object.keys(oauthParams)
      .sort()
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(oauthParams[key])}`)
      .join('&');
  
    const baseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(paramsString)}`;
    const signingKey = `${encodeURIComponent(oauth_consumer_secret)}&${encodeURIComponent(token_secret)}`;
    const oauthSignature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');
  
    const authorizationHeader = `OAuth oauth_consumer_key="${encodeURIComponent(oauth_consumer_key)}", oauth_nonce="${encodeURIComponent(nonce)}", oauth_signature="${encodeURIComponent(oauthSignature)}", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${encodeURIComponent(timestamp)}", oauth_token="${encodeURIComponent(access_token)}", oauth_version="1.0"`;
  
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