import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

interface State {
    activeItem: string;
}

export default class Navbar extends Component<{}, State> {
    state = {
        activeItem: ""
    };

    handleItemClick = (e: any, { name }: { name: string }) =>
        this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <>
                <Menu>
                    <Menu.Item
                        as={Link}
                        to="/"
                        name="home"
                        active={activeItem === "home"}
                        onClick={this.handleItemClick}
                    >
                        BankAPP
                    </Menu.Item>
                    <Menu.Item
                        as={Link}
                        to="/credit"
                        name="credit"
                        active={activeItem === "credit"}
                        onClick={this.handleItemClick}
                    >
                        Credit
                    </Menu.Item>
                    <Menu.Item
                        as={Link}
                        to="/debit"
                        name="debit"
                        active={activeItem === "debit"}
                        onClick={this.handleItemClick}
                    >
                        Debit
                    </Menu.Item>
                    <Menu.Item
                        as={Link}
                        to="/accountextract"
                        name="accountextract"
                        active={activeItem === "accountextract"}
                        onClick={this.handleItemClick}
                    >
                        Account Extract
                    </Menu.Item>
                    <Menu.Item
                        as={Link}
                        to="/monthlyreport"
                        name="monthlyreport"
                        active={activeItem === "monthlyreport"}
                        onClick={this.handleItemClick}
                    >
                        Monthly Report
                    </Menu.Item>
                </Menu>
            </>
        );
    }
}
