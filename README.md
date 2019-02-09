# 😎Hankflix👨‍🎤
A full MERN stack app for adding media in the public domain or digitizing physical collections to Plex servers using [Sonarr](https://github.com/Sonarr/Sonarr/wiki/API) and [Radarr](https://github.com/Radarr/Radarr/wiki/API) Dockers

## What needs to be configured first
1. You will need Sonarr/Radarr installed and set up with the indexers/download client of your choosing
1. If you only want functionality on your local network, the API endpoints (in /server/controllers/) will be:
    1. Sonarr: http://localhost:8989/api
    1. Radarr: http://localhost:7878/api
1. If you want to access your application from the open web you will need to do a few things
    1. Set up a reverse proxy to redirect requests to your docker containers behind the firewall
        * LetsEncrypt will enable us to connect to our docker containers over https
        * In our proxy LetsEncrypt will validate itself by going out to the internet and trying to connect with the subdomain created below
        * If successful in validatging itself it will create a valid SSL certificate and allow us to access our docker containers securely over https
        * In order for this validation to be succesfull, you will need to go into your router and open up two ports
            1. Forward port 80 --> 180
            2. Forward port 443 --> 1443
    1. Configure a DNS tracker service to keep track of your dynamic WAN IP address (such as creating free subdomains with Duck DNS, or with your own domain name via adding cname records in your domains DNS settings)
        * Set up subdomains for your docker containers, I used onraysonarr.duckdns.org and onrayradarr.duckdns.org, making my endpoints:
            * Sonarr: https://onraysonarr.duckdns.org/api
            * Radarr: https://onrayradarr.duckdns.org/api
1. For more information about this pre-setup, please see Spaceinvader One's great tutorial about this: https://youtu.be/I0lhZc25Sro

## What needs to be configured next
1. You will need to create a ".env" file in the root of your folder structure, and update the below code with your keys
```javascript
    SONARR_API=YourAPIKeysHere
    RADARR_API=NoNeedForQuotes
    TMDB_API=lkjl897u098lkjl9873jhkjhuiyTheyWillLookLikeThis
```
2. You will need to update your Sonarr/Radarr endpoints in the get/post calls in /server/controllers/sonarrController.js (as well as the Radarr controller)
```javascript
    get: function(req, res) {
        axios.get(`https://onrayradarr.duckdns.org/api/movie?apikey=${process.env.SONARR_API}`)
        .then(function(response) {
            const allMovies = response.data
            allMovies.map(movie => {
              db.Collection.findOne({ 'imdb_id': movie.imdbId }, (err, match) => {
                if (match) {
                  return;
                }
                else {
                  const movieAdd = {
                    title: movie.title,
                    overview: movie.overview,
                    year: movie.year,
                    status: movie.status,
                    image: movie.images[0].url,
                    downloaded: movie.downloaded,
                    monitored: movie.monitored,
                    imdb_id: movie.imdbId,
                    added: movie.added
                  }
                  db.Collection.create(movieAdd);
                  console.log("movie added!");
                }
              })
            })
            return res.json(allMovies);
        })
        .catch(function(error) {
            console.log(error);
        })
    },
```
