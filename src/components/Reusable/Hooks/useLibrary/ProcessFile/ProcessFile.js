export const ProcessFile = async (file) => {
	const fileReader = new FileReader()

	fileReader.readAsArrayBuffer(file)
	// fileReader.readAsDataURL(file)
	// fileReader.readAsBinaryString(file)
	// fileReader.readAsText(file)

	fileReader.onerror = errorHandler

	fileReader.onabort = () => {
		changeStatus('Start Loading')
	}

	fileReader.onloadstart = () => {
		changeStatus('Start Loading')
	}

	fileReader.onload = (event) => {
		changeStatus('Loaded')
	}

	fileReader.onprogress = setProgress

    fileReader.onloadend = async () => await loaded

}

const setProgress = (event) => {
	const loadingPercentage = (100 * event.loaded) / event.total

	changeStatus(`Loading: ${loadingPercentage} %`)
}

const changeStatus = (status) => {
}

const loaded = (event) => {
	changeStatus(`Load Ended!`)
	const fileReader = event.target
	var result = fileReader.result
	// Here we can send the result to a server for example
    return result
}

const errorHandler = (event) => {
	changeStatus(`Error: ${event.target.error.name}`)
}
