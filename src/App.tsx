import React from 'react';
import { useState } from 'react';
import { Home, Package, Users, BarChart3, AlertTriangle, Bell, LogOut, Search, MessageSquare, CheckCircle, Flame, TrendingUp, TrendingDown } from 'lucide-react';
import { format, addDays } from 'date-fns';
import Modal from 'react-modal';

Modal.setAppElement('#root');

// Mock data (unchanged until programs)
const alerts = [
  { id: 1, type: 'contract', message: 'Supplier A contract expires in 30 days', severity: 'high' },
  { id: 2, type: 'risk', message: 'New trade restrictions in Region B', severity: 'medium' },
  { id: 3, type: 'supply', message: 'Material X stock below threshold', severity: 'low' },
];

const materials = [
  {
    id: 1,
    name: 'PG-Seq Indexing Primers',
    cas: '123-45-6',
    grade: 'Pharma-grade',
    price: '$500/unit',
    leadTime: '14-21 days',
    chemicalProfile: {
      molecularWeight: '15,000-20,000 g/mol',
      purity: '≥98%',
      form: 'Lyophilized powder',
      stability: 'Stable at -20°C for 24 months'
    },
    manufacturing: {
      process: 'Solid-phase synthesis',
      quality: 'GMP certified',
      batchSize: '100-500 units'
    },
    supplyRisk: {
      level: 'Medium',
      factors: ['Limited manufacturers', 'Raw material dependency'],
      mitigation: 'Multiple supplier agreements in place'
    },
    substitutes: ['Modified Seq Primers (85% comparable)', 'Alternative Indexing Kit (70% comparable)'],
    suppliers: ['Supplier A', 'Supplier B', 'Supplier C']
  },
  {
    id: 2,
    name: 'Monoclonal Antibodies',
    cas: '789-01-2',
    grade: 'Research-grade',
    price: '$2000/unit',
    leadTime: '30-45 days',
    chemicalProfile: {
      molecularWeight: '150,000 g/mol',
      purity: '≥95%',
      form: 'Liquid solution',
      stability: 'Stable at 4°C for 12 months'
    },
    manufacturing: {
      process: 'Cell culture and purification',
      quality: 'ISO 9001 certified',
      batchSize: '50-200 units'
    },
    supplyRisk: {
      level: 'Low',
      factors: ['Multiple manufacturers', 'Established process'],
      mitigation: 'Regular quality audits'
    },
    substitutes: ['Polyclonal antibodies (75% comparable)', 'Synthetic alternatives (60% comparable)'],
    suppliers: ['Supplier B', 'Supplier D']
  },
  {
    id: 3,
    name: 'Chromatography Resins',
    cas: '456-78-9',
    grade: 'Analytical-grade',
    price: '$1500/unit',
    leadTime: '21-28 days',
    chemicalProfile: {
      molecularWeight: 'Variable',
      purity: '≥99%',
      form: 'Beaded matrix',
      stability: 'Stable at room temperature'
    },
    manufacturing: {
      process: 'Polymer synthesis and functionalization',
      quality: 'USP certified',
      batchSize: '200-1000 units'
    },
    supplyRisk: {
      level: 'High',
      factors: ['Raw material shortages', 'Complex manufacturing'],
      mitigation: 'Strategic stockpiling'
    },
    substitutes: ['Alternative resins (90% comparable)', 'Membrane technologies (65% comparable)'],
    suppliers: ['Supplier A', 'Supplier E']
  },
  {
    id: 4,
    name: 'PCR Master Mix',
    cas: '234-56-7',
    grade: 'Molecular biology-grade',
    price: '$300/unit',
    leadTime: '7-10 days',
    chemicalProfile: {
      molecularWeight: 'N/A',
      purity: '≥99%',
      form: 'Solution',
      stability: 'Stable at -20°C for 18 months'
    },
    manufacturing: {
      process: 'Enzyme production and formulation',
      quality: 'ISO 13485 certified',
      batchSize: '500-2000 units'
    },
    supplyRisk: {
      level: 'Low',
      factors: ['Multiple suppliers', 'Standard formulation'],
      mitigation: 'Regular supplier audits'
    },
    substitutes: ['Individual PCR components (95% comparable)', 'Alternative enzyme blends (80% comparable)'],
    suppliers: ['Supplier C', 'Supplier D', 'Supplier E']
  },
  {
    id: 5,
    name: 'Cell Culture Media',
    cas: '345-67-8',
    grade: 'Cell culture-grade',
    price: '$800/unit',
    leadTime: '14-21 days',
    chemicalProfile: {
      molecularWeight: 'N/A',
      purity: 'Sterile',
      form: 'Liquid',
      stability: 'Stable at 4°C for 6 months'
    },
    manufacturing: {
      process: 'Aseptic formulation',
      quality: 'GMP certified',
      batchSize: '300-1500 units'
    },
    supplyRisk: {
      level: 'Medium',
      factors: ['Component availability', 'Sterility requirements'],
      mitigation: 'Backup supplier network'
    },
    substitutes: ['Serum-free alternatives (85% comparable)', 'Chemically defined media (75% comparable)'],
    suppliers: ['Supplier B', 'Supplier D']
  }
];

