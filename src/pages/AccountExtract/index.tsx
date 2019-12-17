import React, { Component } from 'react';

import Menu from '../../components/Menu'
import api from '../../services/api'

type MyProps = {};
type MyState = {
    report: [],
};

export default class AccountExtract extends Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);

        this.state = {
            report: [],
        }
    }

    render() {
        return (
            <>
                <div>
                    <Menu />
                    <h1>Account Extract</h1>
                    <form>
                        <label htmlFor="account">Account:</label>
                        <input id="account" name="account"></input>

                        <button type="submit">Show</button>
                    </form>
                </div>

                <div>
                    <div>
                        <h4>Extract of account number: @ViewData["account"]</h4>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>@Html.DisplayNameFor(model => model.Date)</th>
                                    <th>@Html.DisplayNameFor(model => model.Value)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>@Html.DisplayFor(Model => item.Date)</td>
                                    <td>@Html.DisplayFor(Model => item.Value)</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Balance:</td>
                                    <td>@Model.Sum(obj => obj.Value).ToString("F2")</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}