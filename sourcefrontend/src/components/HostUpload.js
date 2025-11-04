import React, { useState } from "react";

const HostUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    const uploadedFilenames = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("https://chodenpubgpc.com/upload.php", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          uploadedFilenames.push(result.filename);
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    }

    setUploading(false);
    onUploadSuccess(uploadedFilenames);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileUpload}
        disabled={uploading}
      />
      {uploading && <span>Đang upload...</span>}
    </div>
  );
};

export default HostUpload;
