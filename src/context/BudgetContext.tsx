import { useReducer,  createContext, ReactNode } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

interface BugetContextProps{
    state: BudgetState,
    dispatch: React.Dispatch<BudgetActions>
}

interface BudgerProviderProps{
    children: ReactNode
}

export const BudgetContext =  createContext<BugetContextProps>(null!)

export const BudgetProvdider = ({children}: BudgerProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    return(
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}