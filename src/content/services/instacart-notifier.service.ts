import "reflect-metadata";
import { singleton } from "tsyringe";
import { Notifier } from "./notifier.service";

@singleton()
export class InstacartNotifier extends Notifier {
  protected initializeNotifier(): void {
    let interval = setInterval(() => {
      let buttons = document.querySelectorAll<HTMLElement>(
        ".rmq-4518a97d"
      );

      if (buttons[2]) { // tslint:disable-line
        let deliveryBtnText = buttons[2].children[1].textContent; // tslint:disable-line
        let identifier = this.getSchedulePageIdentifier();
        if (deliveryBtnText === "No upcoming availability") {
            if (identifier.textContent === this.getSchedulePageIdentifierText())
              location.reload();
        }
        else {
          this.showNotification();
        }
      }
    }, 15000); // tslint:disable-line
  }

  protected getSchedulePageIdentifier(): HTMLElement {
    let identifierParents =
      document.querySelectorAll<HTMLElement>(".rmq-28f9c13a")  // tslint:disable-line

    if (identifierParents[2] &&  // tslint:disable-line
        identifierParents[2].children[0] && // tslint:disable-line
        identifierParents[2].children[0].children[1]) {// tslint:disable-line
        return <HTMLElement> identifierParents[2].children[0].children[1];  // tslint:disable-line
    }

    return null;
  }

  protected getSchedulePageIdentifierText(): string {
    return "Choose delivery time";
  }
}
