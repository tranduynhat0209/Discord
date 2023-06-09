import "./Download.scss";
import useShowDownload from "./useShowDownload";

const Download: React.FC = () => {
    const { showDownload, closeButtonRef, downloadComponentRef } =
        useShowDownload();
    return (
        <main className="download-container" ref={downloadComponentRef}>
            <button className="close-button" ref={closeButtonRef}></button>
        </main>
    );
};

export default Download;
