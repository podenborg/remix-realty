# Remix Realty
Remix Realty is a fake real estate site that I created for the [Remix Austin MeetUp group](https://www.meetup.com/remix-austin/) as part of my presentation on using Remix with Sanity.io.

The repo shows how to set up basic schemas in Sanity and then pull in and display that data in a Remix application.


## ⚠️ Work in progress! ⚠️
You may notice that a lot of buttons and links in the site don't do anything as of yet. 

I didn't have time to implement a complete site, but I plan on going in later and build out other functionality such as the search bar on the home page and filters for narrowing down home results.


## Development
### Remix
Because this Remix application was set up to be hosted on Netlify, you will need to follow the instructions in the `web/README.md` file to set up the Netlfiy CLI to work locally.

Once you have set up Netlify to serve Remix locally, you can run the Remix app in this repo using:
```
cd web
npm run dev
```

### Sanity
You will need to install the Sanity CLI globally to run this project locally.
```
cd studio
sanity start
```
