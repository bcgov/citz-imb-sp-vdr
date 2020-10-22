import { GetListItems, GetGroupMembers} from 'citz-imb-sp-utilities'

export const GetAllProponentUsers = async () => {
    let users = []

    const proponents = await GetListItems({ listName: 'Proponents' })


    for(let i=0;i<proponents.length;i++)
    {
        const members = await GetGroupMembers({groupId:proponents[i].GroupId })
        users = users.concat(members)
    }

    return users
}
