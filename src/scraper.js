
// class Scraper {
//     constructor(group, date) {
//         this.needle = require('needle');
//         this.url='http://www.osu.ru/pages/schedule/?who=1&what=1&filial=1&group='+group+'&mode=full';
//         this.date=date;
//     }
//     getSchedule() {
//         this.needle.get(this.url, function(err, res){
//             if (err) throw err;
//             let schedule = [];
//             console.log(res.body);
//             schedule.push(res.body);
//         });
//     }
// }
export class Scraper {
    constructor(group, date) {
        this.fetch = require("node-fetch");
        this.url='http://www.osu.ru/pages/schedule/?who=1&what=1&filial=1&group='+group+'&mode=full';
        this.date=date;
    }
    getSchedule() {
        this.fetch(this.url)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            let decoder = new TextDecoder("KOI8-R");
            let text = decoder.decode(buffer);
            console.log(text);
            console.log(typeof text);
        });
    }
}

let scr = new Scraper('11852', '01.01.2020');
scr.getSchedule();