import { categories } from "../data/caterories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../interfaces";
import ErrorMesage from "./ErrorMesage";
import { useBudget } from "../hooks/useBudget";

const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')
    const [previousExpense, setPreviousExpense] = useState(0)
    const {dispatch, state, remainingBudget} = useBudget()

    useEffect(() => {
      if(state.editingId){
        const  editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId)[0]
        setExpense(editingExpense)
        setPreviousExpense(editingExpense.amount)
      }
    }, [state.editingId])
    

 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value

        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(expense).includes('')){
            return setError('Todos los cambios son obligatorios')
        }

        if((expense.amount -previousExpense) > remainingBudget){
            return setError('El gasto sobrepasa el presupuesto')
        }

        if(state.editingId){
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
        }else{
            dispatch({type: 'add-expense', payload: {expense}})
        }

        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date() 
        })
        setPreviousExpense(0)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl border-b-4 py-2 border-blue-500">{state.editingId ? 'Guardar cambios' : 'Nuevo gasto'}</legend>

            {error && <ErrorMesage>{error}</ErrorMesage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Nombre del gasto
                </label>

                <input 
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Cantidad del gasto
                </label>

                <input 
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">
                    Categoría
                </label>

                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option>-- Seleccione --</option>
                    {
                        categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select> 
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Fecha del gasto
                </label>

                <DatePicker
                    className='bg-slate-100 p-2 border-0'
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId ? 'Guardar cambios' : 'Registrar gasto'}
            />
        </form>
    )
}

export default ExpenseForm
