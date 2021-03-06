instaStream = new Meteor.Stream('insta');

if (Meteor.isServer) {
  var instagram = Meteor.require('instagram').createClient('efb9c1b32fc34650825af48f11ffbf5e', 'f49965062bf443ea9e3b5e4b0fb2b0b4');
	//console.log(instagram);
  Meteor.setInterval(function () {
    instagram.tags.media('cat',function (images, error) {
      _.each(_.first(images, 4), function(media) {
        var caption = '';
        if (media.caption) {
          caption = media.caption.text
        }
        instaStream.emit('update', {caption: caption, 
          image: media.images.standard_resolution.url,
          likes: media.likes.count,
          user: media.user.username
        });
      });
    });
  }, 5000);

}
