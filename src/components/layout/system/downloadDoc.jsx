import { Button } from "antd";
import { downloadSystemDocumentApi } from "../../../utils/api"; // Đường dẫn tùy vào thư mục bạn để

const DownloadButton = ({ system }) => {
    const handleDownload = async (e) => {
        e?.stopPropagation?.(); // nếu dùng trong thẻ a, tránh trigger click cha
        if (!system || !system._id) return;

        try {
            const fileBlob = await downloadSystemDocumentApi(system._id);
            if (!fileBlob) return;

            const url = window.URL.createObjectURL(new Blob([fileBlob]));

            const originalFileName = system.document?.fileName || '';
            const extension = originalFileName.substring(originalFileName.lastIndexOf('.')) || '';
            const fileName = `${system.name || "document"}${extension}`;

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading document:", error);
        }
    };

    if (!system?.document) {
        return <span>No document</span>;
    }

    return (
        <Button type="link" onClick={handleDownload}>
            Download
        </Button>
    );
};

export default DownloadButton;
