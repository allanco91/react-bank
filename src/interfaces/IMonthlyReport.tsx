interface IMonthlyReport {
    id: number;
    account: number;
    date: string;
    credit: number;
    debit: number;
    balance: number;
}

export default IMonthlyReport;
