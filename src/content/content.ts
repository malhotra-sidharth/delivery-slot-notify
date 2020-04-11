// @ref: https://stackoverflow.com/a/13328513
let interval: any = null;
function showNotification(): void {
 if (Notification.permission !== "granted")
  Notification.requestPermission();
 else {
  let notification = new Notification("Delivery Slot Available", {
   icon: "./../assets/img/icon.png",
   body: "One or Few Delivery Slot are Available",
  });
 }
}

function initializeNotifications(): void {
  if (!Notification) {
    alert('Desktop notifications not supported by your browser.');
   }

  if (Notification.permission !== 'granted')
    Notification.requestPermission();
}

function initializeNotifier(): void {
  interval = setInterval(() => {
    let buttonTexts = document.querySelectorAll<HTMLElement>(".ufss-date-select-toggle-text-availability");
    buttonTexts.forEach(btnText => {
        if (btnText.innerText && btnText.innerText === "Not available") {
          location.reload();
        }
        else {
          showNotification();
        }
        });
  }, 10000)
}

function initializeScript(): void {
  if (interval)
    clearInterval(interval);
  initializeNotifications();
  initializeNotifier();
}

// start plugin
initializeScript();
