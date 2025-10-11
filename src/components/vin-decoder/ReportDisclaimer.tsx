export function ReportDisclaimer() {
  return (
    <div className="bg-gray-50 rounded-3xl p-8 shadow-lg">
      <div className="text-sm text-gray-600 space-y-4">
        <p className="font-medium text-gray-900 text-lg">
          Important Disclaimer
        </p>
        <p className="leading-relaxed">
          This report is compiled from Ghana DVLA records, Police
          Service database, insurance companies, and verified sources.
          Data accuracy depends on reporting entities. Always conduct
          physical inspection before purchase.
        </p>
        <p className="text-xs text-gray-500">
          🔒 FraudWall-Auto is an approved data provider working with
          Ghana's official systems.
        </p>
      </div>
    </div>
  );
}
