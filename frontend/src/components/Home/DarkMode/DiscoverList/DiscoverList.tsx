import Servers from "./Servers";
import Backsplash from "./Backsplash";

import "./DiscoverList.scss";

function DiscoverList(props: any) {
    return (
        <div className="discover-list">
            <Backsplash
                titleSearch={props.titleSearch ? props.titleSearch : ""}
            />
            <Servers />
        </div>
    );
}

export default DiscoverList;
