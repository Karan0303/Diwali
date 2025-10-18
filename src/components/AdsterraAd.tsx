import { useEffect, useRef } from 'preact/hooks';

interface AdsterraAdProps {
  adId: string;
  adType?: 'banner' | 'rectangle' | 'skyscraper';
  className?: string;
  style?: Record<string, string>;
}

const AdsterraAd = ({ adId, adType = 'banner', className = '', style = {} }: AdsterraAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Clear any existing content
    adRef.current.innerHTML = '';

    // Create the ad container
    const adContainer = document.createElement('div');
    adContainer.id = adId;
    adContainer.style.cssText = `
      width: 100%;
      min-height: ${adType === 'banner' ? '90px' : adType === 'rectangle' ? '250px' : '600px'};
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      margin: 10px 0;
    `;

    // Add loading text
    adContainer.innerHTML = '<div style="color: #6c757d; font-size: 14px;">Loading ad...</div>';

    adRef.current.appendChild(adContainer);

    // Load the Adsterra script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.effectivegatecpm.com/vyb4nvaf65?key=955f43b39303488f51e8e3f42f0ed784';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Replace loading text with actual ad
      if (adContainer) {
        adContainer.innerHTML = `
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
            <div style="color: #28a745; font-size: 14px;">Advertisement</div>
          </div>
        `;
      }
    };

    script.onerror = () => {
      // Handle ad loading error gracefully
      if (adContainer) {
        adContainer.innerHTML = '<div style="color: #dc3545; font-size: 12px;">Ad unavailable</div>';
      }
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [adId, adType]);

  return (
    <div 
      ref={adRef} 
      className={`adsterra-ad ${className}`}
      data-ad-type={adType}
      style={{
        width: '100%',
        maxWidth: adType === 'banner' ? '728px' : adType === 'rectangle' ? '300px' : '160px',
        margin: '0 auto',
        ...style
      }}
    />
  );
};

export default AdsterraAd;
