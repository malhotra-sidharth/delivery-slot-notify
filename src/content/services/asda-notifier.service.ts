import "reflect-metadata";
import { singleton } from "tsyringe";
import { Notifier } from "./notifier.service";

@singleton()
export class AsdaNotifier extends Notifier {

  protected initializeNotifier(): void {
    this.switchToSelectedDeliveryOption();
    this.addEventListeners();
    let lastNotificationDelivered = 0;
    let interval = setInterval(() => {
      let unavailableSlots = 0;
      let totalSlots = 0;
      let buttonTexts = document.querySelectorAll<HTMLElement>(
        ".slot-button__button"
      );
      let notificationFired = false;
      buttonTexts.forEach((btnText) => {
          totalSlots++;
          if (!btnText.classList.contains(".delivery-slot-notify-checked") &&
            btnText.textContent &&
            btnText.textContent.toLowerCase()
              .includes("sold out")
          ) {
            btnText.classList.add("delivery-slot-notify-checked");
            unavailableSlots++;
          }
          else {
            if (lastNotificationDelivered % 3 === 0 && // tslint:disable-line
              !notificationFired
              ) {
              btnText.click();
              this.showNotification();
              notificationFired = true;
            }
          }
      });
      if (totalSlots > 0 && totalSlots === unavailableSlots) {
        let nextBtn = document.querySelector<HTMLButtonElement>(
          "[aria-label='next day slot']"
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

  protected switchToSelectedDeliveryOption(): void {
    let interval = setInterval(() => {
      let deliveryOptions = document.querySelectorAll<HTMLElement>(
        ".asda-tab__label"
      );
      let savedOption =
        sessionStorage.getItem("delivery-slot-notify-asda-type");
      deliveryOptions.forEach((option: HTMLElement) => {
        if (option.textContent === savedOption) {
          option.click();
        }
      });

      if (deliveryOptions.length > 0) {
        clearInterval(interval);
      }
    }, 300) // tslint:disable-line
  }

  protected addEventListeners(): void {
    let interval = setInterval(() => {
      let deliveryOptions = document.querySelectorAll<HTMLElement>(
        ".asda-tab.asda-tab--fluid"
      );

      deliveryOptions.forEach((option: HTMLElement) => {
        option.addEventListener("click", () => {
          sessionStorage.setItem(
            "delivery-slot-notify-asda-type",
            option.textContent
          );
        });
      });

      if (deliveryOptions.length > 0) {
        clearInterval(interval);
      }
    }, 300) // tslint:disable-line
  }
}
