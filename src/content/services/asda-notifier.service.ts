import "reflect-metadata";
import { singleton } from "tsyringe";
import { Notifier } from "./notifier.service";

@singleton()
export class AsdaNotifier extends Notifier {
  protected initializeNotifier(): void {
    let lastNotificationDelivered = 0;
    let interval = setInterval(() => {
      let buttonTexts = document.querySelectorAll<HTMLElement>(
        ".co-slots__price-content.co-slots__price-content--box.co-slots__price-content--pointer"
      );
      let count = 0;
      buttonTexts.forEach((btnText) => {
          if (btnText.textContent && btnText.textContent === "Sold OutC&C?") {
            count++;
          }
          else {
            if (lastNotificationDelivered % 3 === 0) {// tslint:disable-line
              this.showNotification();
            }
          }
      });
      if (buttonTexts.length > 0 && count === buttonTexts.length) {
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
        count = 0;
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
