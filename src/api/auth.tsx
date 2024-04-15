// import { getUserDetails } from '../components/library/login-form/LoginForm';
export async function signIn(email: string, password: string) {
  try {
    const apiUrl = 'https://erply.retailcare.com.au/retailcare-dashboard/api/loginAdmin.php';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include credentials (cookies) in the request
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const isOK = data.status === 'success';
    if (isOK) {
      sessionStorage.setItem('userData', JSON.stringify(data.userData));
      sessionStorage.setItem('isAuthenticated', 'true');
    }
    return {
      isOk: isOK,
      data: data.userData,
    };
  } catch (error) {
    return {
      isOk: false,
      message: 'Authentication failed',
    };
  }
}

export async function getUser() {
  try {
    const userdata = sessionStorage.getItem('userData');
    const isOK = sessionStorage.getItem('isAuthenticated');
    if (userdata && typeof userdata === 'string' && userdata.trim() !== '') {
      const userDataJSON = JSON.parse(userdata);
      return {
        isOk: isOK,
        data: userDataJSON,
      };
    } else {
      // If userdata is not valid, return false
      return {
        isOk: false,
      };
    }
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function createAccount(email: string, password: string) {
  try {
    return {
      email: email,
      password: password,
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: 'Failed to create account',
    };
  }
}

export async function changePassword(email: string, recoveryCode?: string) {
  try {
    // Send request
    return {
      isOk: true,
      data: { email, recoveryCode },
    };
  } catch {
    return {
      isOk: false,
      message: 'Failed to change password',
    };
  }
}

export async function resetPassword(email: string) {
  try {
    // Send request
    return {
      email:email,
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: 'Failed to reset password',
    };
  }
}
export function checkAuth() {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  // Return the authentication status
  return isAuthenticated === 'true';
}
