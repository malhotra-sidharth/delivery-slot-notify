import "reflect-metadata";
import { singleton } from "tsyringe";
import { Notifier } from "./notifier.service";

@singleton()
export class AsdaNotifier extends Notifier {
  protected initializeNotifier(): void {
    let lastNotificationDelivered = 0;
    let interval = setInterval(() => {
      let unavailableSlots = 0;
      let totalSlots = 0;
      let buttonTexts = document.querySelectorAll<HTMLElement>(
        ".co-slots__price-content.co-slots__price-content--box.co-slots__price-content--pointer"
      );
      let notificationFired = false;
      buttonTexts.forEach((btnText) => {
          totalSlots++;
          if (!btnText.classList.contains(".delivery-slot-notify-checked") &&
            btnText.textContent &&
            btnText.textContent === "Sold OutC&C?"
          ) {
            btnText.classList.add("delivery-slot-notify-checked");
            unavailableSlots++;
          }
          else {
            if (lastNotificationDelivered % 3 === 0 && // tslint:disable-line
              !notificationFired
              ) {
              this.showNotification();
              notificationFired = true;
            }
          }
      });
      if (totalSlots > 0 && totalSlots === unavailableSlots) {
        let nextBtn = document.querySelector<HTMLButtonElement>(
          "[aria-label='Next slots']"
        );
        if (nextBtn.disabled) {
          location.reload();
        }
        else {
          nextBtn.click();
          lastNotificationDelivered = -1;
        }
      }
      lastNotificationDelivered++;
    }, 3000); // tslint:disable-line
  }

  protected getSchedulePageIdentifier(): HTMLElement {
    if (document.querySelector<HTMLElement>(".asda-tab__label"))
      return document.querySelector<HTMLElement>(".asda-tab__label");

    return null;
  }

  protected getSchedulePageIdentifierText(): string {
    return "Delivery Slot";
  }
}
