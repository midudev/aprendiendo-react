import confetti from 'canvas-confetti'

export function ConfetiDeLocura(){
    var cont = 0;
    let id = setInterval(function(){
        confetti({
            particleCount: 180,
            startVelocity: 30,
            spread: 360,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });
        cont++;
        if(cont == 7) clearInterval(id);

    }, 110);
}