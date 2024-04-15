import { useOutletContext } from "react-router-dom"
import Run from "./Run"


function RunList(){
    const {runs} = useOutletContext()

    const runsComponents = runs.map(run => {
        return <Run key = {run.id} run = {run} />
    })

    return(
        <ul>{runsComponents}</ul>
    )
}
export default RunList