angular.module('ui.uploader')
.controller('UploadCtrl', ['$scope', 'uploader', function ($scope, uploader) {
	
	$scope.expand = false
	$scope.files = uploader.getFiles()
	$scope.uploading = false
	$scope.uploadUserScroll = false;
	$scope.autoScroll = false;

	$scope.closePanel = function () {
		uploader.clearFiles()
		$('#upload-panel').animate({
			    marginBottom: "-300px"
		},"fast", function(){
		   	$scope.$apply(function () {
		      	$scope.expand = false;	
		    })
		});
	}
	$scope.triggerPanel = function () {
		$scope.uploading = true
		if($scope.autoScroll)
		{
			$("#upload-panel").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(e){
				if ( e.which > 0 || e.type === "mousedown" || e.type === "mousewheel"){
					$scope.uploadUserScroll = true	
       			}
	   		});
		}
		$('#upload-panel').animate({
			    marginBottom: "0px"
		},"fast", function(){
		   	$scope.$apply(function () {
		      	$scope.expand = true;	
		    })
		});	
		
	}

	$scope.beforeUpload = function (up, file) {
		var settings = up.settings;
		if($scope.autoScroll)
		{
			var file = data.file
			var a = $('#file-'+file.id)
			var b = $('.upload-wrapper')
			var c = $('.upload-container')
			if(c.scrollTop() + c.height() == b.outerHeight())
			{
				$scope.uploadUserScroll = false	
			}
			if(!$scope.uploadUserScroll){
				c.animate({scrollTop:a.offset().top - b.offset().top}, 'slow')
			}
		}
	}

	$scope.uploadComplete = function () {
		$scope.uploading = false;
		if($scope.autoScroll)
		{
			$("#upload-panel").unbind("scroll mousedown DOMMouseScroll mousewheel keyup");
			$scope.uploadUserScroll = false;
		}
	}

	$scope.filesPreview = function (up, files) {
		var start = $scope.files.length - files.length
		plupload.each(files, function(file, i) {
			var img = new o.Image();
			var index = start + i
            img.onload = function() {
                // create a thumb placeholder
                var el = document.createElement('span');
				el.id = this.uid;
                $('#upload-panel .upload-preview').eq(index).append(el);
                
                // uploader.updateDimension(index, this.width, this.height)
                // embed the actual thumbnail
                this.embed(el.id, {
                    width: 25,
                    height: 25,
                    crop: true
                });
            };
            img.load(file.getSource());
		});
	}


	uploader.setHandler('FilesAdded', $scope.triggerPanel)
	uploader.setHandler('FilesAdded', $scope.filesPreview)
	uploader.setHandler('BeforeUpload', $scope.beforeUpload)
	uploader.setHandler('UploadComplete', $scope.uploadComplete)

	$('.minimize').on('click',function () {
	    if($scope.expand){
	      $('#upload-panel').animate({
	        marginBottom: "-270px"
	      },"fast", function(){
	        $scope.$apply(function () {
	        	$scope.expand = false;	
	        })
	      });
	    }else{
	      $('#upload-panel').animate({
	        marginBottom: "0px"
	      },"fast", function(){
	        $scope.$apply(function () {
	        	$scope.expand = true;	
	        })
	      });
	    }

	});
}])