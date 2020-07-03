import {
	CreateGroup,
	GetRoleDefinitions,
	AddPermissionsToList,
	AddPermissionsToSite,
	GetAssociatedGroups,
    ChangeGroupOwner,
    UpdateListItem,
    DeleteGroup
} from 'citz-imb-sp-utilities'

export const ToggleProponent = (proponentListName,rowdata,callBack) =>{

    console.log(`rowdata`,rowdata)

    if (rowdata.Active) {
        //delete group
        DeleteGroup({ groupId: rowdata.GroupId })
        //update proponent list
        UpdateListItem({
            listName: proponentListName,
            items: { Id: rowdata.Id, Active: false, GroupId: 0 },
        }).then(()=>{
            callBack()
        })
    } else {
        //create group
        //apply permissions
        //update proponent list
        let group, assocGroups, roles, currentUser

        Promise.all([
            CreateGroup({ groupName: rowdata.UUID }),
            GetAssociatedGroups(),
            GetRoleDefinitions({}),
            //GetCurrentUser(),
        ]).then((response1) => {
            ;[group, assocGroups, roles] = response1
            Promise.all([
                // ChangeGroupOwner({
                //     groupId: group.Id,
                //     ownerGroupId: assocGroups.AssociatedOwnerGroup.Id,
                // }), //proponent group - need results of CreateGroup and GetAssociatedGroups
                UpdateListItem({
                    listName: proponentListName,
                    items: {
                        Id: rowdata.Id,
                        Active: true,
                        GroupId: group.Id,
                    },
                }),
                //update proponents list - need results of CreateGroup
                AddPermissionsToSite({
                    principalId: group.Id,
                    roleDefId: roles['Read'].Id,
                }), //add proponent group to see site - need results of CreateGroup
                AddPermissionsToList({
                    listName: rowdata.UUID,
                    principalId: group.Id,
                    roleDefId: roles['Contribute'].Id,
                }), //proponent library - Proponent - need results of CreateList and CreateGroup
                AddPermissionsToList({
                    listName: `${rowdata.UUID}_Questions`,
                    principalId: group.Id,
                    roleDefId: roles['Contribute'].Id,
                }), //proponent question list - Proponent - need results of CreateList and CreateGroup
            ]).then((response2) => {
                callBack()
            })
        })
    }
}