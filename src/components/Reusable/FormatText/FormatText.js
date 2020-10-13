const replaceBold = (text) => {
	let newText = text
	const boldPattern = /\[b:/g
	const replacements = []

	while (boldPattern.test(newText) === true) {
		const lastIndex = boldPattern.lastIndex - 3
		const nextBracket = text.indexOf(']', lastIndex)
		const lengthOfText = nextBracket - lastIndex + 1
		const textToReplace = newText.substr(lastIndex, lengthOfText)
		const textToKeep = `<strong>${newText.substr(
			lastIndex + 3,
			lengthOfText - 4
		)}</strong>`

		replacements.push({
			searchValue: textToReplace,
			newValue: textToKeep,
		})
	}
	replacements.map(({ searchValue, newValue }) => {
		newText = newText.replace(searchValue, newValue)
		return
	})

	return newText
}

const replaceLinks = (text) => {
	let newText = text
	const linkPattern = /\[a:/g
	const replacements = []

	while (linkPattern.test(newText) === true) {
		const lastIndex = linkPattern.lastIndex - 3
		const nextBracket = text.indexOf(']', lastIndex)
		const lengthOfText = nextBracket - lastIndex + 1
		const textToReplace = newText.substr(lastIndex, lengthOfText)
		const textToKeep = `<a href='${newText.substr(
			lastIndex + 3,
			lengthOfText - 4
		)}'>${newText.substr(lastIndex + 3, lengthOfText - 4)}</a>`

		replacements.push({
			searchValue: textToReplace,
			newValue: textToKeep,
		})
	}
	replacements.map(({ searchValue, newValue }) => {
		newText = newText.replace(searchValue, newValue)
		return
	})

	return newText
}

const replaceMail = (text) => {
	let newText = text
	const mailPattern = /\[m:/g
	const replacements = []

	while (mailPattern.test(newText) === true) {
		const lastIndex = mailPattern.lastIndex - 3
		const nextBracket = text.indexOf(']', lastIndex)
		const lengthOfText = nextBracket - lastIndex + 1
		const textToReplace = newText.substr(lastIndex, lengthOfText)
		const textToKeep = `<a href='mailto:${newText.substr(
			lastIndex + 3,
			lengthOfText - 4
		)}'>${newText.substr(lastIndex + 3, lengthOfText - 4)}</a>`

		replacements.push({
			searchValue: textToReplace,
			newValue: textToKeep,
		})
	}
	replacements.map(({ searchValue, newValue }) => {
		newText = newText.replace(searchValue, newValue)
		return
	})

	return newText
}

const replaceHeadings = (text) => {
	let newText = text
	const headPattern = /\[h:/g
	const replacements = []

	while (headPattern.test(newText) === true) {
		const lastIndex = headPattern.lastIndex - 3
		const nextBracket = text.indexOf(']', lastIndex)
		const lengthOfText = nextBracket - lastIndex + 1
		const textToReplace = newText.substr(lastIndex, lengthOfText)
		const textToKeep = `<H3>${newText.substr(
			lastIndex + 3,
			lengthOfText - 4
		)}</H3>`

		replacements.push({
			searchValue: textToReplace,
			newValue: textToKeep,
		})
	}
	replacements.map(({ searchValue, newValue }) => {
		newText = newText.replace(searchValue, newValue)
		return
	})

	return newText
}

const replaceParagraphs = (text) => {
	let newText = text
	const paragraphPattern = /\n/g
	const replacements = '<br>'

	newText = newText.replace(paragraphPattern, replacements)

	return newText
}

export const FormatText = (text) => {
	let newText = text

	newText = replaceBold(newText)
	newText = replaceLinks(newText)
	newText = replaceHeadings(newText)
	newText = replaceMail(newText)
	newText = replaceParagraphs(newText)

	return newText
}
