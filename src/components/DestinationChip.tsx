import { DESTINATION } from "../utils/types"

const destinationBackgroundColors = {
  [DESTINATION.STRIPE]: 'bg-orange-100',
  [DESTINATION.NETSUITE]: 'bg-violet-100',
  [DESTINATION.QUICKBOOKS]: 'bg-rose-100',
}

const destinationTextColors = {
  [DESTINATION.STRIPE]: 'text-orange-800',
  [DESTINATION.NETSUITE]: 'text-violet-800',
  [DESTINATION.QUICKBOOKS]: 'text-rose-800',
}

const destinationStatusDotColors = {
  [DESTINATION.STRIPE]: 'bg-orange-400',
  [DESTINATION.NETSUITE]: 'bg-violet-400',
  [DESTINATION.QUICKBOOKS]: 'bg-rose-400',
}

const destinationLabels = {
  [DESTINATION.STRIPE]: 'Stripe',
  [DESTINATION.NETSUITE]: 'NetSuite',
  [DESTINATION.QUICKBOOKS]: 'QuickBooks',
}

const DestinationStatus = ({ destination }: { destination: DESTINATION }) => {
  return (
    <div className={`flex items-center justify-center w-fit h-6 px-3 gap-2 rounded-lg ${destinationBackgroundColors[destination]} ${destinationTextColors[destination]}`}>
      <div
        className={`h-2 w-2 rounded-full ${destinationStatusDotColors[destination]}`}
      />
      <span className={`ml-2 ${destinationTextColors[destination]}`}>
        {destinationLabels[destination]}
      </span>
    </div>
  )
}
export default DestinationStatus;
