let inputElmt = document.querySelector("#color-selector");

inputElmt.addEventListener("input", function showValues() {
    document.querySelector(".hex-value").innerHTML = inputElmt.value;
    document.querySelector(".rgb-value").innerHTML = convertHEXtoRGB(inputElmt.value);
    document.querySelector(".hex-value").style.color = inputElmt.value;
    document.querySelector(".rgb-value").style.color = inputElmt.value;
}, false);


function convertHEXtoRGB(h) {
    let r = 0,
        g = 0,
        b = 0;

    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];

    convertRGBtoHSL(r, g, b);
    return +r + ", " + +g + ", " + +b;
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

    document.querySelector(".hsl-value").innerHTML = h + ", " + s + "%, " + l + "%";
    document.querySelector(".hsl-value").style.color = inputElmt.value;
}