const suppliers = [
  {
    id: 1,
    name: 'CDMO Alpha',
    region: 'North America',
    contract: {
      length: '2-year contract',
      expiry: format(addDays(new Date(), 120), 'MMM dd, yyyy'),
      terms: 'Net 60, Volume-based pricing',
      exclusivity: 'Non-exclusive',
      qualityMetrics: '98% acceptance rate required'
    },
    capacity: '200+ batch runs annually',
    compliance: ['ISO 9001', 'GMP'],
    riskRating: 'Low',
    geopolitical: {
      region: 'Stable',
      tradeAgreements: ['USMCA', 'CPTPP'],
      politicalStability: 'High',
      logisticsRisk: 'Low'
    },
    financial: {
      rating: 'A+',
      marketCap: '$2.5B',
      revenue: '$500M annually'
    },
    esg: {
      environmentalScore: 85,
      socialScore: 78,
      governanceScore: 92,
      certifications: ['ISO 14001', 'Carbon Neutral']
    },
    alternateProducts: ['Chromatography Resins', 'Cell Culture Media', 'Filtration Systems'],
    riskAlerts: [
      'Minor supply chain disruption expected Q3 2024',
      'Planned facility maintenance in August 2024'
    ],
    profile: {
      background: 'Founded in 1995, CDMO Alpha specializes in biopharmaceutical manufacturing.',
      generalInfo: 'Employs 1,200 staff across 3 facilities, focusing on innovative therapies.'
    },
    manufacturing: {
      capabilities: 'Aseptic processing, lyophilization, and large-scale fermentation.',
      capacities: 'Up to 500L bioreactors and 200+ batch runs annually.'
    },
    geographicPresence: {
      locations: ['USA (HQ)', 'Canada', 'Mexico'],
      infrastructure: '3 manufacturing plants, 2 distribution centers.'
    },
    quality: {
      compliance: ['ISO 9001', 'GMP', 'FDA registered'],
      qualitySystems: 'Six Sigma, real-time quality monitoring.',
      auditHistory: 'Last audit: Q1 2024, no major findings.',
      certifications: ['ISO 14001', 'Carbon Neutral']
    },
    pricing: {
      structures: 'Spot pricing for small orders; contract pricing for >100 units.',
      paymentTerms: 'Net 60 days, discounts for early payment.',
      financialStability: 'A+ rating, stable cash flow.',
      negotiationLevers: 'Volume discounts, long-term contracts.',
      costTransparency: 'Detailed cost breakdowns provided quarterly.'
    }
  },
  {
    id: 2,
    name: 'BioProcess Solutions',
    region: 'Europe',
    contract: {
      length: '3-year contract',
      expiry: format(addDays(new Date(), 450), 'MMM dd, yyyy'),
      terms: 'Net 45, Fixed pricing',
      exclusivity: 'Semi-exclusive for certain products',
      qualityMetrics: '99% acceptance rate required'
    },
    capacity: '150+ batch runs annually',
    compliance: ['ISO 9001', 'GMP', 'EMA certified'],
    riskRating: 'Low',
    geopolitical: {
      region: 'Stable',
      tradeAgreements: ['EU', 'UK-EU TCA'],
      politicalStability: 'High',
      logisticsRisk: 'Low'
    },
    financial: {
      rating: 'A',
      marketCap: '$1.8B',
      revenue: '$350M annually'
    },
    esg: {
      environmentalScore: 90,
      socialScore: 85,
      governanceScore: 88,
      certifications: ['ISO 14001', 'EMAS']
    },
    alternateProducts: ['Monoclonal Antibodies', 'PCR Reagents', 'Purification Systems'],
    riskAlerts: [
      'Regulatory changes expected in Q4 2024',
      'Investment in new production line ongoing'
    ],
    profile: {
      background: 'Established in 2000, BioProcess Solutions focuses on biologics production.',
      generalInfo: '700 employees, expertise in monoclonal antibodies and reagents.'
    },
    manufacturing: {
      capabilities: 'Cell culture, purification, and reagent formulation.',
      capacities: 'Up to 300L bioreactors, 150+ batch runs annually.'
    },
    geographicPresence: {
      locations: ['Germany (HQ)', 'France', 'UK'],
      infrastructure: '2 manufacturing sites, 1 R&D center.'
    },
    quality: {
      compliance: ['ISO 9001', 'GMP', 'EMA certified'],
      qualitySystems: 'Lean manufacturing, automated QC.',
      auditHistory: 'Last audit: Q3 2023, minor findings resolved.',
      certifications: ['ISO 14001', 'EMAS']
    },
    pricing: {
      structures: 'Fixed pricing under contract, spot pricing available.',
      paymentTerms: 'Net 45 days, flexible for large orders.',
      financialStability: 'A rating, strong revenue growth.',
      negotiationLevers: 'Long-term commitments, quality guarantees.',
      costTransparency: 'Annual cost reports provided.'
    }
  },
  {
    id: 3,
    name: 'AsiaPharma Tech',
    region: 'Asia Pacific',
    contract: {
      length: '1-year contract',
      expiry: format(addDays(new Date(), 180), 'MMM dd, yyyy'),
      terms: 'Net 30, Variable pricing',
      exclusivity: 'Non-exclusive',
      qualityMetrics: '97% acceptance rate required'
    },
    capacity: '300+ batch runs annually',
    compliance: ['ISO 9001', 'GMP', 'PMDA certified'],
    riskRating: 'Medium',
    geopolitical: {
      region: 'Moderate stability',
      tradeAgreements: ['RCEP', 'CPTPP'],
      politicalStability: 'Medium',
      logisticsRisk: 'Medium'
    },
    financial: {
      rating: 'BBB+',
      marketCap: '$900M',
      revenue: '$200M annually'
    },
    esg: {
      environmentalScore: 75,
      socialScore: 80,
      governanceScore: 82,
      certifications: ['ISO 14001']
    },
    alternateProducts: ['Cell Culture Media', 'Laboratory Plastics', 'Basic Chemicals'],
    riskAlerts: [
      'Port congestion affecting shipment times',
      'Expansion into new product lines planned'
    ],
    profile: {
      background: 'Started in 2010, AsiaPharma Tech excels in cost-effective production.',
      generalInfo: '500 employees, serving APAC markets primarily.'
    },
    manufacturing: {
      capabilities: 'High-volume synthesis, plastics molding.',
      capacities: 'Up to 1,000L reactors, 300+ batch runs annually.'
    },
    geographicPresence: {
      locations: ['China (HQ)', 'Japan', 'Singapore'],
      infrastructure: '4 production facilities, 1 logistics hub.'
    },
    quality: {
      compliance: ['ISO 9001', 'GMP', 'PMDA certified'],
      qualitySystems: 'Batch tracking, statistical process control.',
      auditHistory: 'Last audit: Q2 2024, compliance confirmed.',
      certifications: ['ISO 14001']
    },
    pricing: {
      structures: 'Variable pricing based on market rates, contract options.',
      paymentTerms: 'Net 30 days, adjustable for volume.',
      financialStability: 'BBB+ rating, moderate debt levels.',
      negotiationLevers: 'Bulk order discounts, flexible terms.',
      costTransparency: 'Monthly pricing updates shared.'
    }
  },
  {
    id: 4,
    name: 'Nordic Biotech',
    region: 'Northern Europe',
    contract: {
      length: '2-year contract',
      expiry: format(addDays(new Date(), 300), 'MMM dd, yyyy'),
      terms: 'Net 60, Tiered pricing',
      exclusivity: 'Exclusive for specific regions',
      qualityMetrics: '99.5% acceptance rate required'
    },
    capacity: '100+ batch runs annually',
    compliance: ['ISO 9001', 'GMP', 'Nordic Swan Ecolabel'],
    riskRating: 'Low',
    geopolitical: {
      region: 'Very stable',
      tradeAgreements: ['EU', 'EEA'],
      politicalStability: 'Very High',
      logisticsRisk: 'Low'
    },
    financial: {
      rating: 'AA-',
      marketCap: '$1.2B',
      revenue: '$250M annually'
    },
    esg: {
      environmentalScore: 95,
      socialScore: 92,
      governanceScore: 94,
      certifications: ['ISO 14001', 'B Corp']
    },
    alternateProducts: ['Enzyme Products', 'Diagnostic Reagents', 'Research Antibodies'],
    riskAlerts: [
      'Implementing new quality management system',
      'R&D collaboration with universities ongoing'
    ],
    profile: {
      background: 'Founded in 1985, Nordic Biotech leads in sustainable biotech solutions.',
      generalInfo: '300 employees, strong focus on R&D and diagnostics.'
    },
    manufacturing: {
      capabilities: 'Enzyme production, diagnostic reagent synthesis.',
      capacities: 'Up to 200L bioreactors, 100+ batch runs annually.'
    },
    geographicPresence: {
      locations: ['Sweden (HQ)', 'Denmark', 'Norway'],
      infrastructure: '1 manufacturing plant, 1 R&D lab.'
    },
    quality: {
      compliance: ['ISO 9001', 'GMP', 'Nordic Swan Ecolabel'],
      qualitySystems: 'Continuous improvement, ISO 13485 processes.',
      auditHistory: 'Last audit: Q4 2023, exemplary results.',
      certifications: ['ISO 14001', 'B Corp']
    },
    pricing: {
      structures: 'Tiered pricing based on order size, exclusive contracts.',
      paymentTerms: 'Net 60 days, incentives for sustainability goals.',
      financialStability: 'AA- rating, robust financial health.',
      negotiationLevers: 'Exclusivity agreements, R&D partnerships.',
      costTransparency: 'Full transparency with tiered pricing details.'
    }
  },
  {
    id: 5,
    name: 'LatAm Pharmaceuticals',
    region: 'South America',
    contract: {
      length: '18-month contract',
      expiry: format(addDays(new Date(), 240), 'MMM dd, yyyy'),
      terms: 'Net 45, Volume-based pricing',
      exclusivity: 'Non-exclusive',
      qualityMetrics: '96% acceptance rate required'
    },
    capacity: '150+ batch runs annually',
    compliance: ['ISO 9001', 'GMP', 'ANVISA certified'],
    riskRating: 'Medium',
    geopolitical: {
      region: 'Moderate stability',
      tradeAgreements: ['Mercosur'],
      politicalStability: 'Medium',
      logisticsRisk: 'Medium'
    },
    financial: {
      rating: 'BBB',
      marketCap: '$600M',
      revenue: '$150M annually'
    },
    esg: {
      environmentalScore: 80,
      socialScore: 85,
      governanceScore: 78,
      certifications: ['ISO 14001', 'Local sustainability certifications']
    },
    alternateProducts: ['Generic APIs', 'Basic Chemicals', 'Laboratory Supplies'],
    riskAlerts: [
      'Currency fluctuation affecting pricing',
      'New quality control procedures being implemented'
    ],
    profile: {
      background: 'Launched in 2005, LatAm Pharmaceuticals serves regional markets.',
      generalInfo: '400 employees, specializing in generic APIs and chemicals.'
    },
    manufacturing: {
      capabilities: 'API synthesis, aseptic filling.',
      capacities: 'Up to 400L reactors, 150+ batch runs annually.'
    },
    geographicPresence: {
      locations: ['Brazil (HQ)', 'Argentina', 'Chile'],
      infrastructure: '2 production sites, 1 distribution center.'
    },
    quality: {
      compliance: ['ISO 9001', 'GMP', 'ANVISA certified'],
      qualitySystems: 'HACCP, quality by design.',
      auditHistory: 'Last audit: Q1 2024, minor corrective actions.',
      certifications: ['ISO 14001', 'Local sustainability certifications']
    },
    pricing: {
      structures: 'Volume-based pricing, spot pricing for small batches.',
      paymentTerms: 'Net 45 days, currency hedging available.',
      financialStability: 'BBB rating, steady revenue.',
      negotiationLevers: 'Regional exclusivity, bulk pricing.',
      costTransparency: 'Quarterly cost reviews provided.'
    }
  },
  {
    id: 6,
    name: 'Asymchem (China)',
    region: 'Asia Pacific',
    contract: {
      length: '2-year contract',
      expiry: format(addDays(new Date(), 365), 'MMM dd, yyyy'),
      terms: 'Net 30, Variable pricing',
      exclusivity: 'Non-exclusive',
      qualityMetrics: '98% acceptance rate required'
    },
    capacity: '250+ batch runs annually',
    compliance: ['ISO 9001', 'GMP', 'CFDA certified'],
    riskRating: 'High',
    geopolitical: {
      region: 'Moderate stability',
      tradeAgreements: ['RCEP'],
      politicalStability: 'Medium',
      logisticsRisk: 'High',
      additionalRisk: 'New Trump Tariffs'
    },
    financial: {
      rating: 'A-',
      marketCap: '$1.5B',
      revenue: '$300M annually'
    },
    esg: {
      environmentalScore: 78,
      socialScore: 82,
      governanceScore: 85,
      certifications: ['ISO 14001']
    },
    alternateProducts: ['APIs', 'Intermediates', 'Specialty Chemicals'],
    riskAlerts: [
      'New Trump Tariffs increasing costs starting Q2 2025',
      'Port delays in Tianjin affecting shipments'
    ],
    profile: {
      background: 'Founded in 1998, Asymchem specializes in API and intermediate production.',
      generalInfo: '900 employees, known for custom synthesis and process development.'
    },
    manufacturing: {
      capabilities: 'Custom synthesis, high-potency API production.',
      capacities: 'Up to 600L reactors, 250+ batch runs annually.'
    },
    geographicPresence: {
      locations: ['China (HQ)', 'USA (sales office)'],
      infrastructure: '3 manufacturing plants, 1 R&D center.'
    },
    quality: {
      compliance: ['ISO 9001', 'GMP', 'CFDA certified'],
      qualitySystems: 'Real-time process monitoring, GMP audits.',
      auditHistory: 'Last audit: Q3 2024, full compliance.',
      certifications: ['ISO 14001']
    },
    pricing: {
      structures: 'Variable pricing due to tariff impacts, contract options.',
      paymentTerms: 'Net 30 days, adjustments for tariff costs.',
      financialStability: 'A- rating, solid cash reserves.',
      negotiationLevers: 'Volume commitments, tariff mitigation strategies.',
      costTransparency: 'Monthly tariff impact reports provided.'
    }
  },
  {
    id: 7,
    name: 'WuXi AppTec (China)',
    region: 'Asia Pacific',
    contract: {
      length: '3-year contract',
      expiry: format(addDays(new Date(), 730), 'MMM dd, yyyy'),
      terms: 'Net 45, Tiered pricing',
      exclusivity: 'Non-exclusive',
      qualityMetrics: '97% acceptance rate required'
    },
    capacity: '400+ batch runs annually',
    compliance: ['ISO 9001', 'GMP', 'FDA certified'],
    riskRating: 'High',
    geopolitical: {
      region: 'Moderate stability',
      tradeAgreements: ['RCEP'],
      politicalStability: 'Medium',
      logisticsRisk: 'High',
      additionalRisk: 'New Trump Tariffs'
    },
    financial: {
      rating: 'A',
      marketCap: '$3.2B',
      revenue: '$700M annually'
    },
    esg: {
      environmentalScore: 80,
      socialScore: 83,
      governanceScore: 87,
      certifications: ['ISO 14001', 'Green Chemistry Award']
    },
    alternateProducts: ['Biologics', 'Small Molecules', 'Analytical Services'],
    riskAlerts: [
      'New Trump Tariffs impacting export costs starting Q2 2025',
      'Expansion of biologics facility planned for 2025'
    ],
    profile: {
      background: 'Established in 2000, WuXi AppTec is a global leader in contract research and manufacturing.',
      generalInfo: '2,500 employees, extensive biologics and small molecule expertise.'
    },
    manufacturing: {
      capabilities: 'Biologics production, small molecule synthesis, analytical testing.',
      capacities: 'Up to 1,200L bioreactors, 400+ batch runs annually.'
    },
    geographicPresence: {
      locations: ['China (HQ)', 'USA', 'Germany'],
      infrastructure: '5 manufacturing sites, 2 R&D centers.'
    },
    quality: {
      compliance: ['ISO 9001', 'GMP', 'FDA certified'],
      qualitySystems: 'Advanced analytics, continuous quality improvement.',
      auditHistory: 'Last audit: Q2 2024, no major issues.',
      certifications: ['ISO 14001', 'Green Chemistry Award']
    },
    pricing: {
      structures: 'Tiered pricing with tariff adjustments, spot pricing available.',
      paymentTerms: 'Net 45 days, flexible for long-term partners.',
      financialStability: 'A rating, strong revenue growth.',
      negotiationLevers: 'Long-term contracts, diversified services.',
      costTransparency: 'Quarterly financial impact reports shared.'
    }
  }
];

