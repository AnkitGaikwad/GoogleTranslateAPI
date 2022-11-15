const fetch = require("node-fetch");
const redis = require('redis');

const client = redis.createClient({legacyMode: true});
client.connect()
    .then(() => {
        console.log("Connnection established to redis");
    })
    .catch((err) => {console.log(err);});

const translateText = (req, res) => {

  const encodedParams = new URLSearchParams();
  encodedParams.append("source", req.body.source);
  encodedParams.append("target", req.body.target);
  encodedParams.append("q", req.query.q);

  const url = "https://google-translate1.p.rapidapi.com/language/translate/v2";

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "5ce2c2b0femsh943921cfa13a6fap1a3871jsnfc945cf9d7e6",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    body: encodedParams,
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
        console.log( json.data.translations[0].translatedText );
        client.set(req.query.q, json.data.translations[0].translatedText);
        res.status(200).json({
            "Original Text is: ": req.query.q,
            "Translation Language is: ": req.body.target,
            "Translated Text is: ": json.data.translations[0].translatedText
        });
    })
    .catch((err) => console.error("error:" + err));

};

module.exports = { translateText };
