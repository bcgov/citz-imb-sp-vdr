import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import {
  PeoplePicker,
  PrincipalType
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
//import PeoplePicker from "../../utilities/peoplePicker";
//import PeoplePicker from "../../utilities/PeoplePicker";

export default function AddUser(props) {
  const handleSave = () => {
    props.handleClose();
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Dialog open={props.open} maxWidth="md" onClose={props.handleClose}>
      <DialogTitle id="form-dialog-title">
        Add user to {props.proponentName}
      </DialogTitle>
      <DialogContent>
        <PeoplePicker
          context={this.props.context}
          titleText="People Picker"
          personSelectionLimit={3}
          groupName={"Team Site Owners"} // Leave this blank in case you want to filter from all users
          showtooltip={true}
          isRequired={true}
          disabled={true}
          selectedItems={this._getPeoplePickerItems}
          showHiddenInUI={false}
          principalTypes={[PrincipalType.User]}
          resolveDelay={1000}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
