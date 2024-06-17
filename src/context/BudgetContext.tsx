import { useReducer,  createContext, ReactNode, useMemo } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

interface BugetContextProps{
    state: BudgetState,
    dispatch: React.Dispatch<BudgetActions>,
    totalExpenses: number,
    remainingBudget: number
}

interface BudgerProviderProps{
    children: ReactNode
}

export const BudgetContext =  createContext<BugetContextProps>(null!)

export const BudgetProvdider = ({children}: BudgerProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(()=> state.expenses.reduce((total, expense)=> expense.amount + total, 0) , [state.expenses])

    const remainingBudget = state.budget - totalExpenses

    return(
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}