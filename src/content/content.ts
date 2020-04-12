import "reflect-metadata";
import { container } from "tsyringe";
import { AmazonFreshWholeFoodsNotifier } from "./services/fresh-whole-foods-notifier.service";
import { InstacartNotifier } from "./services/instacart-notifier.service";

let amazonFreshWholeFoodsNotifier =
container.resolve<AmazonFreshWholeFoodsNotifier>(AmazonFreshWholeFoodsNotifier);
let instacartNotifier = container.resolve<InstacartNotifier>(InstacartNotifier);

let hostname = window.location.hostname.split(".");
if (hostname[1] === "amazon")
  amazonFreshWholeFoodsNotifier.initializeScript();
else if (hostname[1] === "instacart")
  instacartNotifier.initializeScript();
