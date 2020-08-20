export const makeUUID = () => {
	return (
		'V' +
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.toUpperCase()
	)
}
