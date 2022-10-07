import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAll, setSelectAll] = useState(false);

  const handleItemClick = (row) => {
    console.log(row);
    const isItemSelected = selectedItems.find((item) => {
      return item.name === row.name;
    });
    if (isItemSelected) {
      const filteredItems = selectedItems.filter((item) => {
        return item.name !== row.name;
      });
      setSelectedItems([...filteredItems]);
    } else {
      setSelectedItems([...selectedItems, row]);
    }
  };

  const handleSelectAllClick = () => {
    if (selectedItems.length !== data.length) {
      setSelectedItems(data);
      setSelectAll(true);
    } else {
      setSelectedItems([]);
      setSelectAll(false);
    }
  };

  const data = [
    {
      name: "smss.exe",
      device: "Mario",
      path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
      status: "scheduled"
    },
    {
      name: "netsh.exe",
      device: "Luigi",
      path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
      status: "available"
    },
    {
      name: "uxtheme.dll",
      device: "Peach",
      path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
      status: "available"
    },
    {
      name: "aries.sys",
      device: "Daisy",
      path: "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
      status: "scheduled"
    },
    {
      name: "cryptbase.dll",
      device: "Yoshi",
      path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
      status: "scheduled"
    },
    {
      name: "7za.exe",
      device: "Toad",
      path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
      status: "scheduled"
    }
  ];

  const handleDowload = () => {
    let alertHTML = "";
    selectedItems.forEach((item) => {
      alertHTML += `${item.path} : ${item.device} \n`;
    });
    alert(alertHTML);
  };

  useEffect(() => {
    if (selectedItems.length > 0 && selectedItems.length !== data.length) {
      document.querySelectorAll(".select-all")[0].indeterminate = true;
    } else {
      document.querySelectorAll(".select-all")[0].indeterminate = false;
    }
  }, [selectedItems]);
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            {selectedItems.length ? (
              <td>{`Selected ${selectedItems.length}`}</td>
            ) : (
              <td>None Selected</td>
            )}
            <td>
              <button
                className="material-symbols-outlined download-btn"
                onClick={handleDowload}
              >
                <span>file_download</span>
              </button>
              Download Selected
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className="checkbox select-all"
                type="checkbox"
                checked={selectedItems.length === data.length || selectedAll}
                onChange={() => handleSelectAllClick()}
              />
            </td>
            <td>Name</td>
            <td>Device</td>
            <td>Path</td>
            <td>Status</td>
          </tr>
          {data.map((row) => {
            return (
              <tr
                key={row.name}
                className={
                  selectedAll ||
                  selectedItems.find((item) => item.name === row.name)
                    ? "checked"
                    : ""
                }
              >
                <td>
                  <input
                    className="checkbox"
                    type="checkbox"
                    value=""
                    checked={
                      selectedAll ||
                      selectedItems.find((item) => item.name === row.name)
                    }
                    onChange={() => handleItemClick(row)}
                  />
                </td>
                <td>{row?.name}</td>
                <td>{row?.device}</td>
                <td>{row?.path}</td>
                <td className="status-name">
                  {row?.status === "available" ? (
                    <i className="rounded-icon"></i>
                  ) : (
                    <></>
                  )}
                  {row?.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
