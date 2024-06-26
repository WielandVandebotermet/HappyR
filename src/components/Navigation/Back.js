import { Link, useNavigate } from "react-router-dom";

/**
 * Back component renders a button to navigate back to the previous page.
 */
function Back() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            {/* Link wraps the button to handle navigation */}
            <Link onClick={() => navigate(-1)} className="w-1/2">
                <button type="button" className="py-3.5 my-7 mx-3 w-full font-medium text-AccentRed bg-MineralGreen hover:bg-MineralGreen01 hover:underline rounded-lg text-center">Back</button>
            </Link>
        </div>
    );
}

export default Back;
