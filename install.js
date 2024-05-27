let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installButton = document.getElementById('installButton');

  // Check local storage to see if the app is already installed

  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt().then((res) => {
        if (res.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          // Save the install state to local storage
          localStorage.setItem('appInstalled', 'false');
          deferredPrompt = null;
          installButton.style.display = 'none';
        } else {
          console.log('User dismissed the install prompt');
        }
      });
    } else {
      installButton.style.display = 'none';
      installButton.textContent = 'Cannot Install';
      console.log('No install prompt available');
    }
  });

  window.addEventListener('appinstalled', () => {
    console.log('App was installed.');
    // Save the install state to local storage
    localStorage.setItem('appInstalled', 'false');
    installButton.style.display = 'none';
  });
});
