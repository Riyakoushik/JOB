async function test() {
    try {
        const res = await fetch('http://localhost:5000/api/jobs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userProfile: {
                    resumeSkills: ["react", "node"],
                    targetRoles: ["developer"],
                    experienceLevel: ""
                },
                category: null
            })
        });
        const text = await res.text();
        console.log("Status:", res.status);
        console.log(text.substring(0, 500));
    } catch (e) {
        console.error(e);
    }
}
test();
