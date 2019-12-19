import React, { Component, FormEvent } from "react";
import moment from "moment";
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
import NumberFormat from "react-number-format";

// Components
import Navbar from "../../components/Navbar";

// Interfaces
import IError from "../../interfaces/IError";
import IValidationForm from "../../interfaces/IValidationForm";
import IMonthlyReport from "../../interfaces/IMonthlyReport";

// Services
import api from "../../services/api";

type Props = {};

type State = {
    account: number;
    year: number;
    validationForm: IValidationForm;
    shouldRedirect: boolean;
    error: IError;
    Report: IMonthlyReport[];
};

export default class MonthlyReport extends Component<Props, State> {
    state: State = {
        account: 0,
        year: 0,
        validationForm: {
            show: false,
            account: "",
            year: ""
        },
        shouldRedirect: false,
        error: null,
        Report: null
    };

    balance: number;

    handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        let formError: boolean = false;
        const { account, year } = this.state;

        if (account <= 0) {
            formError = true;
            this.setState(prevState => ({
                validationForm: {
                    show: true,
                    account: "Account number must be greater than 0",
                    year: prevState.validationForm.year
                },
                Report: null
            }));
        }

        if (year <= 0) {
            formError = true;
            this.setState(prevState => ({
                validationForm: {
                    show: true,
                    account: prevState.validationForm.account,
                    year: "Year is not valid"
                },
                Report: null
            }));
        }

        if (!formError) {
            await api
                .get(`/monthlyreport/${year}/${account}`)
                .then(response => {
                    this.setState({
                        validationForm: {
                            show: false,
                            account: "",
                            year: ""
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
                    <Header as="h1">Monthly Report</Header>
                    <Divider />
                    {validationForm.show && (
                        <Message error>
                            <Message.Header>
                                There was some errors with your submission
                            </Message.Header>
                            <p>{validationForm.account}</p>
                            <p>{validationForm.year}</p>
                        </Message>
                    )}
                    <Form>
                        <Form.Field>
                            <label htmlFor="account">Account</label>
                            <NumberFormat
                                inputMode="numeric"
                                format="#######"
                                placeholder="Enter an account number"
                                onChange={e => {
                                    this.setState({
                                        account: Number(e.target.value)
                                    });
                                }}
                            ></NumberFormat>
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="year">Year</label>
                            <NumberFormat
                                inputMode="numeric"
                                format="####"
                                placeholder="Enter a year"
                                onChange={e => {
                                    this.setState({
                                        year: Number(e.target.value)
                                    });
                                }}
                            ></NumberFormat>
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
                            <Header as="h1">ACCOUNT MONTHLY REPORT</Header>
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
                                            <Table.Cell>
                                                {moment(x.date).format(
                                                    "DD/MM/YYYY"
                                                )}
                                            </Table.Cell>
                                            <Table.Cell>{x.account}</Table.Cell>
                                            <Table.Cell className="positive">
                                                <NumberFormat
                                                    value={x.credit}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    prefix={"$ "}
                                                    decimalScale={2}
                                                    fixedDecimalScale
                                                ></NumberFormat>
                                            </Table.Cell>
                                            <Table.Cell className="negative">
                                                <NumberFormat
                                                    value={x.debit}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    prefix={"$ "}
                                                    decimalScale={2}
                                                    fixedDecimalScale
                                                ></NumberFormat>
                                            </Table.Cell>
                                            <Table.Cell className="warning">
                                                <NumberFormat
                                                    value={x.balance}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    prefix={"$ "}
                                                    decimalScale={2}
                                                    fixedDecimalScale
                                                ></NumberFormat>
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
                                            <NumberFormat
                                                value={
                                                    (this.balance = Report.map(
                                                        x => x.balance
                                                    ).reduce(reducer))
                                                }
                                                displayType="text"
                                                thousandSeparator={true}
                                                prefix={"$ "}
                                                decimalScale={2}
                                                fixedDecimalScale
                                            ></NumberFormat>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </>
                    )}
                </Container>
                {shouldRedirect && error && (
                    <Redirect
                        push
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
