import React from "react";
import { Container, Header, Divider, Message } from "semantic-ui-react";
import NumberFormat from "react-number-format";

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
                    <p>
                        Value:{" "}
                        <NumberFormat
                            value={value}
                            displayType="text"
                            thousandSeparator={true}
                            prefix={"$ "}
                            decimalScale={2}
                            fixedDecimalScale
                        ></NumberFormat>
                    </p>
                    <p>
                        New balance:{" "}
                        <NumberFormat
                            value={balance}
                            displayType="text"
                            thousandSeparator={true}
                            prefix={"$ "}
                            decimalScale={2}
                            fixedDecimalScale
                        ></NumberFormat>
                    </p>
                </Message>
            </Container>
        </>
    );
};

export default Success;
