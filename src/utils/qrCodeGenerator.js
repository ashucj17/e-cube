import QRCode from 'qrcode';

/**
 * Generates a QR code as a data URL from booking details
 * @param {Object} bookingDetails - The ticket booking details to encode in the QR code
 * @returns {Promise<string>} - Promise resolving to a data URL containing the QR code
 */
export const generateQRCode = async (bookingDetails) => {
  try {
 
    const bookingString = JSON.stringify(bookingDetails);

    const qrCodeDataURL = await QRCode.toDataURL(bookingString, {
      width: 250,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

/**
 * @param {string} canvasId
 * @param {Object} bookingDetails
 * @returns {Promise<void>}
 */
export const renderQRCodeToCanvas = async (canvasId, bookingDetails) => {
  try {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      throw new Error(`Canvas element with ID "${canvasId}" not found`);
    }
    

    const bookingString = JSON.stringify(bookingDetails);

    await QRCode.toCanvas(canvas, bookingString, {
      width: 250,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
  } catch (error) {
    console.error('Error rendering QR code to canvas:', error);
    throw new Error('Failed to render QR code');
  }
};

const qrCodeUtils = {
  generateQRCode,
  renderQRCodeToCanvas
};

export default qrCodeUtils;