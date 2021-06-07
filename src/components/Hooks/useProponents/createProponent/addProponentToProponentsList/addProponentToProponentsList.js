export const addProponentToProponentsList = async (
	proponentName,
	{proponents, UUID, group }
) => {
	await proponents.add([
		{
			Title: proponentName,
			UUID: UUID,
			Active: true,
			GroupId: group,
		},
	])
}
