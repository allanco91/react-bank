import React from "react";
import { Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

const Navbar = () => {
    return (
        <Menu fixed="top" inverted>
            <Container style={{ marginTop: 0 }}>
                <Menu.Item as={Link} to="/" name="home">
                    BankAPP
                </Menu.Item>
                <Menu.Item as={Link} to="/credit" name="credit">
                    Credit
                </Menu.Item>
                <Menu.Item as={Link} to="/debit" name="debit">
                    Debit
                </Menu.Item>
                <Menu.Item as={Link} to="/accountextract" name="accountextract">
                    Account Extract
                </Menu.Item>
                <Menu.Item as={Link} to="/monthlyreport" name="monthlyreport">
                    Monthly Report
                </Menu.Item>
            </Container>
        </Menu>
    );
};

export default Navbar;
