const userLoggedIn = () => {
  const cookieArray = document.cookie.split('=')
  if (cookieArray[1] && cookieArray[1] !== 'undefined') {
    return true
  }

  return false
}

export default userLoggedIn
