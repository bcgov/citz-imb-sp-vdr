export const addProponentToProponentsList = async (
	proponentName,
	{proponents, UUID, group }
) => {
	await proponents.addItem([
		{
			Title: proponentName,
			UUID: UUID,
			Active: true,
			GroupId: group,
		},
	])
}
