import React, { Component, FormEvent } from "react";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { Container, Header, Form, Button } from "semantic-ui-react";

import Navbar from "../../components/Navbar";

import api from "../../services/api";

class Success {
    message: string;
    value: number;
    balance: number;
}

class Error {
    status: number;
    message: string;
}

interface MyProps {}

interface MyState {
    shouldRedirect: boolean;
    success: Success;
    error: Error;
    Account: number;
    Value: number;
    IsDebit: boolean;
    Date: string;
}

export default class Credit extends Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);

        this.state = {
            shouldRedirect: false,
            success: null,
            error: null,
            Account: 0,
            Value: 0,
            IsDebit: false,
            Date: moment().format()
        };
    }

    handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const { Account, Value, IsDebit, Date } = this.state;

        const data = {
            Account,
            Value,
            IsDebit,
            Date
        };

        await api
            .post("/credit", data)
            .then(response => {
                this.setState({
                    shouldRedirect: true,
                    success: {
                        message: response.data.message,
                        value: response.data.value,
                        balance: response.data.balance
                    }
                });
            })
            .catch(error => {
                this.setState({
                    shouldRedirect: true,
                    error: {
                        status: error.response.status,
                        message: error.response.data.error
                    }
                });
            });
    };

    render() {
        const { shouldRedirect, success, error } = this.state;

        return (
            <>
                <Navbar />
                <Container>
                    <Header as="h1">Credit</Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Account</label>
                            <input
                                type="number"
                                name="Account"
                                onChange={e =>
                                    this.setState({
                                        Account: Number(e.target.value)
                                    })
                                }
                            ></input>
                        </Form.Field>
                        <Form.Field>
                            <label>Value</label>
                            <input
                                name="Value"
                                onChange={e =>
                                    this.setState({
                                        Value: Number(e.target.value)
                                    })
                                }
                            ></input>
                        </Form.Field>
                        <Button type="submit">Create</Button>
                    </Form>
                </Container>
                {shouldRedirect && success && (
                    <Redirect
                        to={{
                            pathname: "/success",
                            state: {
                                message: success.message,
                                value: success.value,
                                balance: success.balance
                            }
                        }}
                    />
                )}

                {shouldRedirect && error && (
                    <Redirect
                        to={{
                            pathname: "/error",
                            state: {
                                status: error.status,
                                message: error.message
                            }
                        }}
                    />
                )}
            </>
        );
    }
}
