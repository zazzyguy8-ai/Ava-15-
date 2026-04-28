export type Question = {
  id: string;
  text: string;
  type: "choice" | "text";
  options?: string[];
};

export const questions: Question[] = [
  {
    id: "name",
    text: "What's your first name?",
    type: "text",
  },
  {
    id: "age",
    text: "How old are you?",
    type: "choice",
    options: ["40–44", "45–49", "50–54", "55–60"],
  },
  {
    id: "main_goal",
    text: "What is your #1 goal for the next 30 days?",
    type: "choice",
    options: [
      "Lose weight and feel lighter",
      "Have more energy throughout the day",
      "Reduce stress and feel calmer",
      "Sleep better",
      "All of the above",
    ],
  },
  {
    id: "energy_level",
    text: "How would you describe your current energy levels?",
    type: "choice",
    options: [
      "Exhausted most of the time",
      "Low energy, especially in the afternoon",
      "Inconsistent — some good days, many bad ones",
      "Reasonably okay, just want to improve",
    ],
  },
  {
    id: "stress_level",
    text: "How stressed do you feel on a typical day?",
    type: "choice",
    options: [
      "Very stressed — it's affecting my life",
      "Moderately stressed",
      "Mild background stress",
      "Not very stressed",
    ],
  },
  {
    id: "sleep",
    text: "How many hours of sleep do you typically get per night?",
    type: "choice",
    options: ["Less than 5 hours", "5–6 hours", "6–7 hours", "7–8 hours", "More than 8 hours"],
  },
  {
    id: "exercise",
    text: "How much do you currently exercise per week?",
    type: "choice",
    options: [
      "I don't exercise",
      "1–2 times (light walks or stretching)",
      "2–3 times (moderate activity)",
      "4+ times (regular workouts)",
    ],
  },
  {
    id: "workout_preference",
    text: "What kind of movement appeals to you most?",
    type: "choice",
    options: [
      "Gentle stretching or yoga",
      "Walking outdoors",
      "Light home exercises (no equipment)",
      "Dancing or fun movement",
      "I want the easiest possible option",
    ],
  },
  {
    id: "diet_struggle",
    text: "What's your biggest struggle with food?",
    type: "choice",
    options: [
      "I eat well but the weight won't shift",
      "I stress-eat or eat emotionally",
      "I skip meals and overeat later",
      "I love food and don't want to restrict",
      "I don't know what to eat anymore",
    ],
  },
  {
    id: "dietary_restrictions",
    text: "Do you have any dietary preferences or restrictions?",
    type: "choice",
    options: [
      "No restrictions",
      "Vegetarian",
      "Gluten-free",
      "Dairy-free",
      "Low-carb / keto",
    ],
  },
  {
    id: "wake_time",
    text: "What time do you typically wake up?",
    type: "choice",
    options: ["Before 6am", "6–7am", "7–8am", "After 8am", "It varies a lot"],
  },
  {
    id: "work_situation",
    text: "How would you describe your daily schedule?",
    type: "choice",
    options: [
      "Working full-time (office or remote)",
      "Part-time or flexible",
      "Stay-at-home or caregiver",
      "Retired or semi-retired",
    ],
  },
  {
    id: "past_attempts",
    text: "What has stopped you from reaching your goals before?",
    type: "choice",
    options: [
      "Plans were too complicated or intense",
      "I lost motivation after a few days",
      "Life got in the way",
      "I didn't see results fast enough",
      "I never had the right plan for my age",
    ],
  },
  {
    id: "motivation",
    text: "How motivated are you to change right now?",
    type: "choice",
    options: [
      "Very motivated — I'm ready",
      "Pretty motivated but nervous",
      "Hopeful but skeptical (tried before)",
      "Just curious to see what this is about",
    ],
  },
  {
    id: "ideal_morning",
    text: "Describe your ideal morning in a few words (or how your mornings usually feel):",
    type: "text",
  },
];
