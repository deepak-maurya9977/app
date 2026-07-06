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
      </Route>
    </Routes>
  );
}
