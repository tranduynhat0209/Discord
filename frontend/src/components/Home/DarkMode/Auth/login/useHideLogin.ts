import { useState } from "react";

const useHideLogin = () => {
    const [hideLogin, setHideLogin] = useState(true);
    const handleHideLogin = () => setHideLogin(true);
    const handleShowLogin = () => setHideLogin(false);

    return { hideLogin, handleHideLogin, handleShowLogin };
};

export default useHideLogin;
