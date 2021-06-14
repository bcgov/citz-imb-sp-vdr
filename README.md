[![Lifecycle:Stable](https://img.shields.io/badge/Lifecycle-Stable-97ca00)](https://github.com/bcgov/repomountie/blob/master/doc/lifecycle-badges.md)
The project is in a reliable state and major changes are unlikely to happen.

# Virtual Document Room

A SharePoint site template that is configured to have the features needed for a Virtual Document Room (VDR), also known as a Virtual Information Control Office (VICO).

Built for SharePoint 2016 on-premise.

---

## Instructions for Deployment

**Site Collection Administrators**

1. Download _CITZ.IMB.SP.VirtualDocumentRoom.wsp_ file
2. Upload file to your collection Solutions Gallery
3. Activate the solution
4. Create a Permission Level titled _Read with Add_ that is a copy of the _Read_ Permission Level that is also granted the permission to Add Items to lists

**Note:** if you are re-deploying or deploying a newer version, you will need to deactivate the old version prior to uploading to the Solution Gallery. If the solution fails to activate, delete it from the gallery and re-upload it. Updated solutions do not affect existing sites created from previous solution versions.

## Instructions for site creation

**Site Collection Administrators** or **Site Owners**

1. Navigate to the _Site Contents_ of the parent site
2. Click on _new subsite_
3. Enter the Title of the site (recommend less than 50 characters)
4. Optionally, enter a description
5. Enter the Web Site Address (recommend 8 or less characters - no spaces, alphanumeric characters only)
6. For the template, select the Custom tab and choose _CITZ IMB Virtual Document Room_
7. Choose _Use unique permissions_
8. Choose whether to use the top link bar (recommend _No_)
9. Click _Create_

it may take some time to process, do not refresh the page or navigate away. Once the next page loads, you will be presented with the Terms of Service, you **_Must_** accept this.

10. You will be taken to the Permission Setup page.  Create new groups for Visitors (Read Access), Members (Edit Access), and Owners (Full Control). Typically, you would only add users to the Owners group at this time. **Do NOT add any Proponents or Proponent Users here.** You may use existing groups if you have already set them up.
