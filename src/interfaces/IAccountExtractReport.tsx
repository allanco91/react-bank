interface IAccountExtractReport {
    id: string;
    account: number;
    value: number;
    isDebit: boolean;
    date: string;
}

export default IAccountExtractReport;
