// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/ 
//Declaring constants 
const viewPath = 'visits';
const Visit = require('../models/Visit');
const User = require ('../models/User');

//Index action 
exports.index = async (req, res)=>{
  try {
    const visits = await Visit
    .find()
    .populate('user')
    .sort({updateAt: 'desc'});

    res.render(`${viewPath}/index`, {
      pageTitle: 'Visit Index',
      visits: visits
    });
  } catch (error) {
    req.flash('danger', `Sorry we encountered an Error while rendering Visit Page:${error}`);
    res.redirect('/');
  }
};

//Show action 
exports.show = async (req, res)=>{
  try {
    const visit = await Visit.findById(req.params.id)
     .populate('user');
    console.log(visit);

    res.render(`${viewPath}/show`, {
      pageTitle: visit.visitNumber,
      visit: visit
    });
  } catch (error) {
    req.flash('danger', `Sorry we encountered an Error while rendering this Visit:${error}`);
    res.redirect('/');
  }
};

//new action 
exports.new = (req, res)=>{
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Visit'
  });
};
exports.create = async (req, res)=>{
  try {
    console.log(req.session.passport);
    const { user:email} = req.session.passport;
    const user = await User.findOne({email: email});
    console.log('User', user);
    
    const visit = await Visit.create({user: user._id, ...req.body});
    req.flash('sucess', 'Visit created successfully');
    res.redirect(`/visits/${visit.id}`);
  } catch (error) {
    req.flash('danger', `Sorry we encountered an Error while creating this Visit:${error}`);
    req.session.formData = req.body;
    res.redirect('/visits/new');
  }
};

//Edit action 
exports.edit = async (req, res)=>{
  try {
    const visit = await Visit.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: visit.visitNumber,
      formData: visit
    });
  } catch (error) {
    req.flash('danger', `Sorry we encountered an Error while rendering this Visit:${error}`);
    res.redirect('/');
  }
};

//Update action 
exports.update = async (req, res)=>{
  try {
    const { user:email} = req.session.passport;
    const user = await User.findOne({email: email});

    let visit = await Visit.findById(req.body.id);
    if(!visit) throw new Error('Visit Cannot be found');
    

    const attributes = {user:user._id, ...req.body};
    await Visit.validate(attributes);
    await Visit.findByIdAndUpdate(attributes.id, attributes);

    //flash-success
    req.flash('success', 'Visit update was successfull');
    res.redirect(`/visits/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `Sorry we encountered an Error while rendering this Visit:${error}`);
    res.redirect(`/visits/${req.body.id}/edit`);
  }
};
exports.delete = async (req, res)=>{
  try {
    console.log(req.body);
    await Visit.deleteOne({_id: req.body.id});
    req.flash('success', 'the item was deleted successfully');
    res.redirect(`/visits`);
  } catch (error) {
    req.flash('danger', `Sorry we encountered an Error while deleting this Visit:${error}`);
    res.redirect(`/visits`);
  }
};
