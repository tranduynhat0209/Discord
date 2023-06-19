import UserInfo from "./UserInfo";
import Interactions from "./Interactions";

import "./UserProfile.scss";
import { useDispatch } from "react-redux";
import { actions } from "../../../../store/ui";

export default function UserProfile() {
  const dispatch = useDispatch();
  return (
    <div
      className="user-profile"
      onClick={() => dispatch(actions.openUserProfile())}
    >
      <UserInfo />
    </div>
  );
}
