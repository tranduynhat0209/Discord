import { useDispatch } from "react-redux";
import { ready } from "../../../store/auth";

export function Ready() {
    const dispatch = useDispatch();
    return (
        <div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    //@ts-ignore
                    dispatch(ready());
                }}
            >
                Ready
            </button>
        </div>
    );
}
