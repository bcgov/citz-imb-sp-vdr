export const addProponentToProponentsList = async (
  proponentName,
  { proponents, UUID, group }
) => {
  const proponent = await proponents.add([
    {
      Title: proponentName,
      UUID: UUID,
      Active: true,
      GroupId: group,
    },
  ])

  return proponent
}
