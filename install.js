      let deferredPrompt;

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const installButton = document.getElementById('installButton');
        installButton.addEventListener('click', async () => {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt = null;
          } else {
            installButton.textContent = 'Cannot Install';
            console.log('No install prompt available');
          }
        });
      });