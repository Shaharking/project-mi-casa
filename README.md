# Mi Casa Browser Extension

Personalized homepage extension for browsers written in React.

![screenshot 2017-12-03 14 47 27](https://user-images.githubusercontent.com/4490352/33529053-fcdc8b6e-d838-11e7-9d6b-5088310cf98f.png)

## Mainfest copy paste
```
{
  "version": "1.0",
  "manifest_version": 2,
  "chrome_url_overrides": {
    "newtab": "index.html"
  },
  "content_security_policy": "script-src 'self' 'sha256-GgRxrVOKNdB4LrRsVPDSbzvfdV4UqglmviH9GoBJ5jk='; object-src 'self'",
  "short_name": "React App",
  "name": "Create React App Sample",
  "permissions": [
    "storage",
    "geolocation",
    "*://*.goodreads.com/*"
  ]
}
```