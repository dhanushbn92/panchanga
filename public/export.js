// ============================================
// Export Functionality Module
// PDF Export and Share Image
// ============================================

/**
 * Export Panchanga as PDF
 */
async function exportAsPDF() {
    try {
        const element = document.getElementById('panchanga-display-section');
        if (!element) {
            alert('No panchanga data to export!');
            return;
        }

        // Get current date for filename
        const dateInput = document.getElementById('date-input');
        const dateStr = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];

        // Configure PDF options
        const opt = {
            margin: 10,
            filename: `Panchanga_${dateStr}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Show loading state
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Generating PDF...';
        button.disabled = true;

        // Generate PDF
        await html2pdf().set(opt).from(element).save();

        // Restore button
        button.textContent = originalText;
        button.disabled = false;

    } catch (error) {
        console.error('PDF export error:', error);
        alert('Error exporting PDF. Please try again.');
    }
}

/**
 * Export Panchanga as Image
 */
async function exportAsImage() {
    try {
        const element = document.getElementById('panchanga-display-section');
        if (!element) {
            alert('No panchanga data to export!');
            return;
        }

        // Get current date for filename
        const dateInput = document.getElementById('date-input');
        const dateStr = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];

        // Show loading state
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Generating Image...';
        button.disabled = true;

        // Convert to canvas
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: getComputedStyle(document.body).backgroundColor
        });

        // Convert to blob
        canvas.toBlob(async (blob) => {
            // Try to use Web Share API if available (mobile devices)
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], 'panchanga.png')] })) {
                try {
                    const file = new File([blob], `Panchanga_${dateStr}.png`, { type: 'image/png' });
                    await navigator.share({
                        files: [file],
                        title: 'Vedic Panchanga',
                        text: `Panchanga for ${dateStr}`
                    });
                } catch (shareError) {
                    console.log('Share cancelled or failed:', shareError);
                    // Fallback to download
                    downloadBlob(blob, `Panchanga_${dateStr}.png`);
                }
            } else {
                // Fallback: download the image
                downloadBlob(blob, `Panchanga_${dateStr}.png`);
            }

            // Restore button
            button.textContent = originalText;
            button.disabled = false;
        }, 'image/png');

    } catch (error) {
        console.error('Image export error:', error);
        alert('Error exporting image. Please try again.');
    }
}

/**
 * Helper function to download blob as file
 */
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
