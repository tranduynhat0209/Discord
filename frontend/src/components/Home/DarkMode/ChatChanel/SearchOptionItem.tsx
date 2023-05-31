import AddIcon from "@mui/icons-material/Add";
export default function SearchOptionItem({ ...props }) {
    const item = props.item;
    return (
        <div className="search-option-item">
            <div className="text">
                <b>{item.type}: </b>
                <span>{item.option}</span>
            </div>
            <div className="icon">
                <AddIcon />
            </div>
        </div>
    );
}
