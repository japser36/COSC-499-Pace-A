import fetch from 'node-fetch'

export async function matchMentors(mentee_id) {
    let matched = []
    const org_id = await getOrgID(mentee_id)
    const org_mentors = await getOrgMentors(org_id)
    console.log(org_mentors)
    return matched
}

//Retuens the org_id of the given mentee
async function getOrgID(mentee_id) {
    let org_id = ''
    await fetch('../api/user/' + mentee_id, { method: 'GET' })
        .then((res) => res.json())
        .then((res) => org_id = res.rows[0].org_id)
        .catch((error) => {console.log('error: ' + error)})
    return org_id
}


//Returns a list of mentors (with attributes id, skills, timezone) that share the given org_id.
async function getOrgMentors(org_id) {
    let mentor_ids =[]
    await fetch('../api/org/users/' + org_id, { method: 'GET' })
        .then((res) => res.json())
        .then((res) => {
            const users = res.rows
            users.forEach((user, index) => {
                if (user.usertype === 'mentor') {
                    const mentor = {id: user.id, skills: user.skills, timezone: user.timezone}
                    mentor_ids.push(mentor)
                }
            })
        })
        .catch((error) => {console.log('error: ' + error)})
    return mentor_ids
}