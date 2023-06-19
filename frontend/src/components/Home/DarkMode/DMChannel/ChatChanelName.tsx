import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function ChatChanelName(props: any) {
    console.log("props in chatchanelname: ", props);
    return (
        <div className="chat-chanel-name">
            <div className="header">
                <div className="title">
                    <ChevronRightIcon
                        className="right-arrow"
                        fontSize="small"
                    />
                    <div className="name">{props.nameOfChanel}</div>
                </div>
            </div>
            <div className="main"></div>
        </div>
    );
}
