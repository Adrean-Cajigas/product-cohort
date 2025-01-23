import { PAYMENTFREQUENCY } from "../utils/types"

const paymentFrequencyBackgroundColors = {
  [PAYMENTFREQUENCY.MONTHLY]: 'bg-blue-200',
  [PAYMENTFREQUENCY.QUARTERLY]: 'bg-green-200',
  [PAYMENTFREQUENCY.ANNUALLY]: 'bg-yellow-200',
}

const paymentFrequencyTextColors = {
  [PAYMENTFREQUENCY.MONTHLY]: 'text-blue-900',
  [PAYMENTFREQUENCY.QUARTERLY]: 'text-green-900',
  [PAYMENTFREQUENCY.ANNUALLY]: 'text-yellow-900',
}

const paymentFrequencyDotColors = {
  [PAYMENTFREQUENCY.MONTHLY]: 'bg-blue-400',
  [PAYMENTFREQUENCY.QUARTERLY]: 'bg-green-400',
  [PAYMENTFREQUENCY.ANNUALLY]: 'bg-yellow-400',
}

const paymentFrequencyLabels= {
  [PAYMENTFREQUENCY.MONTHLY]: 'Monthly',
  [PAYMENTFREQUENCY.QUARTERLY]: 'Quarterly',
  [PAYMENTFREQUENCY.ANNUALLY]: 'Annually',
}

const PaymentFrequencyStatus = ({ freq }: { freq: PAYMENTFREQUENCY }) => {
  return (
    <div className={`flex items-center justify-center w-fit h-6 px-3 gap-2 rounded-lg ${paymentFrequencyBackgroundColors[freq]} ${paymentFrequencyTextColors[freq]}`}>
      <div
        className={`h-2 w-2 rounded-full ${paymentFrequencyDotColors[freq]}`}
      />
      <span className={`ml-2 ${paymentFrequencyTextColors[freq]}`}>
        {paymentFrequencyLabels[freq]}
      </span>
    </div>
  )
}
export default PaymentFrequencyStatus;
