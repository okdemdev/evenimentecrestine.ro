export async function shareTicket() {
  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Biletul meu la eveniment',
        text: 'Voi participa la acest eveniment! Te aștept și pe tine!',
        url: window.location.href,
      });
      return { success: true };
    } else {
      await navigator.clipboard.writeText(window.location.href);
      return { success: true, copied: true };
    }
  } catch (error) {
    console.error('Error sharing:', error);
    return { success: false, error };
  }
}
