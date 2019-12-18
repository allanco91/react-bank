import React, { Component, FormEvent } from "react";
import moment from "moment";

import Menu from "../../components/Menu";

import api from "../../services/api";

interface MyProps {}

interface MyState {
    Account: number;
    Value: number;
    IsDebit: boolean;
    Date: string;
}

export default class Credit extends Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);

        this.state = {
            Account: 0,
            Value: 0,
            IsDebit: false,
            Date: moment().format()
        };
    }

    handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await api
            .post("/credit", this.state)
            .then(response => {
                console.log("Status: " + response.status);
                console.log("Message: " + response.data.message);
                console.log("Value: " + response.data.value);
                console.log("Balance: " + response.data.balance);
            })
            .catch(error => {
                console.log("Status: " + error.response.status);
                console.log("Erro: " + error.response.data.error);
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <Menu />
                <h1>Credit</h1>
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
            </div>
        );
    }
}
