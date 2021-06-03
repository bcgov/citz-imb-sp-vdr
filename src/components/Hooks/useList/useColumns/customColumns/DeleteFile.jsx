import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import React, { useState } from 'react'

export const DeleteFile = (props) => {
  const { deleteFile, fileName } = props
  const [openDialog, setOpenDialog] = useState(false)

  const clickHandler = () => {
    deleteFile()
    setOpenDialog(false)
  }

  return (
    <>
      <IconButton
        color={'primary'}
        onClick={() => {
          setOpenDialog(true)
        }}>
        <DeleteOutlineIcon />
      </IconButton>
      <Dialog
        onClose={() => {
          setOpenDialog(false)
        }}
        open={openDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Do you wish to delete {fileName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false)
            }}>
            Cancel
          </Button>
          <Button color='primary' onClick={clickHandler}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
