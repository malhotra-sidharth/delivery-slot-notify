import "reflect-metadata";
import { singleton } from "tsyringe";
import { Notifier } from "./notifier.service";

@singleton()
export class AmazonFreshWholeFoodsNotifier extends Notifier {
  protected initializeNotifier(): void {
    let interval = setInterval(() => {
      let buttonTexts = document.querySelectorAll<HTMLElement>(
        ".ufss-date-select-toggle-text-availability"
      );
      let count = 0;
      buttonTexts.forEach((btnText) => {
          if (btnText.innerText && btnText.innerText === "Not available") {
            count++;
          }
          else {
            this.showNotification();
          }
      });
      if (buttonTexts.length > 0 && count === buttonTexts.length) {
        count = 0;
        location.reload();
      }
    }, 20000); // tslint:disable-line
  }

  protected getSchedulePageIdentifier(): HTMLElement {
    if (document.querySelector<HTMLElement>(".ufss-widget-title"))
      return document.querySelector<HTMLElement>(".ufss-widget-title");

    return null;
  }

  protected getSchedulePageIdentifierText(): string {
    return "Schedule your order";
  }
}
