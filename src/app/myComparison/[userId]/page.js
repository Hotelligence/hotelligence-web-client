import ComparisonTable from '../../../components/views/comparisonTable'
import getComparisonListByUserId from '../../../api/hotel/getComparisonListByUserId'

export default async function MyComparison({params}) {
    const comparisonList = await getComparisonListByUserId(params.userId);
    const comparedRooms = comparisonList.comparedRooms;

    return (
        <>
            <div className="flex flex-col mb-4">                
                <h2 className="text-center">So sánh phòng</h2>
            </div>
            <ComparisonTable rooms={comparedRooms}/>
        </>
    )
}