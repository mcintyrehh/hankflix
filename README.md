# 😎Hankflix👨‍🎤
A full MERN stack app for digitizing physical media collections using [Sonarr](https://github.com/Sonarr/Sonarr/wiki/API) and [Radarr](https://github.com/Radarr/Radarr/wiki/API) Dockers
![example gif](/client/public/images/ReadMeExamples/Overview.gif)
      
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
    1. Configure a DNS tracker service to keep track of your dynamic WAN IP address (such as creating free subdomains with Duck DNS, or with your own domain name via adding cname records in your domain's DNS settings)
        * Set up subdomains for your docker containers, this setup used onraysonarr.duckdns.org and onrayradarr.duckdns.org, making the endpoints:
            * Sonarr: https://onraysonarr.duckdns.org/api
            * Radarr: https://onrayradarr.duckdns.org/api
1. Add your Radarr domain + /api/movie/list (ex. htttps://onraysonarr.duckdns.org/api/movie/list) as a list in Radarr settings
    ![Radarr List Setup Image](https://github.com/mcintyrehh/hankflix/blob/master/client/public/images/Capture.PNG)
1. For more information about this pre-setup, please see Spaceinvader One's great tutorial about this: https://youtu.be/I0lhZc25Sro

## What needs to be configured next
1. You will need to create a ".env" file in the root of your folder structure, and update the below code with your keys
```javascript
    SONARR_API=YourAPIKeysHere
    RADARR_API=NoNeedForQuotes
    TMDB_API=lkjl897u098lkjl9873jhkjhuiyTheyWillLookLikeThis
    TVDB_API=lastonefornow98347520935uual;ksjdf
    RADARR_URL=https://yourradarrsubdomain.yourdomain.org
    SONARR_URL=https://yoursonarrsubdomain.yourdomain.org
    
```


