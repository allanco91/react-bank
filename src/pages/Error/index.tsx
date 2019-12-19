import React from "react";
import { Container, Header, Divider, Message } from "semantic-ui-react";

import Navbar from "../../components/Navbar";

const Error = (props: any) => {
    const { status, message } = props.location.state;

    return (
        <>
            <Navbar />
            <Container>
                <Header as="h1">Error</Header>
                <Divider />
                <Message error>
                    <p>Status: {status}</p>
                    <p>{message}</p>
                </Message>
            </Container>
        </>
    );
};

export default Error;
