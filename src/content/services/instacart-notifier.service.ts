import "reflect-metadata";
import { singleton } from "tsyringe";
import { Notifier } from "./notifier.service";

@singleton()
export class InstacartNotifier extends Notifier {
  protected initializeNotifier(): void {
    let interval = setInterval(() => {
      let deliveryOptions = document.querySelectorAll<HTMLInputElement>(
        "input[name='delivery_option']"
      );

      let identifier = this.getSchedulePageIdentifier();
      if (identifier) {
        let isSchedulePage = identifier.textContent.includes(
          this.getSchedulePageIdentifierText()
        );

        if (deliveryOptions.length > 0) {
          this.showNotification();
        }
        else if (isSchedulePage) {
          location.reload();
        }
      }
    }, 20000); // tslint:disable-line
  }

  protected getSchedulePageIdentifier(): HTMLElement {
    let allCards =
      document.querySelectorAll<HTMLElement>(".rmq-28f9c13a")  // tslint:disable-line

    for (let i = 0; i < allCards.length; i++) {
      let card = allCards[i];
      if (card.classList.length === 1) {
        if (card.children[0] &&
            card.children[0].children[1]
          ) {
              return <HTMLElement> card.children[0].children[1];
            }
      }
    }

    return null;
  }

  protected getSchedulePageIdentifierText(): string {
    return "delivery time";
  }
}
