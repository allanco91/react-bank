import React, { Component } from "react";
import { Button, Header, Container } from "semantic-ui-react";

import Navbar from "../../components/Navbar";

import api from "../../services/api";

type Props = {};

type State = {
    message: string;
};

export default class Home extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    state: State = {
        message: "Welcome to BankAPP"
    };

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
                <Navbar />
                <Container>
                    <Header as="h1">{message}</Header>
                    {/* <Button primary onClick={this.getMessage}>
                        Teste
                    </Button>
                    <Button
                        primary
                        onClick={() => this.getMessageWithName("Allan")}
                    >
                        Teste 2
                    </Button> */}
                </Container>
            </>
        );
    }
}
