
export type RiskItem = { key: string; label: string };
export type RiskCategory = { key: string; title: string; items: RiskItem[] };

// Bio-psycho-social categories with examples
export const riskCategories: RiskCategory[] = [
  {
    key: 'bio',
    title: 'Biological',
    items: [
      { key: 'prematurity', label: 'Prematurity / low birth weight' },
      { key: 'chronic_illness', label: 'Chronic illness (e.g., CHD, cystic fibrosis)' },
      { key: 'gi_issues', label: 'Gastrointestinal issues (reflux, malabsorption)' },
      { key: 'feeding_difficulties', label: 'Feeding difficulties / oromotor issues' },
      { key: 'medications', label: 'Medications affecting appetite/growth' },
      { key: 'genetic', label: 'Genetic/syndromic conditions' },
      { key: 'sleep_issues', label: 'Significant sleep disturbance' },
    ],
  },
  {
    key: 'psycho',
    title: 'Psychological',
    items: [
      { key: 'parental_stress', label: 'High caregiver stress or mental health concerns' },
      { key: 'attachment', label: 'Attachment/interaction concerns at mealtime' },
      { key: 'developmental_delay', label: 'Developmental delay impacting feeding' },
      { key: 'sensory', label: 'Sensory sensitivities' },
    ],
  },
  {
    key: 'social',
    title: 'Social/Environmental',
    items: [
      { key: 'food_security', label: 'Food insecurity / limited access to healthy options' },
      { key: 'housing', label: 'Housing instability / overcrowding' },
      { key: 'cultural', label: 'Cultural feeding practices impacting intake' },
      { key: 'screen_meals', label: 'Screen use during meals / distracted eating' },
      { key: 'caregiver_knowledge', label: 'Caregiver nutrition knowledge / skills' },
      { key: 'community_support', label: 'Limited community/family supports' },
    ],
  },
];
