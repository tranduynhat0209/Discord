import Switch from "@mui/material/Switch";
import "./Permisstion.scss";

export default function Permission({ title, description }) {
    return (
        <div className="permistion">
            <div className="permisstion-name">
                <span>{title}</span>
                <Switch />
            </div>
            <div className="permisstion-note">{description}</div>
        </div>
    );
}
