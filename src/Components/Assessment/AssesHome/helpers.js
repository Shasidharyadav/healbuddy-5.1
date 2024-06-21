export const calculateBMI = (height, weight) => {
    const heightInMeters = height * 0.3048;
    return (weight / (heightInMeters ** 2)).toFixed(1);
};

export const healStories = {
    L010300: "This information is critical in building your care profile.",
    L010400: "This information is critical in building your care profile.",
    BMI: {
        underweight: "Your BMI is low. It might be beneficial to talk to a healthcare provider about gaining weight healthily.",
        normal: "Your BMI is within the normal range. Keep maintaining a healthy lifestyle!",
        overweight: "Your BMI is high. Consider consulting a healthcare provider for advice on weight management."
    },
    L010500: "We need our muscles in almost all activities that we perform daily...",
    L010600: "If the daily wear and tear are not timely rehabilitated, the muscles degenerate and lose their strength...",
    L010700: "Pain severity categories...",
    L010800: "This sudden increase in load leads to damage around joints...",
    L010801: "Intermittent pain is a likely mechanical condition symptom associated with a better prognosis.",
    L010900: "At times, other symptoms may be early indicators of other issues...",
    L011000: "The pain may also arise from previous medical histories in certain rare conditions...",
    L011100: "It is important to investigate previous medical history before the final diagnosis...",
    summary: "Thank you for patiently responding to all the questions. We now have a provisional diagnosis for your condition."
};

export const factMessages = [
    "87.5 million Indians are suffering from musculoskeletal pain",
    "Musculoskeletal pain is the single biggest cause of absenteeism from work and, hence, loss of earning",
    "Globally, 149 million years are lost due to disability from musculoskeletal pain",
    "Musculoskeletal pain is the leading cause of disability in the world",
    "Back pain is the biggest disability under all musculoskeletal conditions",
    "More people are affected by back pain globally than diabetes and cancer combined",
    "COVID has impacted more than 775 million patients globally, while Low Back Pain has impacted more than 619 million patients",
    "Musculoskeletal conditions lead to substantially higher disability than neurological conditions or mental disorders"
];
