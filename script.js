let input = document.querySelector("#color-selector");
const container = document.querySelectorAll("#container>div");
const select = document.querySelector("select");
let option = document.querySelector("option");
let harmony = "analogous";

input.addEventListener("input", getColors, false);

function getColors() {
    convertHEXtoRGB(input.value);
}

select.onchange = function () {
    harmony = select.value;
    convertHEXtoRGB(input.value);
}

function convertHEXtoRGB(h) {
    let r = 0,
        g = 0,
        b = 0;

    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];

    convertRGBtoHSL(r, g, b);
    return +r + "," + +g + "," + +b;
}


function convertRGBtoHSL(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    let min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        delta = max - min,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else
    if (max == r)
        h = ((g - b) / delta) % 6;
    else
    if (max == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0)
        h += 360;

    l = (max + min) / 2;

    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    calcHarmony(h, s, l);
}

function calcHarmony(h, s, l) {
    hBase = h;
    sBase = s;
    lBase = l;
    let x = 0;

    for (i = -2; i < 3; i++) {
        if (harmony == "analogous") {
            h = hBase + (20 * i);
        }
        if (harmony == "monochromatic") {
            l = (lBase + 15 * i).toFixed(1);
        }
        if (harmony == "triad") {
            h = hBase + (30 * i);
        }
        if (harmony == "complementary") {
            h = hBase + (60 * i);
        }
        if (harmony == "compound") {
            if (i < 0) {
                h = hBase + (60 * i);
            }
            if (i > 0) {
                h = hBase + (20 * i);
            }
        }
        if (harmony == "shades") {
            s = (lBase + 20 * i).toFixed(1);
        }

        container[x].style.backgroundColor = `hsl(${h},${s}%,${l}%)`;
        container[2].style.backgroundColor = `hsl(${hBase},${sBase}%,${lBase}%)`;
        container[x].firstElementChild.lastElementChild.innerHTML = `${h},${s}%,${l}%`;
        let rgb = container[x].style.backgroundColor;

        function setRGB(rgb) {
            let sep = rgb.indexOf(", ") > -1 ? ", " : " ";
            rgb = rgb.substr(4).split(")")[0].split(sep);
            return rgb;
        }

        function convertRGBtoHex(rgb) {
            let r = (+rgb[0]).toString(16),
                g = (+rgb[1]).toString(16),
                b = (+rgb[2]).toString(16);

            if (r.length == 1)
                r = "0" + r;
            if (g.length == 1)
                g = "0" + g;
            if (b.length == 1)
                b = "0" + b;

            return "#" + r + g + b;
        }

        container[x].firstElementChild.children[3].innerHTML = setRGB(rgb);
        container[x].firstElementChild.children[1].innerHTML = convertRGBtoHex(setRGB(rgb));
        x++;
    }
}