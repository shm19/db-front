import React, { useState, useEffect } from "react";

const DatabaseSettingsModal = ({ isOpen, onClose, onSave, initialSettings }) => {
  const [settings, setSettings] = useState({
    dbType: "sqlite", // Default to SQLite
    host: "",
    port: "",
    username: "",
    password: "",
    connectionUrl: "",
  });

  // Load initial settings (if available)
  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black rounded-lg p-6 shadow-lg w-3/4 max-w-lg">
        <h1 className="text-2xl mb-4 font-bold">Connection Settings</h1>
        <div className="flex flex-col gap-4">
          {/* Database Type */}
          <div>
            <label className="block text-sm font-medium">Database Type</label>
            <select
              name="dbType"
              value={settings.dbType}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 bg-white"
            >
              <option value="sqlite">SQLite</option>
              <option value="mysql">MySQL</option>
              <option value="postgres">PostgreSQL</option>
            </select>
          </div>

          {/* Host and Port */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Host</label>
              <input
                type="text"
                name="host"
                value={settings.host}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Port</label>
              <input
                type="text"
                name="port"
                value={settings.port}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Username and Password */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={settings.username}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={settings.password}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
          </div>

          {/* Connection URL */}
          <div>
            <label className="block text-sm font-medium">Connection URL</label>
            <input
              type="text"
              name="connectionUrl"
              value={settings.connectionUrl}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSettingsModal;
