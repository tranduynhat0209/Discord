import "./ChooseInvite.scss";
import CloseIcon from "@mui/icons-material/Close";

export default function ChooseIntive() {
    return (
        <div className="main-choose-overlay">
            <div className="main-choose">
                <div className="header">
                    <h1>Please choose</h1>
                    <CloseIcon className="close-btn" />
                </div>
                <div className="main">
                    <div className="choose">
                        <div className="title">Join Guild</div>
                        <button>Join</button>
                    </div>
                    <div className="choose">
                        <div className="title">Create Guild</div>
                        <button>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
