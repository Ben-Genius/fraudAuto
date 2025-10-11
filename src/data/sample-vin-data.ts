import type { VinReportData } from "../types/vin-decoder";

export const sampleVinData: VinReportData = {
  vin: "SCBFR7ZA5CC072256",
  vehicle: {
    year: 2012,
    make: "BENTLEY",
    model: "Continental GT",
    engine: "6.0L W12 Twin Turbo",
    madeIn: "UNITED KINGDOM",
    fuelType: "Premium Gasoline",
    transmission: "Automatic",
    bodyStyle: "Coupe",
    driveLine: "AWD",
    trim: "GT",
  },
  summary: {
    totalEvents: 66,
    safetyRecalls: 0,
    accidents: 15,
    lastMileage: 18796,
    salesHistory: 5,
    owners: 4,
    junkSalvage: 11,
  },
  ownership: [
    {
      owner: 1,
      type: "7,338 mi",
      country: "Ghana",
      estMiYear: 2258,
      lastOdometer: 7338,
      purchased: 2012,
      usage: "3 yrs 3 mo",
    },
    {
      owner: 2,
      type: "15,044 mi",
      country: "Ghana",
      estMiYear: 92,
      lastOdometer: 15044,
      purchased: 2016,
      usage: "3 yrs 1 mo",
    },
    {
      owner: 3,
      type: "1 mi",
      country: "Ghana",
      estMiYear: 0,
      lastOdometer: 1,
      purchased: 2019,
      usage: "0 yrs 3 mo",
    },
    {
      owner: 4,
      type: "18,796 mi",
      country: "Ghana",
      estMiYear: 3090,
      lastOdometer: 18796,
      purchased: 2019,
      usage: "6 yrs 1 mo",
    },
  ],
  checks: {
    safetyRecalls: {
      status: "clean",
      message: "No safety recalls found",
      count: 0,
    },
    stolenVehicle: {
      status: "clean",
      message: "No theft records in Ghana Police database",
      count: 0,
    },
    junkSalvage: {
      status: "warning",
      message: "11 salvage records found",
      count: 11,
    },
    odometer: {
      status: "error",
      message: "Odometer tampering detected - Not Actual",
      count: 1,
    },
    titleHistory: {
      status: "warning",
      message: "Multiple title brands found",
      count: 7,
    },
    majorTitleBrands: {
      status: "warning",
      message: "Salvage & Rebuilt brands found",
      count: 2,
    },
    otherTitleBrands: {
      status: "error",
      message: "Crushed brand found",
      count: 1,
    },
  },
  historyEvents: [
   
  {
    "date": "2011-11-16",
    "mileage": 1000,
    "provider": "VINCHAIN",
    "event": "Vehicle Service",
    "location": "United States"
  },
  {
    "date": "2012-05-19",
    "mileage": 2224,
    "provider": "STATE RECORDS",
    "event": "Accident Report Filed",
    "location": "United States"
  },
  {
    "date": "2012-05-19",
    "mileage": 2224,
    "provider": "Police Report",
    "event": "Accident Report Filed",
    "location": "Accra, Ghana"
  },
  {
    "date": "2013-05-07",
    "mileage": 3084,
    "provider": "VINCHAIN",
    "event": "Auction Sale",
    "location": "United States"
  },
  {
    "date": "2013-05-07",
    "mileage": 3084,
    "provider": "Auction House",
    "event": "Auction Sale - USD 769,980",
    "location": "Tema, Ghana"
  },
  {
    "date": "2015-08-27",
    "mileage": 7096,
    "provider": "VINCHAIN",
    "event": "Dealer Sale",
    "location": "United States"
  },
  {
    "date": "2015-08-27",
    "mileage": 7096,
    "provider": "Dealer Sale",
    "event": "Classified Sale - USD 423,996",
    "location": "Accra, Ghana"
  },
  {
    "date": "2016-01-03",
    "mileage": 14759,
    "provider": "Insurance Claim",
    "event": "Collision Damage",
    "location": "Cape Coast, Ghana"
  },
  {
    "date": "2016-06-28",
    "mileage": 14759,
    "provider": "STATE RECORDS",
    "event": "Registration updated",
    "location": "United States"
  },
  {
    "date": "2016-06-28",
    "mileage": 14759,
    "provider": "STATE RECORDS",
    "event": "Registration updated",
    "location": "United States"
  },
  {
    "date": "2019-04-15",
    "mileage": 15044,
    "provider": "Police Report",
    "event": "Hit Object - Major Damage",
    "location": "Takoradi, Ghana"
  },
  {
    "date": "2019-08-28",
    "mileage": 18796,
    "provider": "Auction House",
    "event": "Auction Sale - USD 134,000",
    "location": "Kumasi, Ghana"
  },
  {
    "date": "2025-06-19",
    "mileage": 18796,
    "provider": "DVLA Ghana",
    "event": "Crushed Brand Title",
    "location": "Tema, Ghana"
  },
  {
    "date": "2025-07-02",
    "mileage": 18796,
    "provider": "Copart Auction",
    "event": "Salvage Certificate Sale - USD 45,200",
    "location": "Accra, Ghana"
  },
  {
    "date": "2015-08-27",
    "mileage": 7096,
    "provider": "VINCHAIN",
    "event": "Dealer Sale",
    "location": "United States"
  },
  {
    "date": "2013-05-07",
    "mileage": 3084,
    "provider": "VINCHAIN",
    "event": "Auction Sale",
    "location": "United States"
  },
  {
    "date": "2012-05-19",
    "mileage": 2224,
    "provider": "STATE RECORDS",
    "event": "Accident Report Filed",
    "location": "United States"
  },
  {
    "date": "2011-11-16",
    "mileage": 1000,
    "provider": "VINCHAIN",
    "event": "Vehicle Service",
    "location": "United States"
  }

  ],
  salesHistory: [
  {
    "date": "May 3, 2016",
    "location": "TX",
    "price": "$11,999",
    "mileage": 43067,
    "condition": "Auction",
    "damage": "Front End Damage",
    "photos": 10,
    "saleType": "Auction",
    "country": "United States",
    "images": [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop"
    ],
    "specifications": {
      "fuelType": "Gasoline",
      "engine": "1.6L I4 DOHC 16V NF4",
      "transmission": "6-Speed Automatic",
      "bodyStyle": "SUV",
      "exteriorColor": "GRAY",
      "interiorColor": "Black",
      "driveTrain": "Front Wheel Drive",
      "trimLevel": "Base"
    },
    "equipment": [
      "1st and 2nd row curtain head airbags",
      "4-wheel ABS Brakes",
      "ABS and Driveline Traction Control",
      "Audio system memory card slot",
      "Bluetooth wireless phone connectivity",
      "Braking Assist",
      "Bucket front seats",
      "Center Console: Full with covered storage",
      "Cloth seat upholstery",
      "Coat front spring",
      "Coil rear spring",
      "Cruise control",
      "Digital Audio Input",
      "Dual front airbags",
      "External temperature display"
    ],
    "additionalInfo": {
      "damageType": "FRONT END",
      "lossType": "COLLISION",
      "vehicleClass": "Non Luxury Compact CUV",
      "cylinders": "4 Cyl",
      "odometerStatus": "ACTUAL",
      "engineSize": "1.6L I4 DOHC 16V NF4",
      "radioType": "N/A",
      "leftSideAirbag": "INTACT",
      "rightSideAirbag": "INTACT",
      "driverAirbag": "DEPLOYED",
      "passengerAirbag": "DEPLOYED",
      "cdPlayer": "N/A",
      "vinStatus": "OK"
    },
    "notes": "We offer 3,000 miles / Three months limited powertrain warranty on this vehicle. Extended warranty available up to 100K miles / Five years.",
    "dealerInfo": {
      "name": "Speed Auto Gallery",
      "address": "7675 University Ave"
    }
  },
  {
    "date": "Sep 8, 2016",
    "location": "La Mesa, CA",
    "price": "$11,999",
    "mileage": 43088,
    "condition": "Classified",
    "damage": "None Listed",
    "photos": 8,
    "saleType": "Classified",
    "country": "United States",
    "images": [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop"
    ],
    "specifications": {
      "fuelType": "Gasoline",
      "engine": "1.6L I4 16V GDI DOHC",
      "transmission": "6-Speed Automatic",
      "bodyStyle": "Wagon",
      "exteriorColor": "Gray",
      "interiorColor": "Black",
      "driveTrain": "Front Wheel Drive"
    },
    "equipment": [
      "Air Conditioning",
      "Anti-Lock Brakes",
      "Side Airbags",
      "Power Locks",
      "Driver Airbag",
      "Power Windows",
      "Passenger Airbag"
    ],
    "additionalInfo": {
      "subModel": "Wagon Automatic",
      "vehicleTitle": "Clear",
      "warranty": "Vehicle has an existing warranty",
      "numberOfCylinders": 4
    }
  },
  {
    "date": "Oct 12, 2016",
    "location": "LaMesa, CA",
    "price": "$10,999",
    "mileage": 43088,
    "condition": "Classified",
    "damage": "None Listed",
    "photos": 5,
    "saleType": "Classified",
    "country": "United States",
    "images": [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop"
    ],
    "specifications": {
      "fuelType": "Gasoline",
      "engine": "4 Cylinder",
      "transmission": "6-Speed Automatic",
      "bodyStyle": "Wagon",
      "exteriorColor": "Gray",
      "interiorColor": "Black",
      "driveTrain": "2 wheel drive - Front"
    },
    "equipment": [
      "Air Conditioning",
      "Anti-Lock Brakes",
      "Side Airbags"
    ],
    "additionalInfo": {},
    "notes": "We offer 3,000 miles / Three months limited powertrain warranty on this vehicle. Extended warranty available up to 100K miles / Five years.",
    "dealerInfo": {
      "name": "Speed Auto Gallery",
      "address": "7675 University Ave"
    }
  },
  {
    "date": "Oct 14, 2016",
    "location": "LaMesa, CA",
    "price": "$10,999",
    "mileage": 43088,
    "condition": "Auction",
    "damage": "None Listed",
    "photos": 5,
    "saleType": "Auction",
    "country": "United States",
    "images": [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&h=400&fit=crop"
    ],
    "specifications": {
      "fuelType": "Gasoline",
      "engine": "1.6L Gamma GDI I4",
      "transmission": "Automatic",
      "bodyStyle": "4dr Car",
      "exteriorColor": "Gray",
      "interiorColor": "Black",
      "driveTrain": "Sol Wgn Auto Base"
    },
    "equipment": [
      "Air Conditioning",
      "Anti-Lock Brakes",
      "Side Airbags",
      "Power Locks",
      "Driver Airbag",
      "Power Windows",
      "Passenger Airbag"
    ],
    "additionalInfo": {
      "subModel": "Wagon Automatic",
      "vehicleTitle": "Clear",
      "warranty": "Vehicle has an existing warranty",
      "numberOfCylinders": 4
    }
  },
  {
    "date": "Nov 21, 2016",
    "location": "La Mesa, CA",
    "price": "$10,999",
    "mileage": 43088,
    "condition": "Classified",
    "damage": "None Listed",
    "photos": 5,
    "saleType": "Classified",
    "country": "United States",
    "images": [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&h=400&fit=crop"
    ],
    "specifications": {
      "fuelType": "Gasoline",
      "engine": "4 Cyl",
      "transmission": "Automatic",
      "bodyStyle": "Wagon",
      "exteriorColor": "Gray",
      "interiorColor": "Black",
      "driveTrain": "Front Wheel Drive"
    },
    "equipment": [
      "Air Conditioning",
      "Anti-Lock Brakes",
      "Side Airbags"
    ],
    "additionalInfo": {},
    "notes": "We offer 3,000 miles / Three months limited powertrain warranty on this vehicle. Extended warranty available up to 100K miles / Five years."
  }
],
  ownershipCost: {
    depreciation: [17325, 15992, 14659, 13326, 11993],
    insurance: [7624, 7892, 8168, 8452, 8748],
    fuel: [10064, 10368, 10728, 11160, 11660],
    maintenance: [11052, 11648, 7156, 10068, 9164],
    repair: [6604, 5160, 5892, 6360, 7264],
    taxesFees: [12852, 1464, 1864, 1196, 1660],
    total: 267576,
  },
  odometerChecks: [
    {
      id: 1,
      checkType: "Odometer: Not Actual",
      status: "Problem Reported",
      hasProblem: true,
      date: "May 13, 2019",
      description: "The odometer reading is known to be other than the true mileage for the vehicle.",
    },
    {
      id: 2,
      checkType: "Odometer: Tampering Verified",
      status: "No problems found",
      hasProblem: false,
    },
    {
      id: 3,
      checkType: "Odometer: Exempt from Odometer Disclosure",
      status: "No problems found",
      hasProblem: false,
    },
  ],
  salvageRecords: [
    {
      id: 1,
      obtainedDate: "Apr 6, 2016",
      reportingEntity: "IAA",
      location: "WESTCHESTER, IL",
      phone: "7084927000",
      recordType: "Junk and Salvage",
      disposition: "TO BE DETERMINED",
      intendedForExport: "No",
    },
    {
      id: 2,
      obtainedDate: "Apr 6, 2016",
      reportingEntity: "IAA",
      location: "WESTCHESTER, IL",
      phone: "7084927000",
      recordType: "Junk and Salvage",
      disposition: "SOLD",
      intendedForExport: "No",
    },
    {
      id: 3,
      obtainedDate: "Apr 5, 2016",
      reportingEntity: "PROGRESSIVE GROUP OF INS COMPANIES",
      location: "SPRING, TX",
      email: "claims@email.progressive.com",
      phone: "8884408051",
      recordType: "Insurers",
    },
  ],
  titleHistory: {
    current: [
      {
        id: 1,
        titleIssueDate: "Jun 19, 2025",
        state: "NY",
        mileage: "0 mi",
        event: "Title and Registration",
      },
    ],
    historical: [
      {
        id: 1,
        titleIssueDate: "Jun 12, 2019",
        state: "CA",
        mileage: "1 mi",
        event: "Title and Registration",
      },
      {
        id: 2,
        titleIssueDate: "Mar 6, 2019",
        state: "CA",
        mileage: "15,045 mi",
        event: "Title and Registration",
      },
      {
        id: 3,
        titleIssueDate: "Jun 29, 2016",
        state: "CA",
        mileage: "14,759 mi",
        event: "Title and Registration",
      },
    ],
  },
  majorTitleBrands: [
    {
      id: 1,
      brandType: "Salvage brand",
      status: "Problem Reported",
      hasProblem: true,
      date: "Jun 12, 2019",
    },
    {
      id: 2,
      brandType: "Rebuilt or rebuildable brand",
      status: "Problem Reported",
      hasProblem: true,
      date: "Mar 6, 2019",
    },
    {
      id: 3,
      brandType: "Fire brand",
      status: "No problems found",
      hasProblem: false,
    },
    {
      id: 4,
      brandType: "Flood brand",
      status: "No problems found",
      hasProblem: false,
    },
  ],
  otherTitleBrands: [
    {
      id: 1,
      brandType: "Crushed",
      status: "Problem Reported",
      hasProblem: true,
      date: "Jun 19, 2025",
    },
    {
      id: 2,
      brandType: "Vehicle Safety Defect Corrected",
      status: "No problems found",
      hasProblem: false,
    },
    {
      id: 3,
      brandType: "Recovered Theft",
      status: "No problems found",
      hasProblem: false,
    },
  ],
  vehicleDamages: [
    {
      id: 1,
      date: "December 14, 2014",
      country: "United States",
      damageType: "Crash record",
      areaOfImpact: "Front End",
      description: "Front End Damage Distributed Impact",
    },
    {
      id: 2,
      date: "March 29, 2016",
      country: "United States",
      damageType: "Crash record",
      areaOfImpact: "Rear End",
      description: "Rear Impact Damage",
    },
    {
      id: 3,
      date: "April 5, 2016",
      country: "United States",
      damageType: "Crash record",
      areaOfImpact: "Side",
      description: "Side Impact Damage",
    },
    {
      id: 4,
      date: "May 3, 2016",
      country: "United States",
      damageType: "Crash record",
      areaOfImpact: "Front End",
      description: "Front End Damage Distributed Impact",
    },
  ],

  recallData: [
  {
    date: "2020-12-11",
    recallNumber: "20V770000",
    country: "United States",
    component: "POWER TRAIN: DRIVELINE: DRIVESHAFT",
    description: "Honda (American Honda Motor Co.) is recalling certain 2013-2015 Acura ILX, 2013 Acura ILX Hybrid, 2012 Honda Civic Hybrid, and 2007-2008 Honda Fit vehicles with a manual transmission and 2009-2013 Honda Fit vehicles originally sold, or ever registered, in Connecticut, Delaware, District of Columbia, Illinois, Indiana, Iowa, Kentucky, Maine, Maryland, Massachusetts, Michigan, Minnesota, Missouri, New Hampshire, New Jersey, New York, Ohio, Pennsylvania, Rhode Island, Vermont, Virginia, West Virginia, and Wisconsin. The drive shafts' protective coating may not have been applied properly during manufacturing, making it more susceptible to damage from road salt, or other contaminants, and potentially cause it to break."
  },
  {
    date: "2019-07-01",
    recallNumber: "19V500000",
    country: "United States",
    component: "AIR BAGS: FRONTAL: DRIVER SIDE: INFLATOR MODULE",
    description: "Honda (American Honda Motor Co.) is recalling certain 2013 Acura ILX, 2015 RDX, 2005-2010 and 2012 RL, 2009-2014 TL, 2010 and 2012 ZDX, 2007-2011 CR-V, 2011-2013 and 2015 CR-Z, 2009-2013 Fit, 2013 Fit EV, 2010-2011 and 2013 Insight and 2007-2014 Ridgeline vehicles. These vehicles are equipped with driver frontal air bag inflators assembled as a recall remedy part or replacement service part, that may explode due to propellant degradation occurring after long-term exposure to high absolute humidity, temperature and temperature cycling."
  },
  {
    date: "2019-07-01",
    recallNumber: "19V502000",
    country: "United States",
    component: "AIR BAGS: FRONTAL: PASSENGER SIDE: INFLATOR MODULE",
    description: "Honda (American Honda Motor Co.) is recalling certain 2009-2014 Acura TSX, 2011-2014 TSX Sport Wagon, 2010-2013 ZDX, 2008-2012 Honda Accord, 2010-2011 Accord Crosstour, 2006-2011 Civic and Civic Hybrid, 2008-2010 Civic GX NGV, 2012-2015 Crosstour, 2007-2011 CR-V, 2009-2013 Fit, 2014 Fit EV, 2010-2014 Insight, and 2009-2015 Pilot vehicles. The vehicles are equipped with passenger frontal air bag inflators assembled as a recall remedy part or replacement service part, that may explode due to propellant degradation occurring after long-term exposure to high absolute humidity, temperature and temperature cycling."
  },
  {
    date: "2019-05-17",
    recallNumber: "19V378000",
    country: "United States",
    component: "AIR BAGS: FRONTAL: PASSENGER SIDE: INFLATOR MODULE",
    description: "Honda (American Honda Motor Co.) is recalling certain 2009-2014 Acura TSX, 2011-2013 TSX Sport Wagon, and 2010-2012 ZDX and 2008-2012 Honda Accord, 2010-2011 Accord Crosstour, 2006-2011 Civic, Civic Hybrid and Civic NGV, 2012-2014 Crosstour, 2007-2011 CR-V, 2009-2013 Fit, 2010-2013 Insight, and 2009-2015 Pilot vehicles. The front passenger air bag inflator may have been installed incorrectly during replacement."
  },
  {
    date: "2018-09-28",
    recallNumber: "18V661000",
    country: "United States",
    component: "AIR BAGS: FRONTAL: PASSENGER SIDE: INFLATOR MODULE",
    description: "Honda (American Honda Motor Co.) is recalling certain 2014 Honda Insight and Acura TSX and TSX Wagon, 2014-2015 Honda Crosstour and Pilot vehicles nationwide, as well as certain 2014 Honda FCX Clarity and Fit EV vehicles in Florida, Hawaii, Puerto Rico, Texas, Alabama, Georgia, Louisiana, Mississippi, South Carolina, California, American Samoa, Guam, the Northern Mariana Islands (Saipan) and the U.S. Virgin Islands. Honda is also recalling certain 2011-2013 Acura TSX, TSX Wagon and ZDX, Honda Crosstour, Insight, Fit and Pilot vehicles, 2011-2012 Honda Accord and 2011 Honda Civic NGV, Civic, Civic Hybrid and CR-V vehicles in Arizona, Arkansas, Delaware, the District of Columbia, Illinois, Indiana, Kansas, Kentucky, Maryland, Missouri, Nebraska, Nevada, New Jersey, New Mexico, North Carolina, Ohio, Oklahoma, Pennsylvania, Tennessee, Virginia and West Virginia. Lastly, Honda is recalling certain 2010-2013 Acura TSX and ZDX, Honda Crosstour, Fit, Insight and Pilot, 2011-2013 TSX Wagon, 2010-2012 Honda Accord and 2010-2011 Honda Civic NGV, Civic, Civic Hybrid and CR-V vehicles in Alaska, Colorado, Connecticut, Idaho, Iowa, Maine, Massachusetts, Michigan, Minnesota, Montana, New Hampshire, New York, North Dakota, Oregon, Rhode Island, South Dakota, Utah, Vermont, Washington, Wisconsin and Wyoming. These vehicles are equipped with certain air bag air bag inflators assembled as part of the frontal air bag modules, and used as original equipment or replacement equipment (such as after a vehicle crash necessitating replacement of the original air bags), may explode due to propellant degradation occurring after long-term exposure to higher absolute humidity, temperature and temperature cycling."
  },
  {
    date: "2018-05-01",
    recallNumber: "18V268000",
    country: "United States",
    component: "AIR BAGS: FRONTAL: PASSENGER SIDE: INFLATOR MODULE",
    description: "Honda (American Honda Motor Co.) is recalling certain 2003-2012 Honda Accord and Pilot, 2010 Accord Crosstour, 2001-2011 Civic, 2002-2011 CR-V, 2003-2004, 2006-2008 and 2011 Element, 2007 and 2009-2013 Fit, 2010-2012 Insight, 2002-2004 Odyssey, and 2012 Ridgeline vehicles. The front passenger air bag may have been installed incorrectly during replacement."
  },
  {
    date: "2018-01-16",
    recallNumber: "18V042000",
    country: "United States",
    component: "AIR BAGS: FRONTAL: PASSENGER SIDE: INFLATOR MODULE",
    description: "Honda (American Honda Motor Co.) is recalling certain 2010-2013 Acura TSX, ZDX, Honda Accord Crosstour, Fit, Insight and Pilot vehicles, 2011-13 Acura TSX Sportswagon, 2010-2012 Honda Accord,, 2010-2011 Honda Civic, Civic NGV, Civic Hybrid and CR-V vehicles and 2013 Honda FCX Clarity and Fit EV vehicles ever registered in the states of Alabama, California, Florida, Georgia, Hawaii, Louisiana, Mississippi, South Carolina, Texas, Puerto Rico, American Samoa, Guam, the Northern Mariana Islands (Saipan), and the U.S. Virgin Islands or \"Zone A.\" Additionally, Honda is recalling certain 2010-2012 Acura TSX, Honda Accord, Accord Crosstour, Fit and Pilot, 2010-2011 Honda Civic, Civic NGV, Civic Hybrid and CR-V, and 2010 Acura ZDX and Honda Insight vehicles ever registered in the states of Arizona, Arkansas, Delaware, District of Columbia, Illinois, Indiana, Kansas, Kentucky, Maryland, Missouri, Nebraska, Nevada, New Jersey, New Mexico, North Carolina, Ohio, Oklahoma, Pennsylvania, Tennessee, Virginia, and West Virginia or \"Zone B.\" Unless included in Zones A or B above, Honda is recalling certain 2009 Acura TSX, Honda Accord, Civic, Civic NGV, Civic Hybrid, CR-V, Fit, and Pilot vehicles ever registered in the states of Alaska, Colorado, Connecticut, Idaho, Iowa, Maine, Massachusetts, Michigan, Minnesota, Montana, New Hampshire, New York, North Dakota, Oregon, Rhode Island, South Dakota, Utah, Vermont, Washington, Wisconsin, and Wyoming or \"Zone C.\" These vehicles are equipped with certain air bag inflators assembled as part of the frontal air bag modules, and used as original equipment or replacement equipment (such as after a vehicle crash necessitating replacement of the original air bags), may explode due to propellant degradation occurring after long-term exposure to higher absolute humidity, temperature and temperature cycling."
  },
  {
    date: "2017-09-06",
    recallNumber: "17V545000",
    country: "United States",
    component: "AIR BAGS: FRONTAL: PASSENGER SIDE: INFLATOR MODULE",
    description: "Honda (American Honda Motor Co.) is recalling certain 2008-2012 Accord, 2010-2012 Accord Crosstour, 2006-2011 Civic, 2007-2011 CR-V, 2009-2012 Fit and Pilot, 2010-2012 Insight, and 2009-2012 Acura TSX vehicles that received replacement passenger frontal air bag inflators. One dealership may have incorrectly installed the replacement air bag inflators."
  },
  {
    date: "2017-01-13",
    recallNumber: "17V030000",
    country: "United States",
    component: "AIR BAGS: FRONTAL: PASSENGER SIDE: INFLATOR MODULE",
    description: "Honda (American Honda Motor Co.) is recalling certain 2009-2012 Acura TSX, 2011-2012 Acura TSX Wagon, 2010-2012 Acura ZDX, 2008-2012 Honda Accord, 2010-2012 Honda Accord Crosstour and Honda Insight, 2009-2012 Honda Fit, 2009-2012 Pilot, 2007-2011 Honda CR-V, 2012 Honda FCX Clarity and 2006-2011 Honda Civic, Civic Hybrid, Civic NGV vehicles originally sold, or ever registered, in Alabama, California, Florida, Georgia, Hawaii, Louisiana, Mississippi, South Carolina, Texas, Puerto Rico, American Samoa, Guam, the Northern Mariana Islands (Saipan), and the U.S. Virgin Islands, or \"Zone A.\" Additionally, if not included in \"Zone A\" above, Honda is recalling certain 2009 Acura TSX, Honda Fit and Pilot, 2008-2009 Honda Accord, 2006-2009 Civic, Civic Hybrid and Civic NGV, and 2007-2009 Honda CR-V vehicles originally sold, or ever registered, in Arizona, Arkansas, Delaware, District of Columbia, Illinois, Indiana, Kansas, Kentucky, Maryland, Missouri, Nebraska, Nevada, New Jersey, New Mexico, North Carolina, Ohio, Oklahoma, Pennsylvania, Tennessee, Virginia, and West Virginia, or \"Zone B.\" Additionally, if not included in \"Zone B\" above, Honda is recalling certain 2008 Honda Accord, 2006-2008 Honda Civic, Civic Hybrid and Civic NGV and 2007-2008 Honda CR-V vehicles originally sold, or ever registered, in Alaska, Colorado, Connecticut, Idaho, Iowa, Maine, Massachusetts, Michigan, Minnesota, Montana, New Hampshire, New York, North Dakota, Oregon, Rhode Island, South Dakota, Utah, Vermont, Washington, Wisconsin, and Wyoming. These vehicles are equipped with certain air bag inflators assembled as part of the passenger frontal air bag modules used as original equipment or replacement equipment. In the event of a crash necessitating deployment of the front air bags, these inflators may rupture due to propellant degradation occurring after long-term exposure to absolute humidity and temperature cycling."
  },
  {
    date: "2016-05-24",
    recallNumber: "16V346000",
    country: "United States",
    component: "AIR BAGS: FRONTAL: PASSENGER SIDE: INFLATOR MODULE",
    description: "Honda (American Honda Motor Co.) is recalling certain model year 2009-2011 Acura TSX, 2011 TSX Wagon, 2010-2011 Acura ZDX, 2008-2011 Honda Accord, 2010-2011 Accord Crosstour, 2006-2011 Civic, Civic Hybrid, and Civic GX, 2007-2011 CR-V, 2010-2011 FCX Clarity and Insight, and 2009-2011 Fit, and Pilot vehicles originally sold, or ever registered, in Alabama, California, Florida, Georgia, Hawaii, Louisiana, Mississippi, South Carolina, Texas, Puerto Rico, American Samoa, Guam, the Northern Mariana Islands (Saipan), and the U.S. Virgin Islands, or \"Zone A.\" Additionally, unless already included in \"Zone A\" above, Honda is recalling certain model year 2008 Honda Accord, 2006-2008 Civic, Civic Hybrid and Civic GX, and 2007-2008 CR-V vehicles originally sold, or ever registered, in Arizona, Arkansas, Delaware, the District of Columbia, Illinois, Indiana, Kansas, Kentucky, Maryland, Missouri, Nebraska, Nevada, New Jersey, New Mexico, North Carolina, Ohio, Oklahoma, Pennsylvania, Tennessee, Virginia, and West Virginia, or \"Zone B.\" Vehicles not originally sold or ever registered in either Zones A or B are not subject to this safety recall. These vehicles are equipped with certain air bag inflators assembled as part of the passenger frontal air bag modules, and used as original equipment or replacement equipment. In the event of a crash necessitating deployment of the front air bags, these inflators may rupture due to propellant degradation occurring after long-term exposure to absolute humidity and temperature cycling."
  },
  {
    date: "2016-02-03",
    recallNumber: "16V061000",
    country: "United States",
    component: "AIR BAGS: FRONTAL: DRIVER SIDE: INFLATOR MODULE",
    description: "Honda (American Honda Motor Co.) is recalling certain model year 2007-2011 Honda CR-V, 2011-2015 CR-Z, 2010-2014 FCX, and Insight, 2009-2013 Fit, 2013-2014 Fit EV, 2007-2014 Ridgeline, 2013-2016 Acura ILX, 2013-2014 Acura ILX Hybrid, 2007-2016 RDX, 2005-2012 Acura RL, 2009-2014 Acura TL, and 2010-2013 Acura ZDX vehicles. The affected vehicles are equipped with a dual-stage driver frontal air bag that may be susceptible to moisture intrusion which, over time, could cause the inflator to rupture."
  }
]
};
