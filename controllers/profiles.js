import { Profile } from '../models/profile.js'
import { Resort } from '../models/resort.js'


function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "Profile"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render("profiles/show", {
      title: 'Profile',
      profile,
      isSelf,
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function renderReviews(req, res){
  const profileId = req.user.profile._id

  Resort.find({})
    .populate('reviews.commenter')
    .then(resorts => {
      Profile.findById(profileId)
        .then(profile => {
          res.render('profiles/reviews', {
            profile,
            profileId, 
            resorts,
            title: 'Your Reviews'
          })
        })
        .catch(err => {
          console.log(err)
          res.redirect('/profiles')
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    })
}

function renderFavoriteResorts(req, res){
  Profile.findById(req.user.profile._id)
  .populate('favoriteResorts')
  .then(profile=> {
    res.render('profiles/favoriteResorts', {
      resorts: profile.favoriteResorts,
      profile,
      title: 'Your Favorite Resorts'
    })
  })
      .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    });
}


export {
  index,
  show,
  renderReviews,
  renderFavoriteResorts,
}