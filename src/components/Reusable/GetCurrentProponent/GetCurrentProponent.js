import { GetCurrentUser, GetListItems } from 'citz-imb-sp-utilities'


export const GetCurrentProponent = async () => {
    const currentUser = await GetCurrentUser({ expand: 'Groups' })
    const proponents = await GetListItems({ listName: 'Proponents' })
    for (let i = 0; i < proponents.length; i++) {
        for (let j = 0; j < currentUser.Groups.results.length; j++) {
            if (
                currentUser.Groups.results[j].Id === proponents[i].GroupId
            ) {
                return proponents[i]
            }
        }
    }
}