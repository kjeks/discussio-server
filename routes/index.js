var express = require('express');
var router = express.Router();
var UserDB = require('../db/User');

/* GET home page. */
var user = {
    name: "some User", topics: [
        {name: 'politics', selected: false},
        {name: 'economics', selected: true},
        {name: 'gender issues', selected: true},
        {name: 'religion', selected: false},
        {name: 'philosophy', selected: true}
    ]
};
router.get('/api/homeContent/:id', function (req, res, next) {
    res.send({text: getContent(Number(req.params.id))});
});
router.get('/api/homeMenu', function (req, res, next) {
    res.send({menuItems: menuItems})
});
router.get('/api/user/:id', function (req, res, next) {
    var requestedUser = null;
    var userObj = {name: null, id: null, topics: []};
    var selectedTopics = null;

    selectedTopics = UserDB.find('users', {id: Number(req.params.id)}, function (user) {
        requestedUser = user[0];

        userObj.name = requestedUser.name;
        return requestedUser['selected_topics'];
    });
    let allTopics = UserDB.find('topics', {}, function (topics) {
        return topics.map(function (topic) {
            return {name: topic.name, selected: selectedTopics.includes(topic.topic_id)};
        });
    });


    res.send(userObj);

});
router.post('/api/user', function (req, res, next) {
    console.log(req.body);
    user = {name: req.body.name, topics: req.body.topics};
    res.sendStatus(202);
});

function getUser(id) {
    return user;
}

function getContent(id) {
    switch (id) {
        case 1:
            return "This is the competitive mode, here you will be matched against equally skilled debators with different viewpoints";
        case 2:
            return "This is the tutor mode, here you can learn from more experienced debators or share your own knowledge";
        case 3:
            return "This is the discussion mode, here you can discuss your topic with like minded debators";
        default:
            return null
    }
}

const menuItems = [
    {
        name: "competitive",
        id: 1
    },
    {
        name: "tutor",
        id: 2
    },
    {
        name: "discussion",
        id: 3
    }
];

module.exports = router;
