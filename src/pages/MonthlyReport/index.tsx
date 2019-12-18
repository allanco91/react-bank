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
    id: number;
    account: number;
    date: string;
    credit: number;
    debit: number;
    balance: number;
}

interface MyProps {}

interface MyState {
    shouldRedirect: boolean;
    error: Error;
    Report: Report[];
}

export default class MonthlyReport extends Component<MyProps, MyState> {
    myFormRef: HTMLFormElement;
    Account: number;
    Year: number;

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
            .get(`/monthlyreport/${this.Year}/${this.Account}`)
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
                    <Header as="h1">Monthly Report</Header>
                    <Form ref={(el: any) => (this.myFormRef = el)}>
                        <Form.Field>
                            <label htmlFor="account">Account</label>
                            <input
                                type="number"
                                name="account"
                                onChange={e => {
                                    this.Account = Number(e.target.value);
                                }}
                            ></input>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="year">Year</label>
                            <input
                                type="number"
                                name="year"
                                onChange={e => {
                                    this.Year = Number(e.target.value);
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
                                ACCOUNT {this.Account} MONTHLY REPORT OF YEAR:{" "}
                                {this.Year}
                            </Header>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            Month
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Account
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Credit
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Debit
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Balance
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {Report.map(x => (
                                        <Table.Row key={x.id}>
                                            <Table.Cell>{x.date}</Table.Cell>
                                            <Table.Cell>{x.account}</Table.Cell>
                                            <Table.Cell className="positive">
                                                {x.credit}
                                            </Table.Cell>
                                            <Table.Cell className="negative">
                                                {x.debit}
                                            </Table.Cell>
                                            <Table.Cell className="warning">
                                                {x.balance}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan={4}>
                                            Balance:
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            {Report.map(x => x.balance).reduce(
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
