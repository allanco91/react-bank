import React, { Component, FormEvent } from "react";

import Menu from "../../components/Menu";
import api from "../../services/api";

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
    Report: Report[];
}

export default class MonthlyReport extends Component<MyProps, MyState> {
    myFormRef: HTMLFormElement;
    Account: number;
    Year: number;

    constructor(props: any) {
        super(props);

        this.state = {
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
            })
            .catch(error => console.log(error));
        console.log(this.state);
        this.reset();
    };

    render() {
        const { Report } = this.state;

        const reducer = (accumulator: number, currentValue: number) =>
            accumulator + currentValue;

        return (
            <>
                <div>
                    <Menu />
                    <h1>Monthly Report</h1>
                    <form ref={el => (this.myFormRef = el)}>
                        <label htmlFor="account">Account:</label>
                        <input
                            type="number"
                            name="account"
                            onChange={e => {
                                this.Account = Number(e.target.value);
                            }}
                        ></input>
                        <label htmlFor="year">Year:</label>
                        <input
                            type="number"
                            name="year"
                            onChange={e => {
                                this.Year = Number(e.target.value);
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
                            <h4>
                                Account {this.Account} monthly report of year:{" "}
                                {this.Year}
                            </h4>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Account</th>
                                        <th>Credit</th>
                                        <th>Debit</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Report.map(x => (
                                        <tr key={x.id}>
                                            <td>{x.date}</td>
                                            <td>{x.account}</td>
                                            <td>{x.credit}</td>
                                            <td>{x.debit}</td>
                                            <td>{x.balance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4}>Balance:</td>
                                        <td>
                                            {Report.map(x => x.balance).reduce(
                                                reducer
                                            )}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
