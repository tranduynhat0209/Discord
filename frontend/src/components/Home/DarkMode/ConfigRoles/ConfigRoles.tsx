import "./ConfigRoles.scss";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ConfigRoles = () => {
    return (
        <div className="roles-container">
            <nav className="side-bar">
                <div className="header">
                    <h1>May chu cua abc</h1>
                </div>
            </nav>
            <div className="main-roles">
                <div className="header">
                    <div className="title">
                        <h1>Vai tro</h1>
                        <p>
                            Su dung vai tro de phan nhom cac thanh vien may chu
                            va chi dinh quyen cua ho
                        </p>
                    </div>
                    <div className="close-roles-btn">
                        <HighlightOffIcon />
                        <span>esc</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigRoles;
