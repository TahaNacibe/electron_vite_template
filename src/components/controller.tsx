import { Maximize, Minus, X } from "lucide-react";
import { ReactNode } from "react";

export default function CustomTitleBar({ children }: { children: ReactNode }) {
  const handleWindow = (action: "minimize" | "maximize" | "close") => {
    window.electronAPI?.controlWindow(action);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Titlebar */}
      <div
        className="flex items-center justify-between bg-background border-b px-4 py-2"
        style={{ WebkitAppRegion: "drag" } as any}
      >
        <div className="text-sm font-medium">Electron App</div>
        <div
          className="flex items-center space-x-2"
          style={{ WebkitAppRegion: "no-drag" } as any}
        >
          <button
            onClick={() => handleWindow("minimize")}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => handleWindow("maximize")}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Maximize size={16} />
          </button>
          <button
            onClick={() => handleWindow("close")}
            className="p-1 hover:bg-red-200 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
