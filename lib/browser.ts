import { setupWorker} from "msw/browser";
import { handlers } from "./msw";

export const worker = setupWorker(...handlers);