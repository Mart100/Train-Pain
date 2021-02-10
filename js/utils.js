module.exports = {
  randomToken(length) {
    let token = ''
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for(let i=0;i<length;i++) token += chars[Math.floor(Math.random()*chars.length)]
    return token
  }
}