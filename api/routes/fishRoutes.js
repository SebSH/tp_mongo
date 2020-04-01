module.exports = function (app) {
    const fish = require('../controllers/fishController');
    const auth = require('../../middleware/auth');

    app.route('/fish')
        .get(fish.list_all_fishs)
        .all(auth.validateToken)
        .post(fish.create_fish);

    app.route('/fish/:id')
        .get(fish.get_fish)
        .all(auth.validateToken)
        .put(fish.update_fish)
        .delete(fish.delete_fish);
};
