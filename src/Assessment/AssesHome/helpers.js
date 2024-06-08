export const calculateBMI = (height, weight) => {
    const heightInMeters = height * 0.3048; // Convert feet to meters
    return (weight / (heightInMeters ** 2)).toFixed(1);
};

export const healStories = {
    L010100: "It's important to specify who the assessment is for to ensure accurate context in evaluation.",
    L010200: "Collecting detailed identity information helps in providing personalized healthcare advice.",
    L010300: "Height can influence health outcomes and diagnostic processes.",
    L010400: "Weight is crucial in understanding health, particularly for musculoskeletal issues.",
    BMI: {
        normal: "Your BMI is within the normal range. Keep maintaining a healthy lifestyle!",
        overweight: "Your BMI is high. Consider consulting a healthcare provider for advice on weight management.",
        underweight: "Your BMI is low. It might be beneficial to talk to a healthcare provider about gaining weight healthily."
    },
    L010500: "Understanding pain location helps in diagnosing and targeting treatments effectively.",
    L010600: "Different pain intensities impact daily life in various ways, influencing treatment approaches.",
    L010700: "The pain scale helps in making informed treatment decisions based on pain severity.",
    L010800: "Constant vs intermittent pain can indicate different underlying causes.",
    L010801: "Activities affecting pain can provide clues about the nature and cause of the pain.",
    L010900: "These symptoms can indicate broader health concerns that might need immediate attention.",
    L011000: "Previous medical conditions can influence current pain experiences significantly.",
    L011100: "Understanding past medical history is crucial for accurate diagnosis and treatment."
};
