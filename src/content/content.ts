import "reflect-metadata";
import { container } from "tsyringe";
import { AmazonFreshWholeFoodsNotifier } from "./services/fresh-whole-foods-notifier.service";
import { InstacartNotifier } from "./services/instacart-notifier.service";
import { PrimeNowNotifier } from "./services/primenow-notifier.service";

let amazonFreshWholeFoodsNotifier =
container.resolve<AmazonFreshWholeFoodsNotifier>(AmazonFreshWholeFoodsNotifier);
let instacartNotifier = container.resolve<InstacartNotifier>(InstacartNotifier);
let primenowNotifier = container.resolve<PrimeNowNotifier>(PrimeNowNotifier);

let hostname = window.location.hostname.split(".");
if (hostname[0] === "primenow")
  primenowNotifier.initializeScript();
else if (hostname[1] === "amazon")
  amazonFreshWholeFoodsNotifier.initializeScript();
else if (hostname[1] === "instacart")
  instacartNotifier.initializeScript();
