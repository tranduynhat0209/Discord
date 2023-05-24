import React from "react";

export default function Navigation() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <button className="friends">
                        <svg
                            width="21"
                            height="12"
                            viewBox="0 0 21 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3.77528 0.301758H0C0 8.92495 3.77528 12.0457 5.66292 12.3742V17.3018H21C21 10.896 16.2809 10.896 12.9775 10.896C5.66292 10.896 3.77528 4.73654 3.77528 0.301758Z"
                                fill="#72767D"
                            />
                            <path
                                d="M12.9775 0.801758C18.6405 0.801758 18.6405 9.42495 12.9775 9.42495C7.0867 9.42495 7.31461 0.801758 12.9775 0.801758Z"
                                fill="#72767D"
                            />
                        </svg>
                        Friends
                    </button>
                    <button className="online">Online</button>
                    <button className="all">All</button>
                    <button className="pending">Pending</button>
                    <button className="suggestions">Suggestions</button>
                    <button className="blocked">Blocked</button>
                    <button className="add-friend">Add friend</button>
                </div>
                <div className="navbar-right">
                    <span className="new-group">
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.998 0.301758V3.30176H24.998V5.30176H21.998V8.30176H19.998V5.30176H16.998V3.30176H19.998V0.301758H21.998ZM3.99805 20.3018V24.3018L9.33205 20.3018H15.998C17.102 20.3018 17.998 19.4048 17.998 18.3018V9.30176C17.998 8.19776 17.102 7.30176 15.998 7.30176H2.99805C1.89405 7.30176 0.998047 8.19776 0.998047 9.30176V18.3018C0.998047 19.4048 1.89405 20.3018 2.99805 20.3018H3.99805Z"
                                fill="#C7C9CB"
                            />
                        </svg>
                    </span>
                    <span>
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.998 0.301758H2.98805C1.87805 0.301758 1.00805 1.19176 1.00805 2.30176L0.998047 16.3018C0.998047 17.4018 1.87805 18.3018 2.98805 18.3018H16.998C18.098 18.3018 18.998 17.4018 18.998 16.3018V2.30176C18.998 1.19176 18.098 0.301758 16.998 0.301758ZM16.998 12.3018H12.998C12.998 13.9618 11.648 15.3018 9.99805 15.3018C8.34805 15.3018 6.99805 13.9618 6.99805 12.3018H2.98805V2.30176H16.998V12.3018Z"
                                fill="#C7C9CB"
                            />
                        </svg>
                    </span>
                    <span>
                        <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.998 0.301758C5.48405 0.301758 0.998047 4.78876 0.998047 10.3018C0.998047 15.8168 5.48405 20.3018 10.998 20.3018C16.512 20.3018 20.998 15.8168 20.998 10.3018C20.998 4.78876 16.512 0.301758 10.998 0.301758ZM10.998 16.5518C10.308 16.5518 9.74805 15.9928 9.74805 15.3018C9.74805 14.6118 10.308 14.0518 10.998 14.0518C11.688 14.0518 12.248 14.6118 12.248 15.3018C12.248 15.9928 11.688 16.5518 10.998 16.5518ZM11.998 12.1768V13.3018H9.99805V10.3018H10.998C12.102 10.3018 12.998 9.40476 12.998 8.30176C12.998 7.19776 12.102 6.30176 10.998 6.30176C9.89405 6.30176 8.99805 7.19776 8.99805 8.30176H6.99805C6.99805 6.09676 8.79305 4.30176 10.998 4.30176C13.203 4.30176 14.998 6.09676 14.998 8.30176C14.998 10.1628 13.721 11.7308 11.998 12.1768Z"
                                fill="#C7C9CB"
                            />
                        </svg>
                    </span>
                </div>
            </nav>
        </>
    );
}
