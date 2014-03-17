angular-uploader
================

upload panel for angular.js,  depends on plupload, it is a flexible module, could be easily customized to support different themes of upload panel.

### File Structure

	index.html
	js/uploader.js 		basic uploader module including uploader service and directive
	theme/default/  	default upload panel
		panel.css 		upload panel style 
		panel.js 		upload panel controller
		panel.html 		upload panel 

### Basic Setup

1.include dependencies

```html
<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
```

```javascript
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular.min.js"></script>
<script src="http://cdn.jsdelivr.net/plupload/2.1.1/plupload.full.min.js"></script>
```

2.include upload module
 
```javascript
<script src="js/uploader.js"></script>
```

3.include default theme

```html
<link rel="stylesheet" href="themes/default/panel.css">
```

```javascript
<script src="themes/default/panel.js"></script>
```

4.add html codes

```html
<html ng-app="demo">
  <body ng-controller="DemoCtrl">
    <button id="pickfiles">select files</button>
    <div pf-uploader 
    	data-templateurl="themes/default/panel.html"
    	data-options = "{{options}}"
    	data-enable="true">
    </div>
  </body>
</html>
```

3.add javascript codes

```javascript
var demo = angular.module('demo', ['ui.uploader'])
demo.controller('DemoCtrl', ['$scope', function($scope){
  $scope.options = {
    url : 'your backend upload url',
    browse_button: 'pickfiles'
  }
}])
```

### Handle Upload Event

handle the upload event in your controller

```javascript
demo.controller('DemoCtrl', ['$scope','uploader', function($scope, uploader){
  $scope.photos = []
  function fileUploaded(up, file, data){
		var response = $.parseJSON(data.response)
		var photo = {
			thumb: "http://hkbuys.qiniudn.com/" + response.key
		}
		$scope.photos.push(photo)
	}
	uploader.setHandler('FileUploaded', fileUploaded)
}])
```

multiple callbacks for same event is supported. 

for example:

- show the panel when files added
- get the preview when files added

```
uploader.setHandler('FilesAdded', $scope.triggerPanel)
uploader.setHandler('FilesAdded', $scope.filesPreview)
```

or for dynamic upload url, 
```
uploader.setHandler('BeforeUpload', beforeUpload)
```
then in beforeUpload function, change the up.settings.url

#### FAQ

you may need to disable $sce to make IE7 happy

```javascript
demo.config(['$sceProvider', function($sceProvider) {
	$sceProvider.enabled(false);
}]);
```


## License

Plupload license:

http://www.plupload.com/license/gplv2

http://www.plupload.com/commercial.php

The MIT License

Copyright (c) 2013 yaoyi, https://github.com/yaoyi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
