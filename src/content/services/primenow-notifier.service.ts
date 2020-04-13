import "reflect-metadata";
import { singleton } from "tsyringe";
import { Notifier } from "./notifier.service";

@singleton()
export class PrimeNowNotifier extends Notifier {
  protected initializeNotifier(): void {
    let interval = setInterval(() => {
      let deliveryOptions = document.querySelectorAll<HTMLInputElement>(
        "input[name='delivery-window-radio']"
      );

      let validDeliveryOptions: HTMLInputElement[] = [];

      deliveryOptions.forEach((option: HTMLInputElement) => {
        if (!option.disabled) {
            validDeliveryOptions.push(option);
        }
      });

      for (let i = 0; i < deliveryOptions.length; i++) {

      }

      let identifier = this.getSchedulePageIdentifier();
      if (identifier) {
        let isSchedulePage = identifier.textContent.includes(
          this.getSchedulePageIdentifierText()
        );

        if (validDeliveryOptions.length > 0) {
          this.showNotification();
        }
        else if (isSchedulePage) {
          location.reload();
        }
      }
    }, 20000); // tslint:disable-line
  }

  protected getSchedulePageIdentifier(): HTMLElement {
    return document.querySelector<HTMLElement>(".expanded-panel-heading")  // tslint:disable-line
  }

  protected getSchedulePageIdentifierText(): string {
    return "Select Delivery Time";
  }
}
