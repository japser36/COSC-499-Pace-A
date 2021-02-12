import fetch from 'node-fetch'

export async function matchMentors(mentee_id) {
    let matched = []
    const org_id = await getOrgID(mentee_id)
    const org_mentors = await getOrgMentors(org_id)
    console.log(org_mentors)
    return matched
}

async function getOrgID(mentee_id) {
    let org_id = ''
    await fetch('../api/user/' + mentee_id, { method: 'GET' })
        .then((res) => res.json())
        .then((res) => org_id = res.rows[0].org_id)
        .catch((error) => {console.log('error: ' + error)})
    return org_id
}

async function getOrgMentors(org_id) {
    let mentor_ids =[]
    await fetch('../api/org/users/' + org_id, { method: 'GET' })
        .then((res) => res.json())
        .then((res) => {
            const users = res.rows
            users.forEach((user, index) => {
                if (user.usertype === 'mentor')
                    mentor_ids.push(user.id)
            })
        })
        .catch((error) => {console.log('error: ' + error)})
    return mentor_ids
}