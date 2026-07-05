const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Canvasサイズを画面サイズに合わせる
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
initCanvas();
window.addEventListener('resize', initCanvas);

// パーティクルクラス
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 0.5 + 0.3;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.angle = Math.random() * Math.PI * 2; // 横揺れの初期角度
        this.amplitude = Math.random() * 20 + 10; // 揺れ幅
        this.angleSpeed = Math.random() * 0.02 + 0.01; // 揺れ速度
    }

    update() {
        this.y -= this.speed;
        this.angle += this.angleSpeed;
        this.x += Math.sin(this.angle) * 0.5; // 横揺れ

        // 画面上に行ったら下に戻す
        if (this.y < -this.size) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// パーティクル作成
function initParticles(num = 100) {
    particlesArray = [];
    for (let i = 0; i < num; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles(120);

// アニメーションループ
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();
