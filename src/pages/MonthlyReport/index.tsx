import React, { Component } from "react";

import Menu from "../../components/Menu";
import api from "../../services/api";

interface MyProps {}

interface MyState {
    report: [];
}

export default class MonthlyReport extends Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);

        this.state = {
            report: []
        };
    }

    render() {
        return (
            <>
                <div>
                    <Menu />
                    <h1>Monthly Report</h1>
                    <form>
                        <label htmlFor="account">Account:</label>
                        <input id="account" name="account"></input>
                        <label htmlFor="year">Year:</label>
                        <input id="year" name="year"></input>

                        <button type="submit">Show</button>
                    </form>
                </div>
                <div>
                    <div>
                        <h4>
                            Account @ViewData["account"] monthly report of year:
                            @ViewData["year"]
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
                                <tr>
                                    <td>
                                        @Html.DisplayFor(Model => item.Date)
                                    </td>
                                    <td>
                                        @Html.DisplayFor(Model => item.Account)
                                    </td>
                                    <td>
                                        @Html.DisplayFor(Model => item.Credit)
                                    </td>
                                    <td>
                                        @Html.DisplayFor(Model => item.Debit)
                                    </td>
                                    <td>
                                        @Html.DisplayFor(Model => item.Balance)
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={4}>Balance:</td>
                                    <td>
                                        @Model.Sum(obj =>
                                        obj.Balance).ToString("F2")
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}
