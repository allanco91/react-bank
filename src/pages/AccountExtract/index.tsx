import React, { Component, FormEvent } from "react";
import { Redirect } from "react-router-dom";
import {
    Container,
    Header,
    Form,
    Button,
    Table,
    Divider,
    Message
} from "semantic-ui-react";

import Navbar from "../../components/Navbar";
import api from "../../services/api";

interface Error {
    status: number;
    message: string;
}

interface Report {
    id: string;
    account: number;
    value: number;
    isDebit: boolean;
    date: string;
}

interface ValidationForm {
    show: boolean;
    account: string;
}

interface Props {}

interface State {
    account: number;
    validationForm: ValidationForm;
    shouldRedirect: boolean;
    error: Error;
    Report: Report[];
}

export default class AccountExtract extends Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            account: 0,
            validationForm: {
                show: false,
                account: ""
            },
            shouldRedirect: false,
            error: null,
            Report: null
        };
    }

    handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        let formError: boolean = false;
        const { account } = this.state;

        if (account <= 0) {
            formError = true;
            this.setState({
                validationForm: {
                    show: true,
                    account: "Account number must be greater than 0"
                },
                Report: null
            });
        }

        if (formError === false) {
            await api
                .get(`/accountextract/${account}`)
                .then(response => {
                    this.setState({
                        validationForm: {
                            show: false,
                            account: ""
                        },
                        Report: response.data
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
        }
    };

    render() {
        const { validationForm, shouldRedirect, error, Report } = this.state;

        const reducer = (accumulator: number, currentValue: number) =>
            accumulator + currentValue;

        return (
            <>
                <Navbar />
                <Container>
                    <Header as="h1">Account Extract</Header>
                    <Divider />
                    {validationForm.show && (
                        <Message error>
                            <Message.Header>
                                There was some errors with your submission
                            </Message.Header>
                            <p>{validationForm.account}</p>
                        </Message>
                    )}
                    <Form>
                        <Form.Field>
                            <label htmlFor="account">Account</label>
                            <input
                                type="number"
                                name="Account"
                                placeholder="Enter an account number"
                                onChange={e => {
                                    this.setState({
                                        account: Number(e.target.value)
                                    });
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
                            <Header as="h1">ACCOUNT EXTRACT</Header>
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
