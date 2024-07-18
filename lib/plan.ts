
export interface Plan {
    name: string;
    features: string[];
}

// plan details
// ** Add/Remove/Change plan detail below **

export const plans: Plan[] = [
    {
        name: "Free Version",
        features: [
            "One Calendar per account",
            "Fill up to 20% capacity",
            "Static Event Names and Details",
            "Fill up to two weeks at a time"
        ]
    },
    {
        name: "Pro Version",
        features: [
            "Up to 3 Calendars per Account",
            "Fill up to 100% capacity",
            "Random Event Names and Details",
            "Fill up to 2 months at a time"
        ]
    }
];
