import QRCode from 'qrcode';

/**
 * Generates a QR code as a data URL from booking details
 * @param {Object} bookingDetails - The ticket booking details to encode in the QR code
 * @returns {Promise<string>} - Promise resolving to a data URL containing the QR code
 */
export const generateQRCode = async (bookingDetails) => {
  try {
    // Convert booking details to JSON string
    const bookingString = JSON.stringify(bookingDetails);
    
    // Generate QR code as data URL
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
 * Generates a QR code and renders it to a canvas element
 * @param {string} canvasId - The ID of the canvas element to render to
 * @param {Object} bookingDetails - The ticket booking details to encode
 * @returns {Promise<void>}
 */
export const renderQRCodeToCanvas = async (canvasId, bookingDetails) => {
  try {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      throw new Error(`Canvas element with ID "${canvasId}" not found`);
    }
    
    // Convert booking details to JSON string
    const bookingString = JSON.stringify(bookingDetails);
    
    // Render QR code to canvas
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

// Create a named export object to avoid ESLint warning
const qrCodeUtils = {
  generateQRCode,
  renderQRCodeToCanvas
};

export default qrCodeUtils;