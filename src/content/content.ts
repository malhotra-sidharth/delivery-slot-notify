import "reflect-metadata";
import { container } from "tsyringe";
import { AmazonFreshWholeFoodsNotifier } from "./services/fresh-whole-foods-notifier.service";

let amazonFreshWholeFoodsNotifier =
container.resolve<AmazonFreshWholeFoodsNotifier>(AmazonFreshWholeFoodsNotifier);

amazonFreshWholeFoodsNotifier.initializeScript();
