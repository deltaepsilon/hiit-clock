export default async function dataUrlToBlob(dataUrl) {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = function() {
        try {
          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;

          ctx.drawImage(this, 0, 0);

          canvas.toBlob(resolve);
        } catch (error) {
          reject(error);
        }
      };

      img.src = dataUrl;
    } catch (error) {
      reject(error);
    }
  });
}
