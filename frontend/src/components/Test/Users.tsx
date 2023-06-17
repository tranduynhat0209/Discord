import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Users: React.FunctionComponent = () => {
  const users = useSelector((state: AppState) => state.entities.users);
  const self = useSelector((state: AppState) => state.auth.user!);
  const [searchingText, setSearchingText] = useState<string | undefined>();
  return (
    <div>
      <div>
        <h6>Search</h6>
        <input
          type="text"
          onChange={(e) => {
            setSearchingText(e.target.value);
          }}
        />
      </div>

      <div>
        {users &&
          users
            .filter(
              (u) =>
                searchingText &&
                searchingText.length > 0 &&
                u.username
                  .toLowerCase()
                  .includes(searchingText.toLowerCase()) &&
                u.id !== self.id
            )
            .map((user) => (
              <NavLink to={"/dm/" + user.id}>
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                  src={`${process.env.REACT_APP_CDN_URL}${user.avatarURL}`}
                />
                <h6>{user.username}</h6>
              </NavLink>
            ))}
      </div>
    </div>
  );
};
