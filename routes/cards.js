const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json')
// ^ same as: require('../data/flashcardData.json').data
const { cards } = data;
//^ same as data.cards

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const randomCardNumber = Math.floor(Math.random() *numberOfCards);
    res.redirect(`/cards/${randomCardNumber}`);
});




router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    if(!side){
        return res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];
    const templateData = { id,text,name };
    if(side === 'question'){
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    }
    else if(side=== 'answer'){
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }

    res.render('card', templateData);
});



module.exports = router;