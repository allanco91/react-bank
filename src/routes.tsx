import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Credit from './pages/Credit'
import Debit from './pages/Debit'
import AccountExtract from './pages/AccountExtract'
import MonthlyReport from './pages/MonthlyReport'

export default function Routes() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/credit" exact component={Credit} />
                <Route path="/debit" exact component={Debit} />
                <Route path="/accountextract" exact component={AccountExtract} />
                <Route path="/monthlyreport" exact component={MonthlyReport} />
            </Switch>
        </HashRouter>
    );
}