// Updated programs data with status and criticality
const programs = [
  {
    id: 1,
    therapeuticArea: 'Central Nervous System (CNS)',
    programName: 'RD20',
    status: 'Active',
    criticality: 'High',
    suppliers: [
      {
        name: 'CDMO Alpha',
        materials: ['Chromatography Resins', 'Cell Culture Media']
      },
      {
        name: 'BioProcess Solutions',
        materials: ['Monoclonal Antibodies']
      }
    ]
  },
  {
    id: 2,
    therapeuticArea: 'Central Nervous System (CNS)',
    programName: 'CNS-45',
    status: 'Inactive',
    criticality: 'Low',
    suppliers: [
      {
        name: 'AsiaPharma Tech',
        materials: ['Cell Culture Media']
      }
    ]
  },
  {
    id: 3,
    therapeuticArea: 'Oncology',
    programName: 'ONC-15',
    status: 'Completed',
    criticality: 'Medium',
    suppliers: [
      {
        name: 'Nordic Biotech',
        materials: ['PCR Master Mix']
      },
      {
        name: 'LatAm Pharmaceuticals',
        materials: ['Cell Culture Media']
      }
    ]
  },
  {
    id: 4,
    therapeuticArea: 'Immunology',
    programName: 'IMM-30',
    status: 'Active',
    criticality: 'Medium',
    suppliers: [
      {
        name: 'CDMO Alpha',
        materials: ['PG-Seq Indexing Primers']
      },
      {
        name: 'BioProcess Solutions',
        materials: ['Monoclonal Antibodies', 'PCR Master Mix']
      }
    ]
  }
];

