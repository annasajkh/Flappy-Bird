const canvas = document.getElementById('game');
const c = canvas.getContext('2d');
let kecepatanTambahan = 0
let panjang = 100;
let k = 0.20;
let force = 0;
let g = 0.015;
let burung = new Image();
let pipa = [];
let pipa1 = [];
for (let i = 0; i < 6; i++) {
    let acak = Math.floor(Math.random() * 420);
    let warna1 = Math.floor(Math.random() * 255);
    let warna2 = Math.floor(Math.random() * 255);
    let warna3 = Math.floor(Math.random() * 255);
    pipa.push({
        x: 900 + i * 250,
        y: 0,
        w: 50,
        h: acak,
        w1: warna1,
        w2: warna2,
        w3: warna3
    });
    pipa1.push({
        xb: 900 + i * 250,
        yb: 500,
        wb: 50,
        hb: -500 + acak + 100,
        wb1: warna1,
        wb2: warna2,
        wb3: warna3
    });
}
let xp = 500;
let yp = 250;
let skor = 0;
let kon = true;
let loop = 0.1;
burung.src = 'img/burung.png';
window.addEventListener('keydown', klik, false)

function klik(e) {
    if (k == 0.20) {
        if (e.keyCode == 32) {
            force = -1
        } else {
            force = 0
        }
    }
}


function tulis() {
    if (k == 0) {
        c.font = '32px Arial';
        c.fillStyle = 'red';
        c.fillText('Kamu Kalah!!!!!!', 350, 250);
    }
    c.font = '20px Arial';
    c.fillStyle = 'blue';
    c.fillText('Game by Annas', 20, 480);
    c.font = '40px Arial';
    c.fillStyle = 'green';

    c.fillText(skor, 20, 50);
}

function buatpipa() {
    for (let i = 0; i < pipa.length; i++) {
        let pip = pipa[i]
        let pip1 = pipa1[i]
        if (xp - pip.x < 43 && xp - pip.x > -43 && yp - pip.y < pip.h - 18 && yp - pip.y > 0) {
            k = 0
        }
        if (xp - pip.x < 5 && xp - pip.x > -5 && k != 0 && kon == true) {
            skor++
            kon = false
        }
        if (xp - pip.x < -50 && xp - pip.x > -55) {
            kon = true;
        }

        if (skor >= 50 && skor < 100) {
            kecepatanTambahan = 0
            if (pip.h >= 420) {
                loop = -0.1;
            } else if (pip.h <= 0) {
                loop = 0.1;
            }
            if (k == 0.20) {
                pip.h += loop
                pip1.hb = -500 + pip.h + panjang
            }
        }
        if (skor >= 20 && skor < 50) {
            kecepatanTambahan = 0.2
        }
        if (skor >= 100 && skor < 150) {
            kecepatanTambahan = 0.2
            if (pip.h >= 420) {
                loop = -0.1;
            } else if (pip.h <= 0) {
                loop = 0.1;
            }
            if (k == 0.20) {
                pip.h += loop
                pip1.hb = -500 + pip.h + panjang
            }
        }
        pip.x -= k + kecepatanTambahan
        c.fillStyle = 'rgb(' + pip.w1 + ',' + pip.w2 + ',' + pip.w3 + ')'
        c.fillRect(pip.x, pip.y, pip.w, pip.h)
        if (pipa[0].x < -340) {
            let acak = Math.floor(Math.random() * 420);
            let warna1 = Math.floor(Math.random() * 255);
            let warna2 = Math.floor(Math.random() * 255);
            let warna3 = Math.floor(Math.random() * 255);
            pipa.shift();
            pipa1.shift();
            pipa.push({
                x: 1150 + i * 250,
                y: 0,
                w: 50,
                h: acak,
                w1: warna1,
                w2: warna2,
                w3: warna3
            });
            pipa1.push({
                xb: 1150 + i * 250,
                yb: 500,
                wb: 50,
                hb: -500 + acak + panjang,
                wb1: warna1,
                wb2: warna2,
                wb3: warna3
            })
        }
    }
}


function buatpipa1() {
    for (let i = 0; i < pipa1.length; i++) {
        let pip = pipa1[i]
        if (xp - pip.xb < 43 && xp - pip.xb > -43 && yp - pip.yb < 500 && yp - pip.yb > pip.hb - 28) {
            k = 0
        }

        pip.xb -= k + kecepatanTambahan
        c.fillStyle = 'rgb(' + pip.wb1 + ',' + pip.wb2 + ',' + pip.wb3 + ')'
        c.fillRect(pip.xb, pip.yb, pip.wb, pip.hb);
    }
}

setInterval(function () {
    c.save();
    c.clearRect(0, 0, 1000, 500);
    if (k == 0) {
        g = 0.015;
        burung.src = 'img/burung_mati.png';
    }
    if (yp > 467) {
        yp = 467
        k = 0;
        g = 0
    }
    if (yp < -18) {
        yp = -18;
        k = 0;
        g = 0.02;
    }
    yp += force;
    force += g;
    buatpipa();
    buatpipa1();
    c.drawImage(burung, xp, yp);
    tulis();
    c.restore();
});