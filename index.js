import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;



const apiKey = "2a7bbddfd64f4eb1c87e7a89267975b6";
const API_URL ="https://api.openweathermap.org/data/2.5/weather";
let advice = "";
let country = "";

function gettingData(result) {

    return tempInCelsius;
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)  => {
    res.render("index.ejs");
});

app.post("/submit", async (req,res)  => {
    let lat = req.body.latitude;
    let lon = req.body.longitude;
    console.log(API_URL + `?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    try {
        const result = await axios.get(API_URL + `?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        var idk = JSON.stringify(result.data.weather).split(",");
        var description = idk[1].split(":")[1].replace(/["]+/g, '').toUpperCase();
        var icon = idk[3].split(":")[1].replace(/["}]]+/g, '');
        var iconClear = icon.replace(/["]+/g, '');
        var idk1 = JSON.stringify(result.data.main).split(",");
        var temp = Math.floor(idk1[0].split(":")[1]);
        var tempInCelsius = Math.floor(temp - 272.15);
        var idk2 = JSON.stringify(result.data.sys).split(",");
        const substr = "country";
        const subArr = idk2.filter(str => str.includes(substr));
        if (subArr.length === 1) {
            country = subArr[0].split(":")[1].replace(/["]+/g, '');
        } else {
            country = "None";
        }
        
        if (JSON.stringify(result.data.name) === '""') {
            var city = "None";
        } else {
            city = JSON.stringify(result.data.name).replace(/["]+/g, '');
        };

        switch (description) {
            case "THUNDERSTORM":
                advice = "Better stay at home, Zeus is angry.";
                break;
            case "DRIZZLE":
                advice = "Little rain won't hurt anyone. Except ironed hair.";
                break;
            case "RAIN":
                advice = "Bring out your umbrellas everyone!";
                break;
            case "SNOW":
                advice = "Is it Christmas yet?";
                break;
            case "MIST", "SMOKE", "HAZE", "DUST", "FOG", "SAND", "ASH", "SQUALL", "TORNADO":
                advice = "Careful on the roads the visibility might be downgraded.";
                break;
            case "CLEAR":
                advice = "Nothing but a clear blue sky.";
                break;
            case "CLOUDS":
                advice = "Careful, it might be raining soon or also not so I don't know.";
                break;
                default:
                break;
            }

        res.render("index.ejs", {
            latitude: lat,
            longitude: lon,
            city: city,
            country: country,
            description: description,
            temp: tempInCelsius,
            icon: iconClear,
            advice: advice,
        });
        return;
    } catch (error) {
        console.log(error.message);
        res.status(500);
        
    };
    res.redirect("/");
});

app.listen(port, ()  => {
    console.log(`Listening on port ${port}`);
});