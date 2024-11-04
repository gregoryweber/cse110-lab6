import { Response, Request } from 'express';
import { budget } from '../constants';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    const { amount } = body;
    budget.amount = amount;
    res.status(200).send({ "data": budget.amount });
}
