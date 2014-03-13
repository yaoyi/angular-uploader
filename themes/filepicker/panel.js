angular.module('ui.uploader')
.controller('UploadCtrl', ['$scope', '$http', 'uploader', function ($scope, $http, uploader) {
	var token = "1011068676.c201563.153853df32b4436ca4cf950521db717c"
	// var token = location.href.split('#access_token=')[1]
	var params = {
		client_id: "c201563238d84bf9a576a60908b22167",
		redirect_uri: "http://www.urphoto.com/en/app/photobook/angular-uploader/angular-uploader/filepicker.html",
		response_type: "token"
	}
	$scope.photos = []
	$scope.auth = "https://instagram.com/oauth/authorize/?" + $.param(params)
	// if(token){
		$http.jsonp("https://api.instagram.com/v1/users/self/feed?access_token=" + token + "&callback=JSON_CALLBACK")
		// $http.get("https://api.instagram.com/v1/users/self/feed?access_token=" + token)
			.success(function(data){
				var feeds = data.data
				for (var i=0; i < feeds.length; i++){
					var photo = {
						title: feeds[i].caption.text,
						thumb: feeds[i].images.thumbnail.url
					}
					$scope.photos.push(photo)	
				}
				
			})
	// }
}])