const userLoggedIn = () => {
  let loggedIn = false
  const cookieArray = document.cookie.split('=')
  if (cookieArray[1] && cookieArray[1] !== 'undefined') {
    loggedIn = true
  }

  return loggedIn
}

export default userLoggedIn
