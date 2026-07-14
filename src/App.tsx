import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Gallery from '@/pages/Gallery';
import Career from '@/pages/Career';
import Contact from '@/pages/Contact';

// City landing page template and data
import CityLandingPage from '@/pages/services/CityLandingPage';
import { cityPages } from '@/lib/cityPageData';

// Service pages
import AmazonAccountLaunch from '@/pages/services/amazon-account-launch';
import FlipkartAccountLaunch from '@/pages/services/flipkart-account-launch';
import MeeshoAccountLaunch from '@/pages/services/meesho-account-launch';
import JiomartAccountLaunch from '@/pages/services/jiomart-account-launch';
import AmazonAccountManagement from '@/pages/services/amazon-account-management';
import FlipkartAccountManagement from '@/pages/services/flipkart-account-management';
import MeeshoAccountManagement from '@/pages/services/meesho-account-management';
import JiomartAccountManagement from '@/pages/services/jiomart-account-management';
import AmazonAdvertisement from '@/pages/services/amazon-advertisement';
import FlipkartAdvertisement from '@/pages/services/flipkart-advertisement';
import MeeshoAdvertisement from '@/pages/services/meesho-advertisement';
import JiomartAdvertisement from '@/pages/services/jiomart-advertisement';
import AccountingTaxation from '@/pages/services/accounting-taxation';
import WebsiteDevelopment from '@/pages/services/website-development';
import BrandStore from '@/pages/services/brand-store';
import BrandLogoDesign from '@/pages/services/brand-logo-design';
import ListingCataloging from '@/pages/services/listing-cataloging';
import WarehouseFacility from '@/pages/services/warehouse-facility';
import SellerReinstatement from '@/pages/services/seller-reinstatement';
import ProductPhotography from '@/pages/services/product-photography';
import DigitalMarketing from '@/pages/services/digital-marketing';
import EnhanceBrandContent from '@/pages/services/enhance-brand-content';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />

        {/* Service pages */}
        <Route path="/services/amazon-account-launch" element={<AmazonAccountLaunch />} />
        <Route path="/services/flipkart-account-launch" element={<FlipkartAccountLaunch />} />
        <Route path="/services/meesho-account-launch" element={<MeeshoAccountLaunch />} />
        <Route path="/services/jiomart-account-launch" element={<JiomartAccountLaunch />} />
        <Route path="/services/amazon-account-management" element={<AmazonAccountManagement />} />
        <Route path="/services/flipkart-account-management" element={<FlipkartAccountManagement />} />
        <Route path="/services/meesho-account-management" element={<MeeshoAccountManagement />} />
        <Route path="/services/jiomart-account-management" element={<JiomartAccountManagement />} />
        <Route path="/services/amazon-advertisement" element={<AmazonAdvertisement />} />
        <Route path="/services/flipkart-advertisement" element={<FlipkartAdvertisement />} />
        <Route path="/services/meesho-advertisement" element={<MeeshoAdvertisement />} />
        <Route path="/services/jiomart-advertisement" element={<JiomartAdvertisement />} />
        <Route path="/services/accounting-taxation" element={<AccountingTaxation />} />
        <Route path="/services/website-development" element={<WebsiteDevelopment />} />
        <Route path="/services/brand-store" element={<BrandStore />} />
        <Route path="/services/brand-logo-design" element={<BrandLogoDesign />} />
        <Route path="/services/listing-cataloging" element={<ListingCataloging />} />
        <Route path="/services/warehouse-facility" element={<WarehouseFacility />} />
        <Route path="/services/seller-reinstatement" element={<SellerReinstatement />} />
        <Route path="/services/product-photography" element={<ProductPhotography />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/services/enhance-brand-content" element={<EnhanceBrandContent />} />

        {/* City landing pages — 21 routes: 7 services × 3 cities (Delhi, Mumbai, Bangalore) */}
        {/* Amazon Account Management */}
        <Route path="/services/amazon-account-management-delhi" element={<CityLandingPage data={cityPages['amazon-account-management-delhi']} />} />
        <Route path="/services/amazon-account-management-mumbai" element={<CityLandingPage data={cityPages['amazon-account-management-mumbai']} />} />
        <Route path="/services/amazon-account-management-bangalore" element={<CityLandingPage data={cityPages['amazon-account-management-bangalore']} />} />
        {/* Flipkart Account Management */}
        <Route path="/services/flipkart-account-management-delhi" element={<CityLandingPage data={cityPages['flipkart-account-management-delhi']} />} />
        <Route path="/services/flipkart-account-management-mumbai" element={<CityLandingPage data={cityPages['flipkart-account-management-mumbai']} />} />
        <Route path="/services/flipkart-account-management-bangalore" element={<CityLandingPage data={cityPages['flipkart-account-management-bangalore']} />} />
        {/* Meesho Account Management */}
        <Route path="/services/meesho-account-management-delhi" element={<CityLandingPage data={cityPages['meesho-account-management-delhi']} />} />
        <Route path="/services/meesho-account-management-mumbai" element={<CityLandingPage data={cityPages['meesho-account-management-mumbai']} />} />
        <Route path="/services/meesho-account-management-bangalore" element={<CityLandingPage data={cityPages['meesho-account-management-bangalore']} />} />
        {/* JioMart Account Management */}
        <Route path="/services/jiomart-account-management-delhi" element={<CityLandingPage data={cityPages['jiomart-account-management-delhi']} />} />
        <Route path="/services/jiomart-account-management-mumbai" element={<CityLandingPage data={cityPages['jiomart-account-management-mumbai']} />} />
        <Route path="/services/jiomart-account-management-bangalore" element={<CityLandingPage data={cityPages['jiomart-account-management-bangalore']} />} />
        {/* Amazon Advertisement */}
        <Route path="/services/amazon-advertisement-delhi" element={<CityLandingPage data={cityPages['amazon-advertisement-delhi']} />} />
        <Route path="/services/amazon-advertisement-mumbai" element={<CityLandingPage data={cityPages['amazon-advertisement-mumbai']} />} />
        <Route path="/services/amazon-advertisement-bangalore" element={<CityLandingPage data={cityPages['amazon-advertisement-bangalore']} />} />
        {/* Digital Marketing */}
        <Route path="/services/digital-marketing-delhi" element={<CityLandingPage data={cityPages['digital-marketing-delhi']} />} />
        <Route path="/services/digital-marketing-mumbai" element={<CityLandingPage data={cityPages['digital-marketing-mumbai']} />} />
        <Route path="/services/digital-marketing-bangalore" element={<CityLandingPage data={cityPages['digital-marketing-bangalore']} />} />
        {/* Website Development */}
        <Route path="/services/website-development-delhi" element={<CityLandingPage data={cityPages['website-development-delhi']} />} />
        <Route path="/services/website-development-mumbai" element={<CityLandingPage data={cityPages['website-development-mumbai']} />} />
        <Route path="/services/website-development-bangalore" element={<CityLandingPage data={cityPages['website-development-bangalore']} />} />
      </Route>
    </Routes>
  );
}
