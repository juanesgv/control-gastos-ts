import { formatDate } from "../helpers"
import { Expense } from "../interfaces"
import AmountDisplay from "./AmountDisplay"

interface ExpenseDetailProps {
    expense: Expense
}

const ExpenseDetail = ({expense}: ExpenseDetailProps) => {
    return (
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
            <div>

            </div>

            <div className="">
                <p>{expense.expenseName}</p>
                <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
            </div>

            <AmountDisplay
                amount={expense.amount}
            />
        </div>
    )
}

export default ExpenseDetail
