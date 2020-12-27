const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares_fos');
const { User, Subject, Day } = require('../models');
const router = require('./page_fos');
const { route } = require('./page_fos');

// router.use((req, res, next) => {
//     res.locals.user = req.user;
//     next();
// });

router.get('/aloneStudy', isLoggedIn, async (req, res, next) => {
    try{
      const subjects = await Subject.findAll({
          where:{
              UserId: req.user.id,
          },
          order: [['createdAt', 'DESC']],
      });
      for (sub in subjects)
        console.log(sub.name);
      res.render('aloneStudy', {
          title: 'Alone - fos',
          subjects,
      });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/aloneStudy/addSubject', isLoggedIn, async (req, res, next) => {
    const name  = req.body.name;
    const id = req.user.id;
    const hostName = req.user.nick;
    try {
      const user = await User.findOne({ where: { id }});
      const exSubject = await Subject.findOne({ where: { hostName, name } });
      if (exSubject) {
        return res.redirect('/aloneStudy?error=exist');
      }
      subject = await Subject.create({
        name,
        hostName,
      });
      await user.addSubject(subject)
      return res.redirect('/aloneStudy');
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });


module.exports = router;
