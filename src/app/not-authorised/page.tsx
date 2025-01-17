import { Cross } from "lucide-react"
export default function authorisationErrorPage() {
    return <>
        <div className="h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <h2><Cross/>You're not authorised to view this section</h2>
            </div>
        </div>
    </>
}