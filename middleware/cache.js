const redis = require('redis');

const client = redis.createClient({legacyMode: true});
client.connect().catch((err) => {console.log(err);});

function cache(req, res, next) {
    client.get(req.query.q, (err, data) => {
        if (err) throw err.message;
        if (data != null) {
            res.status(200).json({
                "Original Text is: ": req.query.q,
                "Translation Language is: ": req.body.target,
                "Translated Text from cached save is: ": data
            });
        } else {
            next();
        }
    });
}

module.exports = cache;