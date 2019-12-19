import React, { Component, FormEvent } from "react";
import moment from "moment";
import { Redirect } from "react-router-dom";
import {
    Container,
    Header,
    Form,
    Button,
    Divider,
    Message
} from "semantic-ui-react";
import NumberFormat from "react-number-format";

// Components
import Navbar from "../../components/Navbar";

// Interfaces
import ISuccess from "../../interfaces/ISuccess";
import IError from "../../interfaces/IError";
import IValidationForm from "../../interfaces/IValidationForm";

// Services
import api from "../../services/api";

type Props = {};

type State = {
    validationForm: IValidationForm;
    shouldRedirect: boolean;
    success: ISuccess;
    error: IError;
    Account: number;
    Value: number;
    IsDebit: boolean;
    Date: string;
};

export default class Debit extends Component<Props, State> {
    state: State = {
        validationForm: {
            show: false,
            account: "",
            value: ""
        },
        shouldRedirect: false,
        success: null,
        error: null,
        Account: 0,
        Value: 0,
        IsDebit: true,
        Date: moment().format()
    };

    formIsValid = () => {
        const { Account, Value } = this.state;

        const checkAccount = Account > 0;
        const checkValue = Value > 0;

        this.setState({
            validationForm: {
                show: !checkAccount || !checkValue,
                account: !checkAccount
                    ? "Account number must be greater than 0"
                    : "",
                value: !checkValue ? "Value must be greater than 0" : ""
            }
        });

        return checkAccount && checkValue;
    };

    handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const { Account, Value, IsDebit, Date } = this.state;

        const data = {
            Account,
            Value,
            IsDebit,
            Date
        };

        if (this.formIsValid()) {
            await api
                .post("/debit", data)
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
        }
    };

    render() {
        const { validationForm, shouldRedirect, success, error } = this.state;

        return (
            <>
                <Navbar />
                <Container>
                    <Header as="h1">Debit</Header>
                    <Divider />
                    {validationForm.show && (
                        <Message error>
                            <Message.Header>
                                There was some errors with your submission
                            </Message.Header>
                            <p>{validationForm.account}</p>
                            <p>{validationForm.value}</p>
                        </Message>
                    )}
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Account</label>
                            <NumberFormat
                                format="#######"
                                placeholder="Enter an account number"
                                onChange={e => {
                                    this.setState({
                                        Account: Number(e.target.value)
                                    });
                                }}
                            ></NumberFormat>
                        </Form.Field>
                        <Form.Field>
                            <label>Value</label>
                            <NumberFormat
                                decimalScale={2}
                                placeholder="Enter a value"
                                onChange={e =>
                                    this.setState({
                                        Value: Number(e.target.value)
                                    })
                                }
                            ></NumberFormat>
                        </Form.Field>
                        <Button type="submit">Create</Button>
                    </Form>
                </Container>
                {shouldRedirect && success && (
                    <Redirect
                        push
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
