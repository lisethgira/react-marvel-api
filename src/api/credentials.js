import md5 from 'md5'

export const getCredentials = () => {
  const apikey = '244d171c01b75643f3d17d51e3c13238'
  const privatekey = 'b06821a19c58afa31fb67fb0a699b64efd2b0d5f'
  const ts = new Date().getTime()
  const stringToHash = ts + privatekey + apikey
  const hash = md5(stringToHash)

  const params = {
    ts,
    apikey,
    hash
  }
  return params
}
