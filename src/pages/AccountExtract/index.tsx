import React, { Component, FormEvent } from "react";
import { Redirect } from "react-router-dom";

import Menu from "../../components/Menu";
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
                <div>
                    <Menu />
                    <h1>Account Extract</h1>
                    <form ref={el => (this.myFormRef = el)}>
                        <label htmlFor="account">Account:</label>
                        <input
                            type="number"
                            name="Account"
                            onChange={e => {
                                this.Account = Number(e.target.value);
                            }}
                        ></input>

                        <button
                            type="submit"
                            onClick={e => this.handleSubmit(e)}
                        >
                            Show
                        </button>
                    </form>
                </div>
                {Report !== null && (
                    <div>
                        <div>
                            <h4>Extract of account number: {this.Account}</h4>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Report.map(transaction => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.date}</td>
                                            <td>{transaction.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>Balance:</td>
                                        <td>
                                            {Report.map(x => x.value).reduce(
                                                reducer
                                            )}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
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
