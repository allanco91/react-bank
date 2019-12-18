import React, { Component } from "react";

import Menu from "../../components/Menu";
import api from "../../services/api";

interface MyProps {}

interface MyState {
    message: string;
}

export default class Home extends Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);

        this.state = {
            message: "Welcome to BankAPP"
        };
    }

    getMessage = async () => {
        const { data } = await api.get("/hello");
        this.setState(data);
    };

    getMessageWithName = async (name: string) => {
        const { data } = await api.get(`/hello/${name}`);
        this.setState({ message: data });
    };

    render() {
        const { message } = this.state;

        return (
            <>
                <Menu />
                <h1>{message}</h1>
                <button onClick={this.getMessage}>Teste</button>
                <button onClick={() => this.getMessageWithName("Allan")}>
                    Teste 2
                </button>
            </>
        );
    }
}
