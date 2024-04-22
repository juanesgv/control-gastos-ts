import { formatCurrency } from "../helpers"

interface AmountDisplayProps {
    label: string,
    amount: number
}

const AmountDisplay = ({label, amount}: AmountDisplayProps) => {
    return (
        <p className="text-2xl text-blue-600 font-bold">
            {label}: {''}
            <span className="font- text-black">{formatCurrency(amount)}</span>
        </p>
    )
}

export default AmountDisplay
