import React, {useContext, useState, useRef} from "react";
import AUTH from "../../utils/AUTH";
import {RootContext} from "../../utils/RootContext";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToApp from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    color: theme.palette.secondary,
    marginLeft: "10px",
  }
}));

const StyledMenuList = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    "& .MuiMenuItem-root, & .MuiMenuItem-primary": {
      color: "white",
    },
  },
}))(MenuList);
export default function CustomizedMenus(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {authenticated, setAuthenticated, setAuthBody} = useContext(RootContext)
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleLogout = () => {
    AUTH.logout().then(response => {
      setAuthenticated(false);
      setAuthBody(null);
    })
  }
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(
    () => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    },
    [open]
  );
  return (
    <div className={classes.root}>
      <Button
        aria-controls="settings-button"
        aria-haspopup="true"
        onClick={handleToggle}
        ref={anchorRef}
        color="primary"
        variant="contained"
        endIcon={<MenuIcon color="secondary" />}
      >
        Hi {(props.user || {}).username}
      </Button>
      <Popper
        style={{ zIndex: 100 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <StyledMenuList
                  className={classes.menu}
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                      Settings <SettingsIcon  color="secondary" className={classes.menuButton}/>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                      Logout <ExitToApp color="secondary" className={classes.menuButton}/>
                  </MenuItem>
                </StyledMenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
