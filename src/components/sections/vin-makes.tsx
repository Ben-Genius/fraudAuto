export function VinMakes() {
  const makes = [
    'Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Mazda',
    'Mercedes-Benz', 'Nissan', 'Peugeot', 'Renault', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen'
  ];

  const organizedMakes = makes.reduce((acc, make) => {
    const firstLetter = make[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(make);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium lg:text-4xl mb-4">
            VIN Decoding for All Major Vehicle Makes
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive vehicle information for cars sold in Ghana
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {Object.entries(organizedMakes).map(([letter, makesList]) => (
            <div key={letter} className="space-y-3">
              <h3 className="text-lg font-semibold text-secondary-orange border-b border-gray-200 pb-2">
                {letter}
              </h3>
              <ul className="space-y-2">
                {makesList.map((make) => (
                  <li key={make} className="text-sm text-gray-600 hover:text-primary-red cursor-pointer transition-colors">
                    {make}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Don't see your vehicle make? We support over 100+ manufacturers worldwide.
          </p>
          <button className="text-secondary-orange hover:text-primary-red font-medium">
            View All Supported Makes →
          </button>
        </div>
      </div>
    </section>
  );
}
