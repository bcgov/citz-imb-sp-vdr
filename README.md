# Virtual Document Room

A SharePoint site template that is configured to have the features needed for a Virtual Document Room (VDR), also known as a Virtual Information Control Office (VICO).

Built for SharePoint 2016 on-premise.

---

## Instructions for Deployment
**Site Collection Administrators**

1. Download *CITZ.IMB.SP.VirtualDocumentRoom.wsp* file
2. Upload file to your collection Solutions Gallery
3. Activate the solution
4. Create a Permission Level titled *Read with Add* that is a copy of the *Read* Permission Level that is also granted the permission to Add Items to lists

**Note:** if you are re-deploying or deploying a newer version, you will need to deactivate the old version prior to uploading to the Solution Gallery.  If the solution fails to activate, delete it from the gallery and re-upload it.

## Instructions for site creation
**Site Collection Administrators** or **Site Owners**

1. Navigate to the *Site Contents* of the parent site
2. Click on *new subsite*
3. Enter the Title of the site (recommend less than 50 characters)
4. Optionally, enter a description
5. Enter the Web Site Address (recommend 8 or less characters)
6. For the template, select the Custom tab and choose *CITZ IMB Virtual Document Room*
7. Choose *Use unique permissions*
8. Choose whether to use the top link bar (recommend *No*)
9. Click *Create*

it may take some time to process, do not refresh the page or navigate away.  Once the next page loads, you will be presented with the Terms of Service, you ***Must*** accept this.

10. Create new groups for Visitors (Read Access), Members (Edit Access), and Owners (Full Control).  Typically, you would only add users to the Owners group at this time. Do NOT add any Proponents or Proponent Users here
