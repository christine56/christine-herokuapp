var underscore = require('underscore'),
    method = require('./method.js');

module.exports.showIndex = function(req, res) {
    method.error(res, 'Please post', 405);
};

module.exports.filterShows = function(req, res) {
    if (!req.body || !req.body.payload) {
        method.error(res, 'Could not decode your request: Key \'payload\' is missing in JSON', 400);
        return;
    }

    var validShows = underscore.chain(req.body.payload)
        .filter(function(show) {
            return show.drm && show.episodeCount > 0;
        })
        .map(function(show) {
            return {
                image: show.image.showImage,
                slug: show.slug,
                title: show.title
            };
        })
        .value();

    res.json({response: validShows});
};