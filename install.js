      let deferredPrompt;

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const installButton = document.getElementById('installButton');

        installButton.addEventListener('click', async () => {
          //  const { outcome } = await deferredPrompt.userChoice;
          if (deferredPrompt) {
            deferredPrompt.prompt().then((res) => {
              if (res.outcome === 'accepted') {
                deferredPrompt = null;
                console.log('User accepted the install prompt');
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
          installButton.style.display = 'none';
        });
      });
