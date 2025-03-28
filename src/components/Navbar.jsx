import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/transactions">
          Transactions
        </Button>
        <Button color="inherit" component={Link} to="/budgeting">
          Budgeting
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;