// Components (unchanged until ProgramsPage)
const Navbar = ({ active, setActive }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'materials', label: 'Materials', icon: Package },
    { id: 'suppliers', label: 'Suppliers', icon: Users },
    { id: 'programs', label: 'Programs', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'demo', label: 'Demo', icon: MessageSquare }, // Added Demo to navigation
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  active === item.id
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Bell className="w-5 h-5" />
            </button>
            <button className="ml-4 p-2 text-gray-500 hover:text-gray-700">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const SearchBar = ({ onSearch }) => (
  <div className="max-w-2xl mx-auto mb-8">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Search materials or suppliers..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  </div>
);

const DetailModal = ({ isOpen, onClose, data, type }) => {
  if (!data) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {type === 'material' ? (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Chemical Profile</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Molecular Weight:</strong> {data.chemicalProfile.molecularWeight}</div>
              <div><strong>Purity:</strong> {data.chemicalProfile.purity}</div>
              <div><strong>Form:</strong> {data.chemicalProfile.form}</div>
              <div><strong>Stability:</strong> {data.chemicalProfile.stability}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Manufacturing</h3>
            <div className="space-y-2">
              <div><strong>Process:</strong> {data.manufacturing.process}</div>
              <div><strong>Quality:</strong> {data.manufacturing.quality}</div>
              <div><strong>Batch Size:</strong> {data.manufacturing.batchSize}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Supply Risk</h3>
            <div className="space-y-2">
              <div><strong>Risk Level:</strong> {data.supplyRisk.level}</div>
              <div><strong>Risk Factors:</strong> {data.supplyRisk.factors.join(', ')}</div>
              <div><strong>Mitigation Strategy:</strong> {data.supplyRisk.mitigation}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Substitutes & Suppliers</h3>
            <div className="space-y-2">
              <div><strong>Substitutes:</strong></div>
              <ul className="list-disc pl-5">
                {data.substitutes.map((sub, index) => (
                  <li key={index}>{sub}</li>
                ))}
              </ul>
              <div><strong>Associated Suppliers:</strong></div>
              <ul className="list-disc pl-5">
                {data.suppliers.map((supplier, index) => (
                  <li key={index}>{supplier}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Contract Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Length:</strong> {data.contract.length}</div>
              <div><strong>Expiry:</strong> {data.contract.expiry}</div>
              <div><strong>Terms:</strong> {data.contract.terms}</div>
              <div><strong>Exclusivity:</strong> {data.contract.exclusivity}</div>
              <div><strong>Quality Metrics:</strong> {data.contract.qualityMetrics}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Supplier Profiles</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">2.1 Company Background and General Information</h4>
                <p><strong>Background:</strong> {data.profile?.background || 'N/A'}</p>
                <p><strong>General Info:</strong> {data.profile?.generalInfo || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">2.2 Manufacturing Capabilities and Capacities</h4>
                <p><strong>Capabilities:</strong> {data.manufacturing?.capabilities || data.manufacturing?.process || 'N/A'}</p>
                <p><strong>Capacities:</strong> {data.manufacturing?.capacities || data.capacity || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">2.3 Geographic Presence and Infrastructure</h4>
                <p><strong>Locations:</strong> {data.geographicPresence?.locations?.join(', ') || data.region || 'N/A'}</p>
                <p><strong>Infrastructure:</strong> {data.geographicPresence?.infrastructure || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Supplier Quality and Certifications</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">3.1 Compliance with Industry Standards and Regulatory Bodies</h4>
                <p><strong>Compliance:</strong> {data.quality?.compliance?.join(', ') || data.compliance.join(', ') || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">3.2 Quality Assurance and Control Systems</h4>
                <p><strong>Quality Systems:</strong> {data.quality?.qualitySystems || data.manufacturing?.quality || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">3.3 Audit History and Certifications</h4>
                <p><strong>Audit History:</strong> {data.quality?.auditHistory || 'N/A'}</p>
                <p><strong>Certifications:</strong> {data.quality?.certifications?.join(', ') || data.esg.certifications.join(', ') || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Pricing and Contract Terms</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">4.1 Pricing Structures (Spot vs. Contract)</h4>
                <p><strong>Structures:</strong> {data.pricing?.structures || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">4.2 Payment Terms and Financial Stability</h4>
                <p><strong>Payment Terms:</strong> {data.pricing?.paymentTerms || data.contract.terms || 'N/A'}</p>
                <p><strong>Financial Stability:</strong> {data.pricing?.financialStability || data.financial.rating || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">4.3 Negotiation Levers and Cost Transparency</h4>
                <p><strong>Negotiation Levers:</strong> {data.pricing?.negotiationLevers || 'N/A'}</p>
                <p><strong>Cost Transparency:</strong> {data.pricing?.costTransparency || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Financial & ESG</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Financial</h4>
                <div><strong>Rating:</strong> {data.financial.rating}</div>
                <div><strong>Market Cap:</strong> {data.financial.marketCap}</div>
                <div><strong>Revenue:</strong> {data.financial.revenue}</div>
              </div>
              <div>
                <h4 className="font-medium mb-2">ESG Scores</h4>
                <div><strong>Environmental:</strong> {data.esg.environmentalScore}</div>
                <div><strong>Social:</strong> {data.esg.socialScore}</div>
                <div><strong>Governance:</strong> {data.esg.governanceScore}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Geopolitical Factors</h3>
            <div className="space-y-2">
              <div><strong>Region Stability:</strong> {data.geopolitical.region}</div>
              <div><strong>Trade Agreements:</strong> {data.geopolitical.tradeAgreements.join(', ')}</div>
              <div><strong>Political Stability:</strong> {data.geopolitical.politicalStability}</div>
              <div><strong>Logistics Risk:</strong> {data.geopolitical.logisticsRisk}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Alternate Products & Risk Alerts</h3>
            <div className="space-y-4">
              <div>
                <strong>Alternate Products:</strong>
                <ul className="list-disc pl-5 mt-2">
                  {data.alternateProducts.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Risk Alerts:</strong>
                <ul className="list-disc pl-5 mt-2">
                  {data.riskAlerts.map((alert, index) => (
                    <li key={index} className="text-red-600">{alert}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

const AlertBadge = ({ count, type }) => (
  <div className="flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
    <AlertTriangle className="w-4 h-4 mr-1" />
    {count} new {type}
  </div>
);

const HomePage = () => {
  const getRiskIcon = (risk) => {
    switch (risk) {
      case "High":
        return <Flame className="text-red-500" title="High Risk" />;
      case "Medium":
        return <AlertTriangle className="text-yellow-500" title="Medium Risk" />;
      case "Low":
        return <CheckCircle className="text-green-500" title="Low Risk" />;
      default:
        return null;
    }
  };

  const getPerformanceIcon = (trend) => {
    switch (trend) {
      case "Up":
        return <TrendingUp className="text-green-600" title="Improving Performance" />;
      case "Down":
        return <TrendingDown className="text-red-600" title="Declining Performance" />;
      default:
        return null;
    }
  };

  const topPerformers = [
    {
      name: "Catalent",
      performance: "98% on-time delivery, A+ quality rating",
      pastPerformance: "Up",
    },
    {
      name: "Patheon",
      performance: "95% on-time delivery, A quality rating",
      pastPerformance: "Up",
    },
    {
      name: "Sartorius",
      performance: "97% on-time delivery, A quality rating",
      pastPerformance: "Up", 
    },
  ];

  return (
    <div className="py-8 h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col min-h-0">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Quick Analytics</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-indigo-600 text-sm font-medium">Active Contracts</p>
              <p className="text-2xl font-bold text-indigo-900">24</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600 text-sm font-medium">Contracts Expiring This Month</p>
              <p className="text-2xl font-bold text-red-900">3</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-600 text-sm font-medium">Supply Risk Level</p>
              <p className="text-2xl font-bold text-green-900">Low</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Suppliers with Geopolitical Risks</h2>
            <div className="flex-1 overflow-y-auto max-h-72 min-h-0">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Risk</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm">Asymchem (China)</td>
                    <td className="px-4 py-2 text-sm text-gray-600">New Trump Tariffs</td>
                    <td className="px-4 py-2">{getRiskIcon("High")}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">WuXi AppTec (China)</td>
                    <td className="px-4 py-2 text-sm text-gray-600">New Trump Tariffs</td>
                    <td className="px-4 py-2">{getRiskIcon("High")}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">Lonza (Switzerland)</td>
                    <td className="px-4 py-2 text-sm text-gray-600">EU regulatory changes</td>
                    <td className="px-4 py-2">{getRiskIcon("Medium")}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">Samsung Biologics (South Korea)</td>
                    <td className="px-4 py-2 text-sm text-gray-600">Regional political instability</td>
                    <td className="px-4 py-2">{getRiskIcon("Medium")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Contracts Expiring Within 30 Days ⏳</h2>
            <div className="overflow-y-auto max-h-72 space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Thermo Fisher Scientific</p>
                <p className="text-sm text-gray-500">Expires: Apr 15, 2025</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Merck KGaA</p>
                <p className="text-sm text-gray-500">Expires: Apr 28, 2025</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Halochem</p>
                <p className="text-sm text-gray-500">Expires: Apr 30, 2025</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Top Performing Suppliers 👏</h2>
            <div className="overflow-y-auto max-h-72 space-y-4">
              {topPerformers.map((supplier, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{supplier.name}</p>
                  <p className="text-sm text-gray-500">{supplier.performance}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-600 mr-2">Past Performance:</span>
                    {getPerformanceIcon(supplier.pastPerformance)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MaterialsPage = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Materials</h2>
          <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Export List
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Ask LLM
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CAS #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => {
                  setSelectedMaterial(material);
                  setIsModalOpen(true);
                }}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.cas}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.leadTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DetailModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMaterial(null);
          }}
          data={selectedMaterial}
          type="material"
        />
      </div>
    </div>
  );
};

const SuppliersPage = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Suppliers</h2>
          <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Export List
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Ask LLM
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => {
                  setSelectedSupplier(supplier);
                  setIsModalOpen(true);
                }}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supplier.contract.length}</div>
                    <div className="text-sm text-gray-500">Expires: {supplier.contract.expiry}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      supplier.riskRating === 'Low' ? 'bg-green-100 text-green-800' :
                      supplier.riskRating === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {supplier.riskRating}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <DetailModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSupplier(null);
          }}
          data={selectedSupplier}
          type="supplier"
        />
      </div>
    </div>
  );
};

// Updated ProgramsPage with new columns and sub-row structure
const ProgramsPage = () => {
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  
  const programOptions = ['All Programs', ...programs.map(p => p.programName)];
  
  const filteredPrograms = selectedProgram === 'All Programs'
    ? programs
    : programs.filter(p => p.programName === selectedProgram);

  const handleProgramChange = (e) => {
    setSelectedProgram(e.target.value);
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Programs</h2>
          <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Export List
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Ask LLM
            </button>
          </div>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="mb-4 sm:mb-0 sm:mr-4">
              <h3 className="text-lg font-medium text-gray-900">Filter Programs</h3>
              <p className="text-sm text-gray-500">Select a program to view details</p>
            </div>
            <div className="flex-1 sm:max-w-xs">
              <select
                value={selectedProgram}
                onChange={handleProgramChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {programOptions.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {selectedProgram !== 'All Programs' && (
            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {selectedProgram}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                Showing {filteredPrograms.length} program{filteredPrograms.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Therapeutic Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Criticality</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suppliers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materials</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => (
                  <React.Fragment key={program.id}>
                    {/* Main row */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" rowSpan={program.suppliers.length || 1}>
                        {program.therapeuticArea}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" rowSpan={program.suppliers.length || 1}>
                        {program.programName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" rowSpan={program.suppliers.length || 1}>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          program.status === 'Active' ? 'bg-green-100 text-green-800' :
                          program.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {program.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" rowSpan={program.suppliers.length || 1}>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          program.criticality === 'High' ? 'bg-red-100 text-red-800' :
                          program.criticality === 'Low' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {program.criticality}
                        </span>
                      </td>
                      {program.suppliers.length > 0 && (
                        <>
                          <td className="px-6 py-2 text-sm text-gray-500">{program.suppliers[0].name}</td>
                          <td className="px-6 py-2 text-sm text-gray-500">{program.suppliers[0].materials.join(', ')}</td>
                        </>
                      )}
                    </tr>
                    {/* Subrows for additional suppliers */}
                    {program.suppliers.slice(1).map((supplier, index) => (
                      <tr key={`${program.id}-supplier-${index}`} className="hover:bg-gray-50 border-t border-gray-200">
                        <td className="px-6 py-2 text-sm text-gray-500">{supplier.name}</td>
                        <td className="px-6 py-2 text-sm text-gray-500">{supplier.materials.join(', ')}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                    No programs found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AnalyticsPage = () => {
  const totalSuppliers = suppliers.length;
  const totalMaterials = materials.length;
  const avgLeadTime = materials.reduce((sum, m) => {
    const [min, max] = m.leadTime.split('-').map(t => parseInt(t));
    return sum + (min + max) / 2;
  }, 0) / totalMaterials;
  const highRiskSuppliers = suppliers.filter(s => s.riskRating === 'Medium' || s.riskRating === 'High').length;
  const supplierComplianceRate = Math.round((suppliers.reduce((sum, s) => {
    const rate = parseFloat(s.contract.qualityMetrics.match(/\d+%/)?.[0] || '0');
    return sum + rate;
  }, 0) / totalSuppliers));

  const geopoliticalRisks = [
    {
      region: 'North America',
      risk: 'Stable with minor tariff adjustments expected in Q2 2025.',
      impact: 'Low impact on lead times, slight cost increase possible.'
    },
    {
      region: 'Europe',
      risk: 'Regulatory changes in EU affecting biologics compliance starting Q4 2025.',
      impact: 'Moderate delays in approvals, increased compliance costs.'
    },
    {
      region: 'Asia Pacific',
      risk: 'Port congestion in China and trade tensions with US affecting shipments.',
      impact: 'Lead time extensions of 1-2 weeks, cost volatility.'
    },
    {
      region: 'Northern Europe',
      risk: 'Very stable, no significant risks identified.',
      impact: 'Minimal impact on supply chain.'
    },
    {
      region: 'South America',
      risk: 'Currency fluctuations and moderate political instability.',
      impact: 'Pricing variability, potential delays in logistics.'
    }
  ];

  const onTimeDelivery = 92;
  const supplierQualityRating = supplierComplianceRate - 5;
  const costVariance = 12;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Supply Chain Analytics</h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            Ask LLM
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Geopolitical & Regional Risk Assessment</h3>
          </div>
          <div className="px-6 py-5">
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                Analysis based on current supplier regions as of April 04, 2025, indicates varied risk levels across key operational areas.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {geopoliticalRisks.map((risk, index) => (
                  <li key={index}>
                    <strong>{risk.region}:</strong> {risk.risk} <em>({risk.impact})</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Supply Chain Risk Index</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {highRiskSuppliers / totalSuppliers > 0.5 ? 'High' : highRiskSuppliers / totalSuppliers > 0.3 ? 'Medium' : 'Low'}
              </dd>
              <div className="mt-4">
                <div 
                  className={`rounded-full h-2 ${highRiskSuppliers / totalSuppliers > 0.5 ? 'bg-red-100' : 'bg-yellow-100'}`} 
                  style={{ width: `${(highRiskSuppliers / totalSuppliers) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Supplier Compliance Rate</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{supplierComplianceRate}%</dd>
              <div className="mt-4">
                <div className="bg-green-100 rounded-full h-2" style={{ width: `${supplierComplianceRate}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Critical Material Risk</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {materials.some(m => m.supplyRisk.level === 'High') ? 'High' : materials.some(m => m.supplyRisk.level === 'Medium') ? 'Medium' : 'Low'}
              </dd>
              <div className="mt-4">
                <div 
                  className={`rounded-full h-2 ${materials.some(m => m.supplyRisk.level === 'High') ? 'bg-red-100' : 'bg-yellow-100'}`} 
                  style={{ width: `${materials.filter(m => m.supplyRisk.level !== 'Low').length / totalMaterials * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Supply Chain Health Indicators</h3>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">On-Time Delivery Performance</h4>
                <div className="mt-2 flex items-center">
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 rounded-full h-2" style={{ width: `${onTimeDelivery}%` }}></div>
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">{onTimeDelivery}%</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Based on industry benchmarks and supplier capacity data.</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Supplier Quality Rating</h4>
                <div className="mt-2 flex items-center">
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 rounded-full h-2" style={{ width: `${supplierQualityRating}%` }}></div>
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">{supplierQualityRating}%</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Derived from average supplier quality metrics.</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Cost Variance</h4>
                <div className="mt-2 flex items-center">
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 rounded-full h-2" style={{ width: `${costVariance}%` }}></div>
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">+{costVariance}%</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Reflects pricing variability from AsiaPharma Tech and LatAm Pharmaceuticals.</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Average Lead Time</h4>
                <div className="mt-2 flex items-center">
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-500 rounded-full h-2" style={{ width: `${(avgLeadTime / 45) * 100}%` }}></div>
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">{Math.round(avgLeadTime)} days</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">Calculated from material lead times (max assumed 45 days).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Demo Page with YouTube Video
const DemoPage = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Demo - LLM Responses</h2>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">LLM Response Demonstration</h3>
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/Kiq6JzL2R1I"
              title="LLM Response Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [active, setActive] = useState('home');

  const renderPage = () => {
    switch (active) {
      case 'home':
        return <HomePage />;
      case 'materials':
        return <MaterialsPage />;
      case 'suppliers':
        return <SuppliersPage />;
      case 'programs':
        return <ProgramsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'demo':
        return <DemoPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar active={active} setActive={setActive} />
      {renderPage()}
    </div>
  );
}

export default App;