import axios from "axios";
import { Resource, ResourcePost } from "./utils/interfaces";

const resource = Resource

const webhook = "https://discord.com/api/webhooks/975679258213105734/PxV1iOASTM1h7Lw52OL8_xbqT4OeIvy_ilqCSw39hd4mnn2bbR11SG9dKw3Wz9bEFKLx"

axios.post(webhook, {
    
        username: "New Resource",
        avatar_url: "https://cdn.pixabay.com/photo/2016/09/12/09/51/abc-1663383_960_720.png",
        content: "New Content Alert!!",
        embeds: [
          {
            author: {
              name: resourceP,
              url: "https://gist.github.com/Birdie0/78ee79402a4301b1faf412ab5f1cdcf9",
              icon_url: null
            },
            title: "resource name",
            url: "https://google.com/",
            description: "our description",
            color: 15258703,
            fields: [
              {
                name: "content type",
                value: "content",
                inline: true
              },
              {
                name: "build stage",
                value: "onboard",
                inline: false
              },
              {
                name: "recommend Nature",
                value: "i really reccomend this",
                inline: false
              },
               {
                name: "recommend reason",
                value: "found it really helpfull",
                inline: false
              }
              
            ],
            thumbnail: {
              url: null
            },
            image: {
              url: null
            },
            footer: {
              text:null,
              icon_url: null
            }
          }
        ]
      }
  )

  template 1 {
    "username": "New Resource",
    "avatar_url": "https://cdn.pixabay.com/photo/2016/09/12/09/51/abc-1663383_960_720.png",
    "content": "New Content Alert!!",
    "embeds": [
      {
        "author": {
          "name": `${author_name}`,
          "url": "https://ultimate-study-buddy.netlify.app/",
          "icon_url": null
        },
        "title": `${resource_name}`,
        "url": `${url}`,
        "description": `${description}`,
        "color": 15258703,
        "fields": [
          {
            "name": "content type",
            "value": `${content_name}`,
            "inline": true
          },
          {
            "name": "build stage",
            "value": `${build_stage}`,
            "inline": false
          },
          {
            "name": "recommend Nature",
            "value": `${recommendation_nature}`,
            "inline": false
          },
           {
            "name": "recommend reason",
            "value": `${recommendation_reason}`,
            "inline": false
          }
          
        ],
        "thumbnail": {
          "url": null
        },
        "image": {
          "url": null
        },
        "footer": {
          "text":null,
          "icon_url": null
        }
      }
    ]
  }
  }