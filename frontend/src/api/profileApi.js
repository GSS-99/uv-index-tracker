const DEV_USER_ID = 1;

export async function getProfileApi() {
  const response = await fetch(`/api/profiles/${DEV_USER_ID}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user profile.');
  }
  return await response.json();
}

export async function updateProfileApi(profileData) {
  const response = await fetch(`/api/profiles/${DEV_USER_ID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    throw new Error('Failed to update profile.');
  }
  return await response.json();
}