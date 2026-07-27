import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileJson, Check } from 'lucide-react';

interface ExportMenuProps {
  data: any[];
  filename?: string;
}

export function ExportMenu({ data, filename = 'export' }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [exportedFormat, setExportedFormat] = useState<string | null>(null);

  const exportToCSV = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        // Échapper les virgules et guillemets dans les valeurs
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(','))
    ].join('\n');

    downloadFile(csvContent, `${filename}.csv`, 'text/csv');
    setExportedFormat('CSV');
    setTimeout(() => setExportedFormat(null), 2000);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `${filename}.json`, 'application/json');
    setExportedFormat('JSON');
    setTimeout(() => setExportedFormat(null), 2000);
  };

  const exportToText = () => {
    const textContent = data.map((row, index) => {
      return `--- Entrée ${index + 1} ---\n${Object.entries(row)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')}`;
    }).join('\n\n');

    downloadFile(textContent, `${filename}.txt`, 'text/plain');
    setExportedFormat('TXT');
    setTimeout(() => setExportedFormat(null), 2000);
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 font-medium"
      >
        <Download className="w-5 h-5" />
        Exporter les données
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-amber-500/20 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-3 border-b border-amber-500/10">
              <div className="text-sm font-semibold text-white">Choisir un format</div>
              <div className="text-xs text-neutral-400">{data.length} entrées</div>
            </div>

            <div className="p-2 space-y-1">
              <button
                onClick={exportToCSV}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-amber-500/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg group-hover:bg-green-500/20 transition-colors">
                    <FileSpreadsheet className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">CSV</div>
                    <div className="text-xs text-neutral-400">Format tableur</div>
                  </div>
                </div>
                {exportedFormat === 'CSV' && (
                  <Check className="w-5 h-5 text-green-400" />
                )}
              </button>

              <button
                onClick={exportToJSON}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-amber-500/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <FileJson className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">JSON</div>
                    <div className="text-xs text-neutral-400">Format données</div>
                  </div>
                </div>
                {exportedFormat === 'JSON' && (
                  <Check className="w-5 h-5 text-green-400" />
                )}
              </button>

              <button
                onClick={exportToText}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-amber-500/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                    <FileText className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">TXT</div>
                    <div className="text-xs text-neutral-400">Format texte</div>
                  </div>
                </div>
                {exportedFormat === 'TXT' && (
                  <Check className="w-5 h-5 text-green-400" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
