angular.module('ui.uploader', [])
.service('uploader', ['$rootScope', function ($rootScope) {
	var _uploader = {}
	var _files = []
	var _autoUpload = false
	var _handlers = {}
	var _enabled = true
	
	this.getFiles = function(){
		return _files;
	}

	this.clearFiles = function  () {
		_files.length = 0
	}

	this.get = function () {
		return _uploader
	}	

	this.set = function (uploader) {
		_uploader = uploader
		_uploader.init()
		this.refresh()
	}

	this.refresh = function () {
		_uploader.refresh()
	}

	this.start = function () {
		start()
	}

	this.bind = function (name , fn) {
		_uploader.bind(name, fn)
	}

	this.setHandler = function (name, fn) {
		_handlers[name] = _handlers[name] || []
		_handlers[name].push(fn)
	}

	this.enable = function (flag) {
		_enabled = flag == 'true'
	} 

	function enabled() {
		return _enabled
	}

	function handle(name){
		var args = Array.prototype.slice.call(arguments, 1);
		$rootScope.$apply(function () {
			if(_handlers[name]){
				$.each(_handlers[name], function (i, v) {
					v.apply(this, args)		
				})	
			}
		})
	}

	function start () {
		_uploader.start();	
	}

	function error(up, err) {
		// console.log(err)
		alert(err.message)
	}

	function filesAdded (up, files) {
		if(!enabled()) {
			for (var i = 0; i < files.length; i++){
				up.removeFile(files[i])
			}
			return
		}
		$rootScope.$apply(function () {
			for (var i = 0; i < files.length; i++){
				_files.push(files[i]);	
			}
		})

		if(_autoUpload == true){
			start()
		}
		handle('FilesAdded', up, files)
	}

	function beforeUpload (up, file) {
		handle('BeforeUpload', up, file)
	}

	function fileUploaded (up, file, data) {
		handle('FileUploaded', up, file, data)
	}

	function uploadProgress(up, file) {
		// $rootScope.$apply()
		handle('UploadProgress', up, file)
	}

	function uploadComplete(up, files) {
		handle('UploadComplete', up, files)
	}

	function filesRemoved(up, files) {
		handle('FilesRemoved', up, files)
	}

	this.init = function (uploader, autoUpload) {
		this.set(uploader)
		_autoUpload = autoUpload
		this.bind('FilesAdded', filesAdded)
		this.bind('beforeUpload', beforeUpload)
		this.bind('FileUploaded', fileUploaded)
		this.bind('UploadProgress', uploadProgress)
		this.bind('UploadComplete', uploadComplete)
		this.bind('FilesRemoved', filesRemoved)
		this.bind('Error', error)
	}

}])
.directive('pfUploader', ['uploader',function (uploader) {
	return {
		restrict: 'EA',
		replace: true,
		scope: {
			autoScroll: '@',
			options: '@',
			onItemClick: '&'
		},
		templateUrl: function (element, attrs) {			
			return attrs.templateurl;
		},
		link: function (scope, element, attrs) {
			function initUploader(options, autoUpload){
				var opts = {
					runtimes: "html5,flash,silverlight,html4",
					browse_button: "pickfiles",
					multi_selection: true,
					url: '@url',
					flash_swf_url : 'http://rawgithub.com/moxiecode/moxie/master/bin/flash/Moxie.cdn.swf'
				}
				try{
					var obj = JSON.parse(options)
					for (var attr in obj) {
						if (obj.hasOwnProperty(attr)){
							opts[attr] = obj[attr] 		
						}
					}
				}catch(err) {
					// console.log('default options')
				}
				uploader.init(new plupload.Uploader(opts), autoUpload || true);			
			}
			initUploader(attrs.options)
			attrs.$observe('enable', function () {
				uploader.enable(attrs.enable)
			})
		}
	}
}])