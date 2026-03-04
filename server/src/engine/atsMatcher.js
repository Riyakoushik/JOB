// ATS Matching Engine

/**
 * userProfile: {
 *   skills: ['react', 'node', 'express'],
 *   experienceLevel: 'Fresher (0-2 yrs)', // or 'Mid Level (2-5 yrs)', etc.
 *   targetRoles: ['Software Engineer', 'Full Stack Developer'],
 *   targetLocations: ['Remote', 'Bangalore']
 * }
 * 
 * job: {
 *   title: 'Frontend Developer',
 *   skills: ['react', 'javascript', 'css'],
 *   experience: 'Fresher (0-2 yrs)',
 *   tier: 'Unicorn',
 *   location: 'Remote'
 * }
 */
export function scoreJobMatch(userProfile, job) {
    let score = 0;
    const report = {
        matchedSkills: [],
        missingSkills: [],
        bonuses: [],
        recommendations: []
    };

    // 1. Skill Matching (40% weight - let's say max 40 points)
    const rawJobSkills = Array.isArray(job.skills) ? job.skills : [];
    const jobSkills = rawJobSkills.map(s => String(s).toLowerCase());

    const rawUserSkills = userProfile.skills || userProfile.resumeSkills || [];
    const userSkills = Array.isArray(rawUserSkills) ? rawUserSkills.map(s => String(s).toLowerCase()) : [];

    if (jobSkills.length > 0) {
        let matchedCount = 0;
        jobSkills.forEach(reqSkill => {
            // Basic semantic/substring match
            const isMatch = userSkills.some(userSkill =>
                userSkill.includes(reqSkill) || reqSkill.includes(userSkill)
            );
            if (isMatch) {
                matchedCount++;
                report.matchedSkills.push(reqSkill);
            } else {
                report.missingSkills.push(reqSkill);
            }
        });
        const skillScore = (matchedCount / jobSkills.length) * 40;
        score += skillScore;
    } else {
        // If no specific skills listed, give default points
        score += 20;
    }

    // 2. Experience Level Matching (20% weight - 20 points max)
    const userExp = userProfile.experienceLevel || userProfile.experience || '';
    if (job.experience && job.experience === userExp) {
        score += 20;
    } else if (job.experience) {
        // Partial match if applying for Mid level as Fresher, etc.
        score += 5;
        report.recommendations.push(`Experience mismatch: Job wants ${job.experience}, you have ${userExp || 'Unknown'}`);
    } else {
        score += 20; // Default if job doesn't specify exp
    }

    // 3. Role/Title Semantic Match (15% weight - 15 points)
    const targetRoles = Array.isArray(userProfile.targetRoles) ? userProfile.targetRoles : [];
    const isRoleMatch = targetRoles.some(role =>
        job.title.toLowerCase().includes(role.toLowerCase()) ||
        role.toLowerCase().includes(job.title.toLowerCase())
    );
    if (isRoleMatch || targetRoles.length === 0) {
        score += 15;
    } else {
        report.recommendations.push("Title does not exact match your target roles.");
    }

    // 4. Location Preference Match (10% weight - 10 points)
    const targetLocs = Array.isArray(userProfile.targetLocations) ? userProfile.targetLocations : [];
    if (job.location && targetLocs.some(loc => job.location.toLowerCase().includes(loc.toLowerCase()))) {
        score += 10;
    } else if (job.location) {
        // partial or no match
    } else {
        score += 10; // no location required
    }

    // 5. Tier Bonus (max 15% weight - 15 points)
    if (job.tier === 'FAANG+') {
        score += 15;
        report.bonuses.push('Top Tier Company (+15%)');
    } else if (job.tier === 'Unicorn') {
        score += 10;
        report.bonuses.push('Unicorn Company (+10%)');
    } else {
        score += 5; // Startup basic 
        report.bonuses.push('Startup (+5%)');
    }

    return {
        jobId: job.id,
        matchScore: Math.round(score),
        report
    };
}
