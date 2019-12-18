import React, { Component, FormEvent } from "react";
import moment from "moment";
import { Redirect } from "react-router-dom";

import Menu from "../../components/Menu";

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

export default class Debit extends Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);

        this.state = {
            shouldRedirect: false,
            success: null,
            error: null,
            Account: 0,
            Value: 0,
            IsDebit: true,
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
                console.log("Status: " + error.response.status);
                console.log("Erro: " + error.response.data.error);
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
            <div>
                <Menu />
                <h1>Debit</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="Account">Account:</label>
                    <input
                        type="number"
                        name="Account"
                        onChange={e =>
                            this.setState({ Account: Number(e.target.value) })
                        }
                    ></input>
                    <label htmlFor="Value">Value:</label>
                    <input
                        name="Value"
                        onChange={e =>
                            this.setState({ Value: Number(e.target.value) })
                        }
                    ></input>

                    <button type="submit">Create</button>
                </form>
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
            </div>
        );
    }
}
