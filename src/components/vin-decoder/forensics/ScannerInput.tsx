import { useState, useEffect } from "react";
import { Scan, Search, X } from "lucide-react";

interface ScannerInputProps {
    vin: string;
    setVin: (vin: string) => void;
    onScan: () => void;
    isLoading: boolean;
    error: string | null;
}

export const ScannerInput = ({ vin, setVin, onScan, isLoading, error }: ScannerInputProps) => {
    const [displayVin, setDisplayVin] = useState(vin);

    // Simplify display logic
    useEffect(() => {
        setDisplayVin(vin);
    }, [vin]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (vin.length === 17) {
            onScan();
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative z-10 -mt-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 sm:p-3 transition-all duration-300 hover:shadow-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 relative">
                    <div className="relative flex-1 group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-orange transition-colors">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            value={displayVin}
                            onChange={(e) => {
                                const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
                                if (val.length <= 17) setVin(val);
                                setDisplayVin(val);
                            }}
                            placeholder="Enter 17-character VIN"
                            maxLength={17}
                            className="w-full bg-gray-50 border-transparent focus:bg-white border-2 focus:border-primary-orange/20 text-lg sm:text-xl font-medium text-gray-900 placeholder-gray-400 rounded-xl py-4 pl-12 pr-4 outline-none transition-all"
                            disabled={isLoading}
                        />
                        {vin.length === 17 && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <span className="flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={vin.length < 17 || isLoading}
                        className="bg-primary-orange hover:bg-primary-red text-white px-8 py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/30 active:scale-95 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Scan className="w-5 h-5 animate-spin" />
                                <span>Scanning...</span>
                            </>
                        ) : (
                            <span>Decode VIN</span>
                        )}
                    </button>
                </form>
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 animate-in slide-in-from-top-2">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{error}</span>
                </div>
            )}
        </div>
    );
};
