import React from "react";
import { Container, Header, Divider, Message } from "semantic-ui-react";

import Navbar from "../../components/Navbar";

const Success = (props: any) => {
    const { message, value, balance } = props.location.state;

    return (
        <>
            <Navbar />
            <Container>
                <Header as="h1">Success</Header>
                <Divider />
                <Message positive>
                    <p>{message}</p>
                    <p>Value: {value}</p>
                    <p>New balance: {balance}</p>
                </Message>
            </Container>
        </>
    );
};

export default Success;
