const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/VisitsController');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

module.exports = router => {
  router.get('/visits', index); 
  router.get('/visits/new', auth, _new); // authenticated
  router.post('/visits', auth, create);  // authenticated
  router.post('/visits/update', auth, update);  // authenticated
  router.post('/visits/delete', auth, _delete);  // authenticated
  router.get('/visits/:id/edit', auth, edit);  // authenticated
  router.get('/visits/:id', show); 
};