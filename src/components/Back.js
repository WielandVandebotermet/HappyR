
import { Link, useNavigate} from "react-router-dom";

function Back() {
    const navigate = useNavigate();

    return (
        <div class="flex justify-center">
            <Link onClick={() => navigate(-1)} class="w-1/2">
              <button type="button" class="py-3.5 my-7 mx-3 w-full font-medium text-white bg-[#170699] hover:text-[#AB1AAB] hover:underline rounded-lg text-center">Back</button>
            </Link>
        </div>
    );
  }
  export default Back;