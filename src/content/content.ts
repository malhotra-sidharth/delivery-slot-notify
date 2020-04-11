// @ref: https://stackoverflow.com/a/13328513
let interval: any = null;
function showNotification(): void {
 if (Notification.permission !== "granted")
  Notification.requestPermission();
 else {
  let notification = new Notification("Delivery Slot Available", {
   icon: "./assets/img/icon.png",
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

  if (Notification.permission === 'denied')
    alert('Your Chrome notifications are blocked. Please enable them to get notifed about delivery windows availability. Click on the lock icon on the top left and select "Allow" from notification list')
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

function initializeWidget(): void {
  let widgetInterval = setInterval(() => {
    let scheduleTitle = document.querySelector<HTMLElement>(".ufss-widget-title");
    let slotNotifier = document.querySelector<HTMLElement>(".slot-notifier-widget");
    if (!slotNotifier && scheduleTitle && scheduleTitle.innerText === "Schedule your order") {
      console.log("HIEE");
      let widget = document.createElement("div");
      widget.innerHTML = `
        <div class="slot-notifier-widget" style="background: #8cc63f; display: block; min-height: 50px; width: 300px;
        z-index: 99999; position: absolute; right: 0; top: 10%; box-shadow: 1px 1px 32px;padding: 12px 10px; border-radius: 5px;">
          <p style="text-align:center;"><img src="https://i.ibb.co/wrjsMv9/icon.png" alt="icon" border="0" height="50"></p>
          <h3>
            Please leave the tab open and I will notify you when a delivery slot is available.
          </h3>
        </div>
      `;

      document.body.appendChild(widget);
      clearInterval(widgetInterval);
    }
  }, 500);
}

function initializeScript(): void {
  if (interval)
    clearInterval(interval);
  initializeNotifications();
  initializeNotifier();
  initializeWidget()
}

// start plugin
initializeScript();
