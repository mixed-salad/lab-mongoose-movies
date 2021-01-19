const express = require('express');
const router = express.Router();

const Celebrity = require('./../models/celebrity');


router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/create');
});

router.get('/celebrities', (req, res, next) => {
    Celebrity
    .find()
    .then(celebrities => {
        res.render('celebrities/index', { celebrities })
    })
    .catch(error => {
        next(error);
    });
});

router.get('/celebrities/:id/edit', (req, res, next) => {
    const id = req.params.id;
    Celebrity
    .findById(id)
    .then(celebrity => {
        res.render('celebrities/edit', { celebrity });
    })
    .catch(error => {
        next(error);
    });
})

router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id;
    Celebrity
    .findById(id)
    .then(celebrity => {
        console.log (celebrity);
        res.render('celebrities/show', { celebrity })
    })
    .catch(error => {
        next(error);
    });
});



router.post('/celebrities', (req, res, next) => {
    const data = req.body;
    Celebrity
    .create({
        name: data.name,
        occupation: data.occupation,
        catchPhrase: data.catchPhrase
    })
    .then(celebrity => {
        res.redirect('/celebrities');
    })
    .catch( error => {
        next(error);
        res.render('celebrities/create');
    });

})

router.post('/celebrities/:id/delete', (req, res, next) => {
    const id = req.params.id;
    Celebrity
    .findByIdAndRemove(id)
    .then(()=> {
        res.redirect('/celebrities');
    })
    .catch(error => {
        next(error);
    })
});

router.post('/celebrities/:id', (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const update = {
        name: data.name,
        occupation: data.occupation,
        catchPhrase: data.catchPhrase
    };
    Celebrity
    .findByIdAndUpdate(id, update)
    .then(celebrity => {
        res.redirect('/celebrities');
    })
    .catch(error => {
        next(error);
    });
});

module.exports = router;
