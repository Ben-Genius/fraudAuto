import { BrandsGrid } from "../ui/brands-grid";

const partners = [
  {
    name: "DVLA Ghana",
    logo: "https://dvla.gov.gh/images/new_logo.png",
  },
  {
    name: "Ghana Police Service",
    logo: "https://www.clipartmax.com/png/middle/302-3020350_police-logo-png-ghana-police-logo.png",
  },
  {
    name: "Enterprise Insurance",
    logo: "https://scinsurance.my.enterprisegroup.net.gh/assets/Uploads/enterprise-insurance.png",
  },
  {
    name: "SIC Insurance",
    logo: "https://www.sic-gh.com/images/logo.png",
  },
];

export function Partners() {
  return (
    <BrandsGrid
      brands={partners}
      title=""
      className="bg-gray-50"
    />
  );
}
