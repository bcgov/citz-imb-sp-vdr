import React, { Fragment } from 'react'
import {
	Button,
	ButtonGroup,
	Paper,
	Grow,
	Popper,
	MenuItem,
	MenuList,
} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

export const DropdownButtons = ({options}) => {
	const [open, setOpen] = React.useState(false)
	const anchorRef = React.useRef(null)
	const [selectedIndex, setSelectedIndex] = React.useState(1)

	const handleClick = () => {
		console.info(`You clicked ${options[selectedIndex]}`)
	}

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index)
		setOpen(false)
	}

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen)
	}

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}

		setOpen(false)
	}

	return (
		<Fragment>
			<ButtonGroup
				variant='text'
				color='primary'
				ref={anchorRef}
				size='small'
				aria-label='split button'>
				<Button onClick={handleClick}>Assign To</Button>
				<Button
					color='primary'
					size='small'
					aria-controls={open ? 'split-button-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-label='select merge strategy'
					aria-haspopup='menu'
					onClick={handleToggle}>
					<ArrowDropDownIcon />
				</Button>
			</ButtonGroup>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom'
									? 'center top'
									: 'center bottom',
						}}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList id='split-button-menu'>
									{options.map((option, index) => (
										<MenuItem
											key={option}
											selected={index === selectedIndex}
											onClick={(event) =>
												handleMenuItemClick(
													event,
													index
												)
											}>
											{option}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</Fragment>
	)
}
