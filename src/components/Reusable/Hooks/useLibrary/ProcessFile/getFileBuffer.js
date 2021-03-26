import $ from 'jquery'

// Get the local file as an array buffer.
export function getFileBuffer(fileInput) {
	var deferred = $.Deferred()
	var reader = new FileReader()
	reader.onloadend = function (e) {
		deferred.resolve(e.target.result)
	}
	reader.onerror = function (e) {
		deferred.reject(e.target.error)
	}
	reader.readAsArrayBuffer(fileInput)
	return deferred.promise()
}
