export default function useDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    );
  const isPWA = window.matchMedia("(display-mode: standalone)").matches;
  const isAndroid = /android/.test(userAgent);
  const isIOS = /iphone|ipad|ipod/.test(userAgent);

  return {
    isDesktopDevice: !isMobile,
    isMobileDevice: isMobile,
    isPWADevice: isPWA,
    isAndroidDevice: isAndroid,
    isIOSDevice: isIOS,
  };
}
