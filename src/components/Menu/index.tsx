import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => <div>
    <ul>
        <li>
            <Link to="/">BankAPP</Link>
        </li>
        <li>
            <Link to="/credit">Credit</Link>
        </li>
        <li>
            <Link to="/debit">Debit</Link>
        </li>
        <li>
            <Link to="/accountextract">Account Extract</Link>
        </li>
        <li>
            <Link to="/monthlyreport">Monthly Report</Link>
        </li>
    </ul>
</div>;

export default Menu;
