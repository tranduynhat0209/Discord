import Role from "./Role";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";

import useShowHideRoles from "./useShowHideRoles";

export default function RolesContainer() {
    const { handleHideRole } = useShowHideRoles();
    return (
        <div className="main-role-container">
            <div className="main-roles">
                <div className="header">
                    <div className="title">
                        <h1>Vai tro</h1>
                        <p>
                            Su dung vai tro de phan nhom cac thanh vien may chu
                            va chi dinh quyen cua ho
                        </p>
                    </div>
                    <div className="close-btn-container">
                        <div
                            className="close-roles-btn"
                            onClick={handleHideRole}
                        >
                            <HighlightOffIcon className="button" />
                            <span>esc</span>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="default-role">
                        <div className="icon">
                            <PeopleAltIcon />
                        </div>
                        <div className="description">
                            <h1>Quyen mac dinh</h1>
                            <p>
                                @everyone • ap dung cho tat cac cac thanh vien
                                may chu
                            </p>
                        </div>
                        <div className="right-arrow">
                            <ChevronRightIcon />
                        </div>
                    </div>
                    <div className="search-role-container">
                        <div className="search-role">
                            <input
                                type="text"
                                placeholder="Tim kiem cac vai tro"
                            />
                            <SearchIcon className="search-icon" />
                        </div>
                        <div className="add-role">
                            <button className="add-role-button">
                                Tao vai tro
                            </button>
                        </div>
                    </div>
                    <div className="text-role">
                        Cac thanh vien su dung mau cua vai tro cao nhat trong
                        danh sach.Keo tha vai tro de sap xep lai.{" "}
                        <a href="/">Can ho tro voi quyen?</a>
                    </div>
                    <Role />
                </div>
            </div>
        </div>
    );
}
