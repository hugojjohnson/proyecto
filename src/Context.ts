// src/context.tsx
import { User } from "./Interfaces"
import { createContext } from "react";

// Define the types for context values
// Types are used for complex data types (e.g. arrays).

// Interfaces are used specifically for objects. They both start with vowels in any case.
// export interface ApiUrlContextType {
//   apiUrl: string;
//   setApiUrl: Dispatch<SetStateAction<string>>;
// }

// Create contexts with initial values
export const UserContext = createContext<User>([null, () => {}]);

export const ApiUrlContext = createContext<string>("woooo");
