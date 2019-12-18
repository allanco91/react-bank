import React, { Component, FormEvent } from "react";
import { Redirect } from "react-router-dom";
import {
    Container,
    Header,
    Form,
    Button,
    Table,
    Divider
} from "semantic-ui-react";

import Navbar from "../../components/Navbar";
import api from "../../services/api";

class Error {
    status: number;
    message: string;
}

class Report {
    id: string;
    account: number;
    value: number;
    isDebit: boolean;
    date: string;
}

interface MyProps {}

interface MyState {
    shouldRedirect: boolean;
    error: Error;
    Report: Report[];
}

export default class AccountExtract extends Component<MyProps, MyState> {
    myFormRef: HTMLFormElement;
    Account: number;

    constructor(props: any) {
        super(props);

        this.state = {
            shouldRedirect: false,
            error: null,
            Report: null
        };
    }

    reset = () => {
        this.myFormRef.reset();
    };

    handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await api
            .get(`/accountextract/${this.Account}`)
            .then(response => {
                this.setState({ Report: response.data });
                this.reset();
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
        const { shouldRedirect, error, Report } = this.state;

        const reducer = (accumulator: number, currentValue: number) =>
            accumulator + currentValue;

        return (
            <>
                <Navbar />
                <Container>
                    <Header as="h1">Account Extract</Header>
                    <Form ref={(el: any) => (this.myFormRef = el)}>
                        <Form.Field>
                            <label htmlFor="account">Account</label>
                            <input
                                type="number"
                                name="Account"
                                onChange={e => {
                                    this.Account = Number(e.target.value);
                                }}
                            ></input>
                        </Form.Field>
                        <Button
                            type="submit"
                            onClick={e => this.handleSubmit(e)}
                        >
                            Show
                        </Button>
                    </Form>
                    {Report !== null && (
                        <>
                            <Header as="h1">
                                Extract of account number: {this.Account}
                            </Header>
                            <Divider />
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Date
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Value
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {Report.map(transaction => (
                                        <Table.Row
                                            key={transaction.id}
                                            className={
                                                transaction.value < 0
                                                    ? "negative"
                                                    : "positive"
                                            }
                                        >
                                            <Table.Cell>
                                                {transaction.date}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {transaction.value}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Balance:
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            {Report.map(x => x.value).reduce(
                                                reducer
                                            )}
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </>
                    )}
                </Container>
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
