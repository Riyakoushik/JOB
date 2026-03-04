import { ROLE_GROUPS, USER_PROFILE } from '../data/constants';

export function calcATSScore(jobSkills = [], jobTitle = '') {
    const normalize = s => s.toLowerCase().trim();
    const userNorm = USER_PROFILE.resumeSkills.map(normalize);
    const jobNorm = jobSkills.map(normalize);

    const exactMatches = jobNorm.filter(s => userNorm.includes(s));
    const partialMatches = jobNorm.filter(s => !exactMatches.includes(s) && userNorm.some(u => u.includes(s) || s.includes(u)));
    const missingSkills = jobNorm.filter(s => !exactMatches.includes(s) && !partialMatches.includes(s));

    const matchScore = exactMatches.length * 1.0 + partialMatches.length * 0.5;
    const maxScore = jobNorm.length || 1;
    const skillScore = Math.round((matchScore / maxScore) * 85);

    let roleBonus = 0;
    const title = jobTitle.toLowerCase();

    // Safety check: ensure ROLE_GROUPS and the specific group exist
    const getKeywords = (groupName) => ROLE_GROUPS[groupName]?.keywords || [];

    if (getKeywords("Product Track").some(k => title.includes(k))) roleBonus = 15;
    else if (getKeywords("Project Track").some(k => title.includes(k))) roleBonus = 14;
    else if (getKeywords("Business & Strategy Track").some(k => title.includes(k))) roleBonus = 13;
    else if (getKeywords("Data Track").some(k => title.includes(k))) roleBonus = 12;
    else if (getKeywords("Research & UX Track").some(k => title.includes(k))) roleBonus = 11;
    else if (getKeywords("AI & Ops Track").some(k => title.includes(k))) roleBonus = 13;
    else if (getKeywords("Content & Docs Track").some(k => title.includes(k))) roleBonus = 10;
    else if (getKeywords("Customer Success Track").some(k => title.includes(k))) roleBonus = 8;

    const rawScore = Math.min(100, skillScore + roleBonus);
    return { rawScore, exactMatches, partialMatches, missingSkills };
}

export function detectRoleGroup(jobTitle) {
    for (const [group, config] of Object.entries(ROLE_GROUPS)) {
        if (config.keywords.some(k => jobTitle.toLowerCase().includes(k.toLowerCase()))) {
            return { name: group, color: config.color, icon: config.icon };
        }
    }
    return { name: "General", color: "gray", icon: "💼" };
}
