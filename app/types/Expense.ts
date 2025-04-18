export type Expense = {
    id: string;
    name: string;
    details: string;
    amount: number;
    calculate: 'y' | 'n';
    type: 'expense' | 'income';
};
