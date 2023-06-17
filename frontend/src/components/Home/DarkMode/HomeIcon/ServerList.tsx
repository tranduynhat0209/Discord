import Plus from "../../../../assets/image/home/Plus.png";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../store";
import { useEffect } from "react";
import fetchEntities from "../../../../store/actions/fetch-entities";
import icon from "../../../../assets/image/home/pngfind.com-discord-icon-png-1187431.png";

export default function ServerList({ hideCreateServer }) {
    const guildIds = useSelector(
        (state: AppState) => state.auth.user?.guildIds
    );
    const dispatch = useDispatch();
    const user = useSelector((state: AppState) => state.auth.user);
    useEffect(() => {
        dispatch(
            //@ts-ignore
            fetchEntities()
        );
    }, [dispatch]);
    // const { handleShowCreateServer } = useShowAddServer();
    // console.log(guildIds);
    return (
        <ul className="list-avatar">
            {guildIds &&
                guildIds.map((guildId) => (
                    <NavLink end to={`server/${guildId}`} key={guildId}>
                        <Logo
                            imgLink={
                                user?.avatarURL
                                    ? `${process.env.REACT_APP_CDN_URL}${user?.avatarURL}`
                                    : icon
                            }
                        />
                    </NavLink>
                ))}
            <li className="add-server plus cover" onClick={hideCreateServer}>
                <img src={Plus} alt="Add server" />
            </li>
        </ul>
    );
}
