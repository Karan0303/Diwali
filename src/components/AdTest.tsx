import { useEffect, useState } from 'preact/hooks';
import AdsterraAd from './AdsterraAd';

const AdTest = () => {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Test if Adsterra script is loaded
    const checkAdScript = () => {
      const script = document.querySelector('script[src*="effectivegatecpm.com"]');
      if (script) {
        setAdLoaded(true);
        console.log('Adsterra script loaded successfully');
      } else {
        console.log('Adsterra script not found');
      }
    };

    // Check immediately and after a delay
    checkAdScript();
    const timer = setTimeout(checkAdScript, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div class="p-4 bg-gray-100 rounded-lg m-4">
      <h3 class="text-lg font-bold mb-4">Ad Integration Test</h3>
      <p class="mb-2">Ad Script Status: {adLoaded ? '✅ Loaded' : '❌ Not Loaded'}</p>
      
      <div class="mb-4">
        <h4 class="font-semibold mb-2">Banner Ad Test:</h4>
        <AdsterraAd adId="test-banner-ad" adType="banner" />
      </div>
      
      <div class="mb-4">
        <h4 class="font-semibold mb-2">Rectangle Ad Test:</h4>
        <AdsterraAd adId="test-rectangle-ad" adType="rectangle" />
      </div>
    </div>
  );
};

export default AdTest;
