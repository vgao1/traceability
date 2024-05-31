import UserConcept from "./concepts/user";
import WebSessionConcept from "./concepts/websession";
import TraceabilityConcept from "./concepts/traceability";

// App Definition using concepts
export const WebSession = new WebSessionConcept();
export const User = new UserConcept();
export const Traceability = new TraceabilityConcept();
