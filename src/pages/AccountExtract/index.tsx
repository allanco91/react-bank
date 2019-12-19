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
import IAccountExtractReport from "../../interfaces/IAccountExtractReport";

// Services
import api from "../../services/api";

type Props = {};

type State = {
    account: number;
    validationForm: IValidationForm;
    shouldRedirect: boolean;
    error: IError;
    Report: IAccountExtractReport[];
};

export default class AccountExtract extends Component<Props, State> {
    state: State = {
        account: 0,
        validationForm: {
            show: false,
            account: ""
        },
        shouldRedirect: false,
        error: null,
        Report: null
    };

    balance: number;

    formIsValid = () => {
        const { account } = this.state;

        const checkAccount = account > 0;

        this.setState(prevState => ({
            validationForm: {
                show: !checkAccount,
                account: !checkAccount
                    ? "Account number must be greater than 0"
                    : ""
            },
            Report: !checkAccount ? null : prevState.Report
        }));

        return checkAccount;
    };

    handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const { account } = this.state;

        if (this.formIsValid()) {
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
                                                {moment(
                                                    transaction.date
                                                ).format("DD/MM/YYYY")}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <NumberFormat
                                                    value={transaction.value}
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
                                        <Table.HeaderCell>
                                            Balance:
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <NumberFormat
                                                value={
                                                    (this.balance = Report.map(
                                                        x => x.value
                                                    ).reduce(reducer, 0))
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
